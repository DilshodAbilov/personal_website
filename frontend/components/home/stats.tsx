export function Stats({
  items,
}: {
  items: { value: string | number; label: string }[];
}) {
  return (
    <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-4">
      {items.map((stat) => (
        <div
          key={stat.label}
          className="flex flex-col items-center justify-center bg-background-alt px-4 py-8 text-center"
        >
          <span className="font-mono text-3xl font-bold text-gradient sm:text-4xl">
            {stat.value}
          </span>
          <span className="mt-1 text-xs uppercase tracking-wider text-muted">
            {stat.label}
          </span>
        </div>
      ))}
    </div>
  );
}
