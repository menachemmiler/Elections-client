import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { DataStatus, userState } from "../../types/redux";
import { IUser } from "../../types/user";

const initialState: userState = {
  error: null,
  status: DataStatus.IDLE,
  user: null,
};

export const fetchLogin = createAsyncThunk(
  "user/login",
  async (user: { username: string; password: string }, thunkApi) => {
    try {
      const res = await fetch("http://localhost:2222/api/users/login", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      // console.log({ res });
      if (res.status != 200) {
        return thunkApi.rejectWithValue("Can't login, please try again");
      }
      const data = await res.json();
      localStorage.setItem("Authorization", data.token);
      return thunkApi.fulfillWithValue(data);
    } catch (err: any) {
      return thunkApi.rejectWithValue(
        `Can't login, please try again ${err.message}`
      );
    }
  }
);

export const fetchRegister = createAsyncThunk(
  "user/register",
  async (
    user: { username: string; password: string; isAdmin: boolean },
    thunkApi
  ) => {
    try {
      console.log(JSON.stringify(user));
      const res = await fetch("http://localhost:2222/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      console.log({ res });
      if (res.status != 201) {
        return thunkApi.rejectWithValue(
          "Can't create new user, please try again"
        );
      }
      const data = await res.json();
      console.log({ data });
      return thunkApi.fulfillWithValue(data);
    } catch (err) {
      return thunkApi.rejectWithValue(
        "Can't create new user, please try again"
      );
    }
  }
);

export const getProfile = createAsyncThunk(
  "user/profile",
  async (_, thunkApi) => {
    try {
      const res = await fetch("http://localhost:2222/api/users/profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("Authorization")!,
        },
      });
      // console.log({ res });
      if (res.status != 200) {
        return thunkApi.rejectWithValue(
          "Can't find the user, please try again"
        );
      }
      const data = await res.json();
      // console.log({ data });
      return thunkApi.fulfillWithValue(data);
    } catch (err: any) {
      return thunkApi.rejectWithValue(
        `Can't find the user, please try again ${err.message}`
      );
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
    },
    updateUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<userState>) => {
    builder
      .addCase(fetchLogin.pending, (state) => {
        state.status = DataStatus.LOADING;
        state.error = null;
        state.user = null;
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        // console.log({ action });
        state.status = DataStatus.SUCCESS;
        state.error = null;
        state.user = action.payload as unknown as IUser;
        // console.log(state.user);
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.status = DataStatus.FAILED;
        state.error = action.error as string;
        state.user = null;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.status = DataStatus.SUCCESS;
        state.error = null;
        state.user = action.payload as unknown as IUser;
        // console.log(state.user);
      });

    // .addCase(fetchRegister.pending, (state, action) => {
    //   state.status = DataStatus.LOADING;
    //   state.error = null;
    //   state.user = null;
    // })
    // .addCase(fetchRegister.fulfilled, (state, action) => {
    //   console.log({ action });
    //   state.status = DataStatus.SUCCESS;
    //   state.error = null;
    //   state.user = action.payload as unknown as IUser;
    //   console.log(state.user);
    // })
    // .addCase(fetchRegister.rejected, (state, action) => {
    //   state.status = DataStatus.FAILED;
    //   state.error = action.error as string;
    //   state.user = null;
    // });
  },
});

export const { updateUser } = userSlice.actions;

export default userSlice;
