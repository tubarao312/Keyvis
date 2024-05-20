export enum BadgeColor {
    RED = 'Red',
    GREEN = 'Green',
    BLUE = 'Blue',
    ORANGE = 'Orange',
    YELLOW = 'Yellow',
    PURPLE = 'Purple',
}

export enum Selectors {
    DROPDOWN = 'Dropdown',
    FREE_INPUT = 'FreeInput',
    TOGGLE = 'Toggle',
}

export enum Types {
    STRING = 'String',
    INTEGER = 'Integer',
    FLOAT = 'Float',
}

export const Tags = {
    Dangerous: {
        name: 'Dangerous',
        color: BadgeColor.RED,
    },
    Performance: {
        name: 'Performance',
        color: BadgeColor.BLUE,
    },
    Sensitive: {
        name: 'Sensitive',
        color: BadgeColor.ORANGE,
    },
}