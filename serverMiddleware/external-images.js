import express from 'express'
const app = express()

// Tashqi fayllar joylashgan katalog yo‘lini aniqlash
const externalFolder =
  'C:/newErpProject/ERP_ACTUAL_PRO/src/main/webapp/webapps/EXTRA/elavka/img/productImages'

// Static xizmat qilish
app.use(express.static(externalFolder))

export default app
