// Importamos mongoose para definir el esquema y el modelo
import mongoose from "mongoose";

// Definimos el esquema de Usuario con validaciones
const UserSchema = new mongoose.Schema({
    // Nombre obligatorio, tipo string y sin espacios extras
    name:{type:String,required:true,trim:true},

    // Email obligatorio, único, en minúscula y sin espacios
    email:{type:String,required:true,unique:true,lowercase:true,trim:true},

    // Edad opcional, pero no puede ser negativa
    age:{type:Number,min:0}
},
// timestamps agrega createdAt y updatedAt automáticamente
{timestamps:true});

// ---- Clase de dominio asociada al esquema ----
class UserClass{
    // Propiedad virtual: devuelve true si la edad es >=18
    get isAdult(){
        return (this.age ?? 0) >=18;
    }

    // Método estático (que la funcion solo funcione en esta clase) : buscar usuario por email
    static async findByEmail(email){
        return this.findOne({email});
    }
}

// Cargamos la clase en el esquema para que tenga los métodos extra
UserSchema.loadClass(UserClass);

// Exportamos el modelo de mongoose
export const UserModel = mongoose.model("User",UserSchema);
