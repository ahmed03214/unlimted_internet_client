import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const Home = () => {
  const [success, setSuccess] = useState(null);
  const [querys, setQuerys] = useState({});
  const { query } = useRouter();

  useEffect(() => {
    if (!Object.keys(query)?.length) return;

    const data = Object.fromEntries(new URLSearchParams(query));

    setQuerys(data);
  }, [query]);

  useEffect(() => {
    if (!Object.keys(querys)?.length) return;

    axios
      .post("http://localhost:3000/auth/add-user", {
        oauth_token: querys.oauth_token,
        oauth_token_secret: querys.oauth_token_secret,
        user_id: querys.user_id,
      }) //
      .then(() => setSuccess(true));
  }, [querys]);

  return (
    <article className="bg-dark text-light w-100 vh-100 pb-3">
      {success && (
        <p className="bg-success text-light d-block mx-auto mb-3 p-2 rounded w-fit">
          تم اضافة الحساب قم بأضافة حساب اخر
        </p>
      )}

      <div className="login h-100 flex-center">
        <a
          className="text-light text-decoration-none btn btn-success"
          href="http://localhost:3000/auth/twitter"
        >
          login
        </a>
      </div>
    </article>
  );
};

export default Home;