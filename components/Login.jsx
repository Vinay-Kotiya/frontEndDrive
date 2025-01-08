import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import user from "../../drive_MEN/models/user.model";
// import dotenv from "dotenv";
// dotenv.config();
const Login = () => {
  // const [username, setUserName] = useState("");
  // const [password, setPassword] = useState("");
  // const navigate = useNavigate();
  // const updateHandler = (e) => {
  //   e.preventDefault();
  //   axios
  //     .post("http://localhost:3333/user/login", { username, password })
  //     .then((result) => {
  //       console.log(result);
  //       navigate("/home");
  //     })
  //     .catch((error) => console.log(error));
  // };
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Track loading state
  const [error, setError] = useState(null); // Track error state
  const navigate = useNavigate();

  const updateHandler = (e) => {
    e.preventDefault();

    // Basic form validation
    if (!username || !password) {
      setError("Both fields are required.");
      return;
    }

    setLoading(true); // Start loading
    setError(null); // Reset previous errors

    axios
      .post(
        // `${process.env.DRIVE_API_URL}/user/login`,
        "https://drivecloneapi.vercel.app/user/login",
        { username, password },
        {
          withCredentials: true, // Include cookies with the request
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((result) => {
        setLoading(false); // Stop loading
        // console.log(result);

        // Store token in localStorage (for simplicity here, can also use cookies)
        // if (result.data.token) {
        //   localStorage.setItem("token", result.data.token); // Store JWT token
        // }

        // Redirect to the home page
        navigate("/home");
      })
      .catch((error) => {
        setLoading(false); // Stop loading
        console.error(error);

        // Show a user-friendly error message
        setError("Login failed. Please check your credentials.");
      });
  };
  const cheackHandler = () => {
    // if()
  };
  return (
    <>
      <div className="bg-gray-100 dark:bg-gray-800 flex items-center justify-center h-screen w-screen">
        <form className="max-w-sm mx-auto w-96" onSubmit={updateHandler}>
          <div className="mb-5">
            <label
              htmlFor="username"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your Username
            </label>
            <input
              type="text"
              id="username"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="john doe"
              name="username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              required
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your password
            </label>
            <input
              type="password"
              id="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              placeholder="********"
              name="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          {/* <!-- <div className="flex items-start mb-5">
        <div className="flex items-center h-5">
          <input
            id="remember"
            type="checkbox"
            value=""
            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
            required
          />
        </div>
        <label
          htmlFor="remember"
          className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >Remember me</label
        >
      </div> --> */}
          <button
            type="submit"
            onClick={cheackHandler}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
          <a href="/user/register" className="text-blue-500 mt-3 flex">
            Create an Account.?
          </a>
        </form>

        {/* <script src="https://cdn.jsdelivr.net/npm/flowbite@2.5.2/dist/flowbite.min.js"></script> */}
      </div>
    </>
  );
};

export default Login;
