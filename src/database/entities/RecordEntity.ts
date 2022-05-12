import mongoose from "mongoose";

const recordSchema = new mongoose.Schema({
    placa: { type: String, required: true },
    data_posicao: { type: String, required: true },
    velocidade:{ type: Number, required: true },
    longitude: { type: Number, required: true },
    latitude:{ type: Number, required: true },
    ignicao: { type: Boolean, required: true },
    
})

export interface RecordDoc extends mongoose.Document {
    placa: string;
    data_posicao: Date;
    velocidade: number;
    longitude: number;
    latitude: number;
    ignicao: Boolean;
}

const RecordEntity = mongoose.model<RecordDoc>("Record", recordSchema);

export default RecordEntity;