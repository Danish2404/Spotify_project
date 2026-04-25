import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import userEvent from "@testing-library/user-event";
import { describe, test, expect, vi } from "vitest";
import LoginForm from "./LoginForm";

describe("LoginForm Interaction Tests", () => {
  test("typing updates email and password fields", async () => {
    const user = userEvent.setup();

    render(<LoginForm onSubmit={vi.fn()} />);

    const email = screen.getByLabelText(/email/i);
    const password = screen.getByLabelText(/password/i);

    await user.type(email, "danish@test.com");
    await user.type(password, "123456");

    expect(email).toHaveValue("danish@test.com");
    expect(password).toHaveValue("123456");
  });

  test("calls submit handler with correct data", async () => {
    const mockSubmit = vi.fn();
    const user = userEvent.setup();

    render(<LoginForm onSubmit={mockSubmit} />);

    await user.type(screen.getByLabelText(/email/i), "danish@test.com");
    await user.type(screen.getByLabelText(/password/i), "123456");
    await user.click(screen.getByRole("button", { name: /login/i }));

    expect(mockSubmit).toHaveBeenCalledTimes(1);
    expect(mockSubmit).toHaveBeenCalledWith({
      email: "danish@test.com",
      password: "123456",
    });
  });

  test("shows validation error when fields are empty", async () => {
    const mockSubmit = vi.fn();
    const user = userEvent.setup();

    render(<LoginForm onSubmit={mockSubmit} />);

    await user.click(screen.getByRole("button", { name: /login/i }));

    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(mockSubmit).not.toHaveBeenCalled();
  });
});