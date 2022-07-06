import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeUser } from "../redux/userSlice";

const Result = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, isLoading } = useSelector((state) => state.user);
    const handleTry = () => {
        navigate("/home");
    };

    const handleFinish = () => {
        dispatch(removeUser());
        navigate("/");
    };
    return (
        <div className="container result-page user-heading">
            <h2>{user.user_name}! Your score is 0</h2>
            <div className="button-area m-3">
                <button className="btn btn-primary m-2" onClick={handleTry}>
                    Try Again
                </button>
                <button className="btn btn-primary m-2" onClick={handleFinish}>
                    Finish
                </button>
            </div>
        </div>
    );
};

export default Result;
