import { NextRequest, NextResponse } from "next/server";

import { getAuth } from "@clerk/nextjs/server";

import prismadb from "@/lib/prismadb";


export async function GET(
    req: Request,
    { params }: { params: Promise<{ categoryId: string }> }
  ) {
    try {
      const { categoryId } = await params;
      
      if (!categoryId) {
        return new NextResponse("category id is required", { status: 400 });
      }
  
      const category = await prismadb.category.findUnique({
        where: {
          id: categoryId,
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
  { params }: { params: Promise<{ storeId: string,categoryId:string }> }
) {
  try {
    const { userId } = getAuth(req);
    const body = await req.json();
    const { storeId, categoryId } = await params;

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

    
      if (!storeId) {
        return new NextResponse("StoreID is required", { status: 400 });
      }

     

      const storeByUserId = await prismadb.store.findFirst({
        where: {
          id: storeId,
          userId
        }
      });
      
      if (!storeByUserId) {
        return new NextResponse("Unauthorized", { status: 403 });
      }
      

      const category = await prismadb.category.updateMany({
        where: {
          id: categoryId,
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
    { params }: { params: Promise<{ storeId: string, categoryId: string }> }
  ) {
    try {
        const { userId } = getAuth(req);
        const { storeId, categoryId } = await params;
  
      if (!userId) {
        return new NextResponse("Unauthenticated", { status: 401 });
      }
  
      if (!categoryId) {
        return new NextResponse("category id is required", { status: 400 });
      }

      const storeByUserId = await prismadb.store.findFirst({
        where: {
          id: storeId,
          userId
        }
      });
      
      if (!storeByUserId) {
        return new NextResponse("Unauthorized", { status: 403 });
      }
  
      const category = await prismadb.category.deleteMany({
        where: {
          id: categoryId,
          
        }
      });
  
      return NextResponse.json(category);
    } catch (error) {
      console.log('[category_DELETE]', error);
      return new NextResponse("Internal error", { status: 500 });
    }
  }
  