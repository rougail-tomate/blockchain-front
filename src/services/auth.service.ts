import { UserStore } from "@stores/user.store";
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

interface TokenRefresh {
    access_token: string;
    refresh_token: string;
}

export async function refreshAccessToken() {

}

export async function Register(data: RegisterData, store: UserStore) {
    try {
        const res = await axios.post(
            "http://localhost:8000/register",
            {
                username: data.username,
                email: data.email,
                password: data.password,
                id_metamask: store.metamaskId
            },
            {
                headers: {
                    'Content-type': "application/json",
                },
            },
        );
        store.userId = res.data.id
        store.email = res.data.email;
        store.password = data.password;
        store.username = res.data.username;
        console.log(res)
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

export async function Login(data: LoginData, store: UserStore) {
    try {
        const res = await axios.post(
            "http://localhost:8000/login",
            {
                username: data.username,
                password: data.password,
            },
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            }
        );
        store.username = data.username
        store.password = data.password
        store.access_token = res.data.access_token;
        store.refresh_token = res.data.refresh_token
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