import React, { useEffect, useState } from "react";
import "./Login.scss";
import newRequest from "../../utils/request";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) navigate("/");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await newRequest.post("/auth/login", {
        username,
        password,
      });
      const { data } = res;
      localStorage.setItem("currentUser", JSON.stringify(data));
      navigate("/");
    } catch (err) {
      setError(err.response.data);
      console.log(err);
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <h1>Sign in</h1>
        <label htmlFor="">Username</label>
        <input
          name="username"
          type="text"
          autoComplete="none"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />

        <label htmlFor="">Password</label>
        <input name="password" type="password" onChange={(e) => setPassword(e.target.value)} value={password} />
        <button type="submit">Login</button>
        {error && error}
      </form>
    </div>
  );
}

export default Login;
