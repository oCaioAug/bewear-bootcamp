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

      <div className="flex flex-col space-y-6">
        {/* Image */}
        {/* <div className="h-[380px] relative w-full rounded-3xl">
          <Image src={productVariant.imageUrl} alt={productVariant.name} fill  className="object-cover"/>
        </div> */}
        <Image
          src={productVariant.imageUrl}
          alt={productVariant.name}
          sizes="100vw"
          width={0}
          height={0}
          className="h-auto w-full rounded-3xl object-cover"
        />

        <div className="px-5">
          {/* Variantes */}
          <VariantSelector
            selectedVariantSlug={productVariant.slug}
            variants={productVariant.product.variants}
          />
        </div>

        <div className="px-5">
          {/* Descricao */}
          <h2 className="text-lg font-semibold">
            {productVariant.product.name}
          </h2>
          <h3 className="text-muted-foreground text-sm">
            {productVariant.name}
          </h3>
          <h3 className="text-lg font-semibold">
            {formatCentsToBRL(productVariant.priceInCents)}
          </h3>
        </div>

        <ProductActions productVariantId={productVariant.id} />

        <div className="px-5">
          <p className="text-sm">{productVariant.product.description}</p>
        </div>

        <ProductList title="Talvez você goste" products={likelyProducts} />

        <Footer />
      </div>
    </>
  );
};

export default ProductVariantPage;
