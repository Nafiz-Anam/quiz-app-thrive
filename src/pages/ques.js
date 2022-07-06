import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { decode } from "html-entities";
import { useNavigate } from "react-router-dom";

import "./global.css";

const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
};

const Ques = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { ques, isLoading, isError, message } = useSelector(
        (state) => state.ques
    );
    console.log(ques.length);

    const [questionIndex, setQuestionIndex] = useState(0);
    console.log(questionIndex);
    const [options, setOptions] = useState([]);
    useEffect(() => {
        if (ques.length) {
            const question = ques[questionIndex];
            let answers = [...question.incorrect_answers];
            answers.splice(
                getRandomInt(question.incorrect_answers.length),
                0,
                question.correct_answer
            );
            setOptions(answers);
        }
    }, [ques, questionIndex]);

    const handleNext = (e) => {
        if (questionIndex + 1 < ques.length) {
            setQuestionIndex(questionIndex + 1);
        }
    };
    const handlePrev = (e) => {
        if (questionIndex - 1 < questionIndex && questionIndex - 1 >= 0) {
            setQuestionIndex(questionIndex - 1);
        }
    };
    const handleSubmit = (e) => {
        navigate("/result");
    };

    return (
        <div className="container">
            {isLoading ? (
                <h2>Loading...</h2>
            ) : (
                <div className="row justify-content-center page">
                    <h2 className="text-center py-3">
                        Question No. {questionIndex + 1}
                    </h2>
                    <div className="single-ques">
                        <h3 className="text-center pb-3">
                            {decode(ques[questionIndex].question)}
                        </h3>
                        <div className="row justify-content-between">
                            {options.map((data, id) => (
                                <div
                                    className="col-md-5 m-3 text-center single-option"
                                    key={id}
                                >
                                    {decode(data)}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="row justify-content-between align-items-center button-area">
                        <div className="col-md-6">
                            {questionIndex + 1 > 1 ? (
                                <button
                                    onClick={handlePrev}
                                    className="btn btn-primary"
                                >
                                    Previous
                                </button>
                            ) : (
                                ""
                            )}
                        </div>
                        <div className="col-md-6 text-end">
                            {questionIndex + 1 === ques.length ? (
                                <button
                                    onClick={handleSubmit}
                                    className="btn btn-primary"
                                >
                                    Submit
                                </button>
                            ) : (
                                <button
                                    onClick={handleNext}
                                    className="btn btn-primary"
                                >
                                    Next
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Ques;
