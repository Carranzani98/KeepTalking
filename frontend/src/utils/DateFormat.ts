function padTo2Digits(num: number) {
  return num.toString().padStart(2, '0')
}

export function formatDate(date: Date) {
  const newDate = [
    padTo2Digits(date.getMonth() + 1),
    padTo2Digits(date.getDate()),
    date.getFullYear(),
  ].join('/')
  return newDate
}

export default padTo2Digits
