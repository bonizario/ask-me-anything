import clsx, { type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * A utility to merge Tailwind CSS classes with support for conditional classes.
 *
 * @param classes - The input classes to merge
 */
export function cn(...classes: ClassValue[]): string {
  return twMerge(clsx(classes));
}
