<template>
  <div class="w-full p-[0px_12px_0px_10px]">
    <LoadingPage
      v-if="isLoading"
      class="absolute left-[50%] top-[8px] translate-x-[-50%]"
    />
    <template v-if="isCloseTable">
      <div
        class="border-[1px] border-solid border-[rgba(0,0,0,0.05)] p-[12px] bg-gradient-to-b from-transparent via-transparent to-gray-200 shadow-md flex items-center justify-between mt-1"
      >
        <div class="flex items-center gap-[10px]">
          <img src="@assets/icons/user-black.png" alt="user" class="w-[14px]" />
          <h1 class="font-bold text-[rgb(49,126,172)] text-[14px] uppercase">
            Edit WAREHOUSE
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
        <div class="w-fit flex flex-col items-start m-2 gap-1">
          <div v-for="(obj, index) in activeLanguages" :key="index">
            <span class="flex flex-col items-start mb-1">
              <span class="text-[13px]">{{ obj?.name }}</span>
              <generic-input
                :value="`${editData?.[index]}`"
                width="300"
                type="text"
                :name="obj?.code"
                :disabled="obj?.code === 'en' ? true : false"
                @customFunction="getInputAndLookUpValueAction"
              />
            </span>
          </div>

          <div class="flex items-center gap-3 mt-3">
            <generic-button
              name="Go Back"
              type="primary"
              icon-name-attribute="arrow-left"
              @click="$router.push('/languages.htm')"
            />
            <generic-button
              name="Save changes"
              type="success"
              icon-name-attribute="edit"
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
export default {
  components: {
    LoadingPage,
    GenericButton,
    GenericInput,
  },

  // DATA
  data() {
    return {
      isLoading: false,
      pageSize_value: 25,
      isOpenTable: true,
      isCloseTable: true,
      messageKey: '',
      editData: [],
      activeLanguages: [],
      messageValues: [],
      allInputAndLookUpValue: {},
    }
  },

  // CREATED
  created() {
    // page ID sini olish
    this.messageKey = this.$route?.params?.id.split('=')[1]
  },

  // MOUNTED
  mounted() {
    // Table function
    this.getTableRequest()
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
      this.$axios
        .post(`/language/prepareLanguage`, {
          messageKey: this.messageKey,
          page_current: 1,
          page_size: 25,
        })
        .then(({ data }) => {
          this.activeLanguages = data?.activeLanguages
          this.editData = data?.messageValues
          // function
          this.editDataValueSetAction(data?.messageValues)
          this.isLoading = !this.isLoading
        })
        .catch((error) => {
          this.isLoading = !this.isLoading
          // eslint-disable-next-line no-console
          console.log(error)
        })
    },

    // default value'ni set qilish
    editDataValueSetAction(arr) {
      this.activeLanguages.forEach((obj, index) => {
        arr.forEach((value, innerIndex) => {
          if (index === innerIndex) {
            this.allInputAndLookUpValue[obj?.code] = value
          }
        })
      })
    },

    // Input value action
    getInputAndLookUpValueAction(name, value) {
      this.$set(this.allInputAndLookUpValue, name, value)
      this.messageValues = Object.values(this.allInputAndLookUpValue)
    },

    // Save Changes action
    saveAction() {
      const body = {
        page_size: this.pageSize_value,
        page_current: 1,
        messageKey: this.messageKey ?? '',
        messageValues: this.messageValues,
      }

      this.isLoading = !this.isLoading
      this.$axios
        .put(`/language/editLanguage`, body)
        .then(() => {
          this.isLoading = !this.isLoading
          this.$router.push('/languages.htm')
        })
        .catch((error) => {
          this.isLoading = !this.isLoading
          // eslint-disable-next-line no-console
          console.log(error)
        })
    },
  },
}
</script>
