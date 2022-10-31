import { Schema, model } from "mongoose";

const cartSchema = new Schema({
  name: {type:String, required:true},
  price: {type:Number, required:true},
  amount: {type:Number, required:true}
});

export default model("Carrito", cartSchema);
