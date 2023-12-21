'use client';
import styles from '@/components/new-nav/styles.module.scss';
import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { opacity, background } from './anim';
import Nav from './nav';

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Edit, ShoppingBag } from "lucide-react"
import { useShoppingCart } from "use-shopping-cart"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MainNav } from "@/components/main-nav"
export default function Header() {
    const pathname = usePathname()
    const router = useRouter();
    const searchParams = useSearchParams()
    const { cartCount } = useShoppingCart()
    const defaultSearchQuery = searchParams.get('search')
    if (pathname.startsWith("/studio")) {
        return null
    }
    const [isActive, setIsActive] = useState(false);

    const onSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault()

        const formData = new FormData(event.currentTarget)
        const searchQuery = formData.get('search') ?? " "
        router.replace(`/?search=${searchQuery}`)
    }

    return (
        <div className={styles.header}>
            <div className={styles.bar}>
                <Link href="/shop">ruthrichdesign</Link>

                <div onClick={() => { setIsActive(!isActive) }} className={styles.el}>
                    <div className={`${styles.burger} ${isActive ? styles.burgerActive : ""}`}></div>
                    <div className={styles.label}>
                        <motion.p variants={opacity} animate={!isActive ? "open" : "closed"}>Menu</motion.p>
                        <motion.p variants={opacity} animate={isActive ? "open" : "closed"}>Close</motion.p>
                    </div>
                </div>
                <form onSubmit={onSubmit} className="hidden items-center lg:inline-flex ml-5">
                    <Input
                        id="search"
                        name="search"
                        type="search"
                        autoComplete="off"
                        placeholder="Search products..."
                        className="h-9 lg:w-[300px] rounded-none outline-none border-none"
                        defaultValue={defaultSearchQuery!}
                    />
                </form>
                <motion.div variants={opacity} animate={!isActive ? "open" : "closed"} >


                    <div className={styles.shopContainer} onClick={(() => router.push("/cart"))}>

                        <p className={styles.shop}>Shop</p>
                        <div className={styles.el}>
                            <svg
                                width="19"
                                height="20"
                                viewBox="0 0 19 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.66602 1.66667H2.75449C2.9595 1.66667 3.06201 1.66667 3.1445 1.70437C3.2172 1.73759 3.2788 1.79102 3.32197 1.85829C3.37096 1.93462 3.38546 2.0361 3.41445 2.23905L3.80887 5M3.80887 5L4.68545 11.4428C4.79669 12.2604 4.85231 12.6692 5.04777 12.977C5.22 13.2481 5.46692 13.4637 5.75881 13.5978C6.09007 13.75 6.50264 13.75 7.32777 13.75H14.4593C15.2448 13.75 15.6375 13.75 15.9585 13.6087C16.2415 13.4841 16.4842 13.2832 16.6596 13.0285C16.8585 12.7397 16.9319 12.3539 17.0789 11.5823L18.1819 5.79141C18.2337 5.51984 18.2595 5.38405 18.222 5.27792C18.1892 5.18481 18.1243 5.1064 18.039 5.05668C17.9417 5 17.8035 5 17.527 5H3.80887ZM8.33268 17.5C8.33268 17.9602 7.95959 18.3333 7.49935 18.3333C7.03911 18.3333 6.66602 17.9602 6.66602 17.5C6.66602 17.0398 7.03911 16.6667 7.49935 16.6667C7.95959 16.6667 8.33268 17.0398 8.33268 17.5ZM14.9993 17.5C14.9993 17.9602 14.6263 18.3333 14.166 18.3333C13.7058 18.3333 13.3327 17.9602 13.3327 17.5C13.3327 17.0398 13.7058 16.6667 14.166 16.6667C14.6263 16.6667 14.9993 17.0398 14.9993 17.5Z" stroke="#4D3D30" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                            </svg>
                            <p>Cart {cartCount}</p>
                        </div>
                    </div>


                </motion.div>
            </div>
            <motion.div variants={background} initial="initial" animate={isActive ? "open" : "closed"} className={styles.background}></motion.div>
            <AnimatePresence mode="wait">
                {isActive && <Nav />}
            </AnimatePresence>
        </div>

    )

}