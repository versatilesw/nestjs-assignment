import 'dotenv/config';
export const config = {
    jwtSecret: process.env.JWT_SECRET!,
    jwtExpiresIn: 1,
    databaseType: process.env.DATABASE_TYPE!,
    databaseHost: process.env.DATABASE_HOST!,
    databasePort: parseInt(process.env.DATABASE_PORT!),
    databaseUsername: process.env.DATABASE_USERNAME!,
    databasePassword: process.env.DATABASE_PASSWORD!,
    databaseName: process.env.DATABASE_NAME!,
};
