import type { Metadata } from "next";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ContactForm } from "@/components/forms/contact-form";
import { site } from "@/lib/data/site";
import { whatsappLink } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Entre em contato com o VeteLab — Laboratório Veterinário e Banco de Sangue Canino em Sinop-MT.",
};

export default function ContatoPage() {
  return (
    <>
      <section className="border-b border-border/60 bg-primary/5 py-14">
        <div className="container max-w-3xl">
          <Badge variant="muted">Contato</Badge>
          <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">Fale com o VeteLab</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Tire dúvidas sobre exames, agende coleta ou converse com a equipe do Banco de Sangue
            Canino.
          </p>
        </div>
      </section>

      <section className="container grid gap-10 py-16 md:grid-cols-5">
        <div className="space-y-6 md:col-span-2">
          <InfoCard
            icon={MapPin}
            title="Endereço"
            lines={[`${site.city} — ${site.state}`, "Endereço completo a confirmar"]}
          />
          <InfoCard
            icon={Phone}
            title="Telefone e WhatsApp"
            lines={[site.contact.phone]}
            action={{
              label: "Abrir no WhatsApp",
              href: whatsappLink(site.contact.whatsapp, `Olá, VeteLab!`),
            }}
          />
          <InfoCard
            icon={Mail}
            title="E-mail"
            lines={[site.contact.email]}
            action={{ label: "Enviar e-mail", href: `mailto:${site.contact.email}` }}
          />
          <InfoCard icon={Clock} title="Horário de atendimento" lines={[site.contact.hours]} />
        </div>

        <div className="md:col-span-3">
          <div className="rounded-2xl border bg-card p-6 shadow-sm md:p-8">
            <h2 className="text-2xl font-bold tracking-tight">Envie uma mensagem</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Preencha o formulário e retornaremos em horário comercial.
            </p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function InfoCard({
  icon: Icon,
  title,
  lines,
  action,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  lines: string[];
  action?: { label: string; href: string };
}) {
  return (
    <div className="rounded-xl border bg-card p-6 text-center shadow-sm">
      <div className="flex flex-col items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Icon className="h-5 w-5" />
        </div>
        <h3 className="font-semibold">{title}</h3>
      </div>
      <div className="mt-3 space-y-0.5 text-sm text-muted-foreground">
        {lines.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
      {action && (
        <a
          href={action.href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center justify-center text-sm font-medium text-primary hover:underline"
        >
          {action.label} →
        </a>
      )}
    </div>
  );
}
