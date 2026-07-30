import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="container flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
      <p className="text-6xl font-bold text-primary">404</p>

      <h1 className="mt-4 text-2xl font-bold tracking-tight">Página não encontrada</h1>

      <p className="mt-2 text-muted-foreground">
        O endereço que você tentou acessar não existe ou foi movido.
      </p>

      <Link href="/" className={buttonVariants({ className: "mt-6" })}>
        Voltar ao início
      </Link>
    </section>
  );
}
