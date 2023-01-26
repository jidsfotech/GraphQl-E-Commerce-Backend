import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from '../config/config';
const secrete = config.secrete as string;

export default class Auth {

    async comparePassword(password: string, hashedPaasword: string): Promise<boolean> {
        return new Promise(async (resolve) => {
            return await bcrypt.compare(password, hashedPaasword)
                .then(isMatch => {
                    return resolve(isMatch);
                })
                .catch(error => {
                    return error;
                })
        });
    }

    getToken(payload: { [key: string]: string }) {
        return new Promise((resolve) => {
            jwt.sign({ payload }, secrete,
                {
                    expiresIn: '30d'
                },
                (err, token) => {
                    if (err) {
                        console.log(err);
                        return false;
                    }
                    return resolve(token);
                }
            );
        });
    }

    async VerifyToken(access_token: string) {
        await jwt.verify(access_token, secrete, (err, decoded) => {
            if (err) {
                return { success: false, message: 'Failed to authenticate token.' };
            } else {
                return { success: true, decoded: decoded };
            }
        });
    }
}