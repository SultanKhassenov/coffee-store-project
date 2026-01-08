"use client";

import { useGetProductByIdQuery } from "@/store/api/productsApi";
import { notFound } from "next/navigation";
import ProductCard from "@/components/product/ProductCard";
import Footer from "@/components/layout/footer/Footer";
import CartSidebar from "@/components/layout/cart/CartSidebar";

export default function ProductPageClient({ id }: { id: number }) {
  const { data: product, isLoading } = useGetProductByIdQuery(id);

  if (isLoading) return null;
  if (!product) return notFound();

  return (
    <>
        <section className="flex flex-row w-[95%] space-x-4 mx-auto">
            <div className="min-md:w-3/4">                
                <ProductCard product={product} />
            </div>
            <CartSidebar />
        </section>
        
        <Footer />
    </>
  );
}
