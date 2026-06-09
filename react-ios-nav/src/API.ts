import { initialDurerWoodcuts } from './data';
import type { DurerWoodcutType, PaginatedDurerWoodcutResponseType } from './Type/DurerWoodcutType';

export class API {
    private woodcuts: DurerWoodcutType[];

    constructor() {
        this.woodcuts = [...initialDurerWoodcuts];
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

    // updateWoodcut(id: string, updates: Partial<Woodcut>): Promise<Woodcut> {
    //     this.woodcuts = this.woodcuts.map(w =>
    //         w.id === id ? { ...w, ...updates } : w
    //     );
    //     return Promise.resolve(this.woodcuts.find(w => w.id === id)!);
    // }
}