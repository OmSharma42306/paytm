"use server"
import prisma from "@repo/db/client"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth"

export async function createOnRampTransaction (provider:string,amount:number) {
    const session = await getServerSession(authOptions);
    if(!session?.user || !session.user?.id){
        return {
            message:"Unauthorized!"
        }
    }
    const token = (Math.random()*1000).toString();
    await prisma.onRampTransaction.create({
       data:{
          status:"Processing",
          startTime:new Date(),
          token:token,
          provider,                 //  Why Does Writing Just provider Work?
        //   When you write just provider, this is shorthand for provider: provider. This shorthand works only when:
          
        //   There is a local variable named provider in the same scope.
        //   You want the database column provider to take the value of that local variable.
        //   If provider exists and has a proper value, Prisma interprets it as provider: provider under the hood. The behavior should be identical, assuming the variable provider is defined.
          amount:amount*100,
          userId:Number(session?.user?.id)

        }
    }
    );

    return {
        message : "Done!"
    }
}