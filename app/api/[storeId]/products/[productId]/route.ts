import { NextRequest, NextResponse } from "next/server";

import { getAuth } from "@clerk/nextjs/server";

import prismadb from "@/lib/prismadb";


export async function GET(
    req: Request,
    { params }: { params: Promise<{ productId: string }> }
  ) {
    try {
      const { productId } = await params;
      
      if (!productId) {
        return new NextResponse("Product id is required", { status: 400 });
      }
  
      const product = await prismadb.product.findUnique({
        where: {
          id: productId,
        },
        include: {
          images: true,
          category: true,
          size: true,
          color: true
        }
        
      });
  
      return NextResponse.json(product);
    } catch (error) {
      console.log('[Product_GET]', error);
      return new NextResponse("Internal error", { status: 500 });
    }
  };
  


export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ storeId: string, productId: string }> }
) {
  try {
   
    const { userId } = getAuth(req);
    const body = await req.json();
    const { storeId, productId } = await params;

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
      if (!storeId) {
        return new NextResponse("StoreID is required", { status: 400 });
      }

      if (!productId) {
        return new NextResponse("productID is required", { status: 400 });
      }

      if (!images || !images.length) {
        return new NextResponse("Images are required", { status: 400 });
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
      

      await prismadb.product.update({
        where: {
          id: productId,
        },
        data: {
          name,
          price,
          categoryId,
          colorId,
          sizeId,
          isFeatured,
          isArchived,
          images: {
            deleteMany: {}, // 🔥 Deletes all associated images
          },
        },
      });
      
     const product= await prismadb.product.update({
        where: {
          id: productId,
        },
        data: {
          images: {
            createMany: {
              data: images.map((image: { url: string }) => image),
            },
          },
        },
      });
      

    return NextResponse.json(product);
  } catch (error) {
    console.log('[PRODUCT_PATCH]', error,450);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ storeId: string, productId: string }> }
  ) {
    try {
        const { userId } = getAuth(req);
        const { storeId, productId } = await params;
  
      if (!userId) {
        return new NextResponse("Unauthenticated", { status: 401 });
      }
  
      if (!productId) {
        return new NextResponse("product id is required", { status: 400 });
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
  
      const product = await prismadb.product.deleteMany({
        where: {
          id: productId,
          
        }
      });
  
      return NextResponse.json(product);
    } catch (error) {
      console.log('[product_DELETE]', error);
      return new NextResponse("Internal error", { status: 500 });
    }
  }
  