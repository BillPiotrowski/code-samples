import React from 'react';
import type { SortOption } from './SortOption';

interface SortOptionsArgs {
    setSortOptionIndex: (index: number) => void;
    sortOptions: SortOption[];
    sortOptionIndex: number;
    className?: string;
}

const SortOptions: React.FC<SortOptionsArgs> = (args) => {

    const classNamesList = [
        args.className,
    ];
    const classNames = classNamesList.filter(c => c !== undefined).join(' ');

    return <select
        className={classNames}
        value={args.sortOptionIndex}
        onChange={e => {
            args.setSortOptionIndex(parseInt(e.target.value));
        }}
    >
        {args.sortOptions.map((option, i) => {
            return <option key={i} value={i}>{option.name}</option>
        })}
    </select>
}

export default SortOptions;
