import { Schema,model,connection } from "mongoose";

type UsersFinancesType= {
    email:string;
    password:string;
    userName:string;
}

const schema=new Schema<UsersFinancesType>({
    email:{type:String,required:true},
    password:{type:String,required:true},
    userName:{type:String,required:true}
})


const ModelName:string = "users";

export default (connection && connection.models[ModelName])??
    model<UsersFinancesType>(ModelName,schema)