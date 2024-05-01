import * as bcrypt from 'bcrypt';

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

/**
 * Hashing Data
 * @param data 
 * @returns 
 */
export async function setHash(data: string): Promise<string> {
    const hashPassword = await bcrypt.hash(data, parseInt(process.env.BCRYPT_SALT));
    return hashPassword;
}

/**
 * Compare `data` with `hashData`
 * @param data 
 * @param hashData 
 * @returns 
 */
export async function compareHash(data: string, hashData: string): Promise<boolean> {
    const compare = await bcrypt.compare(data, hashData);
    return compare;
}


