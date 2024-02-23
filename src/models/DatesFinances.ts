import { Schema,model,connection } from "mongoose";


type Month ={
    mes: string,
    nameFinance:string,
    value:number
    data:number
}

type DatesFinancesType= {
    email: string
    months:Month[]
}


const schema =new Schema<DatesFinancesType>({
    email: {type:String,required:true},
    months:{ type: [Object], required: false } 
 
})  

const ModelName:string="finances";

export default(connection && connection.models[ModelName])??
model<DatesFinancesType>(ModelName,schema)