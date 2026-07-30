import { site } from "@/lib/data/site";

export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": ["VeterinaryCare", "MedicalOrganization", "LocalBusiness"],
    name: site.fullName,
    alternateName: site.name,
    description: site.description,
    url: site.url,
    telephone: `+55${site.contact.phoneDigits}`,
    email: site.contact.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.city,
      addressRegion: site.state,
      addressCountry: "BR",
      postalCode: site.address.zip,
    },
    sameAs: [site.social.instagram, site.social.facebook],
    department: [
      {
        "@type": "MedicalOrganization",
        name: "Banco de Sangue Canino VeteLab",
        description: "Banco de Sangue Canino VeteLab.",
      },
    ],
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
