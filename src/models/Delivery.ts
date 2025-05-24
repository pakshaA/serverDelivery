import mongoose, { Schema, Document } from 'mongoose'

interface IPersonInfo {
  city: string
  address: string
  phone: string
}

export interface IDelivery extends Document {
  sender: IPersonInfo
  receiver: IPersonInfo
  shipmentId: number
}

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
})

export default mongoose.models.Delivery || mongoose.model<IDelivery>('Delivery', DeliverySchema)
