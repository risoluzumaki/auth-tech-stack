import Input from "../base/Input";
import Button from "../base/Button";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaLock, FaEnvelope } from "react-icons/fa";
import { useLogin } from "../../hooks/useAuth";

function FormLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  
  const { mutate: login, isPending, isError, error } = useLogin();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    login(
      { email, password },
      {
        onSuccess: (data) => {
          localStorage.setItem("token", data.accesToken);
          console.log(data.accesToken);
          console.log("✅ Login success:", data);
          navigate("/home");
        },
        onError: (err) => {
          console.error("❌ Login failed:", err);
        },
      }
    );
    setEmail("");
    setPassword("");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800">Login</h2>
          <p className="mt-2 text-sm text-gray-600">Welcome back</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Email"
            type="email"
            Icon={FaEnvelope}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <Input
            label="Password"
            type="password"
            Icon={FaLock}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />

          <Button className="w-full" disabled={isPending}>
            {isPending ? "Logging in..." : "Login"}
          </Button>

          {isError && (
            <p className="text-sm text-red-500 text-center mt-2">
              {error?.message || "Login failed"}
            </p>
          )}
        </form>

        <p className="text-sm text-center text-gray-600">
          Don't have an account?{" "}
          <Link to="/register" className="font-medium text-blue-600 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default FormLogin;
