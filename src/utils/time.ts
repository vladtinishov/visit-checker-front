import dayjs from "dayjs";

export const isPast = (date: string) => {
  return dayjs(date).isBefore(dayjs())
}