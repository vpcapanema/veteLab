export type ServiceCategory =
  | "hematologia"
  | "bioquimica"
  | "parasitologia"
  | "sorologia"
  | "citologia"
  | "hormonal"
  | "urinalise"
  | "microbiologia";

export interface Service {
  slug: string;

  name: string;

  category: ServiceCategory;

  shortDescription: string;

  description: string;

  preparation: string;

  deadlineDays: number;

  species: ("cão" | "gato" | "silvestre" | "grandes")[];
}

export const categoryLabels: Record<ServiceCategory, string> = {
  hematologia: "Hematologia",

  bioquimica: "Bioquímica",

  parasitologia: "Parasitologia",

  sorologia: "Sorologia",

  citologia: "Citologia",

  hormonal: "Hormonal",

  urinalise: "Urinálise",

  microbiologia: "Microbiologia",
};

// Catálogo placeholder — a irmã enviará a lista real com preços.

export const services: Service[] = [
  {
    slug: "hemograma-completo",

    name: "Hemograma completo",

    category: "hematologia",

    shortDescription: "Avaliação das células sanguíneas: hemácias, leucócitos e plaquetas.",

    description:
      "O hemograma é o exame de sangue mais solicitado na rotina clínica veterinária. Avalia anemias, infecções, inflamações, alterações de coagulação e a resposta do organismo a doenças em geral.",

    preparation: "Jejum não obrigatório. Manter o animal calmo antes da coleta.",

    deadlineDays: 1,

    species: ["cão", "gato"],
  },

  {
    slug: "perfil-bioquimico-basico",

    name: "Perfil bioquímico básico",

    category: "bioquimica",

    shortDescription: "Função hepática e renal em um só painel.",

    description:
      "Inclui ALT, AST, fosfatase alcalina, ureia e creatinina. Essencial em check-ups, pré-operatórios e monitoramento de pacientes crônicos.",

    preparation: "Jejum de 8 a 12 horas.",

    deadlineDays: 1,

    species: ["cão", "gato"],
  },

  {
    slug: "perfil-bioquimico-completo",

    name: "Perfil bioquímico completo",

    category: "bioquimica",

    shortDescription: "Painel ampliado com eletrólitos, proteínas e enzimas.",

    description:
      "Amplia o perfil básico com glicose, colesterol, triglicerídeos, proteína total, albumina, GGT e eletrólitos. Recomendado para investigação de doenças metabólicas e endócrinas.",

    preparation: "Jejum de 12 horas.",

    deadlineDays: 2,

    species: ["cão", "gato"],
  },

  {
    slug: "urinalise-tipo-i",

    name: "Urinálise tipo I (EAS)",

    category: "urinalise",

    shortDescription: "Exame físico, químico e sedimentoscopia da urina.",

    description:
      "Investiga infecções urinárias, cristalúrias, diabetes, doença renal e alterações metabólicas.",

    preparation: "Coleta preferencialmente por cistocentese ou primeira urina do dia.",

    deadlineDays: 1,

    species: ["cão", "gato"],
  },

  {
    slug: "coproparasitologico",

    name: "Coproparasitológico",

    category: "parasitologia",

    shortDescription: "Pesquisa de parasitas intestinais nas fezes.",

    description:
      "Detecta ovos, cistos e larvas de helmintos e protozoários. Indicado em quadros de diarreia, emagrecimento e como rotina preventiva.",

    preparation: "Coletar amostra fresca (até 6h). Ideal enviar 3 amostras em dias diferentes.",

    deadlineDays: 1,

    species: ["cão", "gato"],
  },

  {
    slug: "pesquisa-hemoparasitas",

    name: "Pesquisa de hemoparasitas",

    category: "parasitologia",

    shortDescription: "Detecção microscópica de parasitas no sangue.",

    description:
      "Pesquisa Babesia, Anaplasma, Ehrlichia e Mycoplasma. Complementa a sorologia em quadros suspeitos de doenças transmitidas por carrapatos.",

    preparation: "Nenhum preparo especial.",

    deadlineDays: 1,

    species: ["cão", "gato"],
  },

  {
    slug: "sorologia-erliquiose",

    name: "Sorologia — Erliquiose",

    category: "sorologia",

    shortDescription: "Detecção de anticorpos anti-Ehrlichia canis.",

    description:
      "Confirma exposição ao agente da erliquiose canina. Recomendado em quadros de trombocitopenia, uveíte, febre e emagrecimento.",

    preparation: "Nenhum preparo especial.",

    deadlineDays: 2,

    species: ["cão"],
  },

  {
    slug: "sorologia-leishmaniose",

    name: "Sorologia — Leishmaniose visceral canina",

    category: "sorologia",

    shortDescription: "Triagem sorológica para Leishmania infantum.",

    description:
      "Exame de triagem obrigatório em regiões endêmicas. Resultado positivo deve ser confirmado por teste complementar conforme diretrizes do MAPA.",

    preparation: "Nenhum preparo especial.",

    deadlineDays: 3,

    species: ["cão"],
  },

  {
    slug: "citologia-aspirativa",

    name: "Citologia aspirativa (PAAF)",

    category: "citologia",

    shortDescription: "Análise citológica de nódulos, linfonodos e massas.",

    description:
      "Auxilia no diagnóstico diferencial de neoplasias, processos inflamatórios e infecciosos.",

    preparation: "Amostra deve ser enviada em lâminas identificadas, dentro de 24h.",

    deadlineDays: 3,

    species: ["cão", "gato"],
  },

  {
    slug: "tipagem-sanguinea-canina",

    name: "Tipagem sanguínea canina (DEA 1)",

    category: "hematologia",

    shortDescription: "Identificação do antígeno DEA 1 para transfusão segura.",

    description:
      "Exame obrigatório antes de transfusões e para cadastro no Banco de Sangue Canino. Determina compatibilidade e reduz risco de reações transfusionais.",

    preparation: "Nenhum preparo especial. Coleta associada ao check-up de doador.",

    deadlineDays: 1,

    species: ["cão"],
  },

  {
    slug: "perfil-tireoidiano",

    name: "Perfil tireoidiano",

    category: "hormonal",

    shortDescription: "T4 total, T4 livre e TSH.",

    description:
      "Investigação de hipotireoidismo canino e hipertireoidismo felino, condições comuns e subdiagnosticadas.",

    preparation: "Jejum de 8 horas. Informar medicações em uso.",

    deadlineDays: 4,

    species: ["cão", "gato"],
  },

  {
    slug: "cultura-antibiograma",

    name: "Cultura e antibiograma",

    category: "microbiologia",

    shortDescription: "Identificação bacteriana com teste de sensibilidade.",

    description:
      "Guia a escolha do antibiótico mais eficaz para cada infecção. Aplicável a urina, secreções, feridas e otites.",

    preparation: "Coletar amostra antes do início do antibiótico.",

    deadlineDays: 5,

    species: ["cão", "gato"],
  },
];

export function getServiceBySlug(slug: string) {
  return services.find((s) => s.slug === slug);
}

export function getServicesByCategory() {
  const groups = new Map<ServiceCategory, Service[]>();

  for (const service of services) {
    const list = groups.get(service.category) ?? [];

    list.push(service);

    groups.set(service.category, list);
  }

  return groups;
}
