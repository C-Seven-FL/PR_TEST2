export const daysOfWeek = [
  "Pondělí",
  "Úterý",
  "Středa",
  "Čtvrtek",
  "Pátek",
  "Sobota",
  "Neděle",
];

export const parseReservation = (res) => {
  const [startYear, startMonth, startDay, startHour] =
    res.reservation_starts.split("-");
  const [endYear, endMonth, endDay, endHour] = res.reservation_end.split("-");

  // Zjistíme index dne v týdnu (aby Pondělí = 0, Neděle = 6)
  const date = new Date(startYear, startMonth - 1, startDay);
  let dayIndex = date.getDay() - 1;
  if (dayIndex === -1) dayIndex = 6;

  return {
    id: res.ID,
    dayIndex: dayIndex,
    // +2 protože sloupec 1 je vyhrazen pro názvy dnů
    startCol: parseInt(startHour, 10) + 2,
    endCol: parseInt(endHour, 10) + 2,
    rawStart: `${startHour}:00`,
    rawEnd: `${endHour}:00`,
  };
};
