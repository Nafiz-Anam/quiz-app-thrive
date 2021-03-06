import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeUser } from "../redux/userSlice";
import { resetScore } from "../redux/ansSlice";

const Result = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);
    const { score, resetScore } = useSelector((state) => state.ans);
    const handleTry = () => {
        dispatch(resetScore());
        navigate("/home");
    };

    const handleFinish = () => {
        dispatch(removeUser());
        dispatch(resetScore());
        navigate("/");
    };

    useEffect(() => {
        if (user === null) {
            navigate("/");
        }
    }, [user]);

    return (
        <div className="container result-page user-heading">
            <h2>
                {user.user_name}! Your score is {score}
            </h2>
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
