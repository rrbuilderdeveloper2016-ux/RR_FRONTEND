import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight } from 'lucide-react';
import { projectsImage } from '../../data/initialData';
import { Button } from '../ui/Button';

export function ProjectCard({ project }) {
  return (
    <article className="group overflow-hidden rounded-sm border border-border bg-card shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-card-hover">
      <div className={`relative h-56 overflow-hidden ${project.crop || 'crop-project-1'}`}>
        <img
          src={projectsImage}
          alt={project.name}
          className="crop-project-image transition duration-500 group-hover:scale-[1.08]"
          loading="lazy"
        />
        <span className="absolute left-3 top-3 rounded-sm bg-primary px-2.5 py-1 text-[11px] font-bold text-hero-foreground shadow">
          {project.status}
        </span>
      </div>

      <div className="p-5">
        <p className="text-xs font-bold tracking-wider uppercase text-accent-strong">
          {project.category}
        </p>
        <h3 className="mt-1 font-display text-xl font-bold text-primary group-hover:text-accent-strong transition">
          {project.name}
        </h3>
        <p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
          <MapPin className="h-3.5 w-3.5 text-primary shrink-0" />
          {project.location}
        </p>
        <p className="mt-3 text-xs leading-5 text-muted-foreground line-clamp-2">
          {project.description}
        </p>

        <div className="mt-4 border-t border-border pt-4">
          <p className="text-xs text-muted-foreground font-medium">{project.type}</p>
          <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
            <strong className="text-sm font-bold text-primary">{project.price}</strong>
            <Link to={`/projects/${project.id}`}>
              <Button variant="navy" size="sm">
                View Project <ArrowRight className="h-3.5 w-3.5 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
