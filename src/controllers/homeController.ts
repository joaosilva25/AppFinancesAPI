import express,{NextFunction, Request,Response} from 'express'
import { RegisterUser,addFinances,LoginUser,deleteFinances,sendConfirmationEmail,updatePass} from '../services/datesService'
import bcrypt, { hashSync } from 'bcryptjs'



export const addUserDates=async(req:Request, res:Response) => {
    const {email,password,userName}=req.body

    if (!email && !password && !userName) {
        res.json({mensage:'Ocorreu um erro'})
    }

    try {
        if (email && password && userName) {	

            let hashPass=bcrypt.hashSync(password,10)

            await RegisterUser(req,res,email,hashPass,userName)
        }
        else {
            res.json({mensage:'Ocorreu um erro'})
        }
    }
    catch (error) {
        res.json({mensage:error})
    }
    

}

export const loginUser=async(req:Request, res:Response) => {
    const {email,password}=req.body

    if(email && password) {
        try {
            await LoginUser(req,res,email,password)
        }
        catch (error) {
            console.log(error)
        }
    }
    else {
        res.json('Preencha os campos para prosseguir');
    }
}

export const financeAdd=async(req:Request, res:Response) => {
    const {email,data,nameFinance,value,month}=req.body

    let id =Math.floor(Math.random()*1000)

    if(email && data && nameFinance && value && month) {
        await addFinances(req,res,email,month,nameFinance,value,data,id)
    }
    else {
        res.json("Campos vazios")
    }
}

export const financeDelete=async(req:Request, res:Response)=> {
    const {email,id}=req.body;

    if(email && id) {
        await deleteFinances(req,res,email,id)
    }
    else {
        res.json("Preencha os campos para prosseguir")
    }
}


export const sendEmail=async(req:Request, res:Response) => {
    let {email}=req.body

    if(email) {
        let code=Math.floor(Math.random()*100000000)
        await sendConfirmationEmail(req,res,email,code)
    }
    else {
        return res.json("Preeencha os campos para prosseguir")
    }

}

export const changePassword=async(req:Request, res:Response) => {
    let {email,newPass}=req.body;

    if(email && newPass) {
        let hashPass=bcrypt.hashSync(newPass,10)

        await updatePass(req,res,email,hashPass)
    }
    else {
        return res.json("Preeencha os campos para prosseguir")
    }
}   