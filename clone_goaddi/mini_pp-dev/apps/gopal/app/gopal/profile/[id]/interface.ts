import { ReactNode } from "react";

interface Tab {
  title: string;
  content: ReactNode;
}

export interface TabsObj extends Record<string, Tab> {}
