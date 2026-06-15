import { Helmet } from "react-helmet-async";

const StructuredData = () => {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Reihan Saputra",
    givenName: "Reihan",
    familyName: "Saputra",
    url: "https://reihansaputra.vercel.app",
    image: "https://reihansaputra.vercel.app/src/assets/images/unisnu.jpeg",
    jobTitle: "Full-Stack Developer",
    description:
      "Full-Stack Developer spesialisasi Flutter, React, dan Laravel. Pemenang berbagai kompetisi pengembangan perangkat lunak dan web.",
    sameAs: [
      "https://github.com/zuwhi",
      "https://www.linkedin.com/in/reihan-saputra-498274282/",
      "https://wa.me/62895415005347",
    ],
    knowsAbout: [
      "Flutter",
      "React",
      "Laravel",
      "Node.js",
      "Next.js",
      "JavaScript",
      "TypeScript",
      "Appwrite",
      "Firebase",
      "Express.js",
      "Git",
      "Docker",
      "Tailwind CSS",
      "Figma",
      "UI/UX Design",
    ],
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Universitas Islam Nahdlatul Ulama (UNISNU) Jepara",
    },
    award: [
      "Best Graduate UNISNU Jepara 2025",
      "2nd Place FESMARO 2025 Game & Software Development",
      "3rd Place ITConvert 2024 Software Development",
      "2nd Place PekanIT 2024 Software Development",
      "2nd Place NBPC 2024",
      "1st Place FTJ 2023 Web Programming",
      "1st Place NWDC 2023 Web Design",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Reihan Saputra Portfolio",
    url: "https://reihansaputra.vercel.app",
    description:
      "Portfolio resmi Reihan Saputra — Full-Stack Developer. Menampilkan project, pengalaman, dan pencapaian di bidang pengembangan web dan mobile.",
    inLanguage: "id",
    publisher: {
      "@type": "Person",
      name: "Reihan Saputra",
    },
  };

  const portfolioSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Project Portfolio Reihan Saputra",
    description:
      "Kumpulan project aplikasi web dan mobile yang dikembangkan oleh Reihan Saputra menggunakan Flutter, React, Laravel, dan teknologi modern lainnya.",
    about: {
      "@type": "Person",
      name: "Reihan Saputra",
    },
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(personSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(websiteSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(portfolioSchema)}</script>
    </Helmet>
  );
};

export default StructuredData;