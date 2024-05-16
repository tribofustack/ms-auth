import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const DB_USER = process.env.DB_USER || '';
const DB_PASSWORD = process.env.DB_PASSWORD || '';
const DB_DATABASE = process.env.DB_DATABASE || '';
const DB_SERVER = process.env.DB_SERVER || '';

const mongooseConnection = (): Promise<typeof mongoose> => {
    mongoose.Promise = global.Promise;
    return mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}${DB_SERVER}/${DB_DATABASE}?retryWrites=true&w=majority`)

}

export default mongooseConnection;
