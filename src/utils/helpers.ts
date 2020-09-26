
export function random(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function findIndex(col: number, row: number, width: number): number {
    return col + width * row;
}