import React, { useState } from "react";
import { itconvert, pkm, pekanit, nwdc, ftj, nbpc, fesmaro, unisnu } from "../assets/images";

const Certificate = () => {
  const listCertificate = [
    {
      title: "Best Graduate UNISNU Jepara",
      subtitle: "UNISNU Jepara",
      image: unisnu,
      date: "03 July 2025",
    },
    {
      title: "2rd Place in Game & Software Development Competition",
      subtitle: "FESMARO 2025, University of Malang (UM)",
      image: fesmaro,
      date: "21 Apr 2024",
    },
    {
      title: "3rd Place in Software Development Competition",
      subtitle: "ITConvert, University of Jember (UNEJ)",
      image: itconvert,
      date: "28 Sept 2024",
    },
    {
      title: "2nd Place in Software Development Competition",
      subtitle: "PekanIT (UNSIKA) 2024",
      image: pekanit,
      date: "21 July 2024",
    },
    {
      title: "2nd Place in NBPC 2024",
      subtitle: "Pusat Kewirausahaan LPPI UNISNU",
      image: nbpc,
      date: "08 August 2024",
    },
    {
      title: "Secured Funding from PKM -KC",
      subtitle: "Kemendikbud RI",
      image: pkm,
      date: "March - Aug 2024",
    },
    {
      title: "1st Place in Web Programming Competition",
      subtitle: "Festival Teknologi Jateng 2023",
      image: ftj,
      date: "November 2023",
    },
    {
      title: "1st Place in Web Design Competition",
      subtitle: "Nastional Web Design Competition 2023 HMPSIF",
      image: nwdc,
      date: "November 2023",
    },
  ];

  // preview: { image, title, idx }
  const [preview, setPreview] = useState(null);

  const handlePrev = () => {
    if (!preview) return;
    const prevIdx = (preview.idx - 1 + listCertificate.length) % listCertificate.length;
    const cert = listCertificate[prevIdx];
    setPreview({ image: cert.image, title: cert.title, idx: prevIdx });
  };

  const handleNext = () => {
    if (!preview) return;
    const nextIdx = (preview.idx + 1) % listCertificate.length;
    const cert = listCertificate[nextIdx];
    setPreview({ image: cert.image, title: cert.title, idx: nextIdx });
  };

  return (
    <section className="max-container">
      <h2 className="head-text blue-gradient_text ">Achievement</h2>

      <div className="flex flex-col gap-10">
        {listCertificate.map((cert, idx) => (
          <div key={idx} className="w-full  glassmorphism overflow-hidden relative group transition-transform duration-300 hover:scale-[1.01]" style={{ minHeight: 320 }}>
            <div className="relative w-full  flex items-center justify-center overflow-hidden cursor-pointer" onClick={() => setPreview({ image: cert.image, title: cert.title, idx })} title="Klik untuk preview penuh">
              <img src={cert.image} alt={cert.title} className="object-contain w-full h-full transition-transform duration-300 group-hover:scale-105" loading="lazy" />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-6 flex flex-col gap-1">
                <h3 className="text-2xl sm:text-3xl font-bold text-white drop-shadow mb-1">{cert.title}</h3>
                <p className="text-lg sm:text-xl text-slate-100 font-medium drop-shadow mb-1">{cert.subtitle}</p>
                <div className="flex items-center gap-2 text-slate-200 text-base font-semibold drop-shadow">
                  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" className="inline-block text-blue-300">
                    <path d="M8 7V3m8 4V3M3 11.5A8.38 8.38 0 0 1 12 7c2.21 0 4.21.86 5.66 2.26A8.38 8.38 0 0 1 21 11.5c0 4.42-3.58 8-8 8s-8-3.58-8-8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 14v-3h2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {cert.date}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Preview */}
      {preview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fadein" onClick={() => setPreview(null)}>
          <div className="relative w-full h-full flex flex-col items-center justify-center px-0" onClick={(e) => e.stopPropagation()}>
            {/* Prev Button */}
            <button className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white rounded-full p-3 text-2xl z-10 transition-colors" onClick={handlePrev} aria-label="Sebelumnya" style={{ minWidth: 48 }}>
              &#8592;
            </button>
            {/* Next Button */}
            <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white rounded-full p-3 text-2xl z-10 transition-colors" onClick={handleNext} aria-label="Selanjutnya" style={{ minWidth: 48 }}>
              &#8594;
            </button>
            {/* Close Button */}
            <button className="absolute top-4 right-6 bg-black/60 hover:bg-black/80 text-white rounded-full p-3 text-2xl z-10 transition-colors" onClick={() => setPreview(null)} aria-label="Close preview">
              &times;
            </button>
            <img src={preview.image} alt={preview.title} className="object-contain w-screen h-screen m-0 p-0 border-0" style={{ maxWidth: "100vw", maxHeight: "100vh", borderRadius: 0, background: "none" }} />
          </div>
        </div>
      )}
    </section>
  );
};

export default Certificate;
