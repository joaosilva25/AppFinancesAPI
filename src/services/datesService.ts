import { loginUser } from "../controllers/homeController";
import {Request,Response} from 'express';
import UsersFinances from "../models/UsersFinances";
import DatesFinances from "../models/DatesFinances";
import { generateToken } from "../config/passport";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer"
import dotenv from "dotenv";

dotenv.config()


export const RegisterUser = async(req:Request,res:Response,email:string,password:string,userName:string)=> {
    let user=await UsersFinances.findOne({email:email})

    if(!user) {
        let newUser=await UsersFinances.create({email:email,password:password,userName:userName});
        let newDateUser=await DatesFinances.create({email:email});

        if(newUser && newDateUser) {
            const token=generateToken({id:newUser.id})
            return res.status(201).json('OK')
        }
    }
    else {
        return res.status(400).json('Usuário já Registrado')
    }

}

export const LoginUser=async(req:Request,res:Response,email:string,password:string)=> {

    const userExist=await UsersFinances.findOne({email:email});

    if(userExist) {
        const match=await bcrypt.compare(password,userExist.password)
        
        if(match) {
            const token=generateToken({id:userExist.id})
            return res.status(201).json('Usuário Logado com sucesso')
        }
        else {
            return res.status(400).json('Senha incorreta')
        }
    }
    else {
        return res.status(401).json("Usuário inexistente..")
    }

}

export const addFinances=async(req:Request,res:Response,email:string,mes:string,nameFinance:string,value:number,data:number,id:number)=> {
    try {
        const userFind=await DatesFinances.findOne({email:email});

        if(userFind) {
          await userFind.updateOne(
            {$push:{months:{id,mes,nameFinance,value,data}}}
          )
        }
        return res.json("Informações financeiras adicionadas com sucesso");
    }
    catch(err) {
        return res.json("Erro Inesperado ao adicionar finança")
    }
}


export const deleteFinances=async(req:Request,res:Response,email:string,id:number)=> {
    try {
        let findUser=await DatesFinances.findOne({email:email})
        console.log(findUser)

        if(findUser) {
            let update=await findUser.updateOne({
                $pull:{months:{id:id}}
            })
            if(update) {
                return res.json("Excluído com sucesso")
            }
        }
        else {
            return res.json("Usuário não encontrado")
        }
    }
    catch (err) {
        return res.json("Erro de exclusão inesperado")

    }
}

export const sendConfirmationEmail=async(req:Request,res:Response,email:string,code:number)=> {
    let findUser=await UsersFinances.findOne({email:email})

    if (findUser) {
        try {
            let transport= nodemailer.createTransport({
                host:"smtp.gmail.com",
                port:587,
                auth: {
                    user:"joaosilva20012505@gmail.com",
                    pass:process.env.GMAIL_PASSWORD
                }
            })


            var message = {
                from:'joaosilva20012505@gmail.com',
                to:email,
                subject:"Code Confirmation",
                text:`segue o código de confirmação: ${code} `
            }

            let send=await transport.sendMail(message)

            if(send) {
                return res.json("Código enviado no email")
            }
            else {
                return res.json("Código não enviado")
            }
        }
        catch (err) {
            return res.status(400).json("Erro inesperado")
        }
    }
}

export const updatePass=async(req:Request, res:Response, email:string,newPass:string) => {
    let findUser=await UsersFinances.findOne({email:email})
    try {
        if(findUser) {
            findUser.password=newPass
            await findUser.save()
            return res.json("Senha alterada")
        }
        else {
            return res.json("Usuário não encontrado")
        }
    }
    catch(err) {
        return res.json("Erro inesperado")
    }

}