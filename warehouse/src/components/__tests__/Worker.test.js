import React from "react";
import { render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Context } from "../context/context";
import Workers from "../Workers/Workers";
import { BrowserRouter as Router } from "react-router-dom";

jest.mock("axios");
const mockWorkers = [
  {
    WorkerId: 1,
    Name: "Jakub",
    Surname: "Sienkiewicz",
    PhoneNumber: "123123123",
    Position: "Sprzedawca",
  },
  {
    WorkerId: 2,
    Name: "Bartosz",
    Surname: "Kowalczyk",
    PhoneNumber: "482124290",
    Position: "Sprzedawca",
  },
];

// Mockowanie funkcji useEffect
jest.spyOn(React, "useEffect").mockImplementation((f) => f());

const axios = require("axios");
axios.get.mockResolvedValue({ data: mockWorkers });
test("renders Workers component", async () => {
  await act(async () => {
    render(
      <Context>
        <Router>
          <Workers />
        </Router>
      </Context>
    );
  });

  expect(screen.getByText("Pracownicy")).toBeInTheDocument();

  // Sprawdzanie czy przyciski do zmiany pracownika są wyświetlone
  mockWorkers.forEach((worker) => {
    expect(screen.getByText(worker.Name)).toBeInTheDocument();
  });

  // Sprawdzanie czy dane pracownika są prawidłowo wyświetlone
  const defaultWorker = mockWorkers[0];

  expect(screen.getByText(defaultWorker.Name)).toBeInTheDocument();
  const surnameElement = screen.getByText(
    new RegExp(defaultWorker.Surname, "i")
  );
  expect(surnameElement).toBeInTheDocument();
  expect(screen.getByText(defaultWorker.Position)).toBeInTheDocument();

  // Użyj selektora CSS, aby znaleźć element zawierający tekst "Nr telefonu:"
  const phoneLabel = screen.getByText(/Nr telefonu:/i);
  expect(phoneLabel).toBeInTheDocument();

  // Sprawdź, czy w tym samym elemencie co "Nr telefonu:" znajduje się oczekiwany numer telefonu
  const phoneNumberElement = phoneLabel.parentElement;
  expect(phoneNumberElement).toHaveTextContent(defaultWorker.PhoneNumber);
});

// test("changes selected worker on button click", async () => {
//   render(
//     <Context>
//       <Router>
//         <Workers />
//       </Router>
//     </Context>
//   );

//   // Kliknięcie na przycisk drugiego pracownika
//   const secondWorkerButton = screen.getAllByRole("button")[1];
//   fireEvent.click(secondWorkerButton);

//   // Oczekiwanie na zmianę pracownika
//   await waitFor(() => {
//     // Sprawdzanie czy dane pracownika zostały zaktualizowane
//     const selectedWorker = mockWorkers[1];
//     expect(
//       screen.getByText(`${selectedWorker.Name} ${selectedWorker.Surname}`)
//     ).toBeInTheDocument();
//     expect(screen.getByText(selectedWorker.Position)).toBeInTheDocument();
//     expect(
//       screen.getByText(`Nr telefonu: ${selectedWorker.PhoneNumber}`)
//     ).toBeInTheDocument();
//   });
// });
