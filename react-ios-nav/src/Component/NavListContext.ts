import type { AppRootContext } from "../AppRoot";
import type { SegueDirection } from "../Utility/PathParser";
import type { TitleBarTool } from "./TitleBar";

export interface NavListContext extends AppRootContext {
    setTitle: (title: string) => void;
    sequeDirection: SegueDirection;
    setTools: React.Dispatch<React.SetStateAction<TitleBarTool[]>>
}