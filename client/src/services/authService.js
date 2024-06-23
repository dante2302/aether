const baseUrl = "http://localhost:5155/auth"
import * as request from './request.js'

export const signUp = async (bodyData) => {
    try{
        console.log(await fetch(`http://localhost:5155/channels/225edfba-a7d4-4c62-a795-2275848821ad`))
        const response = await fetch(`${baseUrl}/signup`, {
            method: 'POST',
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(bodyData)
        })
        return response;
    }
    catch(e)
    {
        console.log(e);
    }
}

export const logIn = async ({ email, password }) => {
    try{
        let response = await fetch(`${baseUrl}/login`,{
        'method':'POST',
        'body': JSON.stringify({
        email,
        password
        })})
        return response;
    }
    catch(e){
        console.log(e)
    }
}