import dayjs from "dayjs";

export const formatDate = (date: Date | string) =>
    dayjs(date).format("D MMMM YYYY");

