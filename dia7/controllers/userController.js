/*
-- Lógica del JWT --
*/
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../models/UserModel";

export default class UserController{
    constructor(){
        this.userModel = new UserModel();
    }


    async register(req,res){
        try{
            const {name,email,password} = req.body;
            const existingUser = await this.userModel.findUserByEmail(email);

            if(existingUser){
                return res.status(400).json({
                    msg:"El usuario ya existe"
                });
            }
            const hashedPassword = await bcrypt.hash(password,10);
            const newUser = await this.userModel.createUser({
                name,
                email,
                password:hashedPassword
            });
            return res.status(201).json({
                msg:"Usuario registrado con éxito!!!",newUser
            })
        }//{name,email,password} --> password usada por bcrypt para que eswte  cifrada
        catch(err){
            res.status(500).json({error:err.message});
        }
    }

    async login(req,res){
        try{
            const {name,email,password} = req.body;
            const existingUser = await this.userModel.findUserByEmail(email);

            if(!existingUser){
                return res.status(404).json({
                    msg:"El usuario no existe"
                });
            }
            const validPasword = await bcrypt.compare(password,existingUser.password);
            if(!validPasword){
                return res.status(401).json({
                    msg:"la contraseña no es valida"
                });
            }
            const token = jwt.sign({id:existingUser._id},process.env.JWT_SECRET,{
                expiresIn:process.env.JWT_EXPIRES});
                res.status(202).json({
                    msg:"login exitoso",
                    token
                });
        }
        catch(err){ res.status(500).json({error:err.message});}
    }
    async updateUser(req,res){
        try{
            const{id}=req.user;
            const{name,email}=req.body;
            await this.userModel.updateUser(id,{name,email});
            res.status(202).json({
                msg:"usuario actualizado con  exito",
                token
            });
        }
        catch(err){ res.status(500).json({error:err.message});}
    }
    async updatePassword(req,res){
        try{
            const{id}=req.user;
            const{password}=req.body;
            const hashedPassword=await bcrypt.hash(password,10)
            await this.userModel.updateUser(id,{password:hashedPassword});
            res.status(202).json({
                msg:"contraseña actualizado con  exito",
                token
            });
        }
        catch(err){ res.status(500).json({error:err.message});}
    }


}