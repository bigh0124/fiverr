import React, { useState } from "react";
import "./Register.scss";
import { useNavigate } from "react-router-dom";
import upload from "../../utils/upload";
import newRequest from "../../utils/request";
const Register = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    img: "",
    country: "",
    phone: "",
    desc: "",
    isSeller: false,
  });
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name === "isSeller") {
      setUser((prev) => ({ ...prev, isSeller: e.target.checked }));
    } else {
      setUser((prev) => {
        return { ...prev, [e.target.name]: e.target.value };
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = await upload(file);
      await newRequest.post("auth/register", { ...user, img: url });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  console.log(user);
  return (
    <div className="register">
      <form onSubmit={handleSubmit}>
        <div className="left">
          <h1>Create a new account</h1>
          <label htmlFor="">Username</label>
          <input name="username" type="text" placeholder="johndoe" onChange={handleChange} autoComplete="off" />
          <label htmlFor="">Email</label>
          <input name="email" type="email" placeholder="email" onChange={handleChange} autoComplete="off" />
          <label htmlFor="">Password</label>
          <input name="password" type="password" onChange={handleChange} autoComplete="off" />
          <label htmlFor="">Profile Picture</label>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
          <label htmlFor="">Country</label>
          <input name="country" type="text" placeholder="Usa" onChange={handleChange} autoComplete="off" />
          <button type="submit">Register</button>
        </div>
        <div className="right">
          <h1>I want to become a seller</h1>
          <div className="toggle">
            <label htmlFor="">Activate the seller account</label>
            <label className="switch">
              <input type="checkbox" name="isSeller" onChange={handleChange} />
              <span className="slider round"></span>
            </label>
          </div>
          <label htmlFor="">Phone Number</label>
          <input name="phone" type="text" placeholder="+1 234 567 89" onChange={handleChange} autoComplete="off" />
          <label htmlFor="">Description</label>
          <textarea
            placeholder="A short description of yourself"
            name="desc"
            id=""
            cols="30"
            rows="10"
            onChange={handleChange}
          ></textarea>
        </div>
      </form>
    </div>
  );
};

export default Register;
