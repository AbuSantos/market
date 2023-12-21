'use client';
import styles from './styles.module.scss';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { height } from './anim';
import Body from './body';
import Images from './images';

const links = [
    {
        title: "Home",
        href: "/shop",
        src: "1.jpg"
    },
    {
        title: "Shop",
        href: "/shop",
        src: "shop.png"
    },
    {
        title: "About Us",
        href: "/about",
        src: "home.png"
    },
    {
        title: "Contact Us",
        href: "/contactus",
        src: "home.png"
    },


]

export default function Nav() {

    const [selectedLink, setSelectedLink] = useState({ isActive: false, index: 0 });
    const selectedSrc = selectedLink.index !== null && selectedLink.index !== undefined
        ? links[selectedLink.index].src
        : null;
    return (
        <motion.div variants={height} initial="initial" animate="enter" exit="exit" className={styles.nav}>
            <div className={styles.wrapper}>
                <div className={styles.container}>
                    <Body links={links} selectedLink={selectedLink} setSelectedLink={setSelectedLink} />
                </div>
                <Images src={selectedSrc} isActive={selectedLink.isActive} />
            </div>
        </motion.div>
    )
}