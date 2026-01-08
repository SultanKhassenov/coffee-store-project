import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  const filePath = path.join(process.cwd(), "public/api/products.json");
  const fileData = fs.readFileSync(filePath, "utf-8");
  const products = JSON.parse(fileData);

  return NextResponse.json(products);
}
