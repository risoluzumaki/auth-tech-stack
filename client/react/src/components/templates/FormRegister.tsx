import Input from "../base/Input";
import Button from "../base/Button";
import { useState } from "react";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useRegister } from "../../hooks/useAuth";

function FormRegister() {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { mutate: registerUser, isPending, isError, error: mutationError } = useRegister();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError("");

    registerUser(
      { username, name, email, password },
      {
        onSuccess: (data) => {
          console.log("✅ Register success:", data);
          navigate("/"); // balik ke login
        },
        onError: (err: any) => {
          console.error("❌ Register failed:", err);
          setError(err?.response?.data?.message || "Failed to register");
        },
      }
    );
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800">Register</h2>
          <p className="mt-2 text-sm text-gray-600">Create your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {(error || isError) && (
            <p className="text-red-500 text-sm">
              {error || (mutationError as any)?.response?.data?.message}
            </p>
          )}

          <Input
            label="Username"
            type="text"
            Icon={FaUser}
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            disabled={isPending}
          />

          <Input
            label="Full Name"
            type="text"
            Icon={FaUser}
            onChange={(e) => setName(e.target.value)}
            value={name}
            disabled={isPending}
          />

          <Input
            label="Email"
            type="email"
            Icon={FaEnvelope}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            disabled={isPending}
          />

          <Input
            label="Password"
            type="password"
            Icon={FaLock}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            disabled={isPending}
          />

          <Input
            label="Confirm Password"
            type="password"
            Icon={FaLock}
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            disabled={isPending}
          />

          <Button className="w-full" disabled={isPending}>
            {isPending ? "Registering..." : "Register"}
          </Button>
        </form>

        <p className="text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/" className="font-medium text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default FormRegister;