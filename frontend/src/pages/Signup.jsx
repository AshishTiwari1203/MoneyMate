import { useState } from 'react'
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom"

export default function Signup() {
  const [firstname, setFirstname] = useState("")
  const [lastname, setLastname] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate();
  
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full items-center justify-center">
        <button
          onClick={() => navigate('/')}
          className="absolute top-4 right-4 bg-gray-800 text-white px-4 py-2 rounded">
          Home
        </button>
        <Heading label={"Signup"} />
        <SubHeading label={"Enter your information to create an account"} />
        <InputBox placeholder="John" label={"First Name"} onChange={e =>{
          setFirstname(e.target.value);
        }   
        }/>
        <InputBox placeholder="Doe" label={"Last Name"} onChange={e =>{
          setLastname(e.target.value);
        }   
        }/>
        <InputBox placeholder="xyz@gmail.com" label={"Email"} onChange={e =>{
          setEmail(e.target.value);
        }   
        }/>
        <InputBox placeholder="123456" label={"Password"} onChange={e =>{
          setPassword(e.target.value);
        }   
        }/>
        <div className="pt-4">
          <Button label={"signup"} onClick={async (e)=>{
            try {
            const res = await axios.post("https://moneymate-681h.onrender.com/api/v1/user/signup", {
              username: email,
              FirstName: firstname,
              LastName: lastname,
              password: password
            });

            // Storing the Token in Local storage
            localStorage.setItem("token", res.data.token);

            // If Signed up success
            navigate('/dashboard');

          } catch (error) {
            console.error("There was an error signing up!", error);
            // Handle the error, e.g., show a message to the user
          }

      }}/>
        </div>
        <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
      </div>
      
    </div>
  );
}
