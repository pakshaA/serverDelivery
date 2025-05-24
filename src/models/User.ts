import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    email: string;
    password: string;
    deliveries: mongoose.Types.ObjectId[];
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
    deliveries: [{ type: mongoose.Schema.Types.ObjectId, ref: "Delivery" }],
});

export default mongoose.model<IUser>('User', userSchema);