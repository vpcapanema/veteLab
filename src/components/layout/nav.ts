export interface NavItem {
  label: string;
  href: string;
  highlight?: "blood";
}

export const mainNav: NavItem[] = [
  { label: "Início", href: "/" },
  { label: "Sobre", href: "/sobre" },
  { label: "Serviços", href: "/servicos" },
  { label: "Banco de Sangue", href: "/banco-de-sangue", highlight: "blood" },
  { label: "Contato", href: "/contato" },
];

export const footerNav = {
  institucional: [
    { label: "Sobre o VeteLab", href: "/sobre" },
    { label: "Serviços", href: "/servicos" },
    { label: "Contato", href: "/contato" },
  ],
  bancoDeSangue: [
    { label: "A iniciativa", href: "/banco-de-sangue" },
    { label: "Como funciona", href: "/banco-de-sangue/como-funciona" },
    { label: "Cadastrar cão doador", href: "/banco-de-sangue/quero-doar" },
    { label: "Solicitar sangue para um cão", href: "/banco-de-sangue/preciso-receber" },
  ],
  legal: [
    { label: "Política de Privacidade", href: "/politica-de-privacidade" },
    { label: "Termos de Uso", href: "/termos-de-uso" },
  ],
} as const;
