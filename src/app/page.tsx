import Image from "next/image";

import CategorySelector from "@/components/common/category-selector";
import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
import ProductList from "@/components/common/products-list";
import { getCategories } from "@/data/categories/get";
import {
  getNewlyCreatedProducts,
  getProductsWithVariants,
} from "@/data/products/get";

export default async function Home() {
  const [products, newlyCreatedProducts, categories] = await Promise.all([
    getProductsWithVariants(),
    getNewlyCreatedProducts(),
    getCategories(),
  ]);

  return (
    <>
      <Header />
      <div className="hidden lg:block">
        <div className="px-5 lg:px-20">
          <CategorySelector categories={categories} />
        </div>
      </div>
      <div className="space-y-6 lg:space-y-12">
        {/* Banner principal - responsivo */}
        <div className="px-5 lg:px-20">
          {/* Banner para mobile */}
          <Image
            src="/banner-01.png"
            alt="Leve uma vida com estilo"
            width={0}
            height={0}
            sizes="100vw"
            className="h-auto w-full lg:hidden"
          />
          {/* Banner para desktop */}
          <Image
            src="/banner-01-desktop.png"
            alt="Leve uma vida com estilo"
            width={0}
            height={0}
            sizes="100vw"
            className="hidden h-auto w-full lg:block"
          />
        </div>

        <div className="lg:px-20">
          <ProductList title="Mais vendidos" products={products} />
        </div>

        <div className="px-5 lg:hidden">
          <CategorySelector categories={categories} />
        </div>

        <div className="hidden px-5 lg:grid lg:grid-cols-5 lg:grid-rows-4 lg:gap-8 lg:px-18 lg:py-15">
          {/* Banner inferior - apenas mobile */}
          <Image
            src="/banner-02.png"
            alt="Leve uma vida com estilo"
            width={0}
            height={0}
            sizes="100vw"
            className="h-auto w-full lg:hidden"
          />

          <Image
            src="/tenis-01.png"
            alt="Leve uma vida com estilo"
            width={0}
            height={0}
            sizes="100vw"
            className="hidden h-full w-full rounded-lg object-cover lg:col-span-2 lg:row-span-2 lg:block"
            loading="lazy"
          />

          <Image
            src="/tenis-02.png"
            alt="Leve uma vida com estilo"
            width={0}
            height={0}
            sizes="100vw"
            className="hidden h-full w-full rounded-lg object-cover lg:col-span-2 lg:col-start-1 lg:row-span-2 lg:row-start-3 lg:block"
            loading="lazy"
          />

          <div className="rounded-lg lg:col-span-3 lg:row-span-4 lg:row-start-1 lg:col-start-3 lg:flex lg:items-center">
            <Image
              src="/banner-03.png"
              alt="Leve uma vida com estilo"
              width={0}
              height={0}
              sizes="100vw"
              className="hidden h-full w-full lg:block"
              loading="lazy"
            />
          </div>
        </div>

        <div className="lg:hidden">
          <ProductList title="Novidades" products={newlyCreatedProducts} />
        </div>

        <Footer />
      </div>
    </>
  );
}
