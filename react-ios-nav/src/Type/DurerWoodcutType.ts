import type { PaginatedResponse } from "./PaginatedResponseType";

export interface DurerWoodcutType {
    id: string;
    name: string;
    year: string;
}

export interface PaginatedDurerWoodcutResponseType extends PaginatedResponse<DurerWoodcutType> {
}