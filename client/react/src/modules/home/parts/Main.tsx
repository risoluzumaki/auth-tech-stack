import ProfileCard from "../../../components/templates/ProfileCard";
import { verifyUser } from "../../../hooks/useMe";

function Main () {
  const {data, isLoading, isError, error} = verifyUser();
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;
  console.log(data);
  return(
    <ProfileCard username={data.username} name={data.name} email={data.email} />
  )
}

export default Main;