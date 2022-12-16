import fs from "fs";
import * as jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();


const config = {
    secret: process.env.JWT_SECRET as string,
    issuer: process.env.JWT_ISSUER as string,
    subject: process.env.JWT_SUBJECT as string,
    expires: process.env.JWT_EXPIRES as string,
    algorithm: process.env.JWT_ALGORITHM as string,
}

const writeToFile = (dir: string, content: Record<string, any>) => {
    const writer = fs.createWriteStream(dir)
    writer.write(JSON.stringify(content, null, 2))
}

const generateId = (db: Record<string, any>) => {
    if (!db.length) return 1;

    const id = db[db.length - 1].id + 1;
    return id;
}

const generateToken = (data: Record<string, any>) => {
    const { id, email, fullname } = data;
    const token = jwt.sign({     /*jwt.sgin is a syntax from jwt */
            id, 
            email, 
            fullname
    }, config.secret, {
        issuer: config.issuer,
        expiresIn: 860000,
        algorithm: "HS512",
        subject: config.subject
    })
    return token
}

module.exports = {
    writeToFile,
    generateId,
    generateToken
}