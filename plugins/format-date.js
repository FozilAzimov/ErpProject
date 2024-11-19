export default (context, inject) => {
  // Global function
  const formatDate = (date, formate) => {
    if (date) {
      if (formate === 'yyyy-mm-dd hh:mm:ss') {
        return new Date(date).toISOString().split('.')[0] // ketishi: ISO format: YYYY-MM-DDTHH:MM:SS
      } else if (formate === 'dd/mm/yyyy hh:mm:ss') {
        // date kelishi: dd/mm/yyyy hh:mm:ss
        const [datePart, timePart] = date.split(' ')
        const [day, month, year] = datePart.split('/')
        const isoFormattedDate = `${year}-${month}-${day}T${timePart}`
        return isoFormattedDate // ketishi: ISO format: YYYY-MM-DDTHH:MM:SS
      } else {
        const d = new Date(date)
        const day = String(d.getDate()).padStart(2, '0')
        const month = String(d.getMonth() + 1).padStart(2, '0')
        const year = d.getFullYear()
        const hours = String(d.getHours()).padStart(2, '0')
        const minutes = String(d.getMinutes()).padStart(2, '0')
        const seconds = String(d.getSeconds()).padStart(2, '0')
        return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}` // ketishi: dd/mm/yyyy hh:mm:ss
      }
    }
  }
  inject('formatDate', formatDate)
}
