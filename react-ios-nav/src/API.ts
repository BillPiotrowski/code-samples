import { initialDurerWoodcuts, initialArtists } from './data';
import type { DurerWoodcutType, PaginatedDurerWoodcutResponseType } from './Type/DurerWoodcutType';
import type { Artist, PaginatedArtistResponseType } from './Type/PersonType';

export class API {
    private woodcuts: DurerWoodcutType[];
    private artists: Artist[];

    constructor() {
        this.woodcuts = [...initialDurerWoodcuts];
        this.artists = [...initialArtists];
    }

    async getWoodcuts(
        limit: number,
        page: number,
        sortBy?: string,
        sortDirection?: string
    ): Promise<PaginatedDurerWoodcutResponseType> {
        await delay(250); 
        const sorted = sortCollection(this.woodcuts, sortBy, sortDirection);
        const paginated = paginateCollection(sorted, page, limit);
        return Promise.resolve({ items: paginated, total: this.woodcuts.length });
    };

    getWoodcutById(id: string): Promise<DurerWoodcutType> {
        const woodcut = this.woodcuts.find(w => w.id === id);
        if (!woodcut) return Promise.reject(new Error('Not found'));
        return Promise.resolve(woodcut);
    }

    async getArtists(
        limit: number,
        page: number,
        sortBy?: string,
        sortDirection?: string
    ): Promise<PaginatedArtistResponseType> {
        await delay(250); 
        const sorted = sortCollection(this.artists, sortBy, sortDirection);
        const paginated = paginateCollection(sorted, page, limit);
        return Promise.resolve({ items: paginated, total: this.artists.length });
    }

    getArtistById(id: string): Promise<Artist> {
        const artist = this.artists.find(a => a.id === id);
        if (!artist) return Promise.reject(new Error('Not found'));
        return Promise.resolve(artist);
    }
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));


const sortCollection = <T>(
    items: T[],
    sortBy?: string,
    sortDirection?: string
): T[] => {
    if (sortBy === undefined) return items;
    const direction = sortDirection?.toUpperCase() === 'DESC' ? -1 : 1;
    return [...items].sort((a, b) => {
        const aVal = (a as Record<string, unknown>)[sortBy];
        const bVal = (b as Record<string, unknown>)[sortBy];
        if (aVal === undefined || aVal === null) return 1;
        if (bVal === undefined || bVal === null) return -1;
        if (typeof aVal === 'number' && typeof bVal === 'number') {
            return (aVal - bVal) * direction;
        }
        return String(aVal).localeCompare(String(bVal)) * direction;
    });
};

const paginateCollection = <T>(items: T[], page: number, limit: number): T[] => {
    const start = (page - 1) * limit;
    return items.slice(start, start + limit);
};