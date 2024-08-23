import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  format,
  formatDistanceToNow,
  parseISO,
  differenceInHours,
} from "date-fns";
import { id } from "date-fns/locale";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const getInitials = (name) => {
  const words = name.split(" ");
  const initials =
    words.length > 1
      ? words[0][0].toUpperCase() + words[1][0].toUpperCase()
      : words[0][0].toUpperCase();
  return initials;
};

const hashString = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
};

const intToRGB = (hash) => {
  const c = (hash & 0x00ffffff).toString(16).toUpperCase();
  return "00000".substring(0, 6 - c.length) + c;
};

export const getColorForName = (name) => {
  const hash = hashString(name);
  const color = intToRGB(hash);
  return `#${color}`;
};

export const formatDate = (dateString) => {
  const date = parseISO(dateString);
  const hoursDifference = differenceInHours(new Date(), date);

  if (hoursDifference < 24) {
    return formatDistanceToNow(date, {
      addSuffix: true,
      locale: id,
    });
  } else {
    return format(date, "dd MMM yyyy", { locale: id });
  }
};

export const isNew = (dateString) => {
  const givenDate = new Date(dateString);
  const now = new Date();
  const oneDayInMillis = 24 * 60 * 60 * 1000;

  const diffInMillis = now - givenDate;

  return diffInMillis <= oneDayInMillis;
};

export const capitalize = (str) => {
  return str
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
