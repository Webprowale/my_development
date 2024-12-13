import React from "react";

interface HeaderItemProps {
  icon: React.ReactNode;
  label: string;
}

function HeaderItem(props: HeaderItemProps) {
  return (
    <div className="text-nav-text flex-col-center gap-1">
      <div>{props.icon}</div>
      <span className="text-sm 2xl:text-base">{props.label}</span>
    </div>
  );
}

export default HeaderItem;
