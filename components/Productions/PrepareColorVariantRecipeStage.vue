<template>
  <div class="w-full p-[0px_12px_0px_10px]">
    <LoadingPage
      v-if="isLoading"
      class="absolute left-[50%] top-[8px] translate-x-[-50%]"
    />
    <transition name="fade">
      <ColumnConfigPage
        v-show="checkModal"
        api="saveColumnConfig"
        class="z-[10000]"
        @checkModal="handleValue"
      />
    </transition>
    <template v-if="isCloseTable">
      <div
        class="border-[1px] border-solid border-[rgba(0,0,0,0.05)] p-[12px] bg-gradient-to-b from-transparent via-transparent to-gray-200 shadow-md flex items-center justify-between mt-1"
      >
        <div class="flex items-center gap-[10px]">
          <img src="@assets/icons/user-black.png" alt="user" class="w-[14px]" />
          <h1 class="font-bold text-[rgb(49,126,172)] text-[14px] uppercase">
            {{
              pageType === 'view'
                ? 'View Packaging'
                : pageType === 'edit'
                ? 'Edit Packaging'
                : 'Packaging Create'
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
              @click="openColumnConfig"
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
          <div v-for="(element, index) in elementData" :key="index">
            <template v-if="element.show">
              <span
                v-if="element.type === 'text'"
                class="flex flex-col items-start mb-1"
              >
                <span class="text-[13px]"
                  >{{ element.name }}
                  <span v-if="element.required" class="text-[18px] text-red-600"
                    >*</span
                  >
                </span>
                <generic-input
                  :value="''"
                  width="300"
                  type="text"
                  :name="element.subName"
                  :disabled="element.disabled"
                  @customFunction="getInputAndLookUpValueAction"
                />
              </span>
              <span
                v-else-if="element.type === 'checkbox'"
                class="flex flex-col items-start mb-1"
              >
                <generic-check-box
                  :text="element.name"
                  :name="element.subName"
                  :border="true"
                  :disabled="element.disabled"
                  @customFunction="getInputAndLookUpValueAction"
                />
              </span>
            </template>
          </div>
          <div class="flex items-center gap-3 mt-3">
            <generic-button
              name="Go Back"
              type="primary"
              icon-name-attribute="arrow-left"
              @click="$router.push('/colorVariantRecipeStage.htm')"
            />
            <generic-button
              v-if="pageType !== 'view'"
              :name="pageType === 'edit' ? 'Save changes' : 'Save'"
              :type="pageType === 'edit' ? 'success' : 'primary'"
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
      checkModal: false,
      isOpenTable: true,
      isCloseTable: true,
      pageType: null,
      pageID: null,
      editData: {},
      allInputAndLookUpValue: {},
      elementData: [],
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
  },

  // Methods
  methods: {
    handleValue(checkModal) {
      this.checkModal = checkModal
    },
    openColumnConfig() {
      this.checkModal = true
    },
    // Table page ni ochish va yopish uchun
    isOpen() {
      this.isOpenTable = !this.isOpenTable
    },
    isClose() {
      this.isCloseTable = !this.isCloseTable
    },

    // Data created
    dataCreatedAction() {
      const data = [
        {
          name: 'Color Variant Recipe Stage Name',
          subName: 'name',
          type: 'text',
          required: true,
          show: true,
          disabled: this.pageType === 'view',
        },
        {
          name: 'Nominal',
          subName: 'nominal',
          type: 'text',
          required: false,
          show: true,
          disabled: this.pageType === 'view',
        },
        {
          name: 'Nominal2',
          subName: 'Nominal2',
          type: 'text',
          required: false,
          show: true,
          disabled: this.pageType === 'view',
        },
        {
          name: 'Group',
          subName: 'group',
          type: 'text',
          required: false,
          show: true,
          disabled: this.pageType === 'view',
        },
        {
          name: 'E Code',
          subName: 'code',
          type: 'text',
          required: false,
          show: this.pageType !== 'view',
        },
        {
          name: 'Dyeing',
          subName: 'dyeing',
          type: 'checkbox',
          required: false,
          show: this.pageType !== 'view',
        },
        {
          name: 'Dyeing Type',
          subName: 'dyeingType',
          type: 'text',
          required: false,
          show: this.pageType !== 'view',
        },
        {
          name: 'Type',
          subName: 'type',
          type: 'text',
          required: false,
          show: this.pageType !== 'view',
        },
      ]
      this.elementData = data
    },

    // Page request
    getTableRequest() {
      if (this.pageID && this.pageType === 'view') {
        this.isLoading = !this.isLoading
        this.$axios
          .post(`/design/prepareDesignViewAjaxLoad`, {
            id: this.pageID,
            page_current: 1,
            page_size: 25,
          })
          .then(({ data: { design } }) => {
            this.isLoading = !this.isLoading
          })
          .catch((error) => {
            this.isLoading = !this.isLoading
            // eslint-disable-next-line no-console
            console.log(error)
          })
      } else if (this.pageID && this.pageType === 'edit') {
        this.isLoading = !this.isLoading
        this.$axios
          .post(`/design/prepareDesignAjaxLoad`, {
            id: this.pageID,
            page_current: 1,
            page_size: 25,
          })
          .then(({ data: { designJson } }) => {
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

    // Save Changes action
    saveAction() {
      if (this.allInputAndLookUpValue.name) {
        const body = {}
        if (this.pageType === 'edit') {
          body.id = this.pageID || ''
          body.confirmed = this.allInputAndLookUpValue?.confirmed || ''
          body.name = this.allInputAndLookUpValue?.name || ''
          body.code = this.allInputAndLookUpValue?.code || ''
          body.planningTypeId =
            this.allInputAndLookUpValue?.planningTypeId || ''
        } else {
          body.name = this.allInputAndLookUpValue?.name || ''
          body.planningTypeId =
            this.allInputAndLookUpValue?.planningTypeId || ''
          body.code = this.allInputAndLookUpValue?.code || ''
        }
        this.isLoading = !this.isLoading
        this.$axios
          .post(`/design/prepareCreateEditDesign`, body)
          .then(({ status }) => {
            this.isLoading = !this.isLoading
            if (status === 200) this.$router.push('/designs.htm')
          })
          .catch((error) => {
            this.isLoading = !this.isLoading
            // eslint-disable-next-line no-console
            console.log(error)
          })
      }
    },
  },
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
