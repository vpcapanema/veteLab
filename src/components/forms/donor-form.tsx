"use client";

import { useState } from "react";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import Link from "next/link";

import { CheckCircle2, HeartHandshake, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { Textarea } from "@/components/ui/textarea";

import { Select } from "@/components/ui/select";

import { Field } from "@/components/ui/field";

import { site } from "@/lib/data/site";

import { isStaticExport, whatsappLink } from "@/lib/utils";

import { donorSchema, type DonorInput } from "@/lib/validators/forms";

export function DonorForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const [errorMsg, setErrorMsg] = useState<string>();

  const {
    register,

    handleSubmit,

    reset,

    formState: { errors },
  } = useForm<DonorInput>({
    resolver: zodResolver(donorSchema),

    defaultValues: { city: "Sinop", petBloodType: "Não sei" },
  });

  async function onSubmit(data: DonorInput) {
    setStatus("loading");

    setErrorMsg(undefined);

    if (isStaticExport) {
      const message = [
        "Olá, VeteLab! Gostaria de cadastrar um possível doador de sangue.",
        "",
        `Responsável: ${data.tutorName}`,
        `Cidade: ${data.city}`,
        `E-mail: ${data.tutorEmail}`,
        `WhatsApp: ${data.tutorPhone}`,
        "",
        `Cão: ${data.petName}`,
        `Raça: ${data.petBreed || "SRD"}`,
        `Idade: ${data.petAge} anos`,
        `Peso: ${data.petWeight} kg`,
        `Tipo sanguíneo: ${data.petBloodType}`,
        `Observações: ${data.healthNotes || "Nenhuma"}`,
      ].join("\n");

      window.open(whatsappLink(site.contact.whatsapp, message), "_blank", "noopener,noreferrer");
      setStatus("success");
      reset();
      return;
    }

    try {
      const res = await fetch("/api/banco-de-sangue/doador", {
        method: "POST",

        headers: { "content-type": "application/json" },

        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));

        throw new Error(body.error ?? "Não foi possível enviar o cadastro.");
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
      <div className="rounded-xl border border-blood/30 bg-blood/5 p-6 text-center">
        <HeartHandshake className="mx-auto h-12 w-12 text-blood" />

        <h3 className="mt-3 text-xl font-semibold">
          {isStaticExport ? "Conversa aberta no WhatsApp!" : "Cadastro recebido!"}
        </h3>

        <p className="mt-2 text-sm text-muted-foreground">
          {isStaticExport
            ? "Revise os dados e toque em enviar para concluir o contato com nossa equipe."
            : "Nossa equipe entrará em contato para agendar a triagem e os exames pré-doação — sem custo para você."}
        </p>

        <CheckCircle2 className="mx-auto mt-4 h-6 w-6 text-primary" />

        {!isStaticExport && (
          <p className="mt-1 text-xs text-muted-foreground">Confirmação enviada para seu e-mail.</p>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      <fieldset className="space-y-4">
        <legend className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Tutor
        </legend>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label="Nome completo"
            htmlFor="tutorName"
            required
            error={errors.tutorName?.message}
          >
            <Input id="tutorName" autoComplete="name" {...register("tutorName")} />
          </Field>

          <Field label="Cidade" htmlFor="city" required error={errors.city?.message}>
            <Input id="city" autoComplete="address-level2" {...register("city")} />
          </Field>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="E-mail" htmlFor="tutorEmail" required error={errors.tutorEmail?.message}>
            <Input id="tutorEmail" type="email" autoComplete="email" {...register("tutorEmail")} />
          </Field>

          <Field
            label="WhatsApp"

            htmlFor="tutorPhone"

            required

            error={errors.tutorPhone?.message}

            hint="Formato (66) 90000-0000"
          >
            <Input id="tutorPhone" autoComplete="tel" {...register("tutorPhone")} />
          </Field>
        </div>
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Pet doador
        </legend>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Nome do pet" htmlFor="petName" required error={errors.petName?.message}>
            <Input id="petName" {...register("petName")} />
          </Field>

          <Field label="Raça" htmlFor="petBreed" error={errors.petBreed?.message}>
            <Input id="petBreed" placeholder="SRD, Labrador, etc." {...register("petBreed")} />
          </Field>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <Field label="Idade (anos)" htmlFor="petAge" required error={errors.petAge?.message}>
            <Input id="petAge" type="number" min={1} max={12} {...register("petAge")} />
          </Field>

          <Field
            label="Peso (kg)"

            htmlFor="petWeight"

            required

            error={errors.petWeight?.message}

            hint="Mínimo 25 kg"
          >
            <Input
              id="petWeight"

              type="number"

              step="0.1"

              min={25}

              max={90}

              {...register("petWeight")}
            />
          </Field>

          <Field
            label="Tipo sanguíneo"

            htmlFor="petBloodType"

            required

            error={errors.petBloodType?.message}
          >
            <Select id="petBloodType" {...register("petBloodType")}>
              <option>DEA 1+</option>

              <option>DEA 1-</option>

              <option>Não sei</option>
            </Select>
          </Field>
        </div>

        <Field
          label="Observações de saúde"

          htmlFor="healthNotes"

          hint="Doenças anteriores, medicações atuais, alergias etc."

          error={errors.healthNotes?.message}
        >
          <Textarea id="healthNotes" rows={4} {...register("healthNotes")} />
        </Field>
      </fieldset>

      <label className="flex items-start gap-2 text-sm text-muted-foreground">
        <input
          type="checkbox"

          className="mt-1 h-4 w-4 rounded border-input"

          {...register("vaccinesUpToDate")}
        />

        <span>Declaro que meu pet está com vacinas e vermifugação em dia.</span>
      </label>

      {errors.vaccinesUpToDate?.message && (
        <p className="text-xs font-medium text-destructive">{errors.vaccinesUpToDate.message}</p>
      )}

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
          e autorizo o contato do Banco de Sangue Canino VeteLab.
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

      <Button
        type="submit"
        size="lg"
        variant="blood"
        className="mx-auto flex h-auto min-h-12 w-full whitespace-normal py-3 text-center sm:w-auto"
        disabled={status === "loading"}
      >
        {status === "loading" && <Loader2 className="h-4 w-4 animate-spin" />}
        Cadastrar meu cão como possível doador
      </Button>
    </form>
  );
}
