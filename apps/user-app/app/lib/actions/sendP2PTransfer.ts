"use server"
import prisma from "@repo/db/client"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth"

export async function P2PTransfer(number:string,paisa:number){
    console.log("paisa , paisa",paisa);
    const session = await getServerSession(authOptions);
    if(!session?.user || !session?.user?.id){
        return "Unauthorized!";
    }

    const user = await prisma.user.findMany({
        where:{
            number:{
                contains:number
            },
        }
    })
    if(user){
        // just get the user id and update the amount sended by user.
        let id;
        user.map((x)=>{
            id = x.id;
         })
        console.log(user);
        console.log("amount: ",paisa)
        await prisma.balance.update({
            where:{
                userId:id,
            },
            data:{
                amount:paisa,
            }
        })
        console.log("hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii",user);
        return {user}
    }

    
    return "No user found";
    
}