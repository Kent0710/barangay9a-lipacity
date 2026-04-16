'use client'

import { useState } from "react";
import { signIn, signUp } from "@/actions/auth";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const LoginPage = () => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        
        const formData = new FormData();
        formData.append("username", username);
        formData.append("password", password);

        let res;
        if (isSignUp) {
            res = await signUp(formData);
        } else {
            res = await signIn(formData);
        }

        if (res?.error) {
            setError(res.error);
        }
    }

    return (
        <div className="flex h-screen w-full items-center justify-center bg-gray-50/50 p-4">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">{isSignUp ? "Sign Up" : "Sign In"}</CardTitle>
                    <CardDescription>
                        {isSignUp ? "Create a new account to get started." : "Enter your username below to login to your account."}
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleAuth}>
                    <CardContent className="space-y-4">
                        {error && <div className="text-sm font-medium text-red-500">{error}</div>}
                        <div className="space-y-2">
                            <Label htmlFor="username">Username</Label>
                            <Input 
                                id="username" 
                                type="text" 
                                placeholder="johndoe" 
                                required 
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input 
                                id="password" 
                                type="password" 
                                required 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-4">
                        <Button type="submit" className="w-full">
                            {isSignUp ? "Sign Up" : "Sign In"}
                        </Button>
                        <div className="text-center text-sm text-gray-500">
                            {isSignUp ? "Already have an account? " : "Don't have an account? "}
                            <button
                                type="button"
                                onClick={() => setIsSignUp(!isSignUp)}
                                className="underline hover:text-gray-900 focus:outline-none"
                            >
                                {isSignUp ? "Sign In" : "Sign Up"}
                            </button>
                        </div>
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
};

export default LoginPage;