import type { Metadata } from "next";

import Link from "next/link";

import { notFound } from "next/navigation";

import { ArrowLeft, Clock, ClipboardList, Stethoscope } from "lucide-react";

import { Badge } from "@/components/ui/badge";

import { buttonVariants } from "@/components/ui/button";

import { categoryLabels, getServiceBySlug, services } from "@/lib/data/services";

import { site } from "@/lib/data/site";

import { whatsappLink } from "@/lib/utils";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const service = getServiceBySlug(slug);

  if (!service) return { title: "Exame não encontrado" };

  return {
    title: service.name,

    description: service.shortDescription,
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const service = getServiceBySlug(slug);

  if (!service) notFound();

  const speciesLabel = service.species.join(", ");

  return (
    <>
      <section className="border-b border-border/60 bg-primary/5 py-14">
        <div className="container max-w-3xl">
          <Link
            href="/servicos"

            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> Voltar ao catálogo
          </Link>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <Badge>{categoryLabels[service.category]}</Badge>

            <Badge variant="muted">
              <Clock className="mr-1 h-3 w-3" />
              {service.deadlineDays} dia{service.deadlineDays > 1 ? "s" : ""} úte
              {service.deadlineDays > 1 ? "is" : "l"}
            </Badge>
          </div>

          <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">{service.name}</h1>

          <p className="mt-4 text-lg text-muted-foreground">{service.shortDescription}</p>
        </div>
      </section>

      <section className="container grid gap-10 py-16 md:grid-cols-3">
        <div className="space-y-8 md:col-span-2">
          <div>
            <h2 className="text-xl font-bold tracking-tight">Sobre o exame</h2>

            <p className="mt-3 text-muted-foreground">{service.description}</p>
          </div>

          <div className="rounded-xl border bg-card p-6 text-center">
            <div className="flex flex-col items-center gap-2">
              <ClipboardList className="h-5 w-5 text-primary" />

              <h2 className="text-lg font-semibold">Preparo</h2>
            </div>

            <p className="mt-2 text-sm text-muted-foreground">{service.preparation}</p>
          </div>

          <div className="rounded-xl border bg-card p-6 text-center">
            <div className="flex flex-col items-center gap-2">
              <Stethoscope className="h-5 w-5 text-primary" />

              <h2 className="text-lg font-semibold">Espécies atendidas</h2>
            </div>

            <p className="mt-2 text-sm capitalize text-muted-foreground">{speciesLabel}</p>
          </div>
        </div>

        <aside className="space-y-4">
          <div className="rounded-xl border bg-secondary/50 p-6 text-center">
            <h3 className="font-semibold">Quer solicitar este exame?</h3>

            <p className="mt-1 text-sm text-muted-foreground">
              Fale direto com nossa equipe pelo WhatsApp ou envie uma mensagem.
            </p>

            <div className="mt-4 flex flex-col items-center gap-2">
              <a
                href={whatsappLink(
                  site.contact.whatsapp,

                  `Olá, VeteLab! Gostaria de solicitar o exame "${service.name}".`,
                )}

                target="_blank"

                rel="noopener noreferrer"

                className={buttonVariants()}
              >
                Falar no WhatsApp
              </a>

              <Link href="/contato" className={buttonVariants({ variant: "outline" })}>
                Enviar mensagem
              </Link>
            </div>
          </div>

          <div className="rounded-xl border p-6 text-sm text-muted-foreground">
            <p>
              Todos os laudos são emitidos com responsabilidade técnica de médico veterinário
              inscrito no CRMV-MT.
            </p>
          </div>
        </aside>
      </section>
    </>
  );
}
