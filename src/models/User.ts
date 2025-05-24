import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    email: string;
    password: string;
    deliveres: string[];
    id: string;
}

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true
    },
    deliveries: {
        type: Array,
    }
});

export default mongoose.model<IUser>('User', userSchema);