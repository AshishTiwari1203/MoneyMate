import { BottomWarning } from "../components/BottomWarning";
import { useState } from "react";  // Import useState
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom"

export default function Signin() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center h-screen">
      <div>{email}</div>

      <div>{password}</div>
      <div className="flex-col bg-white rounded-lg shadow-lg p-8 max-w-md w-full items-center justify-center">
        <Heading label={"Signin"} />
        <SubHeading label={"Enter your Creadentials"} />
        {/* <InputBox placeholder="John" label={"First Name"} /> */}
        {/* <InputBox placeholder="Doe" label={"Last Name"} /> */}
        <InputBox placeholder="xyz@gmail.com" label={"Email"} onChange={e =>{
          setEmail(e.target.value);
        }   
        }/>
        <InputBox placeholder="123456" label={"Password"} onChange={e =>{
          setPassword(e.target.value);
        }   
        }/>

        <div className="pt-4">
          <Button label={"Sign in"} onClick={async (e)=>{
            try {
            const res = await axios.post("http://localhost:3000/api/v1/user/login", {
              username: email,
              password: password
            });

            // Storing the Token in Local storage
            localStorage.setItem("token", res.data.token);

            // If Signed up success
            navigate('/dashboard');

          } catch (error) {
            console.error("There was an error Login!", error);
            // Handle the error, e.g., show a message to the user
          }

      }}/>
        </div>
        <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
        </div>
    </div>
  );
}

