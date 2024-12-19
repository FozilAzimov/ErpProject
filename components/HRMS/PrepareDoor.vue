<template>
  <div class="w-full p-1">
    <LoadingPage
      v-if="isLoading"
      class="absolute left-[50%] top-[8px] translate-x-[-50%]"
    />
    <template v-if="isCloseTable">
      <div
        class="border-[1px] border-solid border-[rgba(0,0,0,0.05)] p-[12px] bg-gradient-to-b from-transparent via-transparent to-gray-200 shadow-md flex items-center justify-between"
      >
        <div class="flex items-center gap-[10px]">
          <img src="@assets/icons/user-black.png" alt="user" class="w-[14px]" />
          <h1 class="font-bold text-[rgb(49,126,172)] text-[14px] uppercase">
            {{
              pageType === 'view'
                ? 'View Doors'
                : pageType === 'edit'
                ? 'Edit Doors'
                : 'Add Doors'
            }}
          </h1>
        </div>
        <div>
          <ul class="flex items-center gap-4">
            <li
              class="p-[7px] rounded-[50%] cursor-pointer border-[1px] border-[solid] border-[rgba(0,0,0,0.1] hover:border-[#3b89e9] duration-[0.4s]"
              :style="{
                background: 'radial-gradient(#fff, rgba(32,111,162,0.2))',
              }"
            >
              <img class="w-[11px]" src="@assets/icons/gear.png" alt="gear" />
            </li>
            <li
              class="p-[7px] rounded-[50%] cursor-pointer border-[1px] border-[solid] border-[rgba(0,0,0,0.1] hover:border-[#3b89e9] focus:border-[#3b89e9] duration-[0.4s]"
              :style="{
                background: 'radial-gradient(#fff, rgba(32,111,162,0.2))',
              }"
              @click="isOpen"
            >
              <img
                class="w-[11px]"
                :class="
                  isOpenTable
                    ? 'rotate-[-180deg] duration-[1s]'
                    : 'rotate-[0deg] duration-[1s]'
                "
                src="@assets/icons/arrow.png"
                alt="arrow"
              />
            </li>
            <li
              class="p-[7px] rounded-[50%] cursor-pointer border-[1px] border-[solid] border-[rgba(0,0,0,0.1] hover:border-[#3b89e9] focus:border-[#3b89e9] duration-[0.4s]"
              :style="{
                background: 'radial-gradient(#fff, rgba(32,111,162,0.2))',
              }"
              @click="isClose"
            >
              <img
                class="w-[11px]"
                src="@assets/icons/remove.png"
                alt="remove"
              />
            </li>
          </ul>
        </div>
      </div>
      <div
        class="border-[1px] border-solid border-[rgba(0,0,0,0.1)]"
        :class="
          isOpenTable
            ? 'duration-[1s] h-[755px] overflow-hidden'
            : 'duration-[1s] h-0 overflow-hidden'
        "
      >
        <div class="flex flex-col items-start m-2 gap-1">
          <div v-for="(element, index) in elementData" :key="index">
            <template v-if="element.show">
              <span
                v-if="element.type === 'text'"
                class="flex flex-col items-start mb-1"
              >
                <span class="text-[13px]"
                  >{{ element.name }}
                  <span
                    v-if="element?.required"
                    class="text-red-500 text-[16px]"
                    >*</span
                  >
                </span>
                <generic-input
                  :value="`${
                    viewEditData?.[element.subName]
                      ? viewEditData[element.subName]
                      : ''
                  }`"
                  width="300"
                  type="text"
                  :name="element.subName"
                  :disabled="element.disabled"
                  @customFunction="getInputAndLookUpValueAction"
                />
              </span>
              <span
                v-else-if="element.type === 'select'"
                class="flex flex-col items-start mb-1"
              >
                <span class="text-[13px]">{{ element.name }}</span>
                <generic-look-up
                  dwidth="300"
                  :name="element.subName"
                  :defvalue="''"
                  :durl="element?.api"
                  :options-data="selectData?.[element?.selectName]"
                  :disabled="element.disabled"
                  :multiple="element?.multiple"
                  @customFunction="getInputAndLookUpValueAction"
                />
              </span>
              <span
                v-else-if="element.type === 'radio'"
                class="flex flex-col items-start mb-1"
              >
                <el-radio
                  v-model="radio"
                  :disabled="element.disabled"
                  :label="element.subName"
                ></el-radio>
              </span>
            </template>
          </div>

          <div v-if="pageType === 'edit'" class="w-full">
            <transition name="fade">
              <div
                v-show="showHideFaceID && isAccept"
                class="w-fit p-2 mb-5 flex flex-col items-start gap-2 border-[1px] border-solid border-[rgba(0,0,0,0.1)] rounded-sm"
              >
                <span
                  v-for="(obj, i) in cameraIdsArr"
                  :key="i"
                  class="flex items-center gap-2 text-[13px] justify-between p-2 rounded-sm w-fit"
                  :style="
                    setCameraIds?.[i]
                      ? { background: '#b5e5b5' }
                      : { background: 'none' }
                  "
                >
                  <div class="font-semibold">{{ obj?.label }}:</div>
                  <div>{{ obj?.id }}</div>
                  <generic-button
                    v-show="!setCameraIds?.[i]"
                    name="Add"
                    type="primary"
                    @click="setDeviceIdAction(i, obj?.id)"
                  />
                </span>
                <generic-button
                  v-if="setCameraIds[0] && setCameraIds[1]"
                  name="Accept"
                  type="success"
                  @click="setAcceptAction(setCameraIds)"
                />
              </div>
            </transition>
            <generic-button
              v-if="isAccept"
              name="Change FaceId Camera Ids"
              type="primary"
              @click="showFaceIdsAction"
            />
          </div>

          <div class="flex items-center gap-3 mt-3">
            <generic-button
              name="Go Back"
              type="primary"
              icon-name-attribute="arrow-left"
              @click="$router.push('/doors.htm')"
            />
            <generic-button
              v-if="pageType !== 'view'"
              :name="pageType === 'edit' ? 'Save changes' : 'Save'"
              type="success"
              :icon-name-attribute="pageType && 'edit'"
              @click="saveAction"
            />
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import GenericButton from '@generics/GenericButton.vue'
import GenericInput from '@generics/GenericInput.vue'
import LoadingPage from '@components/Loading/LoadingPage.vue'
import GenericLookUp from '@generics/GenericLookUp.vue'
export default {
  components: {
    LoadingPage,
    GenericButton,
    GenericInput,
    GenericLookUp,
  },

  // DATA
  data() {
    return {
      isLoading: false,
      showHideFaceID: false,
      pageSize_value: 25,
      isOpenTable: true,
      isCloseTable: true,
      pageType: null,
      pageID: null,
      elementData: [],
      viewEditData: {},
      allInputAndLookUpValue: {},
      selectData: {},
      cameraIdsArr: [],
      setCameraIds: [],
      isAccept: true,
      faceIdCameraIds: '',
    }
  },

  // CREATED
  created() {
    // page ID sini olish
    this.pageID = this.$route.params?.id
    // page TYPE ni aniqlash
    this.pageType = this.$route?.query?.page_type
  },

  // MOUNTED
  mounted() {
    // function
    this.dataCreatedAction()
    // Table function
    this.getTableRequest()
    this.allInputAndLookUpValue.active = true
  },

  // Methods
  methods: {
    // Table page ni ochish va yopish uchun
    isOpen() {
      this.isOpenTable = !this.isOpenTable
    },
    isClose() {
      this.isCloseTable = !this.isCloseTable
    },

    // Page request
    getTableRequest() {
      this.isLoading = !this.isLoading
      if (this.pageType === 'view') {
        this.$axios
          .post(`/door/prepareDoorView`, {
            id: this.pageID,
            page_current: 1,
            page_size: 25,
          })
          .then(({ data: { door, hrDeviceList, hrDeviceList2 } }) => {
            this.viewEditData = door
            this.selectData.hrDeviceList2 = hrDeviceList2
            this.selectData.hrDeviceList = hrDeviceList
            this.isLoading = !this.isLoading
          })
          .catch((error) => {
            this.isLoading = !this.isLoading
            // eslint-disable-next-line no-console
            console.log(error)
          })
      } else if (this.pageType === 'edit') {
        this.$axios
          .post(`/door/prepareDoor`, {
            id: this.pageID,
            page_current: 1,
            page_size: 25,
          })
          .then(({ data: { door, hrDeviceList, hrDeviceList2 } }) => {
            this.viewEditData = door
            this.selectData.hrDeviceList2 = hrDeviceList2
            this.selectData.hrDeviceList = hrDeviceList
            this.isLoading = !this.isLoading
          })
          .catch((error) => {
            this.isLoading = !this.isLoading
            // eslint-disable-next-line no-console
            console.log(error)
          })
      } else {
        this.$axios
          .post(`/door/prepareDoor`, {
            page_current: 1,
            page_size: 25,
          })
          .then(({ data: { warehouseTypeList, departments } }) => {
            this.selectData.departments = departments
            this.selectData.warehouseTypeList = warehouseTypeList
            this.isLoading = !this.isLoading
          })
          .catch((error) => {
            this.isLoading = !this.isLoading
            // eslint-disable-next-line no-console
            console.log(error)
          })
      }
    },

    // Input value action
    getInputAndLookUpValueAction(name, value) {
      this.$set(this.allInputAndLookUpValue, name, value)
    },

    // FACE id set action
    async showFaceIdsAction() {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices()
        if (devices?.length) {
          this.cameraIdsArr = []
          devices.forEach((device) => {
            if (
              device.kind === 'videoinput' &&
              (device.label.includes('ForwardRGB') ||
                device.label.includes('USB ColorCamera') ||
                device.label.includes('USB RGB Camera') ||
                device.label.includes('RGB Camera') ||
                device.label.includes('ForwardIR') ||
                device.label.includes('CameraWN.AHD') ||
                device.label.includes('USB IRCamera') ||
                device.label.includes('USB IR Camera') ||
                device.label.includes('NIR Camera'))
            ) {
              const newObj = {
                label: device.label,
                id: device.deviceId,
              }
              this.cameraIdsArr.push(newObj)
            }
          })
        }
        this.showHideFaceID = true
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Kamerani ishga tushirishda xatolik:', error)
        this.$notification('Error', 'Error', 'error')
      }
    },

    setDeviceIdAction(index, id) {
      this.$set(this.setCameraIds, index, id)
    },

    setAcceptAction(arr) {
      let strID = ''
      arr.forEach((val) => {
        strID += val + ','
      })
      // Oxirgi vergulni olib tashlash
      this.faceIdCameraIds = strID.slice(0, -1)
      this.isAccept = false
      this.$notification('Success', 'Success', 'success')
    },

    // Save Changes action
    saveAction() {
      if (this.allInputAndLookUpValue?.name || this.viewEditData?.name) {
        let body = {}
        let door = {}
        if (this.pageID && this.pageType === 'edit') {
          door = {
            id: this.pageID,
            name:
              this.allInputAndLookUpValue?.name ??
              this.viewEditData?.name ??
              '',
            number:
              this.allInputAndLookUpValue?.number ??
              this.viewEditData?.number ??
              null,
            faceIdCameraRotate: 0,
            faceIdCameraIds: this.faceIdCameraIds ?? '',
          }
        } else {
          door = {
            name: this.allInputAndLookUpValue?.name ?? '',
            number: this.allInputAndLookUpValue?.number ?? null,
            number2: this.allInputAndLookUpValue?.number2 ?? null,
            hrDeviceIds: this.allInputAndLookUpValue?.hrDeviceIds ?? null,
            hr_deviceId: this.allInputAndLookUpValue?.hr_deviceId ?? null,
          }
        }
        body = {
          page_size: this.pageSize_value,
          page_current: 1,
          door,
        }

        this.isLoading = !this.isLoading
        this.$axios
          .post(`/door/${this.pageID ? 'editDoor' : 'addDoor'}`, body)
          .then(() => {
            this.isLoading = !this.isLoading
            this.$router.push('/doors.htm')
          })
          .catch((error) => {
            this.isLoading = !this.isLoading
            // eslint-disable-next-line no-console
            console.log(error)
          })
      } else this.$notification(`'name' not entered!`)
    },

    // Data created
    dataCreatedAction() {
      const data = [
        {
          name: 'Door/Turnstile Name',
          subName: 'name',
          type: 'text',
          show: true,
          disabled: this.pageType === 'view',
        },
        {
          name: 'Door/Turnstile Number',
          subName: 'number',
          type: 'text',
          show: true,
          disabled: this.pageType === 'view',
        },
        {
          name: 'Hr Device',
          subName: 'hrDeviceList',
          selectName: 'hrDeviceList',
          type: 'select',
          show: true,
          multiple: true,
          disabled: this.pageType === 'view',
        },
        {
          name: 'Door/Turnstile Number№2',
          subName: 'number2',
          type: 'text',
          show: this.pageType !== 'view',
          disabled: this.pageType === 'view',
        },
        {
          name: 'Hr Device For INBIO',
          subName: 'hrDeviceList2',
          selectName: 'hrDeviceList2',
          type: 'select',
          show: this.pageType !== 'view',
          disabled: this.pageType === 'view',
        },
        {
          name: 'Camera rotation',
          subName: 'cameraRotation',
          selectName: 'list',
          type: 'select',
          show: this.pageType === 'edit',
          disabled: this.pageType === 'view',
        },
      ]
      this.elementData = data
    },
  },
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 2s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
