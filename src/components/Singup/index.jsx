import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ALPHABETS_ONLY = /(^\w+)\s?/;

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("Required")
    .matches(ALPHABETS_ONLY, "Only alphabets are allowed")
    .min(2, "First Name must be at least 2 characters"),
  lastName: Yup.string()
    .required("Required")
    .matches(ALPHABETS_ONLY, "Only alphabets are allowed")
    .min(2, "Last Name must be at least 2 characters"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .required("Required")
    .max(26, "Not more than 26 char")
    .min(8, "Not less than 8 char")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
});

const Signup = () => {
  const [isDisable, setDisable] = useState(false);
  const navigate = useNavigate();
  const formSubmit = async (values, actions) => {
    setDisable(true);
    const fetchedValues = {
      firstName: values?.firstName,
      lastName: values?.lastName,
      email: values?.email,
      password: values?.password,
    };

    try {
      const url = `${process.env.REACT_APP_BASE_URL}/api/users`;
      const { data: res } = await axios.post(url, fetchedValues);
      toast.success("Register Sucessfull. Please login");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
      setDisable(false);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        toast.error(error.response.data.message);
        setDisable(false);
      }
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="p-5 flex items-center justify-center flex-col min-h-screen">
        <h1 className="text-2xl font-bold m-4">Signup</h1>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
          }}
          validationSchema={SignupSchema}
          enableReinitialize
          validateOnBlur
          validateOnChange
          onSubmit={(values, actions) => formSubmit(values, actions)}
        >
          {({ values, errors, handleSubmit, touched, resetForm }) => (
            <Form
              onSubmit={handleSubmit}
              autoComplete="off"
              className="lg:w-1/2 bg-white shadow-xl border p-10"
            >
              <Field
                name="firstName"
                type="firstName"
                className="shadow appearance-none border mt-5 h-10 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your first name"
              />
              {errors.firstName && touched.firstName ? (
                <div className="text-red m-1 text-xs" style={{ color: "red" }}>
                  {errors.firstName}
                </div>
              ) : null}
              <Field
                name="lastName"
                type="lastName"
                className="shadow appearance-none border mt-5 h-10 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your last name"
              />
              {errors.lastName && touched.lastName ? (
                <div className="text-red m-1 text-xs" style={{ color: "red" }}>
                  {errors.lastName}
                </div>
              ) : null}
              <Field
                name="email"
                type="email"
                className="shadow appearance-none border mt-5 h-10 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your email id"
              />
              {errors.email && touched.email ? (
                <div className="text-red m-1 text-xs" style={{ color: "red" }}>
                  {errors.email}
                </div>
              ) : null}
              <Field
                name="password"
                type="password"
                className="shadow appearance-none border h-10 mt-5 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="********"
              />
              {errors.password && touched.password ? (
                <div className="text-red m-1 text-xs" style={{ color: "red" }}>
                  {errors.password}
                </div>
              ) : null}
              <Link to="/login">
                <div className="my-5 ml-1 text-xs text-blue-700 font-semibold">
                  Alrady Registered?
                </div>
              </Link>
              <button
                className={`shadow ${
                  isDisable ? "bg-purple-400" : "bg-purple-600"
                } focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded`}
                type="submit"
                disabled={isDisable}
              >
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default Signup;
