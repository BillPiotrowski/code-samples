import type React from "react";
import type { TitleBarTool } from "../TitleBar";

export interface SplitNavContext {
    setTitle: (title: string) => void;
    setTools: React.Dispatch<React.SetStateAction<TitleBarTool[]>>;
    toPath: string;
}
