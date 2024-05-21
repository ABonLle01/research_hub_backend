import mongoose, { Document, Types } from 'mongoose';

interface EncuestaRealizada {
  _id: Types.ObjectId;
  name: string;
  parent:string;
  reward:any;
  fx_taken: Date;
}

interface Usuario {
  name: string;
  surnames: string;
  genre: string;
  email: string;
  password: string;
  fx_creation: Date;
  surveys: EncuestaRealizada[];
}

// Definición del esquema para EncuestaRealizada
const EncuestaRealizadaSchema = new mongoose.Schema({
  name: { type: String, required: true },
  parent: { type: String, required: true },
  reward: { type: String, required:false },
  fx_taken: { type: Date, required: true, default: Date.now }
});

// Definición del esquema para Usuario
const UsuarioSchema = new mongoose.Schema({
  name: { type: String, required: true },
  surnames: {type:String, required:true},
  genre: {type:String, required:true},
  email: { type: String, required: true },
  password: { type: String, required: true },
  fx_creation: { type: Date, required: true, default: Date.now },
  surveys: { type: [EncuestaRealizadaSchema], default: [] }
});

//interface IEncuestaRealizada extends EncuestaRealizada, Document {}

interface IUsuario extends Usuario, Document {}

const EncuestaRealizadaModel = mongoose.model<EncuestaRealizada>('EncuestaRealizada', EncuestaRealizadaSchema);

const UsuarioModel = mongoose.model<IUsuario>('Usuario', UsuarioSchema);

export { UsuarioModel, EncuestaRealizadaModel };
