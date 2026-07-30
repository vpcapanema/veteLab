// Informações institucionais conferidas nas capturas da página oficial do Facebook.
export const site = {
  name: "VeteLab",
  fullName: "Vetelab Laboratório Veterinário",
  tagline: "Serviços laboratoriais veterinários em Sinop e região",
  description:
    "O VeteLab chegou a Sinop com o propósito de oferecer serviço laboratorial de qualidade. A empresa é composta por médicos-veterinários com experiência em análises clínicas e diagnóstico.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://vetelabsinop.com.br",
  locale: "pt-BR",
  city: "Sinop",
  state: "MT",
  address: {
    street: "Rua das Magnólias, 58, sala 1",
    neighborhood: "",
    zip: "78550-102",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Rua+das+Magnolias+58+sala+1+Sinop+MT+78550-102",
  },
  contact: {
    email: "vetelabsinop@hotmail.com",
    phone: "(66) 3532-6204",
    phoneDigits: "6635326204",
    whatsappDisplay: "(66) 99965-4841",
    whatsapp: "66999654841",
    hours: "Consulte o horário de atendimento por telefone ou WhatsApp.",
  },
  social: {
    instagram: "https://www.instagram.com/vetelabsinop",
    instagramHandle: "@vetelabsinop",
    facebook: "https://www.facebook.com/vetelabsinop",
  },
  institutional: {
    mission:
      "Realizar serviços laboratoriais de qualidade que correspondam às necessidades dos médicos-veterinários de Sinop e região.",
    objective:
      "Ser um laboratório reconhecido pela precisão e credibilidade dos resultados e por contribuir com a qualidade de vida das pessoas e dos animais.",
    vision: "Ser o laboratório de primeira escolha do médico-veterinário e produtor rural.",
  },
  legal: { companyName: "Vetelab Laboratório Veterinário" },
} as const;
export type SiteConfig = typeof site;
