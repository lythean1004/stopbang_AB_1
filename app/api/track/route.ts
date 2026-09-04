import { NextResponse } from "next/server";
export async function POST(request:Request){const event=await request.json();console.log("[ab-track]",event);return NextResponse.json({ok:true},{status:200})}
