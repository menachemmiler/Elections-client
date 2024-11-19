import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import Nav from "../components/Nav";
import { Provider } from "react-redux";
import store from "../redux/store";
import { useAppDispatch, useAppSelector } from "../redux/store";

describe("Nav", () => {
  it("should render", () => {
    const { getByText } = render(
      <BrowserRouter>
        <Provider store={store}>
          <Nav />
        </Provider>
      </BrowserRouter>
    );
    const loginLink = screen.getByText("Login");
  });
});
