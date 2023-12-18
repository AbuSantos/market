"use client"

import { useState } from "react"
import { Loader2 } from "lucide-react"
import { formatCurrencyString, useShoppingCart } from "use-shopping-cart"

import { Button } from "@/components/ui/button"
import { product } from "@/sanity/schemas/product-schema"

export function CartSummary() {
  const { formattedTotalPrice, cartCount, cartDetails, totalPrice, redirectToCheckout } = useShoppingCart()
  const [isLoading, setIsLoading] = useState(false)
  // disabling the checkout button if we're loading or if we have nothing in the count
  const isDisabled = isLoading || cartCount! === 0
  const shippingAmount = cartCount! > 0 ? 500 : 0
  const totalAmount = shippingAmount + totalPrice!

  const onCheckout = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/checkout', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cartDetails)
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();
      console.log(cartDetails);

      const result = await redirectToCheckout(data.id);

      if (result?.error) {
        throw new Error(result.error.message);
      }

      setIsLoading(false);
    } catch (error) {
      console.error("Error during checkout:", error);
      setIsLoading(false);
    }
  };
  return (
    <section
      aria-labelledby="summary-heading"
      className="mt-16 rounded-lg border-2 border-gray-200 bg-gray-50 px-4 py-6 shadow-md dark:border-gray-900 dark:bg-black sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
    >
      <h2 id="summary-heading" className="text-lg font-medium">
        Order summary
      </h2>

      <dl className="mt-6 space-y-4">
        <div className="flex items-center justify-between">
          <dt className="text-sm">Subtotal</dt>
          <dd className="text-sm font-medium">{formattedTotalPrice}</dd>
        </div>
        <div className="flex items-center justify-between border-t border-gray-200 pt-4 dark:border-gray-600">
          <dt className="flex items-center text-sm">
            <span>Shipping estimate</span>
          </dt>
          <dd className="text-sm font-medium">{formatCurrencyString({ value: shippingAmount, currency: "USD" })}</dd>
        </div>
        <div className="flex items-center justify-between border-t border-gray-200 pt-4 dark:border-gray-600">
          <dt className="text-base font-medium">Order total</dt>
          <dd className="text-base font-medium">{formatCurrencyString({ value: totalAmount, currency: "USD" })}</dd>
        </div>
      </dl>

      <div className="mt-6">
        <Button onClick={onCheckout} className="w-full" disabled={isDisabled}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isLoading ? " Loading..." : "Checkout"}
        </Button>
      </div>
    </section>
  )
}
