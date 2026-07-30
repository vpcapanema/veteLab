import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Dog,
  Droplet,
  HeartHandshake,
  LifeBuoy,
  MessageCircle,
  PawPrint,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { site } from "@/lib/data/site";
import { publicAsset, whatsappLink } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Banco de Sangue Canino",
  description:
    "Conheça o Banco de Sangue Canino VeteLab e saiba como cadastrar um cão doador ou solicitar sangue para um paciente canino.",
};

export default function BancoDeSanguePage() {
  return (
    <>
      <Hero />
      <ImpactStatement />
      <ChoosePath />
      <ConnectionFlow />
      <Story />
      <FinalCall />
    </>
  );
}

function Hero() {
  return (
    <section className="overflow-hidden bg-[#fff5f6]">
      <div className="container grid min-h-[650px] items-center gap-10 py-12 md:grid-cols-[0.9fr_1.1fr] md:gap-16 md:py-16">
        <div className="relative z-10">
          <Badge variant="blood">
            <Droplet className="mr-1 h-3 w-3" /> Uma iniciativa VeteLab
          </Badge>

          <h1 className="mt-5 text-balance font-display text-5xl font-semibold leading-[1.05] md:text-7xl">
            Cães que <span className="text-blood">salvam cães.</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            O Banco de Sangue Canino aproxima cães doadores de pacientes que precisam de uma nova
            chance. Um gesto de cuidado entre famílias, conduzido pela equipe VeteLab.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/banco-de-sangue/quero-doar"
              className={buttonVariants({ variant: "blood", size: "lg" })}
            >
              <HeartHandshake className="h-5 w-5" /> Tenho um cão que pode doar
            </Link>
            <Link
              href="/banco-de-sangue/preciso-receber"
              className={buttonVariants({ variant: "outline", size: "lg" })}
            >
              <LifeBuoy className="h-5 w-5" /> Solicitar sangue para um cão
            </Link>
          </div>
        </div>

        <div className="relative aspect-[4/5] max-h-[580px] overflow-hidden rounded-md md:aspect-[5/6]">
          <Image
            src={publicAsset("/images/blood-bank-dog-b.jpg")}
            alt="Cão adulto saudável olhando para a câmera"
            fill
            priority
            sizes="(min-width: 768px) 55vw, 100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 to-transparent p-6 pt-20 text-white md:p-8">
            <PawPrint className="h-7 w-7" />
            <p className="mt-3 max-w-sm font-display text-2xl font-semibold">
              Todo herói de quatro patas começa com um tutor disposto a ajudar.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ImpactStatement() {
  return (
    <section className="bg-blood py-12 text-blood-foreground md:py-16">
      <div className="container flex max-w-5xl flex-col gap-5 md:flex-row md:items-center md:gap-12">
        <Droplet className="h-12 w-12 shrink-0" strokeWidth={1.5} />
        <p className="text-balance font-display text-3xl font-semibold leading-tight md:text-5xl">
          Uma doação pode mudar o destino de um cão e devolver esperança a uma família inteira.
        </p>
      </div>
    </section>
  );
}

function ChoosePath() {
  return (
    <section className="py-14 md:py-20">
      <div className="container">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase text-blood">Como você chegou até aqui?</p>
          <h2 className="mt-3 font-display text-3xl font-semibold md:text-5xl">
            Duas necessidades, uma mesma rede de cuidado
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Escolha a opção que descreve a situação do cão. Nossa equipe orientará os próximos
            passos.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <article className="flex min-h-[360px] flex-col items-center justify-between rounded-md border border-blood/20 bg-[#fff8f8] p-7 text-center md:p-9">
            <div className="flex flex-col items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blood/10 text-blood">
                <HeartHandshake className="h-6 w-6" />
              </div>
              <p className="mt-7 text-sm font-semibold uppercase text-blood">Para tutores que querem ajudar</p>
              <h3 className="mt-3 font-display text-3xl font-semibold">Meu cão pode ser um doador</h3>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Cadastre seu cão para que a equipe avalie se ele pode participar da rede de
                doadores. Você receberá orientação sobre triagem, exames e segurança da doação.
              </p>
            </div>
            <Link
              href="/banco-de-sangue/quero-doar"
              className={buttonVariants({ variant: "blood", size: "lg", className: "mx-auto mt-8 w-fit" })}
            >
              Cadastrar meu cão <ArrowRight className="h-4 w-4" />
            </Link>
          </article>

          <article className="flex min-h-[360px] flex-col items-center justify-between rounded-md border bg-card p-7 text-center md:p-9">
            <div className="flex flex-col items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <LifeBuoy className="h-6 w-6" />
              </div>
              <p className="mt-7 text-sm font-semibold uppercase text-primary">Para tutores e veterinários</p>
              <h3 className="mt-3 font-display text-3xl font-semibold">Um cão precisa de sangue</h3>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Envie os dados do paciente, do médico-veterinário responsável e da clínica. A
                equipe verificará a solicitação e entrará em contato o quanto antes.
              </p>
            </div>
            <Link
              href="/banco-de-sangue/preciso-receber"
              className={buttonVariants({ size: "lg", className: "mx-auto mt-8 w-fit" })}
            >
              Solicitar para um cão <ArrowRight className="h-4 w-4" />
            </Link>
          </article>
        </div>
      </div>
    </section>
  );
}

function ConnectionFlow() {
  const steps = [
    {
      icon: Dog,
      title: "Um cão apto a doar",
      body: "O tutor demonstra interesse e recebe as orientações para avaliação.",
    },
    {
      icon: Stethoscope,
      title: "Cuidado VeteLab",
      body: "A equipe conduz a triagem e orienta cada etapa com responsabilidade.",
    },
    {
      icon: HeartHandshake,
      title: "Um paciente amparado",
      body: "A solicitação é analisada junto ao veterinário responsável pelo cão receptor.",
    },
  ];

  return (
    <section className="border-y border-border/60 bg-[#f5f8f6] py-14 md:py-20">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase text-primary">Uma corrente de cuidado</p>
          <h2 className="mt-3 font-display text-3xl font-semibold md:text-5xl">
            O VeteLab conecta quem pode ajudar a quem mais precisa
          </h2>
        </div>

        <ol className="mt-12 grid gap-8 md:grid-cols-3 md:gap-12">
          {steps.map((step, index) => (
            <li key={step.title} className="relative text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white text-primary shadow-sm">
                <step.icon className="h-7 w-7" />
              </div>
              <span className="mt-4 block text-xs font-bold text-blood">0{index + 1}</span>
              <h3 className="mt-2 font-display text-xl font-semibold">{step.title}</h3>
              <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">{step.body}</p>
              {index < steps.length - 1 && (
                <ArrowRight className="absolute -right-7 top-6 hidden h-5 w-5 text-primary/30 md:block" />
              )}
            </li>
          ))}
        </ol>

        <div className="mt-10 text-center">
          <Link href="/banco-de-sangue/como-funciona" className="inline-flex items-center gap-2 font-semibold text-primary hover:underline">
            Entender como funciona <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function Story() {
  return (
    <section className="py-14 md:py-20">
      <div className="container grid gap-8 md:grid-cols-[0.7fr_1.3fr] md:items-start md:gap-16">
        <div className="flex aspect-square items-center justify-center rounded-md bg-blood text-blood-foreground">
          <div className="px-8 text-center">
            <ShieldCheck className="mx-auto h-12 w-12" strokeWidth={1.5} />
            <p className="mt-5 font-display text-3xl font-semibold">Cuidado técnico a serviço da vida</p>
          </div>
        </div>

        <div className="md:py-5">
          <p className="text-sm font-semibold uppercase text-blood">Por que essa iniciativa importa</p>
          <h2 className="mt-3 font-display text-3xl font-semibold md:text-5xl">
            Em uma emergência, disponibilidade e orientação fazem diferença
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            O Banco de Sangue Canino VeteLab nasce para apoiar o atendimento de cães que necessitam
            de transfusão e para aproximar tutores dispostos a ajudar de pacientes em tratamento.
          </p>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Cada cadastro fortalece uma rede local de solidariedade entre tutores, médicos-
            veterinários e clínicas. Quando um cão doa, o cuidado alcança uma família que está
            vivendo um momento difícil.
          </p>
        </div>
      </div>
    </section>
  );
}

function FinalCall() {
  return (
    <section className="bg-blood py-14 text-center text-blood-foreground md:py-16">
      <div className="container">
        <PawPrint className="mx-auto h-9 w-9 text-white/75" />
        <h2 className="mx-auto mt-4 max-w-3xl text-balance font-display text-3xl font-semibold md:text-5xl">
          Seu cão pode fazer parte desta corrente de cuidado
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-white/80">
          Converse com a equipe para tirar dúvidas sobre cães doadores, pacientes receptores e o
          funcionamento do banco.
        </p>
        <a
          href={whatsappLink(site.contact.whatsapp, "Olá, VeteLab! Gostaria de informações sobre o Banco de Sangue Canino.")}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonVariants({ variant: "secondary", size: "lg", className: "mt-7" })}
        >
          <MessageCircle className="h-5 w-5" /> Falar sobre o Banco de Sangue
        </a>
      </div>
    </section>
  );
}