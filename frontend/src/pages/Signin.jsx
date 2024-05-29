import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";

export default function Signin() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex-col bg-white rounded-lg shadow-lg p-8 max-w-md w-full items-center justify-center">
        <Heading label={"Signin"} />
        <SubHeading label={"Enter your Creadentials"} />
        <InputBox placeholder="John" label={"First Name"} />
        <InputBox placeholder="Doe" label={"Last Name"} />
        <InputBox placeholder="xyz@gmail.com" label={"Email"} />
        <InputBox placeholder="123456" label={"Password"} />
        <div className="pt-4">
          <Button label={"Signin"} />
        </div>
        {/* <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} /> */}
      </div>
    </div>
  );
}
