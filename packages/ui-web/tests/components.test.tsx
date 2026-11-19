import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Badge, ButtonCTA, ButtonIcon, Checkbox, TextInput } from "../src";

describe("ButtonCTA", () => {
  it("renders Figma MD / Primary / Solid by default with token classes", () => {
    render(<ButtonCTA>Save</ButtonCTA>);
    const btn = screen.getByRole("button", { name: "Save" });
    expect(btn).toHaveClass(
      "min-h-x6",
      "px-subtle",
      "rounded-subtle",
      "bg-surface-primary-medium",
      "text-surface-on-primary-very-subtle",
    );
    expect(btn).toHaveAttribute("type", "button");
  });

  it("uses the Corner Radius ladder for LG and SM", () => {
    const { rerender } = render(<ButtonCTA size="lg">x</ButtonCTA>);
    expect(screen.getByRole("button")).toHaveClass(
      "min-h-x8",
      "px-medium",
      "rounded-corner-subtle",
    );
    rerender(<ButtonCTA size="sm">x</ButtonCTA>);
    expect(screen.getByRole("button")).toHaveClass("min-h-x4", "rounded-corner-very-subtle");
  });

  it("loading keeps size, announces busy and swallows clicks", async () => {
    const onClick = vi.fn();
    render(
      <ButtonCTA loading onClick={onClick}>
        Pay
      </ButtonCTA>,
    );
    const btn = screen.getByRole("button");
    expect(btn).toHaveAttribute("aria-busy", "true");
    expect(screen.getByLabelText("Loading")).toBeInTheDocument();
    await userEvent.click(btn);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("fires onClick and respects disabled", async () => {
    const onClick = vi.fn();
    const { rerender } = render(<ButtonCTA onClick={onClick}>Go</ButtonCTA>);
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledTimes(1);
    rerender(
      <ButtonCTA disabled onClick={onClick}>
        Go
      </ButtonCTA>,
    );
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("lets consumers override classes without duplicates", () => {
    render(<ButtonCTA className="px-strong">x</ButtonCTA>);
    const btn = screen.getByRole("button");
    expect(btn).toHaveClass("px-strong");
    expect(btn).not.toHaveClass("px-subtle");
  });
});

describe("ButtonIcon", () => {
  it("is square 48 at MD and labelled", () => {
    render(<ButtonIcon icon="plus" aria-label="Add" />);
    expect(screen.getByRole("button", { name: "Add" })).toHaveClass(
      "size-x6",
      "rounded-subtle",
      "bg-surface-primary-medium",
    );
  });
  it("renders the status dot", () => {
    const { container } = render(<ButtonIcon icon="bell" aria-label="Alerts" dot />);
    expect(container.querySelector('[data-slot="dot"]')).toBeInTheDocument();
  });
});

describe("Badge", () => {
  it("renders MD Neutral Strong by default (Figma: 24h, Surface/Neutral/Strong)", () => {
    render(<Badge>New</Badge>);
    expect(screen.getByText("New")).toHaveClass(
      "h-x3",
      "px-very-subtle",
      "rounded-very-subtle",
      "bg-surface-neutral-strong",
      "text-surface-on-neutral-very-subtle",
      "text-caption",
    );
  });
  it("supports outlined and disabled", () => {
    const { rerender } = render(
      <Badge appearance="outlined" variant="danger">
        x
      </Badge>,
    );
    expect(screen.getByText("x")).toHaveClass("border-stroke-danger-medium");
    rerender(
      <Badge variant="disabled" appearance="subtle">
        x
      </Badge>,
    );
    expect(screen.getByText("x")).toHaveClass("bg-alpha-neutral-very-subtle");
  });
});

describe("TextInput", () => {
  it("associates label, helper and input", () => {
    render(<TextInput label="Email" helper="We never share it" />);
    const input = screen.getByLabelText("Email");
    expect(input).toHaveAccessibleDescription("We never share it");
  });
  it("shows an error as an alert and marks the input invalid", () => {
    render(<TextInput label="Email" error="Invalid email" helper="ignored" />);
    expect(screen.getByRole("alert")).toHaveTextContent("Invalid email");
    expect(screen.getByLabelText("Email")).toBeInvalid();
  });
  it("counts characters", async () => {
    render(<TextInput label="Bio" counter maxLength={10} />);
    expect(screen.getByText("0/10")).toBeInTheDocument();
    await userEvent.type(screen.getByLabelText("Bio"), "abc");
    expect(screen.getByText("3/10")).toBeInTheDocument();
  });
  it("compact keeps the label for assistive tech only", () => {
    render(<TextInput label="Search" appearance="compact" helper="hidden helper" />);
    expect(screen.getByLabelText("Search")).toBeInTheDocument();
    expect(screen.queryByText("hidden helper")).not.toBeInTheDocument();
  });
  it("marks required with an asterisk and the native attribute", () => {
    render(<TextInput label="Name" required />);
    expect(screen.getByLabelText(/Name/)).toBeRequired();
  });
});

describe("Checkbox", () => {
  it("toggles and is labelled", async () => {
    const onChange = vi.fn();
    render(<Checkbox label="Accept" onChange={onChange} />);
    const box = screen.getByRole("checkbox", { name: "Accept" });
    await userEvent.click(box);
    expect(box).toBeChecked();
    expect(onChange).toHaveBeenCalled();
  });
  it("supports the indeterminate state", () => {
    render(<Checkbox label="Some" indeterminate />);
    const box = screen.getByRole("checkbox") as HTMLInputElement;
    expect(box.indeterminate).toBe(true);
  });
  it("is not interactive when disabled", async () => {
    render(<Checkbox label="Nope" disabled />);
    const box = screen.getByRole("checkbox");
    await userEvent.click(box);
    expect(box).not.toBeChecked();
  });
  it("flags invalid", () => {
    render(<Checkbox label="Terms" invalid />);
    expect(screen.getByRole("checkbox")).toBeInvalid();
  });
});
