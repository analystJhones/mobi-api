import mongoose from "mongoose";

const pointSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    raio: { type: Number, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
})

export interface PointDoc extends mongoose.Document {
    nome: string;
    raio: number;
    latitude:number;
    longitude: number;
}

const PointDB = mongoose.model<PointDoc>("Point", pointSchema);

export default PointDB;