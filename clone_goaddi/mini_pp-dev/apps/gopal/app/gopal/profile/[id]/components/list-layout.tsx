import { cn } from "@/lib/utils";

function ListLayout(props: ListLayoutProps) {
  return (
    <div className={cn("space-y-4 p-4 my-4", props.bgColor)}>
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <img src={props.icon} alt={props.title + " icon"} />
          <span
            className={
              props.bgColor === "bg-neutral-300" ? "text-black" : "text-white"
            }
          >
            {props.title}
          </span>
        </div>

        <button
          className={cn(
            "bg-white text-sm rounded p-2",
            props.btnTextColor ?? "text-black",
          )}
        >
          Add {props.title}
        </button>
      </div>

      {props.data.map((_, i) => props.listItem)}
    </div>
  );
}

export default ListLayout;
