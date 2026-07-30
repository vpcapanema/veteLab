export const bloodBank = {
  brandName: "Banco de Sangue Canino VeteLab",
  tagline: "Banco de Sangue Canino VeteLab",
  mission: "Apoiar o atendimento de cães que necessitam de transfusão sanguínea.",
  storyLead:
    "Para informações sobre doação, recebimento e disponibilidade, fale diretamente com a equipe do VeteLab.",
  metrics: [] as { label: string; value: string; hint: string }[],
  donorCriteria: [] as string[],
  donationSteps: [] as { title: string; body: string }[],
  recipientSteps: [] as { title: string; body: string }[],
} as const;
