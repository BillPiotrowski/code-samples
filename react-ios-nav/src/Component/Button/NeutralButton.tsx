import React from 'react';
import './NeutralButton.scss';
import type { ButtonArgs } from './ButtonArgsType';

const NeutralButton: React.FC<ButtonArgs> = args => {
    const sizeClassArray = (args.isSmall === true) ? ['small'] : [];
    const classNameArray = (args.className === undefined) ? [] : [args.className];
    const classArray = [...[sizeClassArray], ...[classNameArray], ...['neutralButton'] ];
    return (
        <button
            className={classArray.join(' ')}
            onClick={args.onClick}
            disabled={args.disabled}
            onFocus={args.onFocus}
            onBlur={args.onBlur}
        >
            {args.children}
        </button>
    );
}

export default NeutralButton;
