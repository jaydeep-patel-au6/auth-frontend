import React, { useState, useEffect } from "react";
import Table from "./components/Table";
import axios from "axios";
import Select from "react-select";
import Loader from "react-js-loader";

const Main = () => {
  const [userData, setUserData] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [loader, setLoader] = useState(false);
  const [query, setQuery] = useState("");

  const options = [
    { value: "email", label: "Email" },
    { value: "firstName", label: "First Name" },
    { value: "lastName", label: "Last Name" },
  ];

  useEffect(() => {
    setLoader(true);
    axios
      .get("https://auth-backend-deploy1.herokuapp.com/api/userlist")
      .then((response) => {
        setUserData(response?.data);
        setLoader(false);
      });
  }, []);

  useEffect(() => {
    if (selectedOption?.value == "email") {
      const sortEmail = [...userData].sort((a, b) => {
        if (a.email < b.email) {
          return -1;
        }
        if (a.email > b.email) {
          return 1;
        }
        return 0;
      });
      setUserData(sortEmail);
    }

    if (selectedOption?.value == "firstName") {
      const sortFirstName = [...userData].sort((a, b) => {
        if (a.firstName < b.firstName) {
          return -1;
        }
        if (a.firstName > b.firstName) {
          return 1;
        }
        return 0;
      });
      setUserData(sortFirstName);
    }

    if (selectedOption?.value == "lastName") {
      const sortLastName = [...userData].sort((a, b) => {
        if (a.lastName < b.lastName) {
          return -1;
        }
        if (a.lastName > b.lastName) {
          return 1;
        }
        return 0;
      });
      setUserData(sortLastName);
    }
  }, [selectedOption]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <div className="flex items-center justify-between w-full flex-col">
      <nav className="flex items-center justify-between w-full bg-blue-500 px-10 py-5">
        <h1 className="text-2xl text-white font-semibold">User Data</h1>
        <button
          className="bg-white hover:bg-white text-blue-700 font-semibold hover:text-blue-700 py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          onClick={handleLogout}
        >
          Logout
        </button>
      </nav>
      {loader ? (
        <>
          {" "}
          <div className="flex items-center justify-center mt-40">
            <div className={"item"}>
              <Loader
                type="spinner-cub"
                bgColor={"black"}
                title={"spinner-cub"}
                color={"#FFFFFF"}
                size={80}
              />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="m-10 flex items-center justify-start flex-col">
            <div>
              <div className="my-2">Sort :</div>
              <div className="w-40">
                <Select
                  defaultValue={selectedOption}
                  onChange={setSelectedOption}
                  options={options}
                />
              </div>
            </div>
            <div className="mt-5">
              <div className="my-2">Search :</div>
              <div className="w-40">
                <input
                  className="shadow appearance-none border mt-0 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  onChange={(event) => setQuery(event.target.value)}
                />
              </div>
            </div>
          </div>

          <Table
            data={userData?.filter((post) => {
              if (query === "") {
                return post;
              } else if (
                post.email.toLowerCase().includes(query.toLowerCase())
              ) {
                return post;
              } else if (
                post.firstName.toLowerCase().includes(query.toLowerCase())
              ) {
                return post;
              } else if (
                post.lastName.toLowerCase().includes(query.toLowerCase())
              ) {
                return post;
              }
            })}
          />
        </>
      )}
    </div>
  );
};

export default Main;
