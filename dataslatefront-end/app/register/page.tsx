"use client";
import { useState } from "react";
import { register } from "@/lib/api/services";
import { useRouter } from "next/navigation";

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
      router.push("/"); // Redirect to login page after successful registration
    } catch (err) {
      console.error("Register failed", err);
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-background">
      <div className="flex flex-col gap-4 w-[400px]">
        <h2 className="text-xl font-bold">Create an account</h2>
        <input
          type="text"
          placeholder="Nombre de usuario"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleRegister}>Sign Up</button>
      </div>
    </main>
  );
}

