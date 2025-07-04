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

    
    const {
      name,
      price,
      categoryId,
      colorId,
      sizeId,
      images,
      isFeatured,
      isArchived,
    } = body;
    
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }
    
    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }
    
    if (!price) {
      return new NextResponse("Price is required", { status: 400 });
    }
    
    if (!categoryId) {
      return new NextResponse("Category id is required", { status: 400 });
    }
    
    if (!sizeId) {
      return new NextResponse("Size id is required", { status: 400 });
    }
    
    if (!colorId) {
      return new NextResponse("Color id is required", { status: 400 });
    }
      if (!params.storeId) {
        return new NextResponse("StoreID is required", { status: 400 });
      }

      if (!images || !images.length) {
        return new NextResponse("Images are required", { status: 400 });
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
      

    const product = await prismadb.product.create({
      data: {
        name,
        price,
        categoryId,
        colorId,
        sizeId,
        isFeatured,
        isArchived,
        storeId: params.storeId,
        images: {
          createMany: {
            data: [
              ...images.map((image: { url: string }) => image)
            ]
          }
        }
        
      }
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log('[product_POST]', error,450);
    return new NextResponse("Internal error", { status: 500 });
  }
}


export async function GET(
  req: NextRequest,
  { params }: { params: { storeId: string } }
) {
  try {
    const {searchParams} = new URL(req.url);
    const categoryId = searchParams.get("categoryId") || undefined;
    const colorId = searchParams.get("colorId") || undefined;
    const sizeId = searchParams.get("sizeId") || undefined;
    const isFeatured = searchParams.get("isFeatured");
  
    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }
  
    const products = await prismadb.product.findMany({
      where: {
        storeId: params.storeId,
        categoryId,
        colorId,
        sizeId,
        isFeatured: isFeatured ? true : undefined,
        isArchived: false,
      },
      include: {
        images: true,
        category: true,
        color: true,
        size: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return NextResponse.json(products);
  } catch (error) {
    console.log('[Products_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}  