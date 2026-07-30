import type { Metadata } from "next";
import { site } from "@/lib/data/site";
export const metadata: Metadata = { title: "Termos de Uso" };
export default function TermsPage() {
  return (
    <article className="container max-w-3xl py-16">
      <h1 className="text-4xl font-bold tracking-tight">Termos de Uso</h1>
      <div className="mt-8 space-y-6 text-muted-foreground">
        <p>
          As informações deste site têm caráter institucional e não substituem avaliação ou
          orientação de um médico-veterinário.
        </p>
        <p>
          O envio de um formulário não garante atendimento, disponibilidade de exames, doação ou
          transfusão. A equipe do {site.name} entrará em contato para confirmar cada solicitação.
        </p>
      </div>
    </article>
  );
}
