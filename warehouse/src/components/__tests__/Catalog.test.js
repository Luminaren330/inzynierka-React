import React from "react";
import { render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Context } from "../context/context";
import Catalog from "../Products/Catalog";
import { BrowserRouter as Router } from "react-router-dom";

jest.mock("axios");
const mockProduct = [
  {
    ObjectSID: 1,
    Category: "Filtr",
    Name: "Filtr powietrza Fiat 500",
    Material: "Cotton",
    MagazinePlacement: "A",
    UnitPrice: 246.48,
    Amount: 110,
  },
];

const mockFilteredProductList = [mockProduct];

jest.spyOn(React, "useEffect").mockImplementation((f) => f());

const axios = require("axios");
axios.get.mockResolvedValue({ data: mockProduct });

test("get catalog", async () => {
  await act(async () => {
    render(
      <Context>
        <Router>
          <Catalog
            filteredProductList={mockFilteredProductList}
            setProductPressed={() => {}}
          />
        </Router>
      </Context>
    );
  });
  //   expect(screen.getByText(mockProduct.Category)).toBeInTheDocument();
  //   expect(screen.getByText(mockProduct.Name)).toBeInTheDocument();
  //   expect(screen.getByText(mockProduct.Material)).toBeInTheDocument();
  //   expect(screen.getByText(mockProduct.MagazinePlacement)).toBeInTheDocument();
  //   expect(screen.getByText(`${mockProduct.UnitPrice} zł`)).toBeInTheDocument();
  //   expect(screen.getByText(mockProduct.Amount)).toBeInTheDocument();

  // Check if add to cart button is rendered
  const addToCartButton = screen.getByText("Dodaj do koszyka");
  expect(addToCartButton).toBeInTheDocument();

  // Check if input field for quantity is rendered
  const quantityInput = screen.getByPlaceholderText("Ilość");
  expect(quantityInput).toBeInTheDocument();

  //   // Simulate user input and click on the button
  //   userEvent.type(quantityInput, "2");
  //   fireEvent.click(addToCartButton);
});
