import mongoose, { Schema, Document } from 'mongoose'

interface IPersonInfo {
  city: string
  address: string
  phone: string
}

interface Delivery {
  package: {
    width: string;
    height: string;
    length: string;
    weight: string;
    id: string;
  };
  isGoods: boolean;
  typeOfGoods: string;
}

export interface IDelivery extends Document {
  sender: IPersonInfo
  receiver: IPersonInfo
  shipmentId: number
  status: string
  packageInfo: Delivery
}

const packageInfoSchema: Schema = new Schema({
  package: {
    width: { type: String, required: true },
    height: { type: String, required: true },
    length: { type: String, required: true },
    weight: { type: String, required: true },
    id: { type: String, required: true },
  },
  isGoods: { type: Boolean, required: true },
  typeOfGoods: { type: String, required: true },
})

const PersonInfoSchema: Schema = new Schema({
  city: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
})

function generateShipmentId(): number {
  return Date.now() 
}

const DeliverySchema: Schema = new Schema({
  sender: { type: PersonInfoSchema, required: true },
  receiver: { type: PersonInfoSchema, required: true },
  shipmentId: {
    type: Number,
    unique: true,
    default: generateShipmentId,
    required: true,
  },
  status: { type: String, default: 'created' },
  packageInfo: { type: packageInfoSchema, required: true },
})

export default mongoose.models.Delivery || mongoose.model<IDelivery>('Delivery', DeliverySchema)
