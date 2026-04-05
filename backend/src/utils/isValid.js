import bcrypt from "bcrypt";

export const validateUser = async(password, existingPassword) => {
    const isValid = await bcrypt.compare(password, existingPassword);

    return isValid;
}