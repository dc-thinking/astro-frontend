import Link from "next/link";
import loginStyles from "../styles/Login.module.css";
import moment from "moment";
import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
} from "firebase/auth";
import { use, useEffect, useRef, useState } from "react";
import { auth } from "firebaseui";
import { Button, Modal } from "react-bootstrap";

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

type formattedAddress = {
  birthPlace: string;
  birthDistrict: string;
  birthState: string;
  birthCountry: string;
  birthLat: string;
  birthLong: string;
};

export default function UserProfile({ googleUserData }) {
  const emailEl = useRef(null);
  const firstNameEl = useRef(null);
  const lastNameEl = useRef(null);
  const mobileNumberEl = useRef(null);
  const placeofBirthEl = useRef(null);
  const motherNameEl = useRef(null);
  const fatherNameEl = useRef(null);
  const dateOfBirthEl = useRef(null);
  const timeOfBirthEl = useRef(null);
  const stateOfBirthEl = useRef(null);
  const countryOfBirthEl = useRef(null);
  const latEl = useRef(null);
  const longEl = useRef(null);

  const [userAddress, setUserAddress] = useState<formattedAddress>();
  const [show, setShow] = useState(false);

  useEffect(() => {
    emailEl.current = "dinydroid@gmail.com";
  }, []);

  const doRenderPlaceSelectionModal = () => {
    setShow(true);
    return (
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Select birthplace</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Modal body text goes herre</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary">Close</Button>
          <Button variant="primary">Save changes</Button>
        </Modal.Footer>
      </Modal>
    );
  };

  const onProfileUpdateButtonClicked = () => {
    const userProfile = {
      firstName: firstNameEl.current?.value,
      lastName: lastNameEl.current?.value || " ",
      emailID: emailEl.current?.value || googleUserData.currentUser?.email,
      mobileNumber: mobileNumberEl.current?.vlaue,
      placeOfBirth: placeofBirthEl.current?.value,
      motherName: motherNameEl.current?.value,
      fatherName: fatherNameEl.current?.value,
      dateOfBirth: new Date(dateOfBirthEl.current?.value),
      timeOfBirth: moment(new Date(timeOfBirthEl.current?.value)).format(
        "hh:mm:ss a"
      ),
      stateOfBirth: stateOfBirthEl.current?.value,
      countryOfBirth: countryOfBirthEl.current?.value,
      birthLocationLat: latEl.current?.value,
      birthLocationLong: longEl.current?.value,
    };
    fetch(process.env.NEXT_PUBLIC_APP_SERVER_BASE_URL + "userprofile/", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userProfile),
    })
      .then((response) => response.json)
      .then((data) =>
        console.log("Data updated successfully:" + JSON.stringify(data))
      )
      .catch(() => alert("Unable to create user"));
  };

  const onSearchButtonClicked = async () => {
    const response = await fetch(
      process.env.NEXT_PUBLIC_APP_SERVER_BASE_URL +
        "birthplace/" +
        placeofBirthEl.current?.value || ""
    );

    const addressData = await response.json();
    setUserAddress(addressData);

    placeofBirthEl.current.value = userAddress?.birthPlace || "";
    stateOfBirthEl.current.value = userAddress?.birthState || "";
    countryOfBirthEl.current.value = userAddress?.birthCountry || "";
    latEl.current.value = userAddress?.birthLat || "";
    longEl.current.value = userAddress?.birthLong || "";
  };

  return (
    <form
      className={loginStyles.loginFrame}
      onSubmit={onProfileUpdateButtonClicked}
    >
      <input
        className={loginStyles.formFields}
        type={"text"}
        placeholder="Enter firstname"
        ref={firstNameEl}
        required
      />
      <input
        className={loginStyles.formFields}
        type={"text"}
        placeholder="Enter lastname"
        ref={lastNameEl}
      />
      <input
        className={loginStyles.formFields}
        type={"email"}
        placeholder="Enter emailID"
        ref={emailEl}
        required
      />
      <input
        className={loginStyles.formFields}
        type={"text"}
        placeholder="Enter mobilenumber"
        ref={mobileNumberEl}
        required
      />
      <input
        className={loginStyles.formFields}
        type={"text"}
        placeholder="Enter placeofbirth"
        ref={placeofBirthEl}
        required
      />
      <button onClick={doRenderPlaceSelectionModal}>Get Details</button>
      <input
        className={loginStyles.formFields}
        type={"text"}
        placeholder="Enter motherName"
        ref={motherNameEl}
        required
      />
      <input
        className={loginStyles.formFields}
        type={"text"}
        placeholder="Enter fatherName"
        ref={fatherNameEl}
        required
      />
      <input
        className={loginStyles.formFields}
        type={"date"}
        placeholder="Enter DOB"
        ref={dateOfBirthEl}
        required
      />
      <input
        className={loginStyles.formFields}
        type={"time"}
        placeholder="Enter Timeofbirth"
        ref={timeOfBirthEl}
        required
      />
      <input
        className={loginStyles.formFields}
        type={"text"}
        placeholder="Enter stateofbirth"
        ref={stateOfBirthEl}
        required
      />
      <input
        className={loginStyles.formFields}
        type={"text"}
        placeholder="Enter countryofbirth"
        ref={countryOfBirthEl}
        required
      />
      <input
        className={loginStyles.formFields}
        type={"text"}
        placeholder="Enter location latitude"
        ref={latEl}
        required
      />
      <input
        className={loginStyles.formFields}
        type={"text"}
        placeholder="Enter location longitude"
        ref={longEl}
        required
      />
      <button
        className={loginStyles.formFields}
        type={"submit"}
        onClick={onProfileUpdateButtonClicked}
      >
        Submit
      </button>
    </form>
  );
}
