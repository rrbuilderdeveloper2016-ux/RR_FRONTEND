import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  MapPin, 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  X, 
  Camera, 
  Video, 
  Sparkles,
  Play
} from "lucide-react";
import { projectsImage, amenities } from "../data/initialData";
import { projectService } from "../services/projectService";
import { Breadcrumb, SectionHeading } from "../components/common/Footer";
import { EnquiryForm } from "../components/forms/EnquiryForm";
import { Button } from "../components/ui/Button";
import { trackViewContent } from "../utils/metaPixel";

export function ProjectDetailPage() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("photos"); // "photos" | "video"
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);

  useEffect(() => {
    projectService
      .getProjectById(id)
      .then((data) => {
        setProject(data);
        setLoading(false);
        if (data) {
          trackViewContent(data);
        }
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  // Lightbox keyboard navigation
  useEffect(() => {
    if (!isLightboxOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setIsLightboxOpen(false);
      if (e.key === "ArrowLeft") prevMedia();
      if (e.key === "ArrowRight") nextMedia();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  if (loading) {
    return (
      <div className="py-24 text-center text-muted-foreground">
        Loading project details...
      </div>
    );
  }

  if (!project) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <h1 className="font-display text-4xl font-bold text-primary">Project Not Found</h1>
        <p className="mt-3 text-muted-foreground">The requested project is unavailable.</p>
        <Link to="/our-projects" className="mt-6 inline-block">
          <Button variant="gold">Browse All Projects</Button>
        </Link>
      </div>
    );
  }

  // Media list resolution
  const mediaList = project.images && project.images.length > 0
    ? project.images
    : [project.image || projectsImage];

  const prevMedia = () => {
    setActiveMediaIndex((prev) => (prev === 0 ? mediaList.length - 1 : prev - 1));
  };

  const nextMedia = () => {
    setActiveMediaIndex((prev) => (prev === mediaList.length - 1 ? 0 : prev + 1));
  };

  const videoList = project.videos && project.videos.length > 0
    ? project.videos
    : (project.video ? [project.video] : []);
  const hasVideo = videoList.length > 0;

  return (
    <>
      <Breadcrumb current={project.name} />

      {/* 1. Sleek Royal Navy Header (Clean & Solid - NO stretched background) */}
      <section className="relative overflow-hidden bg-gradient-to-r from-primary via-[#0c2340] to-primary py-10 lg:py-14 text-hero-foreground border-b border-border/20">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="rounded-full bg-accent/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent border border-accent/30">
                  {project.status}
                </span>
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-hero-foreground">
                  {project.category}
                </span>
                {project.type && (
                  <span className="text-xs text-hero-muted font-medium">
                    · {project.type}
                  </span>
                )}
              </div>

              <h1 className="mt-3 font-display text-3xl font-bold sm:text-4xl lg:text-5xl text-hero-foreground tracking-tight">
                {project.name}
              </h1>

              <p className="mt-3 flex items-center gap-2 text-sm text-hero-muted">
                <MapPin className="h-4 w-4 text-accent shrink-0" />
                <span>{project.location}</span>
              </p>
            </div>

            {project.price && (
              <div className="border-t border-white/10 pt-4 md:border-t-0 md:pt-0 md:text-right">
                <p className="text-xs text-hero-muted uppercase tracking-wider">Investment / Starting At</p>
                <p className="mt-1 text-2xl font-bold text-accent sm:text-3xl">{project.price}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 2. Main Body with Dedicated Media Showcase & Overview */}
      <section className="py-12 bg-background">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">

          {/* Interactive Gallery Showcase */}
          <div className="mb-12 rounded-xl border border-border bg-card p-4 sm:p-6 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTab("photos")}
                  className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-bold uppercase tracking-wider transition ${
                    activeTab === "photos"
                      ? "bg-primary text-hero-foreground shadow-sm"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  <Camera className="h-3.5 w-3.5" />
                  Site Photos ({mediaList.length})
                </button>

                {hasVideo && (
                  <button
                    type="button"
                    onClick={() => setActiveTab("video")}
                    className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-bold uppercase tracking-wider transition ${
                      activeTab === "video"
                        ? "bg-primary text-hero-foreground shadow-sm"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    <Video className="h-3.5 w-3.5" />
                    Site Videos ({videoList.length})
                  </button>
                )}
              </div>

              <span className="flex items-center gap-1.5 text-xs font-medium text-accent-strong">
                <Sparkles className="h-3.5 w-3.5" />
                Verified Site Execution
              </span>
            </div>

            {/* Stage: Photos View */}
            {activeTab === "photos" && (
              <div>
                <div className="group relative flex items-center justify-center overflow-hidden rounded-lg bg-neutral-900 h-[380px] sm:h-[480px] lg:h-[540px]">
                  <img
                    src={mediaList[activeMediaIndex]}
                    alt={`${project.name} - View ${activeMediaIndex + 1}`}
                    onClick={() => setIsLightboxOpen(true)}
                    className="h-full w-full object-contain cursor-zoom-in transition-transform duration-300 group-hover:scale-[1.01]"
                  />

                  {/* Top Overlay Badge */}
                  <div className="absolute top-4 left-4 rounded-full bg-black/60 backdrop-blur-md px-3.5 py-1 text-xs font-semibold text-white shadow-md border border-white/10 flex items-center gap-1.5">
                    <Camera className="h-3.5 w-3.5 text-accent" />
                    {project.status === "Ongoing" ? "Architectural Elevation Concept" : "Actual Construction Site Photo"}
                  </div>

                  {/* Top Right Zoom Button */}
                  <button
                    type="button"
                    onClick={() => setIsLightboxOpen(true)}
                    className="absolute top-4 right-4 rounded-full bg-black/60 backdrop-blur-md p-2.5 text-white hover:bg-black/90 transition border border-white/10 shadow-md group-hover:scale-110"
                    title="Click to Zoom / Fullscreen"
                  >
                    <Maximize2 className="h-4 w-4" />
                  </button>

                  {/* Prev / Next Navigation Arrows */}
                  {mediaList.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={prevMedia}
                        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/60 backdrop-blur-md p-3 text-white hover:bg-black/90 transition border border-white/10 shadow-md"
                        aria-label="Previous Image"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      <button
                        type="button"
                        onClick={nextMedia}
                        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/60 backdrop-blur-md p-3 text-white hover:bg-black/90 transition border border-white/10 shadow-md"
                        aria-label="Next Image"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>

                      {/* Counter Badge */}
                      <div className="absolute bottom-4 right-4 rounded-full bg-black/70 backdrop-blur-md px-3 py-1 text-xs font-semibold text-white">
                        {activeMediaIndex + 1} / {mediaList.length}
                      </div>
                    </>
                  )}
                </div>

                {/* Thumbnails Row */}
                {mediaList.length > 1 && (
                  <div className="mt-4 flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
                    {mediaList.map((src, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setActiveMediaIndex(idx)}
                        className={`relative h-20 w-28 shrink-0 overflow-hidden rounded-md border-2 transition ${
                          activeMediaIndex === idx
                            ? "border-accent ring-2 ring-accent/30"
                            : "border-transparent opacity-60 hover:opacity-100"
                        }`}
                      >
                        <img
                          src={src}
                          alt={`Thumbnail ${idx + 1}`}
                          className="h-full w-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Stage: Video View */}
            {activeTab === "video" && hasVideo && (
              <div>
                <div className="relative overflow-hidden rounded-lg bg-neutral-950 h-[380px] sm:h-[480px] lg:h-[540px] flex items-center justify-center border border-border/40">
                  {videoList[activeVideoIndex]?.includes("youtube.com") || videoList[activeVideoIndex]?.includes("youtu.be") ? (
                    <iframe
                      src={videoList[activeVideoIndex]}
                      title="Project Video Walkthrough"
                      className="h-full w-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <video
                      key={videoList[activeVideoIndex]}
                      src={videoList[activeVideoIndex]}
                      controls
                      playsInline
                      preload="metadata"
                      onPlay={(e) => { e.currentTarget.volume = 0.55; }}
                      className="h-full w-full object-contain rounded-lg"
                    />
                  )}

                  {/* Top-Left Floating Badge */}
                  <div className="absolute top-4 left-4 rounded-full bg-black/70 backdrop-blur-md px-3.5 py-1 text-xs font-semibold text-white shadow-md border border-white/10 flex items-center gap-1.5">
                    <Video className="h-3.5 w-3.5 text-accent" />
                    Site Walkthrough Video {activeVideoIndex + 1} of {videoList.length} • Soft Luxury BGM
                  </div>
                </div>

                {/* Clean Video Selector Buttons */}
                {videoList.length > 1 && (
                  <div className="mt-4 flex flex-wrap gap-2.5">
                    {videoList.map((src, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setActiveVideoIndex(idx)}
                        className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-xs font-semibold border-2 transition shadow-sm ${
                          activeVideoIndex === idx
                            ? "border-accent bg-accent/15 text-primary ring-2 ring-accent/30 font-bold"
                            : "border-border bg-card text-muted-foreground hover:border-accent/40 hover:text-primary"
                        }`}
                      >
                        <Play className="h-3.5 w-3.5 text-accent-strong shrink-0" />
                        <span>Site Video {idx + 1}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Grid: Left Content Details + Right Enquiry Form */}
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
            <div>
              <SectionHeading
                eyebrow="PROJECT OVERVIEW"
                title={project.overviewTitle || (project.category?.toLowerCase() === "commercial" ? "Designed for Better Hospitality & Business" : "Designed for Better Living")}
                description={project.description}
              />

              <div className="mt-10 space-y-10">
                <section>
                  <h3 className="font-display text-2xl font-bold text-primary">Overview</h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground whitespace-pre-line">
                    {project.overviewText || `${project.name} combines considered architecture, quality structural execution, and strategic road connectivity across Indore to generate enduring appreciation and pride of ownership.`}
                  </p>
                </section>

                {!project.hideAmenities && (project.amenities?.length > 0 || (!project.amenities && amenities.length > 0)) && (
                  <section>
                    <h3 className="font-display text-2xl font-bold text-primary">Amenities &amp; Features</h3>
                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      {(project.amenities && project.amenities.length > 0 ? project.amenities : amenities).map((item) => (
                        <p key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className="h-4 w-4 text-accent-strong shrink-0" />
                          {item}
                        </p>
                      ))}
                    </div>
                  </section>
                )}

                <section>
                  <h3 className="font-display text-2xl font-bold text-primary">Floor Plans &amp; Specifications</h3>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <div className="border border-border bg-muted/60 p-6 rounded-lg">
                      <strong className="text-primary block font-semibold text-base">Efficient Floor Layouts</strong>
                      <p className="mt-2 text-xs leading-5 text-muted-foreground whitespace-pre-line">
                        {project.floorLayoutText || "Bright rooms, cross-ventilation, functional circulation, and flexible family living areas."}
                      </p>
                    </div>
                    <div className="border border-border bg-muted/60 p-6 rounded-lg">
                      <strong className="text-primary block font-semibold text-base">Quality Materials</strong>
                      <p className="mt-2 text-xs leading-5 text-muted-foreground whitespace-pre-line">
                        {project.materialsText || "Earthquake-resistant RCC frame, premium vitrified tiles, branded CP fittings, and durable external acrylic paint."}
                      </p>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="font-display text-2xl font-bold text-primary">Location Advantages</h3>
                  <div className="mt-4 bg-primary p-6 text-hero-foreground rounded-lg shadow-sm">
                    <MapPin className="h-7 w-7 text-accent mb-2" />
                    <p className="text-sm text-hero-muted leading-6">
                      Conveniently positioned in {project.location} with immediate access to reputed educational institutions, premier healthcare centers, retail plazas, and arterial highway corridors.
                    </p>
                  </div>
                </section>

                <section>
                  <h3 className="font-display text-2xl font-bold text-primary">About RR Builder &amp; Developer</h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    With over a decade of continuous presence in Indore, RR Builder &amp; Developer has built an unshakeable reputation for on-time delivery, crystal clear titles, and customer-first support.
                  </p>
                </section>
              </div>
            </div>

            <aside className="lg:sticky lg:top-24 lg:self-start">
              <EnquiryForm
                title="Enquire About This Project"
                referenceId={project.id}
                referenceTitle={project.name}
                isProject={true}
              />
            </aside>
          </div>
        </div>
      </section>

      {/* 3. Full-Screen Interactive Lightbox Modal */}
      {isLightboxOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 animate-in fade-in duration-200"
          onClick={() => setIsLightboxOpen(false)}
        >
          {/* Top Bar with Details and Close Button */}
          <div 
            className="absolute top-4 left-4 right-4 flex items-center justify-between text-white z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <p className="text-sm font-bold text-white">{project.name}</p>
              <p className="text-xs text-neutral-400">
                Image {activeMediaIndex + 1} of {mediaList.length} · Press Esc to close
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsLightboxOpen(false)}
              className="rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition"
              aria-label="Close Lightbox"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Full High-Resolution Image Container */}
          <div 
            className="relative flex max-h-[85vh] max-w-[90vw] items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={mediaList[activeMediaIndex]}
              alt={`Full View - ${project.name}`}
              className="max-h-[85vh] max-w-[90vw] object-contain rounded-md shadow-2xl"
            />

            {mediaList.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={prevMedia}
                  className="absolute left-2 sm:-left-14 top-1/2 -translate-y-1/2 rounded-full bg-white/15 backdrop-blur-md p-3 text-white hover:bg-white/30 transition"
                  aria-label="Previous"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  type="button"
                  onClick={nextMedia}
                  className="absolute right-2 sm:-right-14 top-1/2 -translate-y-1/2 rounded-full bg-white/15 backdrop-blur-md p-3 text-white hover:bg-white/30 transition"
                  aria-label="Next"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
