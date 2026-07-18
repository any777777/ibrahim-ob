"use client";

import Image from "next/image";
import { ArrowUpLeft, ArrowUpRight, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { useMemo, useState } from "react";
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

function ProjectPreview({ project, priority = false }: { project: Project; priority?: boolean }) {
  if (project.previewTone === "research") {
    return (
      <div className="project-preview project-preview--research" aria-hidden="true">
        <div className="research-toolbar"><span /><span /><span /></div>
        <strong>Baseline</strong>
        <div className="research-flow"><b>RAG</b><i /><b>Graph RAG</b></div>
        <div className="research-lines"><span /><span /><span /></div>
      </div>
    );
  }

  if (project.previewTone === "qattaa") {
    return (
      <div className="project-preview project-preview--qattaa" aria-hidden="true">
        <Image src={project.image!} alt="" width={180} height={180} sizes="180px" />
        <div><strong>Qattaa</strong><span>Courses · Lessons · Progress</span></div>
      </div>
    );
  }

  return (
    <div className="project-preview">
      <Image
        src={project.image!}
        alt=""
        fill
        priority={priority}
        sizes="(max-width: 760px) 86vw, 52vw"
        className="project-preview__image"
      />
    </div>
  );
}

export function ProjectShowcase({ locale, labels }: ProjectShowcaseProps) {
  const [selected, setSelected] = useState(0);
  const directionIcon = locale === "ar" ? ArrowUpLeft : ArrowUpRight;
  const ExternalArrow = directionIcon;

  const ordered = useMemo(
    () => projects.map((_, offset) => ({ project: projects[(selected + offset) % projects.length], offset })),
    [selected],
  );

  const activeProject = projects[selected];

  const selectPrevious = () => setSelected((value) => (value - 1 + projects.length) % projects.length);
  const selectNext = () => setSelected((value) => (value + 1) % projects.length);

  return (
    <section id="work" className="work-showcase" aria-labelledby="work-heading">
      <div className="showcase-stage" aria-label={labels.selectedWork}>
        <div className="project-stack">
          {ordered.slice(0, 4).reverse().map(({ project, offset }) => {
            const visualIndex = 3 - offset;
            const distance = 3 - visualIndex;
            const style = {
              "--stack-index": visualIndex,
              "--stack-top": `${distance * 1.3}rem`,
              "--stack-start": `${distance * 2.8}rem`,
              "--stack-scale": 0.91 + visualIndex * 0.03,
              "--stack-rotate": `${distance * -0.55}deg`,
              "--stack-brightness": 0.58 + visualIndex * 0.14,
            } as CSSProperties;
            return (
              <button
                key={project.slug}
                type="button"
                className={`project-sheet ${offset === 0 ? "is-active" : ""}`}
                style={style}
                onClick={() => setSelected(projects.indexOf(project))}
                aria-label={`${labels.selectedWork}: ${project.title[locale]}`}
                aria-pressed={offset === 0}
              >
                <ProjectPreview project={project} priority={offset === 0 && selected === 0} />
              </button>
            );
          })}
        </div>

        <div className="showcase-controls">
          <button type="button" className="round-control" onClick={selectPrevious} aria-label={labels.previousProject}>
            {locale === "ar" ? <ChevronRight /> : <ChevronLeft />}
          </button>
          <span aria-live="polite"><b>{String(selected + 1).padStart(2, "0")}</b> / {String(projects.length).padStart(2, "0")}</span>
          <button type="button" className="round-control" onClick={selectNext} aria-label={labels.nextProject}>
            {locale === "ar" ? <ChevronLeft /> : <ChevronRight />}
          </button>
        </div>
      </div>

      <div className="project-copy" aria-live="polite">
        <p className="section-label" id="work-heading">{labels.selectedWork}</p>
        <p className="project-category">{activeProject.category[locale]}</p>
        <h2>{activeProject.title[locale]}</h2>
        <p>{activeProject.description[locale]}</p>
        <span className="browse-hint">{labels.browseHint}</span>
        <a className="text-link" href={activeProject.url} target="_blank" rel="noreferrer">
          {labels.visitProject}
          <ExternalArrow aria-hidden="true" />
          <span className="sr-only"><ExternalLink /></span>
        </a>
      </div>

      <div className="mobile-project-strip" aria-label={labels.selectedWork}>
        {projects.map((project, index) => (
          <button
            key={project.slug}
            type="button"
            className={index === selected ? "is-active" : ""}
            onClick={() => setSelected(index)}
            aria-pressed={index === selected}
          >
            <ProjectPreview project={project} />
            <span>{project.title[locale]}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
