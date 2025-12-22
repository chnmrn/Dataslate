"use client";
import Image from "next/image";
import { useState } from "react";
import { register } from "@/lib/api/services";
import { useRouter } from "next/navigation";
import ParticleBackground from "@/components/ParticlesBackground";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Register Page Component
export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  // Handle user registration
  const handleRegister = async () => {
    try {
      await register(email, password, userName);
      router.push("/login"); 
    } catch (err: any) {
      setErrorMessage(err.message);
    }
  };

  return (
    <main className="relative flex items-center justify-center min-h-screen bg-transparent">
      <ParticleBackground />
      <Card className="w-full max-w-md shadow-xl border border-gray-200 dark:border-gray-800 relative z-10 bg-white/70 dark:bg-black/70">
        <div className="flex justify-center mb-2">
                    <Image
                              src="/Dataslate.png"
                              alt="Dataslate Logo"
                              width={220}
                              height={220}
                              priority
                            />
                </div>
        
        <CardHeader>
          <h2 className="text-4xl text-center">Create an account</h2>
        </CardHeader>
        <div className="flex flex-col gap-4">
        
        <CardContent className="flex flex-col gap-4">
          <Input
            type="text"
            placeholder="Username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {errorMessage && (
            <p className="text-red-400 text-sm text-center bg-red-400/10 border border-red-400/20 py-2 rounded-lg">{errorMessage}</p>
          )}

          <button className="px-4 py-2 rounded-lg font-medium bg-white/20 backdrop-blur-md text-white border border-white/30 hover:bg-white/30 transition-all active:scale-[0.97]"
                  onClick={handleRegister}>Sign Up</button>
        </CardContent>

        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-500">
            ¿Already have an account?{" "}
            <Button className="px-4 py-2 rounded-lg font-medium bg-white/20 backdrop-blur-md text-white border border-white/30 hover:bg-white/30 transition-all active:scale-[0.97]"  
                    onClick={() => router.push("/login")}>
                Log In
            </Button>
          </p>
        </CardFooter> 
          
        </div>
      </Card>
    </main>
  );
}

