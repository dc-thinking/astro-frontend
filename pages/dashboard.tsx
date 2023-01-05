import { initializeApp } from "firebase/app";
import { getAuth, signOut } from "firebase/auth";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import UserProfile from "../components/userprofile.component";

type UserData = {
  id: string;
  firstName: string;
  lastName: string;
  emailID: string;
  mobileNumber: string;
  placeOfBirth: string;
  motherName: string;
  fatherName: string;
  dateOfBirth: Date;
  timeOfBirth: Date;
  stateOfBirth: string;
  countryOfBirth: string;
  birthLocationLat: string;
  birthLocationLong: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
};

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

export default function Dashboard() {
  const router = useRouter();
  const [user, SetUser] = useState<UserData>();
  const [error, SetError] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    fetch(
      process.env.NEXT_PUBLIC_APP_SERVER_BASE_URL +
        "userprofile/" +
        auth.currentUser?.email
    )
      .then((response) => response.json())
      .then((data) => {
        SetUser(data.data);
      });
  }, []);

  const onSignOutClicked = async (e) => {
    e.preventDefault();
    signOut(auth)
      .then(() => {
        router.push("/login");
      })
      .catch(() => {
        setErrorMessage("Unable to do logout");
      });
  };
  const onGoogleButtonClicked = async () => {
    const response = await fetch(
      "https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants%20in%20Sydney&key=AIzaSyAecPz6c8gaHuJTA5YhgmUyNoQpt_dmFqM"
    );
    alert(response.json());
  };
  return (
    <div>
      {user?.firstName ? (
        <p>
          Welcome {user?.firstName} {user?.lastName}, Please find your details
          below.
        </p>
      ) : (
        <div>
          <p>
            Hi {auth.currentUser?.email}, Please complete your profile to get
            the horoscopic data
          </p>
          <UserProfile googleUserData={{ auth }} />
        </div>
      )}

      <button onClick={onSignOutClicked}>Logout</button>
      <button onClick={onGoogleButtonClicked}>Check</button>
      <label>{errorMessage}</label>
    </div>
  );
}
