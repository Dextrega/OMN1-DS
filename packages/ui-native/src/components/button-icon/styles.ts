import { cva } from "class-variance-authority";

export const buttonIconShape = cva("", {
  variants: {
    size: {
      xs: "size-x3 min-h-0 min-w-0 p-x0-5",
      sm: "size-x4 min-h-0 min-w-0 p-very-subtle",
      md: "size-x6 min-h-0 min-w-0 p-very-subtle",
      lg: "size-x8 min-h-0 min-w-0 p-very-subtle",
    },
  },
  defaultVariants: { size: "md" },
});
export const BUTTON_ICON_PX = { xs: 16, sm: 16, md: 20, lg: 24 } as const;
