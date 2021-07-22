import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import connection from "../database.js";

import * as userRepository from "../Repositories/userRepository.js";

export async function signUp(name,email,password){
    const existingUserWithGivenEmail = await userRepository.searchUserByEmail(email);

    if (existingUserWithGivenEmail) {
    return null;
    }

    const hashedPassword = bcrypt.hashSync(password, 12);

    const user = await userRepository.createUser(name,email,hashedPassword);
    
    return user;
}

export async function signIn(email,password){
    const user = await userRepository.searchUserByEmail(email);

    if (!user || !bcrypt.compareSync(password, user.password)) {
    return null;
    }

    const token = jwt.sign({
    id: user.id
    }, process.env.JWT_SECRET);
    
    return token;
}