import { JSX, useState } from "react";
import Image from "next/image";
import logo from '../../public/blockchain-logo.svg';
import Input from "@/components/layout/Input";
import { Register } from "services/auth.service";
import { useRouter } from "next/router";

const RegisterPage = (): JSX.Element => {
    const [formData, setFormData] = useState({
        email: "",
        username: "",
        password: ""
    });

    const router = useRouter();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
        setFormData({
            ...formData,
            [fieldName]: e.target.value
        });
    };

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
                        router.push("/login");
                    }} className="text-light_orange pl-3">Login here !</button>
                </div>
                <Input 
                    placeholder="Email"
                    className="mb-7 w-full"
                    value={ formData.email }
                    onChange={ (e) => handleInputChange(e, "email") } />

                <Input 
                    placeholder="Username" 
                    className="mb-7 w-full"
                    value={ formData.username }
                    onChange={ (e) => handleInputChange(e, "username") } />

                <Input 
                    placeholder="Password"
                    className="mb-7 w-full"
                    value={ formData.password }
                    onChange={ (e) => handleInputChange(e, "password") } 
                    isPassword={ true } />

                {/* TODO !: Place MetaMask button here */}
            </div>
            <button 
                className="border border-light_green
                            bg-transparent rounded-full w-32 h-10 
                            hover:bg-light_green hover:text-light_orange"
                onClick={ async () => {
                    const res = await Register({
                        email: formData.email,
                        username: formData.username,
                        password: formData.password
                    });
                    
                    if (res.status == 200)
                        router.push("/");

                }}>Submit</button>
        </div>
     );
}

export default RegisterPage;