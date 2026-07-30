import type { Metadata } from "next";
import { site } from "@/lib/data/site";
export const metadata: Metadata = { title: "Política de Privacidade" };
export default function PrivacyPage() {
  return (
    <article className="container max-w-3xl py-16">
      <h1 className="text-4xl font-bold tracking-tight">Política de Privacidade</h1>
      <div className="mt-8 space-y-6 text-muted-foreground">
        <p>
          O {site.name} utiliza os dados enviados nos formulários para responder contatos e dar
          andamento às solicitações feitas pelo usuário.
        </p>
        <p>
          Para dúvidas, acesso, correção ou exclusão de dados, escreva para{" "}
          <a href={`mailto:${site.contact.email}`} className="text-primary hover:underline">
            {site.contact.email}
          </a>
          .
        </p>
      </div>
    </article>
  );
}
