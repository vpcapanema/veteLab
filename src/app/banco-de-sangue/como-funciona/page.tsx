import type { Metadata } from "next";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { site } from "@/lib/data/site";
import { whatsappLink } from "@/lib/utils";
export const metadata: Metadata = {
  title: "Como funciona o Banco de Sangue",
  description: "Informações de contato do Banco de Sangue Canino VeteLab.",
};
export default function ComoFuncionaPage() {
  return (
    <section className="container max-w-3xl py-16">
      <h1 className="text-4xl font-bold tracking-tight">Banco de Sangue Canino</h1>
      <p className="mt-4 text-lg text-muted-foreground">
        Para saber como funcionam a doação, o recebimento e a disponibilidade, fale diretamente com
        a equipe do VeteLab. Assim você recebe a orientação atualizada para o seu caso.
      </p>
      <a
        href={whatsappLink(
          site.contact.whatsapp,
          "Olá! Gostaria de informações sobre o Banco de Sangue Canino.",
        )}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonVariants({ variant: "blood", size: "lg", className: "mt-8" })}
      >
        WhatsApp {site.contact.whatsappDisplay}
      </a>
      <div className="mt-4">
        <Link href="/contato" className="text-sm text-primary hover:underline">
          Ver todos os canais de contato
        </Link>
      </div>
    </section>
  );
}
