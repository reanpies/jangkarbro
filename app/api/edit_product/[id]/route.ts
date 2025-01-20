import { connectMongoDB } from "@/lib/MongoConnect";
import Product from "@/lib/models/Product";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { title, category, price, imageUrl } = body;

    await connectMongoDB();
    const { id } = await context.params
    const objectId = new mongoose.Types.ObjectId(id);

    const data = await Product.findByIdAndUpdate(
      objectId, 
      { title, category, price, imageUrl },
      { new: true }
    );

    return NextResponse.json({ msg: data
      ? "Updated Successfully"
      : "No matching product found to update.",
    data: data,
});
  } catch (error) {
    console.error("Error during update:", error);
    return NextResponse.json({ error, msg: "Something Went Wrong" }, { status: 400 });
  }
}