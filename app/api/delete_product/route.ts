import { connectMongoDB } from "@/lib/MongoConnect";
import Product from "@/lib/models/Product";
import { NextRequest, NextResponse } from "next/server";
import { unlink } from 'fs/promises';
import path from 'path';

export async function DELETE(request: NextRequest) {
  try {
    const { id, imageUrl } = await request.json();
    
    await connectMongoDB();
    await Product.findByIdAndDelete(id);

    // Delete the image file if it exists in uploads
    if (imageUrl) {
      try {
        const imagePath = path.join(process.cwd(), 'public', imageUrl);
        await unlink(imagePath);
      } catch (error) {
        console.error('Error deleting image file:', error);
        // Continue even if image deletion fails
      }
    }

    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Error deleting product" },
      { status: 500 }
    );
  }
}