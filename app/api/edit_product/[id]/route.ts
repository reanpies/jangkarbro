import { connectMongoDB } from "@/lib/MongoConnect";
import Product from "@/lib/models/Product";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { title, category, price, imageUrl } = body;

    await connectMongoDB();
    const data = await Product.findByIdAndUpdate(context.params.id, {
      title,
      category,
      price,
      imageUrl
    });

    return NextResponse.json({ msg: "Updated Successfully", data });
  } catch (error) {
    return NextResponse.json({ error, msg: "Something Went Wrong" }, { status: 400 });
  }
}