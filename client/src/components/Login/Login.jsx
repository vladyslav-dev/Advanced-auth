import React from "react";
import "./Login.scss";
import { content } from "../../static/index";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import AuthService from "../../services/AuthService";

import { setUserActionCreator } from "../../store/actions/actions";
import { useSelector, useDispatch } from "react-redux";

const checkCandidate = async ({ email, password }) => {
  return await AuthService.login(email, password);
};


const Login = () => {
  const dispatch = useDispatch();

  const [isValid, setIsValid] = React.useState("")

  const userSchema = yup.object().shape({
    email: yup
      .string()
      .trim()
      .required("You should fill this field")
      .email("Email is incorrect"),
    password: yup
      .string()
      .trim()
      .required("You should fill this field")
      .min(3, "Password must be at least 3 characters")
      .max(64),
  });

  console.log("Render login");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(userSchema),
  });


  const onSubmit = async (data) => {
    console.log(data);

    checkCandidate(data)
      .then((result) => {
        setIsValid("")
        dispatch(setUserActionCreator(result.data.user));
        localStorage.setItem("token", result.data.accessToken)
      })
      .catch((err) => {
        setIsValid(err.response?.data?.message)
      })
      .finally(() => {
        reset();
      })

  };

  return (
    <>
      <div>Login</div>
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        {isValid && <div>{isValid}</div>}
        {content.inputs.map((item) => {
          return (
            <div className="form__item" key={item.key}>
              <label className="form__item_label" htmlFor={item.name}>
                {item.label}
              </label>
              <input
                className={`form__item_input ${
                  errors[item.name] ? "error" : ""
                  }`}
                type={item.type}
                id={item.name}
                name={item.name}
                placeholder={`Enter ${item.name}`}
                {...register(item.name)}
              />
              <span className="form__item_error">
                {errors[item.name]?.message}
              </span>
            </div>
          );
        })}
        <input type="submit" className="form__submit-button" />
      </form>
    </>
  );
};

export default Login;
