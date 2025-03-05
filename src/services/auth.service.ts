import axios from "axios";

interface RegisterData {
    username: string;
    email: string;
    password: string;
}

export default async function Register(data: RegisterData) {
    const res = await axios.post(
        "http://localhost:8000/register",
        {
            username: data.username,
            email: data.email,
            password: data.password,
        },
        {
            headers: {
                'Content-type': "application/json",
            },
        },
    );

    console.log(res);
    return res;
}