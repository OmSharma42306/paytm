"use client"
import { useState } from "react"
import prisma from "@repo/db/client";
import { P2PTransfer } from "../../lib/actions/sendP2PTransfer";
import { type } from "os";

export default function(){
    const [number,setNumber] = useState(0);
    const [amount,setAmount] = useState(0);
    console.log("Number: ",number);
    console.log("Amount:",amount)

    return <div>
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
  <div className="bg-white p-6 rounded-lg shadow-md w-96">
    <h1 className="text-xl font-semibold mb-4">Send</h1>
    <div className="space-y-4">
      <div>
        <label htmlFor="number" className="block text-sm font-medium text-gray-700">Number</label>
        <input
          type="text"
          id="number"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Enter number"
          onChange={(e)=>{setNumber(Number(e.target.value))}}
        />
      </div>
      <div>
        <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount</label>
        <input
          onChange={(e)=>{setAmount(Number(e.target.value))}}
          type="text"
          id="amount"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Enter amount"
        />
      </div>
    </div>
    <button
      type="button"
      className="mt-6 w-full bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
    onClick={async ()=>{
      P2PTransfer(number.toString(),amount);
    }}>
      Send
    </button>
  </div>
</div>
        
    </div>
}