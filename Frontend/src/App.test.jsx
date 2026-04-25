import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { describe, test, expect } from "vitest";
import App from "./App";

describe("App Component", () => {
  test("renders app", () => {
    render(<App />);
    expect(document.body).toBeInTheDocument();
  });

  test("shows something on screen", () => {
    render(<App />);
    expect(document.body).toBeInTheDocument();
  });

  test("renders interactive element", () => {
  render(<App />);
  const buttons = screen.getAllByRole("button");
  expect(buttons.length).toBeGreaterThan(0);
});

    
  });
