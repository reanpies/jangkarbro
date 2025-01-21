"use client";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
    const handleSignIn = async () => {
        await signIn("google", { callbackUrl: "/admin/dashboard" });
    };

    return (
        <div className="bg-black min-h-screen grid place-items-center">
            <button className="bg-white px-8 py-4 flex gap-2 items-center" onClick={handleSignIn}>
                <FcGoogle size={30} /> Sign In with Google
            </button>
        </div>
    );
};

export default Login;