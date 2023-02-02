
 interface Iconfig  {
    db_uri: string,
    port: number,
    secrete: string | undefined,
    bcrypt_salt: number,
    max_login_attempts: number,
    lock_time: number
}

export const config:Iconfig = {
    db_uri: process.env.MONGODB_URI as string,
    port: Number(process.env.PORT),
    secrete: process.env.SECRETE as string,
    bcrypt_salt: 10,
    max_login_attempts: 5,
    lock_time: 2 * 60 * 60 * 1000
}