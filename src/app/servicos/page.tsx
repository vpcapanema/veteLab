import type { Metadata } from "next";

import Link from "next/link";

import { ArrowRight, Clock } from "lucide-react";

import { Badge } from "@/components/ui/badge";

import { categoryLabels, getServicesByCategory } from "@/lib/data/services";

export const metadata: Metadata = {
  title: "Serviços e exames",

  description:
    "Catálogo de análises clínicas veterinárias do VeteLab — hematologia, bioquímica, parasitologia, sorologia, citologia, hormonal, urinálise e microbiologia.",
};

export default function ServicosPage() {
  const groups = Array.from(getServicesByCategory().entries());

  return (
    <>
      <section className="border-b border-border/60 bg-primary/5 py-14">
        <div className="container max-w-3xl">
          <Badge variant="muted">Catálogo</Badge>

          <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">Serviços e exames</h1>

          <p className="mt-4 text-lg text-muted-foreground">
            Nossa lista de análises clínicas veterinárias, organizadas por categoria. Não encontrou
            o exame que precisa?{" "}
            <Link href="/contato" className="font-medium text-primary hover:underline">
              Fale com a gente
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="container space-y-12 py-16">
        {groups.map(([category, list]) => (
          <div key={category} id={category}>
            <div className="flex items-baseline justify-between border-b border-border pb-3">
              <h2 className="text-2xl font-bold tracking-tight">{categoryLabels[category]}</h2>

              <span className="text-sm text-muted-foreground">
                {list.length} {list.length > 1 ? "exames" : "exame"}
              </span>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {list.map((service) => (
                <Link
                  key={service.slug}

                  href={`/servicos/${service.slug}`}

                  className="group flex flex-col items-center rounded-xl border bg-card p-6 text-center shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
                >
                  <h3 className="text-lg font-semibold group-hover:text-primary">{service.name}</h3>

                  <p className="mt-2 text-sm text-muted-foreground">{service.shortDescription}</p>

                  <div className="mt-4 flex flex-col items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" />
                    <span>
                      {service.deadlineDays} dia{service.deadlineDays > 1 ? "s" : ""}
                    </span>

                    <span className="inline-flex items-center justify-center gap-1 text-primary opacity-0 transition-opacity group-hover:opacity-100">
                      Ver detalhes <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
