import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, CheckCircle2 } from 'lucide-react';
import { projectsImage, amenities } from '../data/initialData';
import { projectService } from '../services/projectService';
import { Breadcrumb, SectionHeading } from '../components/common/Footer';
import { EnquiryForm } from '../components/forms/EnquiryForm';
import { Button } from '../components/ui/Button';

export function ProjectDetailPage() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    projectService
      .getProjectById(id)
      .then((data) => {
        setProject(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

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

  return (
    <>
      <Breadcrumb current={project.name} />

      {/* Banner */}
      <section className="relative isolate min-h-96 overflow-hidden bg-primary">
        <div className={`absolute inset-0 -z-20 ${project.crop || 'crop-project-1'}`}>
          <img src={projectsImage} alt={project.name} className="crop-project-image" />
        </div>
        <div className="absolute inset-0 -z-10 bg-cta-overlay" />
        <div className="mx-auto flex min-h-96 max-w-7xl items-end px-4 py-12 lg:px-6">
          <div className="text-hero-foreground">
            <p className="eyebrow">{project.status} · {project.category}</p>
            <h1 className="mt-2 font-display text-4xl font-bold sm:text-5xl">{project.name}</h1>
            <p className="mt-3 flex items-center gap-2 text-hero-muted text-sm">
              <MapPin className="h-4 w-4" />
              {project.location}
            </p>
            <p className="mt-4 text-2xl font-bold text-accent">{project.price}</p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-14">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 lg:grid-cols-[minmax(0,1fr)_360px] lg:px-6">
          <div>
            <SectionHeading
              eyebrow="PROJECT OVERVIEW"
              title="Designed for Better Living"
              description={project.description}
            />

            <div className="mt-10 space-y-10">
              <section>
                <h3 className="font-display text-2xl font-bold text-primary">Overview</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {project.name} combines considered architecture, quality structural execution, and strategic road connectivity across Indore to generate enduring appreciation and pride of ownership.
                </p>
              </section>

              <section>
                <h3 className="font-display text-2xl font-bold text-primary">Amenities &amp; Features</h3>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {amenities.map((item) => (
                    <p key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 text-accent-strong shrink-0" />
                      {item}
                    </p>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="font-display text-2xl font-bold text-primary">Floor Plans &amp; Specifications</h3>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div className="border border-border bg-muted p-6 rounded-sm">
                    <strong className="text-primary block font-semibold">Efficient Floor Layouts</strong>
                    <p className="mt-2 text-xs leading-5 text-muted-foreground">
                      Bright rooms, cross-ventilation, functional circulation, and flexible family living areas.
                    </p>
                  </div>
                  <div className="border border-border bg-muted p-6 rounded-sm">
                    <strong className="text-primary block font-semibold">Quality Materials</strong>
                    <p className="mt-2 text-xs leading-5 text-muted-foreground">
                      Earthquake-resistant RCC frame, premium vitrified tiles, branded CP fittings, and durable external acrylic paint.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="font-display text-2xl font-bold text-primary">Location Advantages</h3>
                <div className="mt-4 bg-primary p-6 text-hero-foreground rounded-sm">
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
      </section>
    </>
  );
}
