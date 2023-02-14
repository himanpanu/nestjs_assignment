import * as dotenv from 'dotenv';
dotenv.config();

export const jwtSecret = process.env.JWT_SECRET || 'secret';
export const clientUrl = process.env.CLIENT_URL || 'http://localhost:3000';
export const mongoUrl = process.env.MONGO_URL;
export const port = process.env.PORT || 3000;
