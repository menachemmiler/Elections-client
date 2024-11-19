import {
  render,
  fireEvent,
  screen,
  act,
  waitFor,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import Nav from "./Nav";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../redux/slices/userSlice";
import candidatesSlice from "../redux/slices/candidatesSlice";
import settingsSlice from "../redux/slices/setingsSlice";
import { BrowserRouter, MemoryRouter } from "react-router-dom";

// שימוש ב userEvent

describe("Nav", () => {
  it("test on login cliked", async () => {
    const user = userEvent.setup();

    const store = configureStore({
      reducer: {
        user: userSlice.reducer,
        candidates: candidatesSlice.reducer,
        settings: settingsSlice.reducer,
      },
    });

    render(
      <MemoryRouter initialEntries={["/Login"]}>
        <Provider store={store}>
          <Nav />
        </Provider>
      </MemoryRouter>
    );

    await user.click(screen.getByRole("link", { name: "Login" }));

    expect(screen.getByTestId("login")).toBeInTheDocument();
  });

  it("test on Register cliked", async () => {
    const user = userEvent.setup();

    const store = configureStore({
      reducer: {
        user: userSlice.reducer,
        candidates: candidatesSlice.reducer,
        settings: settingsSlice.reducer,
      },
    });

    render(
      <MemoryRouter initialEntries={["/Login"]}>
        <Provider store={store}>
          <Nav />
        </Provider>
      </MemoryRouter>
    );

    await user.click(screen.getByRole("link", { name: "Register" }));

    expect(screen.getByTestId("Register")).toBeInTheDocument();
  });
});
