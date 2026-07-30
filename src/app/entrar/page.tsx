import type { Metadata } from "next";

import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Área do tutor — em breve",
};

export default function EntrarPage() {
  return (
    <section className="container flex min-h-[60vh] max-w-lg flex-col items-center justify-center py-16 text-center">
      <div className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium uppercase tracking-wide text-primary">
        Em construção
      </div>

      <h1 className="mt-4 text-3xl font-bold tracking-tight">Área do tutor</h1>

      <p className="mt-3 text-muted-foreground">
        A área restrita para acompanhamento de exames e download de laudos está sendo construída. Em
        breve você poderá se cadastrar, ver seus pets e acessar os resultados aqui.
      </p>

      <p className="mt-6 text-sm text-muted-foreground">
        Enquanto isso, fale com nossa equipe pelo WhatsApp ou pelo formulário de contato.
      </p>

      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link href="/contato" className={buttonVariants()}>
          Ir para contato
        </Link>

        <Link href="/" className={buttonVariants({ variant: "outline" })}>
          Voltar ao início
        </Link>
      </div>
    </section>
  );
}
