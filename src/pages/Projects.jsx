import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import { CTA } from "../components";
import { projects } from "../constants";
import { arrow } from "../assets/icons";

const Projects = () => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [activeProjectIndex, setActiveProjectIndex] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const openLightbox = (project, imageIdx) => {
    const projIndex = projects.findIndex((p) => p.name === project.name);
    if (projIndex === -1) return;
    setActiveProjectIndex(projIndex);
    setActiveImageIndex(imageIdx ?? 0);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => setIsLightboxOpen(false);

  const showPrev = () => {
    if (activeProjectIndex === null) return;
    const total = projects[activeProjectIndex].images?.length || 0;
    setActiveImageIndex((prev) => (prev - 1 + total) % total);
  };

  const showNext = () => {
    if (activeProjectIndex === null) return;
    const total = projects[activeProjectIndex].images?.length || 0;
    setActiveImageIndex((prev) => (prev + 1) % total);
  };

  useEffect(() => {
    if (!isLightboxOpen) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isLightboxOpen]);

  return (
    <section className="max-container">
      <h1 className="head-text">
        My <span className="blue-gradient_text drop-shadow font-semibold">Projects</span>
      </h1>

      <p className="text-slate-500 mt-2 leading-relaxed">
        The projects that I display are projects that I made myself when I was in college, actually I still have some projects that I have made, but because the project is related to work, I cannot display the project because it is private
        and violates the code of ethics if I display it to the public.
      </p>

      <div className="flex flex-wrap my-20 gap-16">
        {projects.map((project) => (
          <div className="lg:w-[400px] w-full" key={project.name}>
            {project?.images?.length > 0 && (
              <button className="group relative mt-2 h-40 w-full overflow-hidden rounded-xl ring-1 ring-slate-200 hover:shadow" onClick={() => openLightbox(project, 0)}>
                <img src={project.images[0]} alt={`${project.name} cover`} className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
              </button>
            )}

            <div className="mt-5 flex flex-col">
              <h4 className="text-2xl font-poppins font-semibold">{project.name}</h4>
              <p className="mt-2 text-slate-500">{project.description}</p>
              {project?.images?.length > 0 && (
                <div className="mt-5 grid grid-cols-3 gap-2">
                  {project.images.slice(0, 6).map((img, idx) => (
                    <button key={idx} className="group relative aspect-square overflow-hidden rounded-lg ring-1 ring-slate-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500" onClick={() => openLightbox(project, idx)}>
                      <img src={img} alt={`${project.name} ${idx + 1}`} className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105" />
                    </button>
                  ))}
                </div>
              )}
              {project.link && (
                <div className="mt-5 flex items-center gap-2 font-poppins">
                  <Link to={project.link} target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-600">
                    Live Link
                  </Link>
                  <img src={arrow} alt="arrow" className="w-4 h-4 object-contain" />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <hr className="border-slate-200" />

      <CTA />

      {isLightboxOpen && activeProjectIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/70" onClick={closeLightbox} />
          <div className="relative z-10 mx-4 w-full max-w-7xl">
            <div className="relative rounded-xl bg-white p-4 shadow-2xl">
              <button aria-label="Close" onClick={closeLightbox} className="absolute right-3 top-3 rounded-md bg-white/80 px-3 py-1 text-sm font-medium text-slate-700 shadow hover:bg-white">
                Close
              </button>
              <div className="relative grid grid-cols-1 gap-4 md:grid-cols-[1fr_260px]">
                <div className="relative">
                  <img
                    key={`${activeProjectIndex}-${activeImageIndex}`}
                    src={projects[activeProjectIndex].images[activeImageIndex]}
                    alt={`${projects[activeProjectIndex].name} preview`}
                    className="h-[75vh] w-full rounded-lg object-contain bg-slate-50 animate-fade-in-zoom"
                  />
                  <button aria-label="Previous" onClick={showPrev} className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 px-3 py-2 text-slate-700 shadow hover:bg-white">
                    ‹
                  </button>
                  <button aria-label="Next" onClick={showNext} className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 px-3 py-2 text-slate-700 shadow hover:bg-white">
                    ›
                  </button>
                </div>
                <div className="grid max-h-[75vh] grid-cols-2 gap-3 overflow-y-auto md:grid-cols-1">
                  {projects[activeProjectIndex].images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative aspect-[4/3] overflow-hidden rounded-md ring-2 transition-shadow hover:shadow ${idx === activeImageIndex ? "ring-blue-500" : "ring-transparent"}`}
                    >
                      <img src={img} alt={`${projects[activeProjectIndex].name} ${idx + 1}`} className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
