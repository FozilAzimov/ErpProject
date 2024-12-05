export default (context, inject) => {
  // Global function
  const formatNumber = (num, fixed) => {
    if (num) return num.toFixed(fixed).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  }
  inject('formatNumber', formatNumber)
}
