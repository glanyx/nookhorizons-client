import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { render } from "@testing-library/react";
import App from "./App";
import { act } from "react-dom/test-utils";

test("renders learn react link", async () => {

  let getByText;

  await act(async () => {
    getByText = render(
      <Router>
        <App />
      </Router>
    )
  });
  expect(getByText.baseElement).toHaveTextContent(/Nook Horizons/i);
});
