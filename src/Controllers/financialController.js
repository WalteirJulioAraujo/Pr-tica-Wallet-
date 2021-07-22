import * as financialService from "../Services/financialService.js";

import jwt from "jsonwebtoken";

export async function newEvent(req,res){

    try {
        const user = validation(req);
        if(!user) return res.sendStatus(401);

        const { value, type } = req.body;
    
        const result = await financialService.newEvent(value,type,user);
        if(result === null) return res.sendStatus(400);
    
        res.sendStatus(201);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

export async function searchEvent(req,res){

    try {
        const user = validation(req);
        if(!user) return res.sendStatus(401);

        const result = await financialService.searchEvent(user)
    
        res.send(result);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

export async function sumEvent(req,res){
    
    try {
        const user = validation(req);
        if(!user) return res.sendStatus(401);
    
        const sum = await financialService.sumEvent(user);
    
        res.send( {sum} );
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

function validation(req) {
  const authorization = req.headers.authorization || "";
  const token = authorization.split("Bearer ")[1];

  if (!token) {
    return false;
  }

  let user;

  try {
    user = jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return false;
  }
  return user;
}