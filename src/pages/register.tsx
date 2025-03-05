import { JSX } from "react";
import Image from "next/image";
import logo from '../../public/blockchain-logo.svg';
import Input from "@/components/layout/Input";

const RegisterPage = (): JSX.Element => {
    return (
        <div className="flex flex-col items-center justify-center">

            <Image src={logo} alt="logo" className="h-80 w-80"/>

            <div className=" pt-20">
                <h1 className="text-3xl">Register</h1>
            </div>

            <div className="flex flex-col mt-10">
                <div className="flex mb-5">
                    <p>Already have an account ? </p> 
                    <button onClick={ () => {
                            console.log("Redirect login page");
                    }} className="text-light_orange pl-3">login here !</button>
                </div>
                <Input placeholder="Email" className="mb-7 w-full"></Input>
                <Input placeholder="Username" className="mb-7 w-full"></Input>
                <Input placeholder="Password" className="mb-7 w-full" isPassword={ true }></Input>
                {/* TODO !: Place MetaMask button here */}
            </div>
            <button className="border border-light_green
                                bg-transparent rounded-full w-32 h-10 
                            hover:bg-light_green hover:text-light_orange">Submit</button>
            </div>
        );
    }

export default RegisterPage;