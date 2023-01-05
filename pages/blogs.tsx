import { initializeApp } from "firebase/app";
import { getAuth, signOut } from "firebase/auth";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import NavBar from "../components/navbar.component";


export default function Blog() {
return (
    <div className={styles.container}>
      <header>
        <NavBar/>
      </header>
      <main className={styles.main}>
         <h1>Welcome to the Daksha Astro blogs</h1>
      </main>
      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}
