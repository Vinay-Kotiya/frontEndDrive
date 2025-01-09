import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  // alert("login successful");
  //   const uploadButton = document.getElementById("upload-button");
  //   const pop = document.querySelector(".pop");
  //   const closeFile = document.querySelector("#close-file");
  //   uploadButton.addEventListener("click", () => {});
  //   closeFile.addEventListener("click", () => {});
  const showPop = () => {
    const pop = document.querySelector(".pop");
    pop.style.display = "flex";
  };
  const hiddenPop = () => {
    const pop = document.querySelector(".pop");
    pop.style.display = "none";
  };
  const showLoader = () => {
    const pop = document.querySelector(".loader");
    pop.style.display = "flex";
  };
  const hiddenLoader = () => {
    const pop = document.querySelector(".loader");
    pop.style.display = "none";
  };

  const [files, setFiles] = useState([]);
  const [uploadFile, setUploadFile] = useState(null);
  const [username, setUsername] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://drivecloneapi.vercel.app/home",
          {
            withCredentials: true, // Include cookies with the request
          }
        );
        // console.log("Data received:", response.data);
        setFiles(response.data.files);
        setUsername(response.data.username);
      } catch (error) {
        console.error(
          "Error vinay  :",
          error.response ? error.response.data : error.message
        );
        navigate("/user/login");

        console.log("Unauthorized token is empty Login Please");
      }
    };

    fetchData();

    // axios
    //   .get("http://localhost:3333/home")
    //   .then((result) => setFiles(result.data))
    //   .catch((error) => console.log(error));
  }, []);
  const uploadHandler = async (e) => {
    e.preventDefault();

    // console.log(uploadFile);
    const formData = new FormData();
    formData.append("uploadfile", uploadFile);

    try {
      showLoader();
      const response = await axios.post(
        "https://drivecloneapi.vercel.app/upload",
        formData,
        {
          withCredentials: true, // Include cookies with the request
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // console.log("Data received:", response.data);

      // setFiles((prevItem) => [...prevItem, ...response.data]);
      console.log(files);
      hiddenLoader();
      window.location.reload();
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
    }
  };
  var downLoadHandler = async (id) => {
    // e.preventDefault();
    // console.log("Downloading file", id);

    try {
      // console.log("Downloading file", id);
      showLoader();
      const response = await axios.get(
        `https://drivecloneapi.vercel.app/download/${id}`,
        {
          withCredentials: true,
        }
      );
      // console.log("Data received:", response.data);
      window.location.href = response.data;
      hiddenLoader();
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
    }
  };
  // console.log(files);
  const logoutHandler = async () => {
    try {
      showLoader();
      const response = await axios.get(
        "https://drivecloneapi.vercel.app/user/logout",
        {
          withCredentials: true,
        }
      );
      // console.log(response.data);
      hiddenLoader();
      navigate("/user/login");
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message // Fixed typo in "message"
      );
    }
  };

  return (
    <>
      <div className="relative w-full">
        <div className="loader hidden flex absolute h-screen w-full  items-center justify-center">
          <div className="w-16 h-16 border-4 border-black border-dashed rounded-full animate-spin">
            <img src="https://www.svgrepo.com/show/199956/loading-loader.svg" />
          </div>
        </div>
        <main className="container  rounded   mx-auto min-h-screen h-screen p-4 w-full">
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 rounded p-2 text-white font-bold"
              id="upload-button"
              onClick={showPop}
            >
              Upload File
            </button>
            <h1 className="lg:text-2xl font-bold text-center text-sm">
              Welcome ,
              <span className="text-blue-600 underline">{username}</span>
            </h1>
            <button
              className="text-white bg-red-500 font-bold right-0 hover:bg-red-800 rounded p-2"
              onClick={() => {
                logoutHandler();
              }}
            >
              Logout
            </button>
          </div>

          <div className="pop hidden bg-black   fixed top-0 left-0 flex items-center justify-center h-screen w-full">
            <div className="bg-white p-4 rounded-lg relative">
              {/* <button
              className="text-gray-700 hover:bg-gray-200 rounded p-2 right-0 bottom-4 absolute   text-2xl font-bold"
              id="close-file"
              onClick={hiddenPop}
            >
              <i className="ri-close-fill"></i>
            </button> */}
              <form
                // action="/upload"
                onSubmit={uploadHandler}
                // method="post"
                encType="multipart/form-data"
              >
                <div className="flex items-center justify-center w-96 z-50">
                  <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span>
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        SVG, PNG, JPG or GIF (MAX. 800x400px)
                      </p>
                    </div>
                    <input
                      id="dropzone-file"
                      type="file"
                      className="hidden"
                      name="file"
                      onChange={(e) => setUploadFile(e.target.files[0])}
                      required
                    />
                  </label>
                </div>
                <button
                  className="bg-gray-600 hover:bg-gray-800 rounded p-4 mt-3 text-white font-bold"
                  id="upload-file"
                  type="submit"
                  onClick={hiddenPop}
                >
                  Upload File
                </button>
                <button
                  // className="text-gray-700 bg-red-400 hover:bg-red-700 rounded p-3   text-2xl font-bold"
                  className="bg-red-600 hover:bg-red-800 right-3 ml-3 absolute  rounded p-4 mt-3 text-white font-bold"
                  id="close-file"
                  onClick={hiddenPop}
                >
                  <i className="ri-close-fill"></i>
                  close
                </button>
                {/* <button
                className="text-gray-700 hover:bg-gray-200 rounded p-2 top-4 right-4 absolute text-2xl font-bold"
                id="close-file"
                onClick={hiddenPop}
              >
                <i className="ri-close-fill"></i>
              </button> */}
              </form>
            </div>
          </div>

          {/*
        <% files.forEach((file)=>{%>
        <div
          className="bg-gray-300 p-2 w-full cursor-pointer rounded flex justify-between items-center"
        >
          <h1 className="text-xl md:text-2xl"><%= file.originalname %></h1>
          <a
            href="/download/<%= file._id%>"
            className="text-blue-500 hover:bg-gray-200 rounded p-2"
            download="<%= file.originalname %>"
            ><i className="ri-download-line text-2xl"></i
          ></a>
        </div>
        <% }) %>
      </div> */}
          <div className="files overflow-y-auto h-full flex flex-col gap-4 mt-4 ">
            {files.map((file, idx) => {
              return (
                <div
                  key={idx}
                  className="bg-gray-300 p-2 w-full cursor-pointer rounded flex justify-between items-center"
                >
                  <h1 className="text-xl md:text-2xl">{file.originalname}</h1>
                  <a
                    onClick={() => {
                      downLoadHandler(file._id);
                    }}
                    className="text-blue-500 hover:bg-gray-200 rounded p-2"
                    download={file.originalname}
                  >
                    <i className="ri-download-line text-2xl"></i>
                  </a>
                </div>
              );
            })}
          </div>
        </main>
        <footer className=" bg-gray-800 w-full h-16 p-2 flex justify-center items-center">
          <p className=" text-gray-500 dark:text-gray-400 m-3">
            &copy; 2024 My Drive - Vinay Drive - All rights reserved | Developed
            by Vinay Kotiya
          </p>
          <p className="flex gap-4  ">
            <a href="https://www.linkedin.com/in/vinay-kotiya-a405b6316/">
              <img
                className="h-10"
                src="https://www.svgrepo.com/show/448234/linkedin.svg"
              />
            </a>
            <a href="https://github.com/Vinay-Kotiya">
              <img
                className="h-10"
                src="https://www.svgrepo.com/show/512317/github-142.svg"
              />
            </a>
          </p>
        </footer>
      </div>
    </>
  );
};

export default Home;
