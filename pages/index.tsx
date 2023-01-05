import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import NavBar from "../components/navbar.component";
import Content from "./content";
const firebaseConfig = {
  apiKey: "AIzaSyAEmBrmlbGWv4rDbhzaPFBXr9_CHqjRgII",
  authDomain: "daksha-astro-app.firebaseapp.com",
  projectId: "daksha-astro-app",
  storageBucket: "daksha-astro-app.appspot.com",
  messagingSenderId: "989544339154",
  appId: "1:989544339154:web:86caed226a1c813b977f0b",
  measurementId: "G-7RZMPEZK5N",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default function Home() {
  const router = useRouter();
  // useEffect(() => {
  //   onAuthStateChanged(auth, (user) => {
  //     if (user?.metadata.creationTime) {
  //       router.push("/dashboard");
  //     } else {
  //       router.push("/login");
  //     }
  //   });
  // });
  return (
    <div className={styles.container}>
      <header>
        <NavBar/>
      </header>
      <main className={styles.main}>
         <h1>Welcome to the Daksha Astro</h1>
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
