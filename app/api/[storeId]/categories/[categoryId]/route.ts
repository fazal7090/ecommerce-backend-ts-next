import { NextRequest, NextResponse } from "next/server";

import { getAuth } from "@clerk/nextjs/server";

import prismadb from "@/lib/prismadb";


export async function GET(
    req: Request,
    { params }: { params: { categoryId: string } }
  ) {
    try {
      if (!params.categoryId) {
        return new NextResponse("category id is required", { status: 400 });
      }
  
      const category = await prismadb.category.findUnique({
        where: {
          id: params.categoryId,
        },
        include: {
          billboard: true,
        }
        
      });
  
      return NextResponse.json(category);
    } catch (error) {
      console.log('[category_GET]', error);
      return new NextResponse("Internal error", { status: 500 });
    }
  };
  


export async function PATCH(
  req: NextRequest,
  { params }: { params: { storeId: string,categoryId:string } }
) {
  try {
    const { userId } = getAuth(req);
    const body = await req.json();

    const { name,billboardId } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Label is required", { status: 400 });
    }

    if (!billboardId) {
        return new NextResponse("BillboardiD is required", { status: 400 });
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
      

      const category = await prismadb.category.updateMany({
        where: {
          id: params.categoryId,
        },
        data: {
         name,
         billboardId
        }
      });
      

    return NextResponse.json(category);
  } catch (error) {
    console.log('[Category_PATCH]', error,450);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: { storeId: string, categoryId: string } }
  ) {
    try {
        const { userId } = getAuth(req);
  
      if (!userId) {
        return new NextResponse("Unauthenticated", { status: 401 });
      }
  
      if (!params.categoryId) {
        return new NextResponse("category id is required", { status: 400 });
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
  
      const category = await prismadb.category.deleteMany({
        where: {
          id: params.categoryId,
          
        }
      });
  
      return NextResponse.json(category);
    } catch (error) {
      console.log('[category_DELETE]', error);
      return new NextResponse("Internal error", { status: 500 });
    }
  }
  