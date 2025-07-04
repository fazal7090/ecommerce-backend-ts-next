import { NextRequest, NextResponse } from "next/server";

import { getAuth } from "@clerk/nextjs/server";

import prismadb from "@/lib/prismadb";


export async function GET(
    req: Request,
    { params }: { params: { colorId: string } }
  ) {
    try {
      if (!params.colorId) {
        return new NextResponse("colorId id is required", { status: 400 });
      }
  
      const color = await prismadb.color.findUnique({
        where: {
          id: params.colorId,
        },
      });
  
      return NextResponse.json(color);
    } catch (error) {
      console.log('[colorId_GET]', error);
      return new NextResponse("Internal error", { status: 500 });
    }
  };
  


export async function PATCH(
  req: NextRequest,
  { params }: { params: { storeId: string, colorId: string } }
) {
  try {
    const { userId } = getAuth(req);
    const body = await req.json();

    const { name , value } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!value) {
        return new NextResponse("value is required", { status: 400 });
      }

      if (!params.colorId) {
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
      

      const color = await prismadb.color.updateMany({
        where: {
          id: params.colorId,
        },
        data: {
          name,
          value
        }
      });
      

    return NextResponse.json(color);
  } catch (error) {
    console.log('colore_PATCH]', error,450);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: { storeId: string, colorId: string } }
  ) {
    try {
        const { userId } = getAuth(req);
  
      if (!userId) {
        return new NextResponse("Unauthenticated", { status: 401 });
      }
  
      if (!params.colorId) {
        return new NextResponse("Color id is required", { status: 400 });
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
  
      const color = await prismadb.color.deleteMany({
        where: {
          id: params.colorId,
          
        }
      });
  
      return NextResponse.json(color);
    } catch (error) {
      console.log('[COLOR_DELETE]', error);
      return new NextResponse("Internal error", { status: 500 });
    }
  }
  