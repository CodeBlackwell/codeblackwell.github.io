import React from "react";
import { Helmet } from "react-helmet";
import {
  greeting,
  seo,
  socialMediaLinks,
  experience,
  contactPageData,
  certifications,
} from "../../portfolio.js";

const BASE_URL = "https://codeblackwell.ai";

function SeoHeader() {
  let sameAs = [];
  socialMediaLinks
    .filter((media) => !(media.link.startsWith("tel") || media.link.startsWith("mailto")))
    .forEach((media) => {
      sameAs.push(media.link);
    });

  let mail = socialMediaLinks
    .find((media) => media.link.startsWith("mailto"))
    .link.substring("mailto:".length);
  let job = experience.sections?.find((section) => section.work)?.experiences?.at(0);

  let credentials = [];
  certifications.certifications.forEach((certification) => {
    credentials.push({
      "@context": "https://schema.org",
      "@type": "EducationalOccupationalCredential",
      url: certification.certificate_link,
      name: certification.title,
      description: certification.subtitle,
    });
  });

  const personData = {
    "@context": "https://schema.org/",
    "@type": "Person",
    name: greeting.title,
    url: BASE_URL,
    email: mail,
    telephone: contactPageData.phoneSection?.subtitle,
    sameAs: sameAs,
    jobTitle: job.title,
    worksFor: {
      "@type": "Organization",
      name: job.company,
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: contactPageData.addressSection?.locality,
      addressRegion: contactPageData.addressSection?.region,
      addressCountry: contactPageData.addressSection?.country,
      postalCode: contactPageData.addressSection?.postalCode,
      streetAddress: contactPageData.addressSection?.streetAddress,
    },
    hasCredential: credentials,
  };

  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "LeChristopher Blackwell Portfolio",
    url: BASE_URL,
    description: seo.description,
    author: {
      "@type": "Person",
      name: greeting.title,
    },
  };

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${BASE_URL}/home` },
      { "@type": "ListItem", position: 2, name: "Experience", item: `${BASE_URL}/experience` },
      { "@type": "ListItem", position: 3, name: "Education", item: `${BASE_URL}/education` },
      { "@type": "ListItem", position: 4, name: "Projects", item: `${BASE_URL}/projects` },
      { "@type": "ListItem", position: 5, name: "Beyond The Keys", item: `${BASE_URL}/beyond` },
      { "@type": "ListItem", position: 6, name: "Contact", item: `${BASE_URL}/contact` },
    ],
  };

  return (
    <Helmet>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta property="og:title" content={seo?.og?.title} />
      <meta property="og:type" content={seo?.og?.type} />
      <meta property="og:url" content={BASE_URL} />
      <script type="application/ld+json">{JSON.stringify(personData)}</script>
      <script type="application/ld+json">{JSON.stringify(websiteData)}</script>
      <script type="application/ld+json">{JSON.stringify(breadcrumbData)}</script>
    </Helmet>
  );
}

export default SeoHeader;
