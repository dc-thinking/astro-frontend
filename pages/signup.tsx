import Link from "next/link";
import loginStyles from "../styles/Login.module.css";
import moment from "moment";
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { useRef, useState } from "react";
import UserProfile from "../components/userprofile.component";
import { Button, Form } from "react-bootstrap";

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

export default function Signup() {
  const emailEl = useRef(null);
  const passwordEl = useRef(null);

  const [isSignUpCompleted, setSignUpCompleted] = useState(false);

  const onSignUpWithEmailAndPasswordClicked = async () => {
    const emailField = emailEl.current || { value: "" };
    const passwordField = passwordEl.current || { value: "" };
    const signUpResponse = await createUserWithEmailAndPassword(
      auth,
      emailField.value,
      passwordField.value
    );
    if (signUpResponse != null) {
      setSignUpCompleted(true);
      console.log(signUpResponse.user.email);
    }
  };
  const doRenderSignUpFormV1 = () => {
    return (
      <Form
        className="mx-auto  d-flex flex-column align-items.center justify-content-center"
        style={{ width: 500 }}
        onSubmit={onSignUpWithEmailAndPasswordClicked}
      >
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" ref={emailEl} />
          <Form.Text className="text-muted">
            Your email is safe with us
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            ref={passwordEl}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Signup with Email
        </Button>
      </Form>
    );
  };
  const doRenderSignUpForm = () => {
    return (
      <div className={loginStyles.loginFrame}>
        <p>Please complete the below sign-up form</p>
        <input
          className={loginStyles.formFields}
          ref={emailEl}
          type={"email"}
          placeholder="Enter email"
        />
        <input
          className={loginStyles.formFields}
          ref={passwordEl}
          type={"password"}
          placeholder="Enter passwrod"
        />
        <Button
          variant="primary"
          className={loginStyles.formFields}
          onClick={onSignUpWithEmailAndPasswordClicked}
        >
          SignUp With Email
        </Button>
      </div>
    );
  };

  const doRenderUserProfileForm = () => {
    return <UserProfile googleUserData={{ auth }} />;
  };
  return (
    <div>
      {isSignUpCompleted ? doRenderUserProfileForm() : doRenderSignUpFormV1()}
    </div>
  );
}
