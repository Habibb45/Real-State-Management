export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-3xl">
      <div className="text-xs font-bold uppercase tracking-[0.45em] text-moss">
        {eyebrow}
      </div>
      <h2 className="mt-3 text-3xl font-black tracking-tight text-ink md:text-5xl">
        {title}
      </h2>
      <p className="mt-4 text-base leading-7 text-slateSoft md:text-lg">
        {description}
      </p>
    </div>
  );
}
