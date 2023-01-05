import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import formStyles from '../styles/Form.module.css';
import { Formik } from 'formik';
import loginStyles from '../styles/Login.module.css';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import styles from "../styles/Home.module.css";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import  Form  from "react-bootstrap/Form";
import { Button, NavLink } from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import NavBar from "../components/navbar.component";
import Image from "next/image";

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

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const onLoginButtonClicked = async (e) => {
    e.preventDefault();
    if (auth.currentUser) {
      router.push("/dashboard");
    } else {
      const loginResoponse = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (loginResoponse != null && loginResoponse.user.email != null) {
        router.push("/dashboard");
      } else {
        console.log("Login failed");
      }
    }
  };

  const renderLoginForm = () => {
    return(
      <Col>
        <Formik 
          initialValues={{email:'',password:''}} 
          validate={values => {
             const errors = {};
             if(!values.email){
              errors.email = 'Required';
             }else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)){
              errors.email = 'Invalid email address';
             }

             if(!values.password){
              errors.password = 'Required';
             }
             return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              }) => (
                <Form className={formStyles.form}>
                  <Form.Group className={formStyles.formHeader}>
                    <Form.Label title="Login">Login</Form.Label>
                  </Form.Group>
                  <Form.Group className={formStyles.formGroup} controlId="formBasicEmailId">
                      <Form.Label>Email ID</Form.Label>
                      <Form.Control 
                        type="email" 
                        name="email" 
                        onChange={handleChange} 
                        onBlur={handleBlur} 
                        value={values.email}
                        placeholder="Enter email"
                      />
                      <Form.Text className="text-muted">
                        {errors.email && touched.email && errors.email}
                      </Form.Text>
                  </Form.Group>
          
                  <Form.Group className={formStyles.formGroup} controlId="formBasicPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control 
                        type="password"
                        name="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                        placeholder="Enter password"/>
                      <Form.Text muted>
                        {errors.password && touched.password && errors.password}
                      </Form.Text>
                  </Form.Group>

                  <Form.Group className={formStyles.formFooter} controlId="formSubmit">
                    <Button 
                      variant="outline-primary" 
                      type="submit" 
                      className="mb-2" 
                      onClick={onLoginButtonClicked}
                      disabled={isSubmitting}>
                      Login Wih Email
                    </Button>
                  </Form.Group>
                  <Form.Group className={formStyles.formFooter} controlId="formSubmit">
                    <Button type="submit" className="mb-2" onClick={onLoginButtonClicked}>
                      SignUp Wih Email
                    </Button>
                  </Form.Group>
                  <Form.Group className={formStyles.formFooter} controlId="formSubmit">
                    <NavLink className="mb-2" onClick={onLoginButtonClicked}>
                    Forgot Password
                    </NavLink>
                  </Form.Group>
                </Form>
              )}
          </Formik>
      </Col>
      
    )
  }

  const renderNextLoginForm = () =>{
    return(
      <div className={styles.container}>
      <header>
        <NavBar/>
      </header>
      <main className={styles.main}>
         <h1>Welcome to the Daksha Astro Login page</h1>
      </main>
      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" Dinesh "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
    );
  }
  return (
    <div>
      {renderNextLoginForm()}
    </div>
  );
}
