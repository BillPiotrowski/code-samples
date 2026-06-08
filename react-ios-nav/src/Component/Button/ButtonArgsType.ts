import { type MouseEvent, type FocusEvent } from 'react';

export interface ButtonArgs{
    onClick?: ((e: MouseEvent<HTMLButtonElement>) => void);
    disabled?: boolean;
    className?: string;
    children?: any;
    isSmall?: boolean;
    onBlur?: (e: FocusEvent<HTMLButtonElement>) => void;
    onFocus?: (e: FocusEvent<HTMLButtonElement>) => void;
}
