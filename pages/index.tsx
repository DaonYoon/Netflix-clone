import useCurrentUser from "@/hooks/useCurrentUser";
import { NextPageContext } from "next";
import { getSession, signOut } from "next-auth/react";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

const Home = () => {
  const { data: user } = useCurrentUser();

  return (
    <>
      <h1 className="text-white">test</h1>
      <p className="text-white">Logged In as : {user?.email}</p>
      <button
        className="h-10 w-full bg-white"
        onClick={() => {
          signOut();
        }}
      >
        Logout
      </button>
    </>
  );
};

export default Home;
