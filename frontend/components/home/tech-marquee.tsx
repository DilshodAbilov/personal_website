const FALLBACK = [
  "Python", "Django", "DRF", "PostgreSQL", "Redis", "Celery",
  "Docker", "Nginx", "MinIO", "Grafana", "Prometheus", "Git",
];

export function TechMarquee({ items }: { items?: string[] }) {
  const list = items && items.length > 0 ? items : FALLBACK;
  const doubled = [...list, ...list];

  return (
    <div className="relative overflow-hidden border-y border-border bg-background-alt py-5">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background-alt to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background-alt to-transparent" />

      <div className="flex w-max animate-marquee gap-3">
        {doubled.map((tech, i) => (
          <span
            key={`${tech}-${i}`}
            className="rounded-lg border border-border bg-surface px-4 py-2 font-mono text-sm text-muted"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}
