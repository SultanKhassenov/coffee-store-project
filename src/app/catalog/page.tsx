"use client";

import Footer from "@/components/layout/footer/Footer";
import CatalogSection from "@/components/sections/catalog/CatalogSection";

export default function CatalogPage() {
  return (
    <>
      <section className="my-20">
        <CatalogSection />
      </section>
      <Footer />
    </>
  );
}
