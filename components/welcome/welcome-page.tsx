import styles from './style.module.css'
import Project from './project';
import type { GetStaticProps } from 'next'
import { client } from "@/sanity/lib/client"
import { groq } from "next-sanity"
import { SanityProduct } from "@/config/inventory"
import { Product } from 'use-shopping-cart/core';

interface Props {
    products: SanityProduct[] | null,
}



export default function WelcomePage({ products }: Props) {
    //   const categoryFilter = category ? `&&  "${category}" in categories` : ""

    // const products = await client.fetch<SanityProduct[]>(groq`*[_type == "product"]{
    //     _id, createdAt, name,categories, sku, images, price, currency, description,
    //     "slug":slug.current  }`)


    const projects = [
        {
            title1: "Bobba",
            title2: "Women",
            src: "bobba.jpeg",
            link: "/sunglasses"
        },
        {
            title1: "Combats",
            title2: "Wo/Men",
            src: "cargo.jpeg",
            link: "/belts"

        },
        {
            title1: "Kaftan",
            title2: "Men",
            src: "kaftan.jpeg",
            link: "/bags"

        },
        {
            title1: "Two Piece",
            title2: "Women",
            src: "nothing_design_studio.png",
            link: "/scarves"

        },
        {
            title1: "Jumpsuits",
            title2: "Wo/Men",
            src: "jumpsuit.png",
            link: "/gloves"

        }
    ]

    return (
        <main className={styles.main}>
            <div className={styles.gallery}>
                <p>Designs for Everyone</p>
                {
                    projects.map(project => {
                        return <Project project={project} />
                    })
                }
            </div>
        </main>
    )
}





