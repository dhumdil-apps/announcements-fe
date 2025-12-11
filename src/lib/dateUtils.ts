export const DATE_REGEX =
  /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/\d{4} ([01]\d|2[0-3]):[0-5]\d$/;

export function isoToDisplayDate(isoDate: string): string {
  if (!isoDate) return "";
  const date = new Date(isoDate);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${month}/${day}/${year} ${hours}:${minutes}`;
}

export function displayToIsoDate(displayDate: string): string {
  const match = displayDate.match(
    /^(\d{2})\/(\d{2})\/(\d{4}) (\d{2}):(\d{2})$/,
  );
  if (!match) return displayDate;
  const [, month, day, year, hours, minutes] = match;
  return new Date(
    Number(year),
    Number(month) - 1,
    Number(day),
    Number(hours),
    Number(minutes),
  ).toISOString();
}
