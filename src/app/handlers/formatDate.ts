export default function formatDate(preDate: string) {
  const date = new Date(preDate);
  const year: number = date.getUTCFullYear();
  const month: string = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day: string = String(date.getUTCDate()).padStart(2, "0");
  const formattedDate = `${year}.${month}.${day}`;
  return formattedDate;
}
