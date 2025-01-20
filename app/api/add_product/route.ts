import { connectMongoDB } from "@/lib/MongoConnect";
import Product from "@/lib/models/Product";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    await connectMongoDB();

    const data = await Product.find();

    return NextResponse.json(data);
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