const baseUrl = "localhost:5155/auth"
import * as request from './request.js'

export const logIn = async ({email,password}) => {
    try{
        let response = await fetch(`${baseUrl}/login`,{
        'method':'POST',
        'body': JSON.stringify({
        email,
        password
        })})
    }
    catch(e){
        console.log(e)
    }
}