import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import {
  Badge,
  ButtonCTA,
  ButtonIcon,
  ButtonLink,
  Checkbox,
  Chip,
  RadioGroup,
  Radiobutton,
  Tabs,
  TabsBase,
  TabsList,
  TabsPanel,
  TextInput,
  Toggle,
} from "../src";

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

describe("ButtonLink (provisional)", () => {
  it("renders a button by default and an anchor with href", () => {
    const { rerender } = render(<ButtonLink>Go</ButtonLink>);
    expect(screen.getByRole("button", { name: "Go" })).toHaveClass(
      "text-surface-primary-medium",
      "hover:underline",
    );
    rerender(<ButtonLink href="/x">Go</ButtonLink>);
    expect(screen.getByRole("link", { name: "Go" })).toHaveAttribute("href", "/x");
  });

  it("disabled / loading anchors drop href and swallow clicks", async () => {
    const onClick = vi.fn();
    render(
      <ButtonLink href="/x" loading onClick={onClick}>
        Go
      </ButtonLink>,
    );
    const a = screen.getByRole("link");
    expect(a).not.toHaveAttribute("href");
    expect(a).toHaveAttribute("aria-busy", "true");
    await userEvent.click(a);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("loading buttons swallow clicks", async () => {
    const onClick = vi.fn();
    render(
      <ButtonLink loading onClick={onClick}>
        Go
      </ButtonLink>,
    );
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).not.toHaveBeenCalled();
  });
});

describe("Radiobutton / RadioGroup (provisional)", () => {
  it("selects a single option inside a group", async () => {
    const onValueChange = vi.fn();
    render(
      <RadioGroup defaultValue="a" onValueChange={onValueChange}>
        <Radiobutton value="a" label="A" />
        <Radiobutton value="b" label="B" />
      </RadioGroup>,
    );
    expect(screen.getByLabelText("A")).toBeChecked();
    await userEvent.click(screen.getByLabelText("B"));
    expect(screen.getByLabelText("B")).toBeChecked();
    expect(screen.getByLabelText("A")).not.toBeChecked();
    expect(onValueChange).toHaveBeenCalledWith("b");
  });

  it("maps Figma states to attributes", () => {
    render(<Radiobutton label="X" invalid disabled />);
    const r = screen.getByLabelText("X");
    expect(r).toBeDisabled();
    expect(r).toHaveAttribute("aria-invalid", "true");
    expect(r).toHaveClass("size-full", "aria-[invalid=true]:border-stroke-danger-medium");
  });
});

describe("Toggle (provisional)", () => {
  it("is a switch that toggles uncontrolled and reports changes", async () => {
    const onCheckedChange = vi.fn();
    render(<Toggle label="Wifi" onCheckedChange={onCheckedChange} />);
    const sw = screen.getByRole("switch", { name: "Wifi" });
    expect(sw).toHaveAttribute("aria-checked", "false");
    await userEvent.click(sw);
    expect(sw).toHaveAttribute("aria-checked", "true");
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it("controlled value wins; disabled does not toggle", async () => {
    const onCheckedChange = vi.fn();
    const { rerender } = render(
      <Toggle checked={false} onCheckedChange={onCheckedChange} aria-label="a" />,
    );
    await userEvent.click(screen.getByRole("switch"));
    expect(screen.getByRole("switch")).toHaveAttribute("aria-checked", "false");
    rerender(<Toggle disabled aria-label="a" onCheckedChange={onCheckedChange} />);
    await userEvent.click(screen.getByRole("switch"));
    expect(onCheckedChange).toHaveBeenCalledTimes(1);
  });

  it("clicking the label toggles", async () => {
    render(<Toggle label="Wifi" />);
    await userEvent.click(screen.getByText("Wifi"));
    expect(screen.getByRole("switch")).toHaveAttribute("aria-checked", "true");
  });
});

describe("Chip (provisional)", () => {
  it("is a toggle button using aria-pressed", async () => {
    const onSelectedChange = vi.fn();
    render(<Chip onSelectedChange={onSelectedChange}>Tag</Chip>);
    const chip = screen.getByRole("button", { name: "Tag" });
    expect(chip).toHaveAttribute("aria-pressed", "false");
    expect(chip).toHaveClass("h-x4-5");
    await userEvent.click(chip);
    expect(chip).toHaveAttribute("aria-pressed", "true");
    expect(onSelectedChange).toHaveBeenCalledWith(true);
  });

  it("SM is 24px high", () => {
    render(<Chip size="sm">Tag</Chip>);
    expect(screen.getByRole("button")).toHaveClass("h-x3");
  });
});

describe("Tabs / TabsBase (provisional)", () => {
  const setup = (props = {}) =>
    render(
      <Tabs defaultValue="a" {...props}>
        <TabsList aria-label="Sections">
          <TabsBase value="a">A</TabsBase>
          <TabsBase value="b" disabled>
            B
          </TabsBase>
          <TabsBase value="c">C</TabsBase>
        </TabsList>
        <TabsPanel value="a">Panel A</TabsPanel>
        <TabsPanel value="c">Panel C</TabsPanel>
      </Tabs>,
    );

  it("wires roles, selection and panels", async () => {
    setup();
    expect(screen.getByRole("tablist")).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "A" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Panel A");
    await userEvent.click(screen.getByRole("tab", { name: "C" }));
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Panel C");
  });

  it("roving tabindex + arrow keys skip disabled tabs", async () => {
    setup();
    screen.getByRole("tab", { name: "A" }).focus();
    await userEvent.keyboard("{ArrowRight}");
    expect(screen.getByRole("tab", { name: "C" })).toHaveFocus();
    expect(screen.getByRole("tab", { name: "C" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tab", { name: "A" })).toHaveAttribute("tabindex", "-1");
    await userEvent.keyboard("{Home}");
    expect(screen.getByRole("tab", { name: "A" })).toHaveFocus();
  });

  it("throws outside <Tabs>", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<TabsBase value="x">x</TabsBase>)).toThrow(/inside <Tabs>/);
    spy.mockRestore();
  });
});
