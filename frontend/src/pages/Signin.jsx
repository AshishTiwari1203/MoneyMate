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
      <div className="flex-col bg-white rounded-lg shadow-lg p-8 max-w-md w-full items-center justify-center">
        <Heading label={"Signin"} />
        <SubHeading label={"Enter your Creadentials"} />
        {/* <InputBox placeholder="John" label={"First Name"} /> */}
        {/* <InputBox placeholder="Doe" label={"Last Name"} /> */}
        <InputBox placeholder="xyz@gmail.com" label={"Email"} />
        <InputBox placeholder="123456" label={"Password"} />

        <div className="pt-4">
          <Button label={"Signin"}  onClick={async (e)=>{
            const res = await axios.post("http://localhost:3000/api/v1/user/signin", {
              body:{
                username: email,
                password: password
              }          
            })

            //Local storage 
            localStorage.setItem("token", res.data.token);

            navigate('/dashboard')
          }}/>
        </div>
        <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
        </div>
    </div>
  );
}

