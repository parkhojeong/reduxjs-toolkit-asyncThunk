import { unwrapResult } from "@reduxjs/toolkit";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectMaxim,
  getApiThunk,
  postApiThunk
} from "../../store/slices/randomMaximSlice";

function RandomMaxim(props) {
  const dispatch = useDispatch();
  const randomMaxim = useSelector(selectMaxim);
  async function handleClick() {
    dispatch(getApiThunk());
  }
  async function handleSubmit(e) {
    e.preventDefault();
    const form = document.getElementById("form");
    const data = {
      content: form.content.value,
      author: form.author.value
    };
    try {
      await dispatch(postApiThunk(data));
      // const result = await dispatch(postApiThunk(data));
      // const finalResult = unwrapResult(result);
    } catch (error) {
      throw new Error(error.message);
    }
  }
  return (
    <div>
      <button onClick={handleClick}>change</button>
      <div style={randomMaxim.isLoading ? { opacity: 0.5 } : { opacity: 1 }}>
        <p>{randomMaxim.maxim.content || "null"} </p>
        <p>{randomMaxim.maxim.author || "null"}</p>
      </div>
      <form id="form">
        <input type="text" name="content" placeholder="content"></input>
        <input type="text" name="author" placeholder="author"></input>
        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
}
export default RandomMaxim;
