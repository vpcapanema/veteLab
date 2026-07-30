import Link from "next/link";
import { Instagram, Facebook, Mail, Phone, MapPin, Clock } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { footerNav } from "@/components/layout/nav";
import { site } from "@/lib/data/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-secondary/30">
      <div className="container grid gap-8 py-10 md:grid-cols-4 md:py-12">
        <div className="space-y-3 md:col-span-1">
          <div className="text-primary">
            <Logo variant="full" className="h-12 w-auto" />
          </div>
          <p className="text-sm text-muted-foreground">{site.tagline}</p>
          <div className="flex items-center gap-3">
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram do VeteLab"
              className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-primary"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href={site.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook do VeteLab"
              className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-primary"
            >
              <Facebook className="h-5 w-5" />
            </a>
          </div>
        </div>

        <FooterColumn title="Institucional" items={footerNav.institucional} />
        <FooterColumn title="Banco de Sangue" items={footerNav.bancoDeSangue} accent="blood" />

        <div className="space-y-3">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground">Contato</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
              <a
                href={site.address.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground"
              >
                {site.address.street}, {site.city} — {site.state}, {site.address.zip}
              </a>
            </li>
            <li className="flex gap-2">
              <Phone className="mt-0.5 h-4 w-4 shrink-0" />
              <a href={`tel:+55${site.contact.phoneDigits}`} className="hover:text-foreground">
                {site.contact.phone}
              </a>
            </li>
            <li className="flex gap-2">
              <Mail className="mt-0.5 h-4 w-4 shrink-0" />
              <a href={`mailto:${site.contact.email}`} className="hover:text-foreground">
                {site.contact.email}
              </a>
            </li>
            <li className="flex gap-2">
              <Clock className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{site.contact.hours}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border/60">
        <div className="container flex flex-col items-center justify-between gap-3 py-5 text-xs text-muted-foreground md:flex-row">
          <p>
            © {new Date().getFullYear()} {site.legal.companyName}. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-4">
            {footerNav.legal.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-foreground">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  items,
  accent,
}: {
  title: string;
  items: readonly { label: string; href: string }[];
  accent?: "blood";
}) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground">{title}</h3>
      <ul className="space-y-2 text-sm">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={
                accent === "blood"
                  ? "text-muted-foreground hover:text-blood"
                  : "text-muted-foreground hover:text-foreground"
              }
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
