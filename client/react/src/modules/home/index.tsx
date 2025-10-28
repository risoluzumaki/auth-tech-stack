import { useEffect } from "react";
import Main from "./parts/Main";
// import { verifyUser } from "../../hooks/useMe";
import { useNavigate } from "react-router-dom";

function Home(){
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, []);
  return (
    <Main/>
  )
}

export default Home;