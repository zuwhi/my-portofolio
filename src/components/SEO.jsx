import { Helmet } from "react-helmet-async";

const SITE_URL = "https://reihansaputra.vercel.app";
const DEFAULT_TITLE = "Reihan Saputra | Full-Stack Developer Portfolio";
const DEFAULT_DESC =
  "Portfolio Reihan Saputra — Full-Stack Developer spesialisasi Flutter, React, dan Laravel. Lihat project, prestasi, dan pengalaman saya.";
const DEFAULT_IMAGE = "/src/assets/images/unisnu.jpeg";
const DEFAULT_KEYWORDS =
  "Reihan Saputra, portfolio, full-stack developer, Flutter, React, Laravel, web developer, mobile developer, Jepara, Indonesia";

const SEO = ({
  title,
  description,
  image = DEFAULT_IMAGE,
  url,
  keywords,
  type = "website",
  publishedTime,
  children,
}) => {
  const pageTitle = title
    ? `${title} | Reihan Saputra`
    : DEFAULT_TITLE;
  const pageDesc = description || DEFAULT_DESC;
  const pageUrl = url ? `${SITE_URL}${url}` : SITE_URL;
  const pageKeywords = keywords || DEFAULT_KEYWORDS;
  const imageUrl = image.startsWith("http") ? image : `${SITE_URL}${image}`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{pageTitle}</title>
      <meta name="title" content={pageTitle} />
      <meta name="description" content={pageDesc} />
      <meta name="keywords" content={pageKeywords} />
      <meta name="author" content="Reihan Saputra" />
      <link rel="canonical" href={pageUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDesc} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:site_name" content="Reihan Saputra Portfolio" />
      <meta property="og:locale" content="id_ID" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={pageUrl} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDesc} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:creator" content="@reihansaputra" />

      {/* Article specific */}
      {publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}

      {/* Additional */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <meta name="theme-color" content="#0f172a" />

      {children}
    </Helmet>
  );
};

export default SEO;