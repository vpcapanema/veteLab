"use client";

import Link from "next/link";
import { useState } from "react";
import { BookOpen, Menu, Phone, X } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { buttonVariants } from "@/components/ui/button";
import { mainNav } from "@/components/layout/nav";
import { cn, whatsappLink } from "@/lib/utils";
import { site } from "@/lib/data/site";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/85 backdrop-blur">
      <div className="container flex h-16 items-center justify-between gap-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-primary transition-opacity hover:opacity-80"
          aria-label={`${site.name} — página inicial`}
        >
          <Logo variant="full" className="h-10 w-auto" />
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Navegação principal">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium text-foreground/70 transition-colors hover:bg-secondary hover:text-foreground",
                item.highlight === "blood" && "text-blood hover:bg-blood/10 hover:text-blood",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <a
            href={whatsappLink(site.contact.whatsapp, `Olá! Vim pelo site do ${site.name}.`)}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({ variant: "ghost", size: "sm" })}
          >
            <Phone className="h-4 w-4" /> Falar com a equipe
          </a>
          <Link href="/servicos" className={buttonVariants({ size: "sm" })}>
            <BookOpen className="h-4 w-4" /> Catálogo
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border text-foreground md:hidden"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border/60 bg-background md:hidden">
          <nav className="container flex flex-col py-3" aria-label="Navegação móvel">
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-md px-3 py-3 text-base font-medium text-foreground/80 hover:bg-secondary",
                  item.highlight === "blood" && "text-blood hover:bg-blood/10",
                )}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-2 flex flex-col gap-2 border-t border-border/60 pt-3">
              <a
                href={whatsappLink(site.contact.whatsapp, `Olá! Vim pelo site do ${site.name}.`)}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonVariants({ variant: "outline" })}
              >
                <Phone className="h-4 w-4" /> WhatsApp
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
