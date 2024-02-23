import express,{Router} from 'express';
import * as homeController from '../controllers/homeController';
import { privateRoute } from '../config/passport';



const routes= Router();

routes.get('/login',homeController.loginUser)
routes.post('/login/sendCode',homeController.sendEmail)
routes.post('/login/changePass',homeController.changePassword)
routes.post('/register',homeController.addUserDates)
routes.post('/financeAdd',homeController.financeAdd)
routes.delete('/financeDelete',homeController.financeDelete)


export default routes;