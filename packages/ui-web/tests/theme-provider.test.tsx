import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Icon, ThemeProvider, useBrandAsset } from "../src";

const Logo = () => <img alt="logo" src={useBrandAsset("logo", "/default.svg")} />;

describe("ThemeProvider", () => {
  it("scopes an explicit mode and brand colours on a wrapper", () => {
    const { container } = render(
      <ThemeProvider
        mode="dark"
        brand={{ colors: { primary: { medium: "#e11d48" } }, fonts: { sans: "Inter, sans-serif" } }}
      >
        x
      </ThemeProvider>,
    );
    const el = container.firstElementChild as HTMLElement;
    expect(el).toHaveAttribute("data-theme", "dark");
    expect(el.style.getPropertyValue("--omn1-key-primary-medium")).toBe("#e11d48");
    expect(el.style.getPropertyValue("--omn1-font-family-sans")).toBe("Inter, sans-serif");
  });

  it("supports per-mode brand colours", () => {
    const brand = {
      colors: {
        light: { primary: { medium: "#111111" } },
        dark: { primary: { medium: "#eeeeee" } },
      },
    };
    const { container, rerender } = render(
      <ThemeProvider mode="light" brand={brand}>
        x
      </ThemeProvider>,
    );
    expect(
      (container.firstElementChild as HTMLElement).style.getPropertyValue(
        "--omn1-key-primary-medium",
      ),
    ).toBe("#111111");
    rerender(
      <ThemeProvider mode="dark" brand={brand}>
        x
      </ThemeProvider>,
    );
    expect(
      (container.firstElementChild as HTMLElement).style.getPropertyValue(
        "--omn1-key-primary-medium",
      ),
    ).toBe("#eeeeee");
  });

  it("applies the theme to <html> in root mode", () => {
    const { unmount } = render(
      <ThemeProvider
        mode="dark"
        target="root"
        brand={{ colors: { primary: { medium: "#e11d48" } } }}
      >
        x
      </ThemeProvider>,
    );
    expect(document.documentElement).toHaveAttribute("data-theme", "dark");
    expect(document.documentElement.style.getPropertyValue("--omn1-key-primary-medium")).toBe(
      "#e11d48",
    );
    unmount();
    expect(document.documentElement).not.toHaveAttribute("data-theme");
  });

  it("swaps icons and assets per brand", () => {
    const Custom = () => <svg data-testid="brand-check" />;
    render(
      <ThemeProvider
        mode="light"
        brand={{ icons: { check: Custom }, assets: { logo: "/client.svg" } }}
      >
        <Icon name="check" />
        <Logo />
      </ThemeProvider>,
    );
    expect(screen.getByTestId("brand-check")).toBeInTheDocument();
    expect(screen.getByAltText("logo")).toHaveAttribute("src", "/client.svg");
  });

  it("falls back to the default asset", () => {
    render(
      <ThemeProvider mode="light">
        <Logo />
      </ThemeProvider>,
    );
    expect(screen.getByAltText("logo")).toHaveAttribute("src", "/default.svg");
  });
});
