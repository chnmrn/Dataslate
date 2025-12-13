"use client";
import Image from "next/image";
import { useState } from "react";
import { register } from "@/lib/api/services";
import { useRouter } from "next/navigation";
import ParticleBackground from "@/components/ParticlesBackground";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

// Register Page Component
export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const router = useRouter();

  // Handle user registration
  const handleRegister = async () => {
    try {
      await register(email, password, userName);
      alert("Usuario creado con éxito");
      router.push("/login"); // Redirect to login page after successful registration
    } catch (err) {
      console.error("Register failed", err);
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

          <button className="px-4 py-2 rounded-lg font-medium bg-white/20 backdrop-blur-md text-white border border-white/30 hover:bg-white/30 transition-all active:scale-[0.97]"
                  onClick={handleRegister}>Sign Up</button>
        </CardContent>
          
          
        </div>
      </Card>
    </main>
  );
}

