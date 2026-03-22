import React from "react";
import { Helmet } from "react-helmet";

const BASE_URL = "https://codeblackwell.ai";

function PageHelmet({ title, description, path }) {
  const fullTitle = `${title} | LeChristopher Blackwell`;
  const url = `${BASE_URL}${path}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
    </Helmet>
  );
}

export default PageHelmet;
