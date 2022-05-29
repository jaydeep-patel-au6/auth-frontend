import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import Table from "./components/Table";
import axios from "axios";
import Select from "react-select";

const Main = () => {
  const [userData, setUserData] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [load, setLoad] = useState(false);

  console.log(load, "load");

  const options = [
    { value: "email", label: "Email" },
    { value: "firstName", label: "First Name" },
    { value: "lastName", label: "Last Name" },
  ];

  useEffect(() => {
    setLoad(true);
    axios
      .get("https://auth-backend-deploy1.herokuapp.com/api/userlist")
      .then((response) => {
        setUserData(response?.data);
        setLoad(false);
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
    <div className={styles.main_container}>
      <nav className={styles.navbar}>
        <h1>User Data</h1>
        <button className={styles.white_btn} onClick={handleLogout}>
          Logout
        </button>
      </nav>
      <div className="m-5 p-5 flex items-center justify-center flex-row">
        <div>
          <p className="mx-2">Sort : </p>
        </div>
        <div className="w-40">
          <Select
            defaultValue={selectedOption}
            onChange={setSelectedOption}
            options={options}
          />
        </div>
      </div>
      <Table data={userData} />
    </div>
  );
};

export default Main;
