import type { Metadata } from "next";
import { Eye, Microscope, Target } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { site } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "Sobre o VeteLab",
  description: site.description,
};

const values = [
  { icon: Microscope, title: "Nossa missão", body: site.institutional.mission },
  { icon: Target, title: "Nosso objetivo", body: site.institutional.objective },
  { icon: Eye, title: "Nossa visão", body: site.institutional.vision },
];

export default function SobrePage() {
  return (
    <>
      <section className="border-b border-border/60 bg-primary/5 py-16">
        <div className="container max-w-3xl">
          <Badge variant="muted">Sobre</Badge>
          <h1 className="mt-4 text-balance text-4xl font-bold tracking-tight md:text-5xl">
            {site.fullName}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">{site.description}</p>
        </div>
      </section>

      <section className="container py-16">
        <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr]">
          <div>
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Sobre o VeteLab</h2>
            <p className="mt-4 text-muted-foreground">{site.description}</p>
          </div>

          <div className="grid gap-4">
            {values.map((value) => (
              <Card key={value.title}>
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <value.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">{value.title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{value.body}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
