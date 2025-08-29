import { NextRequest, NextResponse } from "next/server";

import { getAuth } from "@clerk/nextjs/server";

import prismadb from "@/lib/prismadb";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ storeId: string }> }
) {
  try {
    
    const { userId } = getAuth(req);
    const body = await req.json();
    const { storeId } = await params;

    
    const { name,billboardId } = body;

    

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!billboardId) {
        return new NextResponse("BillboardId is required", { status: 400 });
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
      

    const category = await prismadb.category.create({
      data: {
        name,
        billboardId,
        storeId: storeId
      }
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log('[Category_POST]', error,450);
    return new NextResponse("Internal error", { status: 500 });
  }
}


export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ storeId: string }> }
) {
  try {
    const { storeId } = await params;
 
      if (!storeId) {
        return new NextResponse("StoreID is required", { status: 400 });
      }


    const categories  = await prismadb.category.findMany({
      where: {
        storeId: storeId,
      },
    });

    return NextResponse.json(categories);
  } catch (error) {
    console.log('[categories_GET]', error,450);
    return new NextResponse("Internal error", { status: 500 });
  }
}