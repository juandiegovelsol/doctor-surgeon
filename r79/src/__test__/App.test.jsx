import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Dropdown from "../Dropdown"; // Assuming your component is in Dropdown.js

describe("Dropdown Component", () => {
  it("displays an error message if the dropdown is required and no option is selected on form submission", async () => {
    const onSubmitMock = jest.fn();
    render(
      <form onSubmit={onSubmitMock}>
        <Dropdown
          options={["Option 1", "Option 2"]}
          label="Select an option"
          required
        />
        <button type="submit">Submit</button>
      </form>
    );

    const submitButton = screen.getByRole("button", { name: /submit/i });
    await userEvent.click(submitButton);

    // Assert that the onSubmitMock was NOT called
    expect(onSubmitMock).not.toHaveBeenCalled();

    // Assert that an error message is displayed (adjust the selector based on your error message implementation)
    expect(screen.getByText(/please select an option/i)).toBeInTheDocument();
  });

  it("removes the error message and allows submission when a valid option is selected", async () => {
    const onSubmitMock = jest.fn();
    render(
      <form onSubmit={onSubmitMock}>
        <Dropdown
          options={["Option 1", "Option 2"]}
          label="Select an option"
          required
          onChange={() => {}} // Mock onChange if needed for form logic
        />
        <button type="submit">Submit</button>
      </form>
    );

    const triggerElement = screen.getByRole("button", {
      name: /select an option/i,
    });
    await userEvent.click(triggerElement);
    const optionToSelect = screen.getByRole("option", { name: /option 1/i });
    await userEvent.click(optionToSelect);

    const submitButton = screen.getByRole("button", { name: /submit/i });
    await userEvent.click(submitButton);

    // Assert that the onSubmitMock was called
    expect(onSubmitMock).toHaveBeenCalled();

    // Assert that the error message is no longer present
    expect(
      screen.queryByText(/please select an option/i)
    ).not.toBeInTheDocument();
  });
  // ... more tests below
});
