import bcrypt from 'bcryptjs';
export const encryptPass = async (plainPassword: string) => {
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(plainPassword,salt);
    return hashedPassword;
};

export const comparePass = async (plainPassword: string, hashedPassword: string) => {
    const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
    return isMatch;
};