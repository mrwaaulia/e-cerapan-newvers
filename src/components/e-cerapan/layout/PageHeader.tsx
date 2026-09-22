interface PageHeaderProps {
  title: string;
  description?: string;
  className?: string;
}

export default function PageHeader({
  title,
  description,
  className = "",
}: PageHeaderProps) {
  return (
    <div className={["mb-7", className].filter(Boolean).join(" ")}>
      <h1 className="text-xl font-bold text-primary sm:text-2xl">{title}</h1>

      {description && (
        <p className="mt-1 text-xs leading-5 text-neutral sm:text-sm">
          {description}
        </p>
      )}
    </div>
  );
}
