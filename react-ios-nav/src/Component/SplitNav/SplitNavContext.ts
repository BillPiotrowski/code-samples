import type React from "react";
import type { SegueDirection } from "../../Utility/PathParser";
import type { TitleBarTool } from "../TitleBar";

export interface SplitNavContext {
    setTitle: (title: string) => void;
    setTools: React.Dispatch<React.SetStateAction<TitleBarTool[]>>;
    sequeDirection: SegueDirection;
    previousPath: string | null;
    setPreviousPath: (path: string) => void;
    toPath: string;
}
