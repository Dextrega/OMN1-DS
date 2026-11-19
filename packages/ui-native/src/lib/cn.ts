import { clsx, type ClassValue } from "clsx";

/** Joins class names. (No tailwind-merge on native: variants never emit conflicting utilities.) */
export const cn = (...inputs: ClassValue[]) => clsx(inputs);
