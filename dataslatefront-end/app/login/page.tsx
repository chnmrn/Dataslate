"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/lib/api/services";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ParticleBackground from "@/components/ParticlesBackground";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      const data = await login(email, password);

      localStorage.setItem("token", data.token);
      router.push("/dashboard");
    } catch (err) {
      console.error("Login failed", err);
      alert("Email or password incorrect");
    } finally {
      setLoading(false);
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
          <h1 className="text-4xl text-center">Welcome to Dataslate!</h1>
          <p className="text-center text-sm text-gray-500">
            Please log in to access the platform.
          </p>
        </CardHeader>

        <CardContent className="flex flex-col gap-4">
          <Input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button className="px-4 py-2 rounded-lg font-medium bg-white/20 backdrop-blur-md text-white border border-white/30 hover:bg-white/30 transition-all active:scale-[0.97]"
                  onClick={handleLogin} disabled={loading}>
                  {loading ? (
                  <span className="animate-pulse">Logging in...</span>
                    ) : (
                      "Login"
                    )}
          </Button>
        </CardContent>

        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-500">
            ¿You don't have an account?{" "}
            <Button className="px-4 py-2 rounded-lg font-medium bg-white/20 backdrop-blur-md text-white border border-white/30 hover:bg-white/30 transition-all active:scale-[0.97]"  
                    onClick={() => router.push("/register")}>
                Sign In
            </Button>
          </p>
        </CardFooter>
      </Card>
    </main>
  );
}

