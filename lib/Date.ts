export const getDateDifferenceString = (prevDate: Date) => {
  const now = new Date();
  const diff = now.getTime() - prevDate.getTime(); // in millisecond which is 1/1000 of a second
  const diffSec = diff / 1000;
  if (diffSec < 60 && diffSec > 0) {
    return `${diffSec.toFixed(0)} sec ago`;
  }
  const diffMin = diffSec / 60;
  if (diffMin < 60 && diffMin > 0) {
    return `${diffMin.toFixed(0)} min ago`;
  }
  const diffHours = diffMin / 60;
  if (diffHours < 24 && diffHours > 0) {
    return `${diffHours.toFixed(0)} hours ago`;
  }
  const diffDays = diffHours / 24;
  if (diffDays < 7 && diffDays > 0) {
    return `${diffDays.toFixed(0)} days ago`;
  }
  const diffWeeks = diffDays / 7;
  if (diffWeeks < 4 && diffWeeks > 0) {
    return `${diffWeeks.toFixed(0)} weeks ago`;
  }
  // If we got here it is more than a month ago,
  // In this case we just pring the full date: Month day, year (ex Sep 14, 2004)
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  console.log(diff); 
  return `${monthNames[prevDate.getMonth()]} ${prevDate.getDate()}, ${prevDate.getFullYear()}`;
};
