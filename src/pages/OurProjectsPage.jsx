import React, { useState, useEffect } from 'react';
import { Breadcrumb, PageHero } from '../components/common/Footer';
import { Button } from '../components/ui/Button';
import { ProjectCard } from '../components/cards/ProjectCard';
import { projectService } from '../services/projectService';
import { initialProjects } from '../data/initialData';

export function OurProjectsPage() {
  const filters = ['All', 'Residential', 'Commercial', 'Plots', 'Upcoming', 'Ongoing', 'Completed'];
  const [filter, setFilter] = useState('All');
  const [projects, setProjects] = useState(initialProjects);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const category = ['Residential', 'Commercial', 'Plots'].includes(filter) ? filter : undefined;
    const status = ['Upcoming', 'Ongoing', 'Completed'].includes(filter) ? filter : undefined;
    projectService.getAllProjects({ category, status }).then((data) => {
      setProjects(data);
      setLoading(false);
    });
  }, [filter]);

  return (
    <>
      <Breadcrumb current="Our Projects" />
      <PageHero
        eyebrow="RR BUILDER &amp; DEVELOPER"
        title="Our Projects in Indore"
        description="Discover thoughtfully planned residential, commercial and plotted developments across Indore’s most promising growth corridors."
      />

      <section className="py-14">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-none" role="tablist" aria-label="Project filters">
            {filters.map((item) => (
              <Button
                key={item}
                type="button"
                variant={filter === item ? 'gold' : 'outline'}
                size="sm"
                onClick={() => setFilter(item)}
              >
                {item}
              </Button>
            ))}
          </div>

          {loading ? (
            <div className="py-20 text-center text-muted-foreground">Loading projects...</div>
          ) : projects.length === 0 ? (
            <div className="py-20 text-center text-muted-foreground">
              No projects match the selected category.
            </div>
          ) : (
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
