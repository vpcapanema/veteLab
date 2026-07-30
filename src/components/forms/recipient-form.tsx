"use client";

import { useState } from "react";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import Link from "next/link";

import { CheckCircle2, LifeBuoy, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { Textarea } from "@/components/ui/textarea";

import { Select } from "@/components/ui/select";

import { Field } from "@/components/ui/field";

import { recipientSchema, type RecipientInput } from "@/lib/validators/forms";

export function RecipientForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const [errorMsg, setErrorMsg] = useState<string>();

  const {
    register,

    handleSubmit,

    reset,

    formState: { errors },
  } = useForm<RecipientInput>({
    resolver: zodResolver(recipientSchema),

    defaultValues: {
      city: "Sinop",

      petBloodType: "Não sei",

      urgency: "Urgente (72h)",
    },
  });

  async function onSubmit(data: RecipientInput) {
    setStatus("loading");

    setErrorMsg(undefined);

    try {
      const res = await fetch("/api/banco-de-sangue/receptor", {
        method: "POST",

        headers: { "content-type": "application/json" },

        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));

        throw new Error(body.error ?? "Não foi possível enviar a solicitação.");
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
        <LifeBuoy className="mx-auto h-12 w-12 text-blood" />

        <h3 className="mt-3 text-xl font-semibold">Solicitação recebida!</h3>

        <p className="mt-2 text-sm text-muted-foreground">
          Nossa equipe verificará compatibilidade e disponibilidade e entrará em contato com você e
          com o veterinário responsável o mais rápido possível.
        </p>

        <CheckCircle2 className="mx-auto mt-4 h-6 w-6 text-primary" />
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

          <Field label="WhatsApp" htmlFor="tutorPhone" required error={errors.tutorPhone?.message}>
            <Input id="tutorPhone" autoComplete="tel" {...register("tutorPhone")} />
          </Field>
        </div>
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Pet receptor
        </legend>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Nome do pet" htmlFor="petName" required error={errors.petName?.message}>
            <Input id="petName" {...register("petName")} />
          </Field>

          <Field label="Raça" htmlFor="petBreed" error={errors.petBreed?.message}>
            <Input id="petBreed" {...register("petBreed")} />
          </Field>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <Field label="Idade (anos)" htmlFor="petAge" required error={errors.petAge?.message}>
            <Input id="petAge" type="number" step="0.1" min={0} max={25} {...register("petAge")} />
          </Field>

          <Field label="Peso (kg)" htmlFor="petWeight" required error={errors.petWeight?.message}>
            <Input
              id="petWeight"

              type="number"

              step="0.1"

              min={0.5}

              max={90}

              {...register("petWeight")}
            />
          </Field>

          <Field
            label="Tipo sanguíneo necessário"

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

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Urgência" htmlFor="urgency" required error={errors.urgency?.message}>
            <Select id="urgency" {...register("urgency")}>
              <option>Emergencial (24h)</option>

              <option>Urgente (72h)</option>

              <option>Programado (semana)</option>
            </Select>
          </Field>
        </div>

        <Field
          label="Motivo da necessidade"

          htmlFor="reason"

          required

          error={errors.reason?.message}

          hint="Ex.: cirurgia de emergência, anemia grave por hemoparasitose, trauma."
        >
          <Textarea id="reason" rows={4} {...register("reason")} />
        </Field>
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Clínica e veterinário responsável
        </legend>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label="Clínica veterinária"

            htmlFor="clinicName"

            required

            error={errors.clinicName?.message}
          >
            <Input id="clinicName" {...register("clinicName")} />
          </Field>

          <Field
            label="Veterinário responsável"

            htmlFor="veterinarianName"

            required

            error={errors.veterinarianName?.message}
          >
            <Input id="veterinarianName" {...register("veterinarianName")} />
          </Field>
        </div>

        <Field
          label="CRMV do veterinário"

          htmlFor="veterinarianCrmv"

          required

          error={errors.veterinarianCrmv?.message}
        >
          <Input
            id="veterinarianCrmv"
            placeholder="CRMV-MT 0000"
            {...register("veterinarianCrmv")}
          />
        </Field>
      </fieldset>

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

      <Button type="submit" size="lg" variant="blood" className="mx-auto flex" disabled={status === "loading"}>
        {status === "loading" && <Loader2 className="h-4 w-4 animate-spin" />}
        Enviar solicitação para o cão
      </Button>
    </form>
  );
}
