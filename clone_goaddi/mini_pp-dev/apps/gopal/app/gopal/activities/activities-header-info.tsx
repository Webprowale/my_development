export function ActivitiesHeaderInfo(props: {
  icon: React.ReactNode;
  label: string;
  descr: string;
  className?: string;
}) {

  const combinedClassName = `flex items-center gap-1 py-8  ${props.className}`;

  return (
    <div className={combinedClassName}>
      {props.icon}
      <div className="grid">
        <span className="text-xs font-semibold">{props.label}</span>
        <span className="font-bold">{props.descr}</span>
      </div>
    </div>
  );
}
