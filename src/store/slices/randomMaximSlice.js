import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = "https://5ffbc6fd63ea2f0017bdb424.mockapi.io/maxim/";

async function getApi(endPoint) {
  const res = await fetch(endPoint)
    .then((res) => res.json())
    .catch((err) => {
      throw new Error(err.message);
    });
  return res;
}

export const getApiThunk = createAsyncThunk(`maxim/call-api`, async () => {
  const res = await getApi(`${url}${Math.round(Math.random() * 100)}`);
  return res;
});

export const postApiThunk = createAsyncThunk(
  "maxim/post-api",
  async (params) => {
    const endPoint = url;
    try {
      const res = await axios.post(endPoint, params);
      return res.data;
    } catch (error) {
      throw new Error(error);
    }
  }
);

const randomMaximSlice = createSlice({
  name: "randomMaxim",
  initialState: {
    maxim: {
      id: "1",
      content: "Không làm mà đòi có ăn thì chỉ có ăn đầu bò ăn cám",
      author: "Huấn Hoa Hồng"
    },
    isLoading: false
  },
  reducers: {},
  extraReducers: {
    [getApiThunk.pending]: (state) => {
      state.isLoading = true;
    },
    [postApiThunk.pending]: (state) => {
      state.isLoading = true;
    },
    [getApiThunk.fulfilled]: (state, action) => {
      state.maxim = action.payload;
      state.isLoading = false;
    },
    [postApiThunk.fulfilled]: (state, action) => {
      state.maxim = action.payload;
      state.isLoading = false;
    }
  }
});

export const selectMaxim = (state) => state.randomMaxim;
export default randomMaximSlice.reducer;
