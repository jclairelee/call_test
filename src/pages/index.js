import Link from "next/link";
import "../styles/globals.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const Home = () => {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true); // Set isMounted to true when the component is mounted

    // Cleanup function to set isMounted to false when the component is unmounted
    return () => {
      setIsMounted(false);
    };
  }, []);

  const handleMatchButtonClick = () => {
    if (isMounted) {
      router.push("/ChatRoom");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 text-white bg-gray-800 w-full h-full">
      <button
        className="border p-3 hover:bg-blue-500 m-auto color-white text-4xl cursor-pointer rounded-lg"
        onClick={handleMatchButtonClick}
      >
        Match
      </button>
    </main>
  );
};

export default Home;
