import { ProductGallery } from "@/components/product-gallery"
import { ProductGrid } from "@/components/product-grid"
import { ProductInfo } from "@/components/product-info"
import { SanityProduct } from "@/config/inventory"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { client } from "@/sanity/lib/client"
import { groq } from "next-sanity"

interface Props {
    params: {
        categories: string,
    },
}
const page = async ({ params }: Props) => {
    console.log(params.categories);

    const products = await client.fetch<SanityProduct>(groq`*[_type == "product" && "${params.categories}" in categories]{
        _id,
        _createdAt, 
        sku,
        images, 
        price, 
        description, 
        "id":_id,name,
         currency,
         colors,
         categories,
         sizes,
         "slug":slug.current
        }`)
    // console.log(product);

    return (
        <main className="mx-auto max-w-6xl px-6 mt-16">
            <div className="px-4 pt-20 text-center">
                <h1 className="text-4xl font-extrabold tracking-normal">{params.categories}</h1>
                <p className="mx-auto mt-4 max-w-3xl text-base">{siteConfig.description}</p>
            </div>
            <section aria-labelledby="products-heading" className="pb-24 pt-6">
                <h2 id="products-heading" className="sr-only">
                    Products
                </h2>
                <div className={cn("grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4")}>
                    {/* Product grid */}
                    <ProductGrid products={products} />
                </div>
            </section>
        </main>
    )
}

export default page