<template>
  <div>
    <!-- QR Kodni joylashtirish uchun div -->
    <div ref="qrcodeContainer"></div>

    <!-- QR Kodni yaratish tugmasi -->
    <button @click="generateQRCode">Generate QR Code</button>
  </div>
</template>

<script>
import QRCode from 'qrcode'

export default {
  methods: {
    generateQRCode() {
      const orderId = '34345' // Dinamik ma'lumot

      // qrcodeContainer divini olish
      const qrcodeElement = this.$refs.qrcodeContainer

      // Divni tozalash, eski canvasni olib tashlash
      qrcodeElement.innerHTML = ''

      // Yangi canvas elementini yaratish
      const canvas = document.createElement('canvas')
      qrcodeElement.appendChild(canvas)

      // QR Kodni canvas elementiga joylashtirish
      QRCode.toCanvas(
        canvas,
        orderId,
        {
          width: 100,
          height: 100,
          color: {
            dark: '#000000',
            light: '#ffffff',
          },
        },
        (error) => {
          if (error) {
            console.error('QR Code generation failed:', error)
          } else {
            console.log('QR Code successfully created!')
          }
        }
      )
    },
  },
}
</script>

<style scoped>
/* Stil qo'shish */
</style>
