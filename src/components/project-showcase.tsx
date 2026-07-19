"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight, ArrowUpLeft, ArrowUpRight } from "@phosphor-icons/react";
import { useState } from "react";
import type { CSSProperties } from "react";
import { projects, type Locale, type Project } from "@/data/portfolio";

type ProjectShowcaseProps = {
  locale: Locale;
  labels: {
    selectedWork: string;
    browseHint: string;
    visitProject: string;
    nextProject: string;
    previousProject: string;
  };
};

const showcaseProjects = projects.filter((project) => project.image);

function ProjectPreview({ project, priority = false }: { project: Project; priority?: boolean }) {
  return (
    <div className={`project-preview ${project.previewTone === "qattaa" ? "project-preview--mark" : ""}`}>
      <Image
        src={project.image!}
        alt=""
        fill
        priority={priority}
        sizes="(max-width: 760px) 84vw, 58vw"
        className="project-preview__image"
      />
    </div>
  );
}

export function ProjectShowcase({ locale, labels }: ProjectShowcaseProps) {
  const [selected, setSelected] = useState(0);
  const activeProject = showcaseProjects[selected];
  const OpenArrow = locale === "ar" ? ArrowUpLeft : ArrowUpRight;
  const PreviousArrow = locale === "ar" ? ArrowRight : ArrowLeft;
  const NextArrow = locale === "ar" ? ArrowLeft : ArrowRight;

  const ordered = showcaseProjects.map((_, offset) => ({
    project: showcaseProjects[(selected + offset) % showcaseProjects.length],
    offset,
  }));

  const selectPrevious = () => setSelected((current) => (current - 1 + showcaseProjects.length) % showcaseProjects.length);
  const selectNext = () => setSelected((current) => (current + 1) % showcaseProjects.length);

  return (
    <section id="work" className="work-showcase" aria-labelledby="work-heading">
      <h2 id="work-heading" className="sr-only">{labels.selectedWork}</h2>
      <div className="project-stack" aria-label={labels.selectedWork}>
        {ordered.slice(0, 4).reverse().map(({ project, offset }) => {
          const stackPosition = 3 - offset;
          const projectIndex = showcaseProjects.indexOf(project);
          const style = {
            "--stack-index": stackPosition,
            "--stack-offset": `${offset * 8.5}%`,
            "--stack-scale": 1 - offset * 0.055,
            "--stack-opacity": 1 - offset * 0.18,
          } as CSSProperties;

          if (offset === 0) {
            return (
              <a
                key={project.slug}
                className="project-sheet is-active"
                style={style}
                href={project.url}
                target="_blank"
                rel="noreferrer"
                aria-label={`${labels.visitProject}: ${project.title[locale]}`}
                aria-current="true"
              >
                <ProjectPreview project={project} priority />
              </a>
            );
          }

          return (
            <button
              key={project.slug}
              type="button"
              className="project-sheet"
              style={style}
              onClick={() => setSelected(projectIndex)}
              aria-label={`${labels.selectedWork}: ${project.title[locale]}`}
            >
              <ProjectPreview project={project} />
            </button>
          );
        })}
      </div>

      <div className="showcase-footer">
        <div className="showcase-controls">
          <button type="button" onClick={selectPrevious} aria-label={labels.previousProject}>
            <PreviousArrow aria-hidden="true" weight="light" />
          </button>
          <button type="button" onClick={selectNext} aria-label={labels.nextProject}>
            <NextArrow aria-hidden="true" weight="light" />
          </button>
          <span>{labels.browseHint}</span>
        </div>

        <a
          className="active-project-link"
          href={activeProject.url}
          target="_blank"
          rel="noreferrer"
          aria-label={`${labels.visitProject}: ${activeProject.title[locale]}`}
        >
          <span><b>{activeProject.title[locale]}</b><small>{activeProject.category[locale]}</small></span>
          <OpenArrow aria-hidden="true" weight="light" />
        </a>
      </div>

      <div className="mobile-project-strip" aria-label={labels.selectedWork}>
        {showcaseProjects.map((project, index) => (
          <a
            key={project.slug}
            className={index === selected ? "is-active" : ""}
            href={project.url}
            target="_blank"
            rel="noreferrer"
            aria-label={`${labels.visitProject}: ${project.title[locale]}`}
          >
            <ProjectPreview project={project} priority={index === 0} />
            <span>{project.title[locale]}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
