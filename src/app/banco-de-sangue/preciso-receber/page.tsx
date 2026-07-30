import type { Metadata } from "next";
import { LifeBuoy, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { RecipientForm } from "@/components/forms/recipient-form";
import { site } from "@/lib/data/site";
import { whatsappLink } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Solicitar sangue para um cão",
  description:
    "Solicite uma bolsa de sangue para o seu pet no Banco de Sangue Canino VeteLab — Sinop-MT.",
};

export default function PrecisoReceberPage() {
  return (
    <>
      <section className="border-b border-border/60 bg-blood/5 py-14">
        <div className="container max-w-3xl">
          <Badge variant="blood">
            <LifeBuoy className="mr-1 h-3 w-3" /> Paciente canino
          </Badge>
          <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
            Solicitar sangue para um cão
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Preencha os dados do pet, do veterinário responsável e da clínica de destino. Nossa
            equipe entrará em contato o quanto antes.
          </p>
        </div>
      </section>

      <section className="container py-16">
        <div className="mb-6 flex items-start gap-3 rounded-xl border border-destructive/40 bg-destructive/5 p-4">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
          <div className="text-sm">
            <p className="font-semibold text-destructive">Emergência imediata?</p>
            <p className="mt-1 text-muted-foreground">
              Se o caso for de risco iminente à vida, ligue diretamente para o VeteLab pelo{" "}
              <a
                href={whatsappLink(
                  site.contact.whatsapp,
                  "EMERGÊNCIA - Preciso de bolsa de sangue canina.",
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary hover:underline"
              >
                WhatsApp {site.contact.phone}
              </a>{" "}
              antes de preencher o formulário.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border bg-card p-6 shadow-sm md:p-8">
          <RecipientForm />
        </div>
      </section>
    </>
  );
}
