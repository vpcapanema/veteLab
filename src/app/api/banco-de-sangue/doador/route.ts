import { NextResponse } from "next/server";
import { donorSchema } from "@/lib/validators/forms";
import { emailConfig, isEmailConfigured, resend } from "@/lib/email";
import { clientIp, rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const ip = clientIp(req);
  const limited = rateLimit(`doador:${ip}`, 3, 60_000);
  if (!limited.ok) {
    return NextResponse.json(
      { error: "Muitas tentativas. Aguarde alguns instantes." },
      { status: 429 },
    );
  }

  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "Payload inválido." }, { status: 400 });
  }

  const parsed = donorSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Dados inválidos.", issues: parsed.error.flatten() },
      { status: 422 },
    );
  }

  const data = parsed.data;
  const summary = [
    `Tutor: ${data.tutorName} (${data.city})`,
    `Contato: ${data.tutorEmail} — ${data.tutorPhone}`,
    "",
    `Pet: ${data.petName} — ${data.petBreed || "SRD"}`,
    `Idade: ${data.petAge} anos — Peso: ${data.petWeight} kg — Tipo: ${data.petBloodType}`,
    `Vacinas em dia: sim`,
    "",
    `Observações: ${data.healthNotes || "—"}`,
  ].join("\n");

  if (!isEmailConfigured() || !resend) {
    console.info("[doador] envio simulado (RESEND_API_KEY ausente)", data);
    return NextResponse.json({ ok: true, simulated: true });
  }

  try {
    await resend.emails.send({
      from: emailConfig.from,
      to: emailConfig.to,
      replyTo: data.tutorEmail,
      subject: `[Banco de Sangue] Novo doador: ${data.petName} (${data.tutorName})`,
      text: summary,
    });
    await resend.emails.send({
      from: emailConfig.from,
      to: data.tutorEmail,
      subject: "Recebemos seu cadastro no Banco de Sangue Canino VeteLab",
      text: [
        `Olá, ${data.tutorName}!`,
        "",
        `Obrigado por cadastrar o ${data.petName} como possível doador no Banco de Sangue Canino VeteLab.`,
        "Nossa equipe entrará em contato pelo WhatsApp para agendar a triagem e os exames pré-doação — todos sem custo para você.",
        "",
        "Um abraço,",
        "Equipe VeteLab — Sinop-MT",
      ].join("\n"),
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[doador] falha ao enviar e-mails", err);
    return NextResponse.json(
      { error: "Não foi possível concluir seu cadastro agora. Tente novamente." },
      { status: 500 },
    );
  }
}
