import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { getQues } from "../redux/quesSlice";
import { getCategories } from "../redux/catSlice";
import "./global.css";

const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { categories } = useSelector((state) => state.categories);
    const { user, isLoading } = useSelector((state) => state.user);

    let catList = [];
    const cat = categories && categories;
    useEffect(() => {
        if (
            categories !== "" &&
            categories !== null &&
            categories !== undefined
        ) {
            cat.forEach((element) => {
                catList.push({ value: element.id, label: element.name });
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [categories]);
    
    useEffect(() => {
        dispatch(getCategories());
    }, []);

    const [ctg, setCtg] = useState("");
    const [diffi, setDiffi] = useState("");
    const [type, setType] = useState("");

    const difficultyOptions = [
        { value: "easy", label: "Easy" },
        { value: "medium", label: "Medium" },
        { value: "hard", label: "Hard" },
    ];

    const typeOptions = [
        { value: "multiple", label: "Multiple Choise" },
        { value: "boolean", label: "True/False" },
    ];

    const handleCat = (data) => {
        setCtg(data);
    };
    const handleDiff = (data) => {
        setDiffi(data);
    };
    const handleType = (data) => {
        setType(data);
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        data.category = ctg.value;
        data.difficulty = diffi.value;
        data.type = type.value;
        dispatch(getQues(data));
        navigate("/questions");
        // console.log(data);
    };

    return (
        <div className="container home-page">
            <div className="home-area d-flex justify-content-center">
                <div className="form-area">
                    <h1 className="text-center user-heading">
                        Welcome {user?.user_name}!
                    </h1>
                    <h3 className="text-center py-4">
                        Please Select Your Options
                    </h3>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-3">
                            <label htmlFor="category" className="mb-2">
                                Category
                            </label>
                            <Select
                                id="category"
                                placeholder="Select an Option"
                                options={catList && catList}
                                isClearable={true}
                                isSearchable={true}
                                onChange={handleCat}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="difficulty" className="mb-2">
                                Difficulty Level
                            </label>
                            <Select
                                id="difficulty"
                                placeholder="Select an Option"
                                options={difficultyOptions}
                                isClearable={true}
                                isSearchable={true}
                                onChange={handleDiff}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="type" className="mb-2">
                                Question type
                            </label>
                            <Select
                                id="type"
                                placeholder="Select an Option"
                                options={typeOptions}
                                isClearable={true}
                                isSearchable={true}
                                onChange={handleType}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="ques_amount" className="mb-2">
                                Question Amount
                            </label>
                            <input
                                id="ques_amount"
                                className="amount-input"
                                type="number"
                                placeholder="Enter Amount"
                                {...register("ques_amount")}
                            />
                        </div>
                        <input
                            className="btn btn-primary px-3"
                            type="submit"
                            value={"Get Started"}
                        />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Home;
