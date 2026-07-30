import { NextResponse } from "next/server";
import { recipientSchema } from "@/lib/validators/forms";
import { emailConfig, isEmailConfigured, resend } from "@/lib/email";
import { clientIp, rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const ip = clientIp(req);
  const limited = rateLimit(`receptor:${ip}`, 5, 60_000);
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

  const parsed = recipientSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Dados inválidos.", issues: parsed.error.flatten() },
      { status: 422 },
    );
  }

  const data = parsed.data;
  const summary = [
    `URGÊNCIA: ${data.urgency}`,
    "",
    `Tutor: ${data.tutorName} (${data.city})`,
    `Contato: ${data.tutorEmail} — ${data.tutorPhone}`,
    "",
    `Pet: ${data.petName} — ${data.petBreed || "SRD"}`,
    `Idade: ${data.petAge} anos — Peso: ${data.petWeight} kg — Tipo necessário: ${data.petBloodType}`,
    "",
    `Motivo: ${data.reason}`,
    "",
    `Clínica: ${data.clinicName}`,
    `Veterinário: ${data.veterinarianName} — ${data.veterinarianCrmv}`,
  ].join("\n");

  if (!isEmailConfigured() || !resend) {
    console.info("[receptor] envio simulado (RESEND_API_KEY ausente)", data);
    return NextResponse.json({ ok: true, simulated: true });
  }

  try {
    await resend.emails.send({
      from: emailConfig.from,
      to: emailConfig.to,
      replyTo: data.tutorEmail,
      subject: `[Banco de Sangue — ${data.urgency}] Receptor: ${data.petName}`,
      text: summary,
    });
    await resend.emails.send({
      from: emailConfig.from,
      to: data.tutorEmail,
      subject: "Recebemos sua solicitação no Banco de Sangue Canino VeteLab",
      text: [
        `Olá, ${data.tutorName}.`,
        "",
        `Recebemos a solicitação para o ${data.petName}. Nossa equipe está verificando compatibilidade e disponibilidade e entrará em contato o mais rápido possível — considerando a urgência informada (${data.urgency}).`,
        "",
        "Em caso de emergência imediata, ligue diretamente para o VeteLab.",
        "",
        "Equipe VeteLab — Sinop-MT",
      ].join("\n"),
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[receptor] falha ao enviar e-mails", err);
    return NextResponse.json(
      { error: "Não foi possível concluir sua solicitação agora. Tente novamente." },
      { status: 500 },
    );
  }
}
