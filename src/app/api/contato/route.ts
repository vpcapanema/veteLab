import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validators/forms";
import { emailConfig, isEmailConfigured, resend } from "@/lib/email";
import { clientIp, rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const ip = clientIp(req);
  const limited = rateLimit(`contato:${ip}`, 5, 60_000);
  if (!limited.ok) {
    return NextResponse.json(
      { error: "Muitas mensagens em pouco tempo. Aguarde alguns instantes." },
      { status: 429 },
    );
  }

  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "Payload inválido." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Dados inválidos.", issues: parsed.error.flatten() },
      { status: 422 },
    );
  }

  const data = parsed.data;

  if (!isEmailConfigured() || !resend) {
    console.info("[contato] envio simulado (RESEND_API_KEY ausente)", data);
    return NextResponse.json({ ok: true, simulated: true });
  }

  try {
    await resend.emails.send({
      from: emailConfig.from,
      to: emailConfig.to,
      replyTo: data.email,
      subject: `[Contato site] ${data.subject}`,
      text: [
        `Nome: ${data.name}`,
        `E-mail: ${data.email}`,
        `Telefone: ${data.phone}`,
        "",
        data.message,
      ].join("\n"),
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contato] falha ao enviar e-mail", err);
    return NextResponse.json(
      { error: "Não foi possível enviar sua mensagem agora. Tente novamente." },
      { status: 500 },
    );
  }
}
