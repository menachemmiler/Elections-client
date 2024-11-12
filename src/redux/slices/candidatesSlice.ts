import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { DataStatus, candidatesState } from "../../types/redux";
import { ICandidate } from "../../types/candidates";

const initialState: candidatesState = {
  error: null,
  status: DataStatus.IDLE,
  candidates: [],
};

export const fetchCandidates = createAsyncThunk(
  "candidates/getList",
  async (_, thunkApi) => {
    try {
      const res = await fetch("http://localhost:2222/api/candidates/", {
        headers: {
          Authorization: localStorage["Authorization"]!,
        },
      });
      if (res.status != 200) {
        thunkApi.rejectWithValue("Can't get the list, please try again");
      }
      const data = await res.json();
      return data;
    } catch (err) {
      thunkApi.rejectWithValue("Can't get the list, please try again");
    }
  }
);

const candidatesSlice = createSlice({
  name: "candidates",
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<candidatesState>) => {
    builder
      .addCase(fetchCandidates.pending, (state) => {
        state.status = DataStatus.LOADING;
        state.error = null;
        state.candidates = [];
      })
      .addCase(fetchCandidates.fulfilled, (state, action) => {
        state.status = DataStatus.SUCCESS;
        state.error = null;
        state.candidates = action.payload as unknown as ICandidate[];
      })
      .addCase(fetchCandidates.rejected, (state, action) => {
        state.status = DataStatus.FAILED;
        state.error = action.error as string;
        state.candidates = [];
      });
  },
});

export default candidatesSlice;
