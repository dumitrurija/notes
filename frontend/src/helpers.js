const VITE_API_URL = import.meta.env.VITE_API_URL;

const contentLimit = (text) => text && text.length > 100 ? text.substring(0, 100) + "..." : text

const formatDate = (date, type) => {
  const d = new Date(date);
  const day = d.getDate()
  const month = d.toLocaleDateString("en-GB", { month: "short" }); 
  const year = String(d.getFullYear()).slice(-2)

  const formattedDate = `${day} ${month} ${year}`

  const hours = d.getHours()
  const minutes = d.getMinutes() < 10 ? `0${d.getMinutes()}` : d.getMinutes()
  const seconds = d.getSeconds() < 10 ? `0${d.getSeconds()}` : d.getSeconds()

  const time = `${hours}:${minutes}:${seconds}`

  return type === "list" ? formattedDate : `${formattedDate} ${time}`;
}

export { VITE_API_URL, contentLimit, formatDate }