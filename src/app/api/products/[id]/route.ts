import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { Product } from "@/types/index";

interface Params {
  params: { id: string };
}

export async function GET(_request: Request, { params }: Params) {
  const filePath = path.join(process.cwd(), "public/api/products.json");
  const fileData = fs.readFileSync(filePath, "utf-8");
  const products: Product[] = JSON.parse(fileData);

  const id = Number(params.id);
  const product = products.find((p: Product) => p.id === id);

  if (!product) {
    return NextResponse.json({ message: "Product not found" }, { status: 404 });
  }

  return NextResponse.json(product);
}
