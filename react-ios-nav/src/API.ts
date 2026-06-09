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

    getWoodcuts(
        page: number,
        limit: number,
        sortBy?: string,
        sortDirection?: string
    ): Promise<PaginatedDurerWoodcutResponseType> {
        // sort and paginate woodcuts
        return Promise.resolve({ items: this.woodcuts, total: this.woodcuts.length });
    };

    getWoodcutById(id: string): Promise<DurerWoodcutType> {
        const woodcut = this.woodcuts.find(w => w.id === id);
        if (!woodcut) return Promise.reject(new Error('Not found'));
        return Promise.resolve(woodcut);
    }

    getArtists(
        page: number,
        limit: number,
        sortBy?: string,
        sortDirection?: string
    ): Promise<PaginatedArtistResponseType> {
        return Promise.resolve({ items: this.artists, total: this.artists.length });
    }

    getArtistById(id: string): Promise<Artist> {
        const artist = this.artists.find(a => a.id === id);
        if (!artist) return Promise.reject(new Error('Not found'));
        return Promise.resolve(artist);
    }
}