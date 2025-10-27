import Input from "../base/Input";
import Button from "../base/Button";
import { useState } from "react";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";

function FormRegister() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    setError("");
    try {
      // Handle successful registration, e.g., redirect to login
    } catch (err) {
      setError("Failed to register. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800">Register</h2>
          <p className="mt-2 text-sm text-gray-600">
            Create your account
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Input
            label="Full Name"
            type="text"
            Icon={FaUser}
            onChange={(e) => setName(e.target.value)}
            value={name}
            disabled={loading}
          />
          <Input
            label="Email"
            type="email"
            Icon={FaEnvelope}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            disabled={loading}
          />
          <Input
            label="Password"
            type="password"
            Icon={FaLock}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            disabled={loading}
          />
          <Input
            label="Confirm Password"
            type="password"
            Icon={FaLock}
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            disabled={loading}
          />
          <Button className="w-full" disabled={loading}>
            {loading ? "Registering..." : "Register"}
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