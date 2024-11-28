"use server";
import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";

export async function P2PTransfer(number: string, paisa: number) {
  console.log("paisa , paisa", paisa);
  const session = await getServerSession(authOptions);
  if (!session?.user || !session?.user?.id) {
    return "Unauthorized!";
  }
  try {
    const user = await prisma.user.findMany({
      where: {
        number: {
          contains: number,
        },
      },
    });
    // check for non-existing number.
    if (user.length === 0) {
      return "Mobile Number not Found";
    }
    const checkAmount = await prisma.balance.findMany({
      where: {
        userId: Number(session?.user?.id),
      },
    });
    if (checkAmount) {
      console.log("hey", checkAmount);
      let senderAmount;
      checkAmount.map((sender) => {
        senderAmount = sender.amount;
      });

      console.log(senderAmount);
      if (Number(senderAmount) <= paisa) {
        console.log("Insufficient Balance.");
        return "Insufficient Balance";
      }
    }
    if (user) {
      console.log(user);
      let id;
      user.map((x) => {
        id = x.id;
      });
      console.log("user Id ", id);
      let senderId;
      checkAmount.map((sender) => {
        senderId = sender.userId;
      });
      await prisma.$transaction([
        prisma.balance.updateMany({
          where: {
            userId: id,
          },
          data: {
            amount: {
              increment: paisa,
            },
          },
        }), // updated balance
        prisma.balance.updateMany({
          where: {
            userId: Number(senderId),
          },
          data: {
            amount: {
              decrement: paisa,
            },
          },
        }),
      ]);
    }
  } catch (err) {
    return err;
  }

  return "No user found";
}
