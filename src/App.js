import { useState } from "react";

import './App.css';

import Linkedin from "./artifacts/contracts/Linkedin.sol/Linkedin.json";
import Navbar from "./Navbar";
const ethers = require("ethers");

const linkedContract = "0x62c4Bb7Ec10Ea78b2371914C4798B224DF81bbae";

function App() {
  

  const [user, setUser] = useState({
    name: "",
    surname: "",
    age: 0,
    email: ""
  });

  // Requests access to the user's Meta Mask Account
  // https://metamask.io/
  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  const updateFirstname = (firstname) => {
    setUser(previousState => {
      return { ...previousState, name: firstname }
    });
  }

  const updateSurname = (surname) => {
    setUser(previousState => {
      return { ...previousState, surname: surname }
    });
  }

  const updateAge = (age) => {
    setUser(previousState => {
      return { ...previousState, age: age }
    });
  }

  const updateEmail = (email) => {
    setUser(previousState => {
      return { ...previousState, email: email }
    });
  }

  async function registerUser() {
    console.log(user)

      
    if (typeof window.ethereum !== null) {
      await requestAccount();
      const provider = new ethers.BrowserProvider(window.ethereum)
      const signer = await provider.getSigner();
      //const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(
        linkedContract,
        Linkedin.abi,
        signer
      );
      try {
       
         const data = await contract.registerUser(user.name, user.surname, user.age, user.email);
        // console.log("data: ", data);
      } catch (error) {
        console.log("Error: ", error);
      }
    }
  }
  


  return (
    
    <div className="App">
      <Navbar />
      <div className="App-header">
      <div className="description">
          <h1>Registration</h1>
        </div>
        <div className="firstname">
                    <label className="form__label" >First Name </label>
                    <input className="form__input" type="text" onChange={(e) => updateFirstname(e.target.value)} placeholder="First Name"/>
        </div>
        <div className="surname">
                    <label className="form__label" >First Name </label>
                    <input className="form__input" type="text" onChange={(e) => updateSurname(e.target.value)} placeholder="Family Name"/>
        </div>
        <div className="age">
                    <label className="form__label" >Age</label>
                    <input className="form__input" type="text" onChange={(e) => updateAge(e.target.value)} placeholder="Age"/>
        </div>
        <div className="email">
                    <label className="form__label" >First Name </label>
                    <input className="form__input" type="text" onChange={(e) => updateEmail(e.target.value)} placeholder="E-mail"/>
        </div>
        <div className="custom-buttons">
        <button onClick={registerUser} style={{ backgroundColor: "red" }}>
            Register
          </button>
          </div>
      </div>
    </div>
  );
}

export default App;
