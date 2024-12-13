import { cn } from "@/lib/utils";

type ILabel = "one way" | "round trip";

function getStatusStyle(status: ILabel) {
  switch (status) {
    case "one way":
      return "bg-warning100 text-warning900";

    case "round trip":
      return "bg-green10 text-green30 border-2 border-green20";

    default:
      return "";
  }
}

export function Badge({ label }: { label: ILabel }) {
  return (
    <div
      className={cn(
        "p-1 px-5 text-sm font-semibold capitalize w-fit",
        getStatusStyle(label),
      )}
    >
      {label}
    </div>
  );
}
