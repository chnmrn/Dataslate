"use client";
import { useState } from "react";
import { login } from "@/lib/api/services";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

// Login Page Component
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  // Handle user login
  const handleLogin = async () => {
    try {
      const data = await login(email, password);
      localStorage.setItem("token", data.token);
      router.push("/Home"); // Redirect to Home page after successful login
    } catch (err) {
      console.error("Login failed", err);
    }
  };

  const goToRegister = () => {
    router.push("/register"); // Navigate to the register page
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-[400px]">
        <CardHeader>
          <h2 className="text-xl font-bold">Sign in to Dataslate</h2>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
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
          <Button onClick={handleLogin}>Login</Button>
          <Button variant="outline" onClick={goToRegister}>
            Register
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}

