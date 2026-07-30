"use client";

import { useState } from "react";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import Link from "next/link";

import { CheckCircle2, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { Textarea } from "@/components/ui/textarea";

import { Field } from "@/components/ui/field";

import { site } from "@/lib/data/site";

import { isStaticExport, whatsappLink } from "@/lib/utils";

import { contactSchema, type ContactInput } from "@/lib/validators/forms";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const [errorMsg, setErrorMsg] = useState<string>();

  const {
    register,

    handleSubmit,

    reset,

    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),

    defaultValues: { name: "", email: "", phone: "", subject: "", message: "" },
  });

  async function onSubmit(data: ContactInput) {
    setStatus("loading");

    setErrorMsg(undefined);

    if (isStaticExport) {
      const message = [
        "Olá, VeteLab! Gostaria de entrar em contato.",
        "",
        `Nome: ${data.name}`,
        `E-mail: ${data.email}`,
        `Telefone: ${data.phone}`,
        `Assunto: ${data.subject}`,
        "",
        data.message,
      ].join("\n");

      window.open(whatsappLink(site.contact.whatsapp, message), "_blank", "noopener,noreferrer");
      setStatus("success");
      reset();
      return;
    }

    try {
      const res = await fetch("/api/contato", {
        method: "POST",

        headers: { "content-type": "application/json" },

        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));

        throw new Error(body.error ?? "Não foi possível enviar a mensagem.");
      }

      setStatus("success");

      reset();
    } catch (err) {
      setStatus("error");

      setErrorMsg(err instanceof Error ? err.message : "Erro inesperado.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-xl border border-primary/30 bg-primary/5 p-6 text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-primary" />

        <h3 className="mt-3 text-lg font-semibold">
          {isStaticExport ? "Conversa aberta no WhatsApp!" : "Mensagem enviada!"}
        </h3>

        <p className="mt-1 text-sm text-muted-foreground">
          {isStaticExport
            ? "Revise a mensagem e toque em enviar para falar com nossa equipe."
            : "Retornaremos em horário comercial. Enquanto isso, você também pode falar conosco pelo WhatsApp."}
        </p>

        <Button className="mt-4" variant="outline" onClick={() => setStatus("idle")}>
          Enviar outra mensagem
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Nome" htmlFor="name" required error={errors.name?.message}>
          <Input id="name" autoComplete="name" {...register("name")} />
        </Field>

        <Field label="E-mail" htmlFor="email" required error={errors.email?.message}>
          <Input id="email" type="email" autoComplete="email" {...register("email")} />
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label="Telefone / WhatsApp"

          htmlFor="phone"

          required

          error={errors.phone?.message}

          hint="Formato (66) 90000-0000"
        >
          <Input id="phone" autoComplete="tel" {...register("phone")} />
        </Field>

        <Field label="Assunto" htmlFor="subject" required error={errors.subject?.message}>
          <Input id="subject" {...register("subject")} />
        </Field>
      </div>

      <Field label="Mensagem" htmlFor="message" required error={errors.message?.message}>
        <Textarea id="message" rows={5} {...register("message")} />
      </Field>

      <label className="flex items-start gap-2 text-sm text-muted-foreground">
        <input
          type="checkbox"

          className="mt-1 h-4 w-4 rounded border-input"

          {...register("consent")}
        />

        <span>
          Li e aceito a{" "}
          <Link href="/politica-de-privacidade" className="text-primary hover:underline">
            política de privacidade
          </Link>{" "}
          e autorizo o VeteLab a entrar em contato.
        </span>
      </label>

      {errors.consent?.message && (
        <p className="text-xs font-medium text-destructive">{errors.consent.message}</p>
      )}

      {status === "error" && (
        <div className="rounded-md border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">
          {errorMsg}
        </div>
      )}

      <Button type="submit" size="lg" className="mx-auto flex" disabled={status === "loading"}>
        {status === "loading" && <Loader2 className="h-4 w-4 animate-spin" />}
        Enviar mensagem
      </Button>
    </form>
  );
}
