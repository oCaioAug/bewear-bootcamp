import { eq } from "drizzle-orm";
import Image from "next/image";
import { notFound } from "next/navigation";

import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
import ProductList from "@/components/common/products-list";
import { Button } from "@/components/ui/button";
import { db } from "@/db";
import { productTable, productVariantTable } from "@/db/schema";
import { formatCentsToBRL } from "@/helpers/money";

import QuantitySelector from "./components/quantity-selector";
import VariantSelector from "./components/variant-selector";

interface ProductVariantPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] }>;
}

const ProductVariantPage = async ({
  params,
  searchParams,
}: ProductVariantPageProps) => {
  const { slug } = await params;
  const productVariant = await db.query.productVariantTable.findFirst({
    where: eq(productVariantTable.slug, slug),
    with: {
      products: {
        with: {
          variants: true,
        },
      },
    },
  });

  if (!productVariant) {
    return notFound();
  }

  const likelyProducts = await db.query.productTable.findMany({
    where: eq(productTable.categoryId, productVariant.products.categoryId),
    with: {
      variants: true,
    },
  });

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
            variants={productVariant.products.variants}
          />
        </div>

        <div className="px-5">
          {/* Descricao */}
          <h2 className="text-lg font-semibold">
            {productVariant.products.name}
          </h2>
          <h3 className="text-muted-foreground text-sm">
            {productVariant.name}
          </h3>
          <h3 className="text-lg font-semibold">
            {formatCentsToBRL(productVariant.priceInCents)}
          </h3>
        </div>

        <div className="px-5">
          {/* Quantidade */}
          <QuantitySelector />
        </div>

        <div className="flex flex-col space-y-4 px-5">
          {/* Botoes */}
          <Button
            className="rounded-full border font-semibold"
            size="lg"
            variant="ghost"
          >
            Adicionar ao Carrinho
          </Button>
          <Button className="rounded-full font-semibold" size="lg">
            Comprar Agora
          </Button>
        </div>

        <div className="px-5">
          <p className="text-sm">{productVariant.products.description}</p>
        </div>

        <ProductList title="Talvez você goste" products={likelyProducts} />

        <Footer />
      </div>
    </>
  );
};

export default ProductVariantPage;
