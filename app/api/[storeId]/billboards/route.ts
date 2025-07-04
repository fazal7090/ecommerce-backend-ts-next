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

    
    const { label , imageUrl } = body;

    console.log("Submitted:", { label, imageUrl });


    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!label) {
      return new NextResponse("Label is required", { status: 400 });
    }

    if (!imageUrl) {
        return new NextResponse("ImageUrl is required", { status: 400 });
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
      

    const billboard = await prismadb.billboard.create({
      data: {
        label,
        imageUrl,
        storeId: params.storeId
      }
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log('[Billboard_POST]', error,450);
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


    const billboards = await prismadb.billboard.findMany({
      where: {
        storeId: params.storeId,
      },
    });

    return NextResponse.json(billboards);
  } catch (error) {
    console.log('[Billboard_GET]', error,450);
    return new NextResponse("Internal error", { status: 500 });
  }
}