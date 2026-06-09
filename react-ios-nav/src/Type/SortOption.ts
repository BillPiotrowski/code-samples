export type SortByDirection = "DESC" | "ASC";

export interface SortOption {
    name: string;
    property: string;
    direction: SortByDirection;
}