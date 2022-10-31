import { Schema, model } from "mongoose";

const blogSchema = new Schema({
  title: String,
  author: {type: Schema.Types.ObjectId, ref: "User" }, //El "ObjectId" le dice que esta relacionado con un ID de otra tabla, el "ref:" referencia con los datos del usuario
  body: String,
  comments: [{type: Schema.Types.ObjectId, ref: "Comment" }], //Las [] le dicen que es un array de ese tipo de objeto, si fuese de uno a uno no usaria las [], pero como es de uno a muchos van los []
});

export default model("Blog", blogSchema);
