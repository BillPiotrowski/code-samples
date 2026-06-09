import { initialArtists } from './data';
import type { Artist, PaginatedArtistResponseType } from './Type/PersonType';

export class API {
    private artists: Artist[];
    private artistsCache = new Map<string, PaginatedArtistResponseType>();

    constructor() {
        this.artists = [...initialArtists];
    }

    async getArtists(
        limit: number,
        page: number,
        sortBy?: string,
        sortDirection?: string
    ): Promise<PaginatedArtistResponseType> {
        const key = `${page}-${limit}-${sortBy}-${sortDirection}`;
        const cached = this.artistsCache.get(key);
        if (cached !== undefined) return cached;
        await delay(250);
        const sorted = sortCollection(this.artists, sortBy, sortDirection);
        const paginated = paginateCollection(sorted, page, limit);
        const result = { items: paginated, total: this.artists.length };
        this.artistsCache.set(key, result);
        return result;
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