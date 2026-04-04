import bcrypt from "bcrypt";

export const bcryptPassword = async(password) => {
    const hashedPassword =  await bcrypt.hash(password, 10);

    return hashedPassword;
}