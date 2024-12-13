import { cn } from "@/lib/utils";

function InfoCard(props: InfoCardProps) {
  return (
    <div
      className={cn(
        "px-4 py-2 space-y-2 w-64 rounded",
        props.theme.bg,
        props.theme.text,
      )}
    >
      <p className="font-semibold">{props.title}</p>
      <p className="font-medium text-sm pb-4">{props.description}</p>
    </div>
  );
}

export default InfoCard;
