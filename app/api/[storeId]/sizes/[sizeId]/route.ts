import { NextRequest, NextResponse } from "next/server";

import { getAuth } from "@clerk/nextjs/server";

import prismadb from "@/lib/prismadb";


export async function GET(
    req: Request,
    { params }: { params: { sizeId: string } }
  ) {
    try {
      if (!params.sizeId) {
        return new NextResponse("sizeId id is required", { status: 400 });
      }
  
      const size = await prismadb.size.findUnique({
        where: {
          id: params.sizeId,
        },
      });
  
      return NextResponse.json(size);
    } catch (error) {
      console.log('[sizeId_GET]', error);
      return new NextResponse("Internal error", { status: 500 });
    }
  };
  


export async function PATCH(
  req: NextRequest,
  { params }: { params: { storeId: string, sizeId: string } }
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

      if (!params.sizeId) {
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
      

      const size = await prismadb.size.updateMany({
        where: {
          id: params.sizeId,
        },
        data: {
          name,
          value
        }
      });
      

    return NextResponse.json(size);
  } catch (error) {
    console.log('[size_PATCH]', error,450);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: { storeId: string, sizeId: string } }
  ) {
    try {
        const { userId } = getAuth(req);
  
      if (!userId) {
        return new NextResponse("Unauthenticated", { status: 401 });
      }
  
      if (!params.sizeId) {
        return new NextResponse("Size id is required", { status: 400 });
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
  
      const size = await prismadb.size.deleteMany({
        where: {
          id: params.sizeId,
          
        }
      });
  
      return NextResponse.json(size);
    } catch (error) {
      console.log('[SIZE_DELETE]', error);
      return new NextResponse("Internal error", { status: 500 });
    }
  }
  