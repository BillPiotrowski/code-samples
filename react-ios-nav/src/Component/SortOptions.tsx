import React from 'react';
import type { SortOption } from '../Type/SortOption';

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
        onChange={e => {
            args.setSortOptionIndex(parseInt(e.target.value));
        }}
    >
        {args.sortOptions.map((option, i) => {
            return <option value={i} selected={args.sortOptionIndex === i}>{option.name}</option>
        })}
    </select>
}

export default SortOptions;
