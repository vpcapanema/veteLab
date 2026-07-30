import type { Metadata } from "next";

import { Droplet, HeartHandshake } from "lucide-react";

import { Badge } from "@/components/ui/badge";

import { DonorForm } from "@/components/forms/donor-form";

import { bloodBank } from "@/lib/data/blood-bank";

export const metadata: Metadata = {
  title: "Cadastrar cão doador de sangue",

  description:
    "Cadastre seu pet como doador do Banco de Sangue Canino VeteLab. Salve vidas caninas na região de Sinop-MT.",
};

export default function QueroDoarPage() {
  return (
    <>
      <section className="border-b border-border/60 bg-blood/5 py-14">
        <div className="container max-w-3xl">
          <Badge variant="blood">
            <Droplet className="mr-1 h-3 w-3" /> Cão doador
          </Badge>

          <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
            Cadastre seu cão como possível doador
          </h1>

          <p className="mt-4 text-lg text-muted-foreground">
            Cães aptos podem salvar até quatro vidas por ano. O procedimento é seguro, indolor e
            gratuito para o tutor.
          </p>
        </div>
      </section>

      <section className="container grid gap-10 py-16 md:grid-cols-5">
        <aside className="space-y-4 md:col-span-2">
          <div className="rounded-xl border bg-card p-6 text-center">
            <div className="flex flex-col items-center gap-2">
              <HeartHandshake className="h-5 w-5 text-blood" />

              <h2 className="font-semibold">Critérios</h2>
            </div>

            <ul className="mt-3 space-y-2 text-left text-sm text-muted-foreground">
              {bloodBank.donorCriteria.map((c) => (
                <li key={c}>• {c}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border bg-blood/5 p-6">
            <p className="text-sm text-muted-foreground">
              Após o cadastro, nossa equipe entrará em contato para agendar a triagem clínica e os
              exames pré-doação — <strong>sem nenhum custo para você</strong>.
            </p>
          </div>
        </aside>

        <div className="md:col-span-3">
          <div className="rounded-2xl border bg-card p-6 shadow-sm md:p-8">
            <DonorForm />
          </div>
        </div>
      </section>
    </>
  );
}
