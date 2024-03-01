import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import useAPI from "../hooks/useAPI";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { auth } = useAuth();
  const { api } = useAPI();

  useEffect(() => {
    setLoading(true);
    const fetchProfile = async () => {
      try {
        const response = await api.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/profile/${auth?.user?.id}`
        );

        setUser(response?.data?.user);
        setPosts(response?.data?.posts);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
        console.log(error);
      }
    };
    fetchProfile();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="text-2xl font-bold">
        Welcome <span className="text-blue-500">{user?.firstName}</span>!
      </div>
      <h1>You have {posts?.length} posts</h1>
    </>
  );
};

export default ProfilePage;
