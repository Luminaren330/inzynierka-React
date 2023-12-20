import React from "react";
import {
  render,
  fireEvent,
  waitFor,
  screen,
  act,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"; // Dla rozszerzenia o expect
import { Context } from "../context/context";
import Login from "../Login/Login";
import { BrowserRouter as Router } from "react-router-dom";

jest.mock("axios");
const mockCredentials = [{ Login: "e-sawicka", Password: "esawicka" }];

jest.spyOn(React, "useEffect").mockImplementation((f) => f());

const axios = require("axios");
axios.get.mockResolvedValue({ data: mockCredentials });

test("async should log in user with correct credentials", async () => {
  const originalAlert = window.alert;
  window.alert = jest.fn();

  await act(async () => {
    render(
      <Context>
        <Router>
          <Login />
        </Router>
      </Context>
    );
  });
  fireEvent.change(screen.getByLabelText(/Nazwa użytkownika/i), {
    target: { value: "e-sawicka" },
  });
  fireEvent.change(screen.getByLabelText(/Hasło/i), {
    target: { value: "esawicka" },
  });

  const loginButton = screen.getAllByText(/Zaloguj się/i)[1];
  fireEvent.click(loginButton);

  await waitFor(() => {
    expect(window.alert).toHaveBeenCalledWith("Pomyślnie zalogowano");
  });

  window.alert = originalAlert;
});
