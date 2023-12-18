"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { formatCurrencyString, useShoppingCart } from "use-shopping-cart"

import { SanityProduct } from "@/config/inventory"
import { getSizeName } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

interface Props {
  product: SanityProduct
}

export function ProductInfo({ product }: Props) {
  const { name, description, price, sizes } = product
  const [selectSize, setSelectedSize] = useState(product.sizes[0])
  const { addItem, incrementItem, cartDetails } = useShoppingCart()
  const isInCart = !!cartDetails?.[product._id]
  const { toast } = useToast()

  function addToCart() {
    const item = {
      ...product,
      product_data: {
        size: selectSize,
      }
    }

    isInCart ? incrementItem(item._id) : addItem(item)
    toast({
      title: `${item.name} (${getSizeName(selectSize)})`,
      description: "Product added to Cart",
      action: (<Link href="/cart">
        <Button variant="link" className="gap-x-2 whitespace-nowrap">
          <span>open cart</span>
          <ArrowRight className="h-5 w-5" />
        </Button>
      </Link>)
    })
  }

  return (
    <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
      <h1 className="text-3xl font-bold tracking-tight">{name}</h1>

      <div className="mt-3">
        <h2 className="sr-only">Product information</h2>
        <p className="text-3xl tracking-tight">{formatCurrencyString({ currency: "USD", value: price })}</p>
      </div>

      <div className="mt-6">
        <h3 className="sr-only">Description</h3>
        <div className="space-y-6 text-base">{description}</div>
      </div>

      <div className="mt-4">
        <p>
          Size: <strong>{getSizeName(selectSize)}</strong>
        </p>
        {sizes.map((size) => (
          <Button
            onClick={() => setSelectedSize(size)}
            variant={selectSize === size ? "default" : "outline"}
            key={size} className="mr-2 mt-4">
            {getSizeName(size)}
          </Button>
        ))}
      </div>

      <form className="mt-6">
        <div className="mt-4 flex">
          <Button
            onClick={addToCart}
            type="button"
            className="w-full bg-violet-600 py-6 text-base font-medium text-white hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500"
          >
            Add to cart
          </Button>
        </div>
      </form>
    </div>
  )
}
