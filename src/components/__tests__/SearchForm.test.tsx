import { render, screen, fireEvent } from "@testing-library/react";
import { SearchForm } from "../SearchForm";

describe("SearchForm", () => {
  it("renders input and button", () => {
    render(
      <SearchForm
        value=""
        onChange={() => {}}
        onSubmit={() => {}}
      />
    );

    expect(screen.getByPlaceholderText(/enter username/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /search/i })).toBeInTheDocument();
  });

  it("calls onChange when typing", () => {
    const onChange = vi.fn();
    render(
      <SearchForm
        value=""
        onChange={onChange}
        onSubmit={() => {}}
      />
    );

    const input = screen.getByPlaceholderText(/enter username/i);
    fireEvent.change(input, { target: { value: "octocat" } });
    expect(onChange).toHaveBeenCalledWith("octocat");
  });

  it("calls onSubmit when clicking button", () => {
    const onSubmit = vi.fn();
    render(
      <SearchForm
        value=""
        onChange={() => {}}
        onSubmit={onSubmit}
      />
    );

    const button = screen.getByRole("button", { name: /search/i });
    fireEvent.click(button);
    expect(onSubmit).toHaveBeenCalled();
  });
});
