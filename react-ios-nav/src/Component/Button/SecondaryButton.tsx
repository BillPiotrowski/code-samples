import type { ButtonArgs } from "./ButtonArgsType";

export const SecondaryButton = (args: ButtonArgs) => {
    const sizeClassArray = (args.isSmall === true) ? ['small'] : [];
    const classNameArray = (args.className === undefined) ? [] : [args.className];
    const classArray = [...['outline'], ...[sizeClassArray], ...[classNameArray] ];
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
    )
}