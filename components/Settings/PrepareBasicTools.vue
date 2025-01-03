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
            {{
              pageType === 'view'
                ? 'View a basic tool'
                : pageType === 'edit'
                ? 'Edit a basic tool'
                : 'Add a basic tool'
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
        <div class="w-fit flex flex-col items-start m-2 gap-1">
          <div v-for="(element, index) in elementData" :key="index">
            <template v-if="element.show">
              <span
                v-if="element.type === 'text'"
                class="flex flex-col items-start mb-1"
              >
                <span class="text-[13px]">{{ element.name }}</span>
                <generic-input
                  :value="
                    editData?.[element.subName]
                      ? editData?.[element.subName]
                      : ''
                  "
                  width="300"
                  type="text"
                  :name="element.subName"
                  :disabled="element.disabled"
                  @customFunction="getInputAndLookUpValueAction"
                />
              </span>
              <span
                v-else-if="element.type === 'number'"
                class="flex flex-col items-start mb-1"
              >
                <span class="text-[13px]">{{ element.name }}</span>
                <generic-input
                  :value="`${
                    editData?.[element.subName]
                      ? editData?.[element.subName]
                      : ''
                  }`"
                  width="300"
                  type="number"
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
                  defvalue="USA Dollor"
                  :options-data="currencyData"
                  :disabled="element.disabled"
                  @customFunction="getInputAndLookUpValueAction"
                />
              </span>
              <span
                v-else-if="element.type === 'checkbox'"
                class="flex flex-col items-start mb-1"
              >
                <generic-check-box
                  :text="element?.name"
                  :name="element?.subName"
                  :disabled="element.disabled"
                  :default-value="
                    editData?.[element.subName]
                      ? editData?.[element.subName]
                      : false
                  "
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

          <div class="flex items-center gap-3 mt-3">
            <generic-button
              name="Go Back"
              type="primary"
              icon-name-attribute="arrow-left"
              @click="$router.push('/basicTools.htm')"
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
import GenericLookUp from '@generics/GenericLookUp.vue'
import GenericCheckBox from '@generics/GenericCheckBox.vue'
export default {
  components: {
    LoadingPage,
    GenericButton,
    GenericInput,
    GenericLookUp,
    GenericCheckBox,
  },

  // DATA
  data() {
    return {
      isLoading: false,
      pageSize_value: 25,
      isOpenTable: true,
      isCloseTable: true,
      pageType: null,
      pageID: null,
      editData: {},
      allInputAndLookUpValue: {},
      elementData: [],
      radio: null,
      currencyData: [],
    }
  },

  // WATCH
  watch: {
    radio(newVal) {
      if (newVal === 'enabled') this.allInputAndLookUpValue.active = true
      else if (newVal === 'disabled') this.allInputAndLookUpValue.active = false
      else this.allInputAndLookUpValue.active = false
    },
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
          .post(`/fixedAssets/prepareBatchProcessViewAjaxLoad`, {
            id: this.pageID,
            page_current: 1,
            page_size: 25,
          })
          .then(({ data: { design } }) => {
            this.isLoading = !this.isLoading
            this.editData = design
          })
          .catch((error) => {
            this.isLoading = !this.isLoading
            // eslint-disable-next-line no-console
            console.log(error)
          })
      } else if (this.pageType === 'edit') {
        this.$axios
          .post(`/fixedAssets/prepareBatchProcessAjaxLoad`, {
            id: this.pageID,
            page_current: 1,
            page_size: 25,
          })
          .then(({ data: { batchProcess, currencyList } }) => {
            this.isLoading = !this.isLoading
            this.editData = batchProcess
            this.currencyData = currencyList
            batchProcess.active
              ? (this.radio = 'enabled')
              : (this.radio = 'disabled')
          })
          .catch((error) => {
            this.isLoading = !this.isLoading
            // eslint-disable-next-line no-console
            console.log(error)
          })
      } else {
        this.$axios
          .post(`/fixedAssets/prepareBasicTools`, {
            page_current: 1,
            page_size: 25,
          })
          .then(({ data: { batchProcess, currencyList } }) => {
            this.isLoading = !this.isLoading
            this.editData = batchProcess
            this.currencyData = currencyList
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
      let body = {}
      let batchProcess = {}
      if (this.pageID && this.pageType === 'edit') {
        batchProcess = {
          id: this.pageID,
          name: this.allInputAndLookUpValue?.name || this.editData.name || '',
        }
      } else {
        batchProcess = {
          name: this.allInputAndLookUpValue?.name,
        }
      }
      body = {
        page_size: this.pageSize_value,
        page_current: 1,
        batchProcess,
      }

      this.isLoading = !this.isLoading
      const method = this.pageID ? 'put' : 'post'
      this.$axios[method](
        `/fixedAssets/${this.pageID ? 'editFixedAssets' : 'addFixedAssets'}`,
        body
      )
        .then(() => {
          this.isLoading = !this.isLoading
          this.$router.push('/basicTools.htm')
        })
        .catch((error) => {
          this.isLoading = !this.isLoading
          // eslint-disable-next-line no-console
          console.log(error)
        })
    },

    // Data created
    dataCreatedAction() {
      const data = [
        {
          name: 'Name',
          subName: 'name',
          type: 'text',
          show: true,
          required: true,
          disabled: this.pageType === 'view',
        },
        {
          name: 'Code',
          subName: 'code',
          type: 'text',
          show: true,
          required: true,
          disabled: this.pageType === 'view',
        },
        {
          name: 'Inventary number',
          subName: 'inventaryNumber',
          type: 'number',
          show: true,
          required: true,
          disabled: this.pageType === 'view',
        },
        {
          name: 'Type',
          subName: 'type',
          type: 'text',
          show: true,
          required: true,
          disabled: this.pageType === 'view',
        },
        {
          name: 'Model',
          subName: 'model',
          type: 'text',
          show: true,
          required: true,
          disabled: this.pageType === 'view',
        },
        {
          name: 'Technical information',
          subName: 'technicalInformation',
          type: 'text',
          show: true,
          required: true,
          disabled: this.pageType === 'view',
        },
        {
          name: 'Feature',
          subName: 'feature',
          type: 'text',
          show: true,
          required: true,
          disabled: this.pageType === 'view',
        },
        {
          name: 'Additional component',
          subName: 'additionalComponent',
          type: 'text',
          show: true,
          required: true,
          disabled: this.pageType === 'view',
        },
        {
          name: 'Balance value (sum)',
          subName: 'balanceValue',
          type: 'text',
          show: true,
          required: true,
          disabled: this.pageType === 'view',
        },
        {
          name: 'Annual depreciation rate (%)',
          subName: 'AnnualDepreciationRate',
          type: 'text',
          show: true,
          required: true,
          disabled: this.pageType === 'view',
        },
        {
          name: 'Department',
          subName: 'departmentName',
          type: 'select',
          show: true,
          required: true,
          disabled: this.pageType === 'view',
        },
        {
          name: 'Category Company',
          subName: 'companyName',
          type: 'select',
          show: true,
          required: true,
          disabled: this.pageType === 'view',
        },
        {
          name: 'Comment',
          subName: 'comment',
          type: 'textarea',
          show: true,
          required: true,
          disabled: this.pageType === 'view',
        },
      ]
      this.elementData = data
    },
  },
}
</script>
