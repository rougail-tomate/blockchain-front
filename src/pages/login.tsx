import { JSX, useState } from "react";
import logo from '../../public/blockchain-logo.svg';
import Image from "next/image";
import { useRouter } from "next/router";
import Input from "@/components/layout/Input";
import { Login } from "services/auth.service";
import { useUserStore } from "@/providers/user-store.provider";
import Button from "@/components/common/Button";

const LoginPage = (): JSX.Element => {
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });

    const [error, setError] = useState(false);

    const store = useUserStore((state) => state);

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

            <div>
                {error && <h1 className="text-red-500">Error: wrong email or password !</h1>}
            </div>

            <div className="flex flex-col mt-10">
                <div className="flex mb-5">
                    <p>Don't have an account ? </p> 
                    <button onClick={ () => {
                        router.push("/register");
                    }} className="text-light_orange pl-3">Register here !</button>
                </div>
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
            <Button 
                onClick={ async () => {
                    const res = await Login({
                        username: formData.username,
                        password: formData.password
                    }, store);
                    
                    if (res.status == 200)
                        router.push("/");
                    else {
                        setError(true);
                    } 
                }}>Submit</Button>
        </div>
    );
}

export default LoginPage;