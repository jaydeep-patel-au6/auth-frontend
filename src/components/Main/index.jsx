import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import Table from "./components/Table";
import axios from "axios";
import Select from "react-select";

const Main = () => {
  const [userData, setUserData] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [load, setLoad] = useState(false);

  console.log(load, "load")

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
      <div className="m-5 p-5">
        <Select
          defaultValue={selectedOption}
          onChange={setSelectedOption}
          options={options}
        />
      </div>
      <Table data={userData} />
    </div>
  );
};

export default Main;
