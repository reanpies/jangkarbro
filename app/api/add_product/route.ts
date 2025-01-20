import { connectMongoDB } from "@/lib/MongoConnect";
import Product from "@/lib/models/Product";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { imageUrl, id, title, category, price } = body;

    await connectMongoDB();

    const data = await Product.create({
      imageUrl, id, title, category, price
    });

    return NextResponse.json({msg: "Added successfully", data });
  } catch (error) {
    return NextResponse.json(
      {
        error,
        msg: "Something Went Wrong",
      },
      { status: 400 }
    );
  }
}