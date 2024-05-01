/**
 * Generate code of `length`
 * @param length length of [code]
 * @returns 
 */
export function generateCode(length: number): string {
    var defaultValue = 1, max = 12 - length;
    if (defaultValue > max) return generateCode(max) + generateCode(length - max);
    max = Math.pow(10, length + defaultValue);
    const min = max / 10;
    const random = Math.floor(Math.random() * (max - min + 1)) + min;
    return (random + "").substring(defaultValue);
}