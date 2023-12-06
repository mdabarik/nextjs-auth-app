"use client"
import Link from "next/link";
import { useState } from "react";

const RegisterForm = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !email || !password) {
            setError("All fields are required.");
            return;
        }

        try {

            /** if user exists */
            const resUserExists = await fetch("api/userExists", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email })
            });

            const { user } = await resUserExists.json();
            if (user) {
                setError("User already exists");
                return;
            }

            /* user does not exist */
            const res = await fetch("api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name, email, password
                })
            })
            console.log(res);
            if (res.ok) {
                const form = e.target;
                form.reset();
            } else {
                console.log("user registration failed");
            }
        } catch (error) {
            console.log("Error during registration failed.");
        }

    }

    return (
        <div className="grid place-items-center h-screen">
            <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400">
                <h1 className="text-xl font-bold my-4">Register</h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <input onChange={e => setName(e.target.value)} type="text" placeholder="Full Name" />
                    <input onChange={e => setEmail(e.target.value)} type="text" placeholder="Email Address" />
                    <input onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" />
                    <button type="submit" className="bg-green-500 text-white font-bold cursor-pointer px-6 py-2">Register</button>

                    {
                        error ?
                            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                                {error}
                            </div>
                            : ""
                    }

                    <Link className="text-sm mt-3 text-right" href="/">{"Already have an Account?"}
                        <span className="underline">Login</span>
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default RegisterForm;