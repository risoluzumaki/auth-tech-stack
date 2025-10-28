import Button from "../base/Button";
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt } from 'react-icons/fa';

type ProfileCardProps = {
  username: string;
  name: string;
  email: string;
};

export default function ProfileCard({ username, name, email }: ProfileCardProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white border border-gray-200 rounded-lg shadow-md">
        <div className="flex flex-col items-center">
          <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={`https://ui-avatars.com/api/?name=${name}&background=random`} alt={name} />
          <h1 className="mb-1 text-xl font-medium text-gray-900">Welcome, {username}</h1>
          <span className="text-sm text-gray-500">{email}</span>
          <div className="mt-4">
            <p className="text-sm text-gray-700">Name: {name}</p>
          </div>
          <div className="flex mt-6 space-x-3">
            <Button onClick={handleLogout} className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300">
              <FaSignOutAlt className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
        <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">This is an experimental version.</p>
        </div>
      </div>
    </div>
  );
}