import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Bug,
  Clock,
  FlaskConical,
  HeartHandshake,
  HeartPulse,
  MapPin,
  MessageCircle,
  Microscope,
  PawPrint,
  ShieldCheck,
  TestTubes,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { categoryLabels, services } from "@/lib/data/services";
import { site } from "@/lib/data/site";
import { publicAsset, whatsappLink } from "@/lib/utils";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CarePromise />
      <ServicesPreview />
      <BloodBankHighlight />
      <ProcessSection />
      <ContactCTA />
    </>
  );
}

function Hero() {
  return (
    <section className="relative flex h-[calc(100svh-7rem)] min-h-[620px] max-h-[760px] items-start overflow-hidden md:items-center">
      <Image
        src={publicAsset("/images/dog-companion.jpg")}
        alt="Cão jovem olhando para a câmera com uma flor na boca"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[52%_48%] md:object-[60%_38%]"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/70 to-white/5 md:bg-[linear-gradient(90deg,rgba(255,255,255,0.98)_0%,rgba(255,255,255,0.88)_32%,rgba(255,255,255,0.28)_62%,rgba(255,255,255,0)_78%)]" />

      <div className="container relative z-10 py-12 md:py-20">
        <div className="max-w-xl animate-fade-in">
          <Badge variant="muted" className="border border-primary/15 bg-white/90">
            <MapPin className="mr-1 h-3 w-3" /> Cuidado veterinário em Sinop
          </Badge>
          <h1 className="mt-5 text-balance font-display text-4xl font-semibold leading-tight text-foreground md:text-6xl">
            Cada pet merece <span className="text-primary">respostas cuidadosas e precisas.</span>
          </h1>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-foreground/75 md:text-xl">
            Cada exame é realizado com atenção, responsabilidade e respeito pela história de quem
            realmente importa: o seu pet.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link href="/servicos" className={buttonVariants({ size: "lg" })}>
              Consultar exames <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={whatsappLink(site.contact.whatsapp, "Olá, VeteLab! Gostaria de tirar uma dúvida sobre meu pet.")}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ variant: "outline", size: "lg" })}
            >
              <MessageCircle className="h-4 w-4" /> Conversar com a equipe
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function CarePromise() {
  return (
    <section className="py-14 md:py-20">
      <div className="container grid items-center gap-10 md:grid-cols-2 md:gap-16">
        <div className="relative aspect-[4/3] overflow-hidden rounded-md">
          <Image
            src={publicAsset("/images/vet-care.jpg")}
            alt="Pessoa acariciando um gato com cuidado"
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover object-center"
          />
        </div>
        <div>
          <p className="text-sm font-semibold uppercase text-primary">O que importa para nós</p>
          <h2 className="mt-3 text-balance font-display text-3xl font-semibold leading-tight md:text-5xl">
            Cuidado em cada detalhe, confiança em cada resultado.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            No VeteLab, precisão e carinho não são caminhos diferentes. Cuidamos de cada etapa para
            que os resultados contribuam com decisões seguras para a saúde dos animais.
          </p>
          <div className="mt-8 flex items-center gap-4 border-t border-border/70 pt-6">
            <ShieldCheck className="h-7 w-7 shrink-0 text-primary" />
            <p className="font-semibold">Atenção do recebimento da amostra à entrega do resultado.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServicesPreview() {
  const featured = services.slice(0, 6);
  const iconMap = {
    hematologia: HeartPulse,
    bioquimica: FlaskConical,
    parasitologia: Bug,
    sorologia: TestTubes,
    citologia: Microscope,
    hormonal: FlaskConical,
    urinalise: TestTubes,
    microbiologia: Microscope,
  } as const;

  return (
    <section className="py-14 md:py-20">
      <div className="container">
        <div className="grid gap-5 md:grid-cols-[0.8fr_1.2fr] md:items-end">
          <div>
            <p className="text-sm font-semibold uppercase text-primary">Análises clínicas</p>
            <h2 className="mt-3 font-display text-3xl font-semibold md:text-4xl">
              Exames que ajudam a compreender o que o animal precisa
            </h2>
          </div>
          <p className="max-w-2xl text-muted-foreground md:justify-self-end">
            Exames laboratoriais que ajudam a compreender o que cada animal precisa.
          </p>
        </div>
        <div className="mt-8 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((service) => {
            const Icon = iconMap[service.category] ?? Microscope;
            return (
              <Link key={service.slug} href={`/servicos/${service.slug}`} className="group flex gap-4 border-t border-border py-5">
                <Icon className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <div>
                  <span className="text-xs text-muted-foreground">{categoryLabels[service.category]}</span>
                  <h3 className="mt-1 font-semibold group-hover:text-primary">{service.name}</h3>
                  <p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" /> Até {service.deadlineDays} dia{service.deadlineDays > 1 ? "s" : ""} {service.deadlineDays > 1 ? "úteis" : "útil"}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
        <Link href="/servicos" className="mt-6 inline-flex items-center gap-2 font-semibold text-primary hover:underline">
          Ver catálogo completo <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}

function BloodBankHighlight() {
  return (
    <section className="border-y border-blood/10 bg-[#fff4f5] py-14 md:py-16">
      <div className="container grid gap-8 md:grid-cols-[0.75fr_1.25fr] md:items-center md:gap-16">
        <div className="flex aspect-[4/3] items-center justify-center rounded-md bg-blood p-8 text-blood-foreground">
          <div className="text-center">
            <HeartHandshake className="mx-auto h-20 w-20" strokeWidth={1.2} />
            <p className="mt-4 font-display text-2xl font-semibold">Um gesto que cuida de muitas vidas</p>
          </div>
        </div>
        <div>
          <Badge variant="blood">Banco de Sangue Canino</Badge>
          <h2 className="mt-4 text-balance font-display text-3xl font-semibold md:text-4xl">
            Quando um cão ajuda outro cão, duas famílias são acolhidas
          </h2>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted-foreground">
            O Banco de Sangue Canino aproxima cães que podem doar daqueles que precisam de uma nova
            chance.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link href="/banco-de-sangue/quero-doar" className={buttonVariants({ variant: "blood", size: "lg" })}>
              Cadastrar meu cão como doador
            </Link>
            <Link href="/banco-de-sangue" className={buttonVariants({ variant: "outline", size: "lg" })}>
              Saiba mais
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  const steps = [
    ["1", "Solicitação", "A necessidade do exame é informada ao VeteLab."],
    ["2", "Coleta", "A amostra é coletada ou recebida pelo laboratório."],
    ["3", "Análise", "Nossa equipe realiza o processamento com atenção."],
    ["4", "Laudo", "O resultado é disponibilizado de forma digital."],
  ];

  return (
    <section className="py-14 md:py-16">
      <div className="container">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase text-primary">Do início ao resultado</p>
          <h2 className="mt-3 font-display text-3xl font-semibold md:text-4xl">
            Da amostra ao resultado
          </h2>
        </div>
        <ol className="mt-9 grid gap-6 md:grid-cols-4">
          {steps.map(([number, title, body]) => (
            <li key={number} className="border-t-2 border-primary/25 pt-5">
              <span className="text-sm font-bold text-primary">{number}</span>
              <h3 className="mt-3 font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function ContactCTA() {
  return (
    <section className="bg-primary py-14 text-primary-foreground md:py-16">
      <div className="container text-center">
        <PawPrint className="mx-auto h-8 w-8 text-primary-foreground/70" />
        <h2 className="mx-auto mt-4 max-w-3xl text-balance font-display text-3xl font-semibold md:text-5xl">
          Precisa de orientação sobre um exame?
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-primary-foreground/80">
          Fale com o VeteLab para tirar dúvidas sobre exames, coleta e atendimento laboratorial.
        </p>
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <a
            href={whatsappLink(site.contact.whatsapp, "Olá, VeteLab! Gostaria de orientação para cuidar do meu pet.")}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({ variant: "secondary", size: "lg" })}
          >
            <MessageCircle className="h-4 w-4" /> Falar com o VeteLab
          </a>
        </div>
      </div>
    </section>
  );
}