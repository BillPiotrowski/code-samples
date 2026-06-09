import type { PaginatedResponse } from './PaginatedResponseType';

interface Person {
    id: string;
    firstName: string;
    lastName: string;
    born: number;
    died?: number;
    nationality: string;
}

export interface Artist extends Person {
}

export interface Composer extends Person {
}

export interface PaginatedArtistResponseType extends PaginatedResponse<Artist> {
}