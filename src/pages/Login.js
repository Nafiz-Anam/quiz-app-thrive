import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import "./global.css";
import { useNavigate } from "react-router-dom";
import { setUser } from "../redux/userSlice";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, isLoading } = useSelector((state) => state.user);
    // console.log(user);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();
    const onSubmit = (data) => {
        // console.log(data);
        dispatch(setUser(data));
        reset();
    };

    useEffect(() => {
        if (user) {
            navigate("/home");
        }
    }, [user]);

    return (
        <div className="container text-center login-page">
            <h1 className="py-3">Welcome to Quiz App</h1>
            <h5 className="py-3">Feel free to test your knowledge</h5>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    className="my-3 user-name"
                    type="text"
                    placeholder="User Name"
                    {...register("user_name", {})}
                />
                <br />
                <input className="user-btn btn btn-primary" type="submit" />
            </form>
        </div>
    );
};

export default Login;
