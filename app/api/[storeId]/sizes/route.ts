import { NextRequest, NextResponse } from "next/server";

import { getAuth } from "@clerk/nextjs/server";

import prismadb from "@/lib/prismadb";

export async function POST(
  req: NextRequest,
  { params }: { params: { storeId: string } }
) {
  try {
    
    const { userId } = getAuth(req);
    const body = await req.json();

    
    const { name,value } = body;

  


    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!name) {
      return new NextResponse("name is required", { status: 400 });
    }

    if (!value) {
        return new NextResponse("value is required", { status: 400 });
      }

    
      if (!params.storeId) {
        return new NextResponse("StoreID is required", { status: 400 });
      }

      const storeByUserId = await prismadb.store.findFirst({
        where: {
          id: params.storeId,
          userId
        }
      });
      
      if (!storeByUserId) {
        return new NextResponse("Unauthorized", { status: 403 });
      }
      

    const size  = await prismadb.size.create({
      data: {
        name,
        value,
        storeId: params.storeId
    }});

    return NextResponse.json(size);
  } catch (error) {
    console.log('[size_POST]', error,450);
    return new NextResponse("Internal error", { status: 500 });
  }
}


export async function GET(
  req: NextRequest,
  { params }: { params: { storeId: string } }
) {
  try {
 
      if (!params.storeId) {
        return new NextResponse("StoreID is required", { status: 400 });
      }


    const size = await prismadb.size.findMany({
      where: {
        storeId: params.storeId,
      },
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log('size_GET]', error,450);
    return new NextResponse("Internal error", { status: 500 });
  }
}