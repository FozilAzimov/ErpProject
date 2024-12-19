<template>
  <div>
    <button
      v-if="!isVideo || !isEqual"
      class="text-[42px] text-white bg-[#04AA6D] h-[176px] py-1 px-2 rounded-lg"
      @click="authorizationClickAction"
    >
      {{ GET_CORE_STRING?.enableCameraFaceId || 'Authorization by Face' }}
    </button>
    <!-- Start Video -->
    <div
      v-show="isVideo"
      class="absolute z-10 cursor-grab rounded-lg overflow-hidden"
      :style="{ top: yPos + 'px', left: xPos + 'px' }"
      @mousedown="startDrag"
    >
      <video
        id="video"
        style="transform: scale(1.5)"
        muted
        autoplay
        playsinline
      ></video>
      <generic-button
        v-show="isVideo && isEqual"
        :name="
          loading
            ? `${GET_CORE_STRING?.loading || 'Loading...'}`
            : `${
                GET_CORE_STRING?.clickForLoginByFaceId ||
                'clickForLoginByFaceId'
              }`
        "
        :type="loading ? 'danger' : 'primary'"
        :loading="loading"
        class="absolute bottom-0 right-1/2 translate-x-1/2"
        btn-size="medium"
        @click="captureImage"
      />
      <generic-button
        v-show="isVideo && isEqual"
        class="absolute top-0 right-0"
        type="info"
        icon-name-attribute="close"
        @click="captureImageCloseAction"
      />
    </div>
    <!-- End Video -->

    <!-- hidden element -->
    <video
      v-show="false"
      id="video2"
      muted
      autoplay
      playsinline
      class="video"
    ></video>
    <canvas v-show="false" id="canvas"></canvas>
    <canvas v-show="false" id="canvas2"></canvas>
    <!-- hidden element -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import GenericButton from '@generics/GenericButton.vue'
export default {
  components: { GenericButton },
  // PROPS
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
  },

  // DATA
  data() {
    return {
      // Draggable
      xPos: 0, // Boshlang'ich X pozitsiya
      yPos: 0, // Boshlang'ich Y pozitsiya
      isDragging: false,
      offset: { x: 0, y: 0 },
      // Draggable

      isVideo: false,
      doorIds: [],
      checkDoorIds: [],
      devices: [],
      doorIds2: '',
      intervalId: null,
      isEqual: true,
    }
  },

  // COMPUTED
  computed: {
    ...mapGetters('translate', ['GET_CORE_STRING']),
  },

  // MOUNTED
  mounted() {
    this.checkDoorsFrDb(this.doorIds2) // function
    this.initialDoorIdsAction() // function
    this.setInitialPosition() // function
  },

  // METHODS
  methods: {
    // Draggable actions ===========================================
    setInitialPosition() {
      const popupWidthPercent = 60 // Popup kengligi (foiz)
      const popupHeightPercent = 70 // Popup balandligi (foiz)
      // Popup kengligi va balandligini foizdan hisoblash
      const popupWidth = (window.innerWidth * popupWidthPercent) / 100
      const popupHeight = (window.innerHeight * popupHeightPercent) / 100
      // Ekranning markaziga joylashtirish
      this.xPos = window.innerWidth / 2 - popupWidth / 2
      this.yPos = window.innerHeight / 2 - popupHeight / 2
    },
    startDrag(event) {
      this.isDragging = true
      this.offset.x = event.clientX - this.xPos
      this.offset.y = event.clientY - this.yPos
      window.addEventListener('mousemove', this.onDragging)
      window.addEventListener('mouseup', this.stopDrag)
    },
    stopDrag() {
      this.isDragging = false
      window.removeEventListener('mousemove', this.onDragging)
      window.removeEventListener('mouseup', this.stopDrag)
    },
    onDragging(event) {
      if (this.isDragging) {
        this.xPos = event.clientX - this.offset.x
        this.yPos = event.clientY - this.offset.y
      }
    },
    // Draggable actions ===========================================

    // mounted created doorsId
    initialDoorIdsAction() {
      navigator.mediaDevices.enumerateDevices().then((devices) => {
        this.devices = devices
        // console.log(devices)
        devices.forEach((device) => {
          if (device.kind === 'videoinput') {
            if (this.doorIds2.length > 0) {
              this.doorIds2 += ','
            }
            this.doorIds2 += this.doorIds2 + device.deviceId
          }
        })
      })
    },

    // Initial Click Action
    authorizationClickAction() {
      this.devices.forEach((device) => {
        if (device.kind === 'videoinput') {
          this.isVideo = true
        }
      })
      if (this.isVideo) {
        this.startCamera() // function
        this.loadingAction() // function
        this.intervalId = setInterval(() => {
          this.checkDoorsFrDb(this.doorIds2)
        }, 10000)
      }
    },

    // Close camera
    captureImageCloseAction() {
      this.isVideo = false
      this.isEqual = false
      clearInterval(this.intervalId)
    },

    // Start set image
    async startCamera() {
      try {
        const video1 = document.getElementById('video')
        const video2 = document.getElementById('video2')

        const devices = await navigator.mediaDevices.enumerateDevices()
        if (devices?.length) {
          const arr = []
          let id = 0

          for (const obj of devices) {
            if (obj?.kind === 'videoinput') {
              const newObj = {
                ID: id,
                KEY: obj?.deviceId,
                TYPE: obj?.label,
              }
              arr.push(newObj)
              id++

              this.isEqual = false // Default qiymat

              for (const subObj of this.checkDoorIds || []) {
                if (subObj.KEY === obj.deviceId) {
                  this.isEqual = true

                  if (obj.label.includes('PC Camera')) {
                    await this.setupCamera(video1, obj.deviceId)
                  } else if (
                    obj.label.includes('ForwardRGB') ||
                    obj.label.includes('USB ColorCamera') ||
                    obj.label.includes('USB RGB Camera') ||
                    obj.label.includes('RGB Camera')
                  ) {
                    await this.setupCamera(video1, obj.deviceId, {
                      width: { min: 640, ideal: 1280, max: 1920 },
                      height: { min: 480, ideal: 720, max: 1080 },
                    })
                  } else if (
                    obj.label.includes('ForwardIR') ||
                    obj.label.includes('CameraWN.AHD') ||
                    obj.label.includes('USB IRCamera') ||
                    obj.label.includes('USB IR Camera') ||
                    obj.label.includes('NIR Camera')
                  ) {
                    await this.setupCamera(video2, obj.deviceId, {
                      width: { min: 320, ideal: 1280, max: 1920 },
                      height: { min: 480, ideal: 720, max: 1080 },
                    })
                  }
                }
              }

              if (!this.isEqual) {
                this.$notification('Camera ID si topilmadi!')
              }
            }
          }

          this.doorIds = arr
          this.$emit('getDoorIdsEmitAction', this.doorIds)
        }

        this.loadingAction().close() // function close
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Kamerani ishga tushirishda xatolik:', error)
        this.$notification('Error', 'Error', 'error')
        clearInterval(this.intervalId)
      }
    },

    // Colback function
    async setupCamera(videoElement, deviceId, resolution = {}) {
      try {
        const constraints = {
          video: { deviceId: { exact: deviceId }, ...resolution },
          audio: false,
        }
        const videoStream = await navigator.mediaDevices.getUserMedia(
          constraints
        )
        videoElement.srcObject = videoStream
        videoElement.onloadedmetadata = () => videoElement.play()
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('An error occurred:', err)
        this.$notification('Error', 'Error', 'error')
        clearInterval(this.intervalId)
      }
    },

    captureImage() {
      const video1 = document.getElementById('video')
      const canvasElement = document.getElementById('canvas')
      const context = canvasElement.getContext('2d')
      // Canvas o'lchamini video o'lchamiga moslashtirish
      canvasElement.width = video1.videoWidth
      canvasElement.height = video1.videoHeight
      // Video tasvirini canvasga chizish
      context.drawImage(video1, 0, 0, canvasElement.width, canvasElement.height)
      // Tasvirni base64 formatida olish (keyinchalik serverga yuborish uchun foydalanish mumkin)
      const imageDataURL = canvasElement.toDataURL('image/jpeg', 0.8)

      const video2 = document.getElementById('video2')
      const canvasElement2 = document.getElementById('canvas2')
      const context2 = canvasElement2.getContext('2d')
      // Canvas o'lchamini video o'lchamiga moslashtirish
      canvasElement2.width = video2.videoWidth
      canvasElement2.height = video2.videoHeight
      // Video tasvirini canvasga chizish
      context2.drawImage(
        video2,
        0,
        0,
        canvasElement2.width,
        canvasElement2.height
      )
      const imageDataURL2 = canvasElement2.toDataURL('image/jpeg', 0.4)

      imageDataURL &&
        imageDataURL2 &&
        this.requestAction(imageDataURL, imageDataURL2) // function

      // Kamera streamini to'xtatish
      if (this.videoStream) {
        this.videoStream.getTracks().forEach((track) => track.stop())
      }
    },

    requestAction(imageDataURL, imageDataURL2) {
      if (this.doorIds.length) {
        const body = {
          user: {
            username: '-1',
            password: '-2',
          },
          imgFaceBase64: imageDataURL,
          irImgFaceBase64: imageDataURL2,
          faceDoorIds: JSON.stringify(this.doorIds),
          isReport: true,
          isProduction: false,
        }

        this.$emit('getDoorIdsEmitAction', true, body)
        clearInterval(this.intervalId)
      }
    },

    checkDoorsFrDb(prop) {
      let body = {}
      if (prop) {
        body = { datadata: prop }
      }
      this.$axios
        .post(`/door/faceIdDoors`, body)
        .then(({ data: { doorList } }) => {
          for (let i = 0; i < doorList?.length; i++) {
            const arr = doorList[i].faceIdCameraIds.split(',')
            for (let j = 0; j < arr.length; j++) {
              const keys = ['ID', 'KEY', 'ROTATE']
              const obj = {}
              obj[keys[0]] = j
              obj[keys[1]] = arr[j]
              obj[keys[2]] = doorList[i].faceIdCameraRotate
              this.checkDoorIds.push(obj)
            }
          }
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.error('Login request failed', error)
        })
    },

    // Loading action
    loadingAction() {
      const loading = this.$loading({
        lock: true,
        text: 'Loading...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.8)',
      })
      return loading
    },
  },
}
</script>
