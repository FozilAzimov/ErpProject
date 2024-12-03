import Chart from 'chart.js/auto'

export default ({ app }, inject) => {
  inject('Chart', Chart)
}
