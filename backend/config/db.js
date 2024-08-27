import mongoose from "mongoose";

export const  connectDB = async () =>{

    await mongoose.connect('mongodb+srv://erjonkurti:Trenbolone10$@kicksalb.p4asw.mongodb.net/kicksalb').then(()=>console.log("DB Connected"));
}