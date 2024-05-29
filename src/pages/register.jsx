import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../assets/4359230.jpg";
import { toast } from "react-toastify";

const Register = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const onButtonClick = async (e) => {
    e.preventDefault();
    if (email === "") {
      setEmailError("Email is required");
    }
    if (password === "") {
      setPasswordError("Password is required");
    }

    if (
      phone === "" ||
      phone.trim() === "" ||
      (phone && !/^\d+$/.test(phone))
    ) {
      setPhoneError("Phone number should in  digits");
    }
    if (username === "") {
      setUsernameError("Username is required");
    }

    if (
      email !== "" &&
      password !== "" &&
      username !== "" &&
      phone !== "" &&
      /^\d+$/.test(phone)
    ) {
      await axios
        .post(process.env.REACT_APP_API_BASE_URL + "/auth/user/signup", {
          email,
          password,
          phone,
          username,
        })
        .then((res) => {
          if (res.data.token) {
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            navigate("/stock");
          } else {
            setError("Email already exists");
            toast.error("Email already exists");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <section className="bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
        <div className="md:w-1/2 px-8 md:px-16">
          <h2 className="font-bold text-2xl text-[#002D74]">Register</h2>

          <form className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError("");
              }}
              className={`p-2 mt-8 rounded-xl border text-sm ${
                emailError ? "border-red-500" : ""
              }`}
            />
            <input
              type="text"
              placeholder="Username"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              className={`p-2 rounded-xl border w-full text-sm ${
                usernameError ? "border-red-500" : ""
              }`}
            />
            <input
              type="text"
              placeholder="Phone"
              onChange={(e) => {
                setPhone(e.target.value);
              }}
              className={`p-2 rounded-xl border w-full text-sm ${
                phoneError ? "border-red-500" : ""
              }`}
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordError("");
                }}
                className={`p-2 rounded-xl border w-full text-sm ${
                  passwordError ? "border-red-500" : ""
                }`}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="gray"
                className="bi bi-eye absolute top-1/2 right-3 -translate-y-1/2"
                viewBox="0 0 16 16"
                onClick={handleShowPassword}
              >
                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
              </svg>
            </div>
            <button
              onClick={(e) => onButtonClick(e)}
              className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300"
            >
              Register
            </button>
          </form>

          <div className="mt-5 text-xs flex justify-between items-center text-[#002D74]">
            <p>You already have an account?</p>
            <button
              className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300"
              onClick={() => navigate("/")}
            >
              Login
            </button>
          </div>
        </div>
        <div className="md:block hidden w-1/2">
          <img src={logo} alt="logo" className="rounded-2xl" />
        </div>
      </div>
    </section>
  );
};

export default Register;