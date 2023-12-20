'use client'
import styles from './style.module.css'
import Project from './project';

export default function WelcomePage() {

    const projects = [
        {
            title1: "Bubba",
            title2: "Women",
            src: "bobba.jpeg"
        },
        {
            title1: "Cargo Pants",
            title2: "Wo/Men",
            src: "cargo.jpeg"
        },
        {
            title1: "Kaftan",
            title2: "Men",
            src: "kaftan.jpeg"
        },
        {
            title1: "Two Piece",
            title2: "Women",
            src: "nothing_design_studio.png"
        },
        {
            title1: "Jumpsuit",
            title2: "Women",
            src: "jumpsuit.png"
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
