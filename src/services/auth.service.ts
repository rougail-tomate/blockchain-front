import axios from "axios";

interface RegisterData {
    username: string;
    email: string;
    password: string;
}

interface LoginData {
    username: string;
    password: string;
}

export async function Register(data: RegisterData) {
    try {
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
    } catch(error) {
        if (axios.isAxiosError(error)) {
            console.error("Login error:", error.response?.data || error.message);

            return {
                success: false,
                status: error.response?.status || 500,
                message: error.response?.data?.message || "An unexpected error occurred.",
            };
        } else {
            console.error("Unexpected error:", error);
            return {
                success: false,
                status: 500,
                message: "Something went wrong. Please try again later.",
            };
        }
    }
}

export async function Login(data: LoginData) {
    try {
        const res = await axios.post(
            "http://localhost:8000/login",
            {
                username: data.username,
                password: data.password,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        console.log(res);
        return res;

    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("Login error:", error.response?.data || error.message);

            return {
                success: false,
                status: error.response?.status || 500,
                message: error.response?.data?.message || "An unexpected error occurred.",
            };
        } else {
            console.error("Unexpected error:", error);
            return {
                success: false,
                status: 500,
                message: "Something went wrong. Please try again later.",
            };
        }
    }
}