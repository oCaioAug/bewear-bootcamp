import Image from "next/image";
import { notFound } from "next/navigation";

import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
import ProductList from "@/components/common/products-list";
import { getProductVariantWithProduct } from "@/data/product-variants/get";
import { getProductsByCategoryId } from "@/data/products/get";
import { formatCentsToBRL } from "@/helpers/money";

import ProductActions from "./components/product-actions";
import VariantSelector from "./components/variant-selector";

interface ProductVariantPageProps {
  params: Promise<{ slug: string }>;
}

const ProductVariantPage = async ({ params }: ProductVariantPageProps) => {
  const { slug } = await params;
  const productVariant = await getProductVariantWithProduct(slug);

  if (!productVariant) {
    return notFound();
  }

  const likelyProducts = await getProductsByCategoryId(
    productVariant.product.categoryId,
  );

  return (
    <>
      <Header />

      <div className="flex flex-col space-y-6 lg:px-5">
        {/* Image */}
        {/* <div className="h-[380px] relative w-full rounded-3xl">
          <Image src={productVariant.imageUrl} alt={productVariant.name} fill  className="object-cover"/>
        </div> */}
        <div className="space-y-6 lg:flex lg:gap-4 lg:px-5 lg:justify-between">
          <div className="px-5 lg:px-0 lg:w-4/7">
            <Image
            src={productVariant.imageUrl}
            alt={productVariant.name}
            sizes="100vw"
            width={0}
            height={0}
            className="h-full w-full rounded-3xl lg:w-auto"
          />
          </div>
          <div className=" lg:flex lg:w-full lg:flex-col lg:space-y-6">
            <div className="px-5 lg:hidden">
              {/* Variantes */}
              <VariantSelector
                selectedVariantSlug={productVariant.slug}
                variants={productVariant.product.variants}
              />
            </div>

            <div className="space-y-6 lg:flex lg:h-full lg:flex-col">
              <div className="px-5 lg:flex lg:flex-col lg:space-y-6">
                {/* Descricao */}
                <div className="">
                  <h2 className="text-lg font-semibold lg:text-4xl">
                    {productVariant.product.name}
                  </h2>
                  <h3 className="text-muted-foreground text-sm lg:text-lg">
                    {productVariant.name}
                  </h3>
                </div>

                <h3 className="text-lg font-semibold  lg:text-2xl">
                  {formatCentsToBRL(productVariant.priceInCents)}
                </h3>

                <div className="hidden lg:flex ">
                  {/* Variantes */}
                  <VariantSelector
                    selectedVariantSlug={productVariant.slug}
                    variants={productVariant.product.variants}
                  />
                </div>
              </div>

              <div className=" lg:px-5">
                <ProductActions productVariantId={productVariant.id} />
              </div>

              <div className="px-5">
                <p className="text-sm">{productVariant.product.description}</p>
              </div>
            </div>
          </div>
        </div>

        <ProductList title="Talvez você goste" products={likelyProducts} />

        <Footer />
      </div>
    </>
  );
};

export default ProductVariantPage;
