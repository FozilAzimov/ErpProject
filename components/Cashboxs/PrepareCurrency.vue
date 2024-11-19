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
                ? 'View Currency'
                : pageType === 'edit'
                ? 'Edit Currency'
                : 'Add Currency'
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
                v-if="element.type === 'text' || element?.type === 'number'"
                class="flex flex-col items-start mb-1"
              >
                <span class="text-[13px]"
                  >{{ element.name }}
                  <span
                    v-if="element?.required"
                    class="text-[18px] text-red-500"
                    >*</span
                  ></span
                >
                <generic-input
                  :value="`${
                    viewEditData?.[element.subName]
                      ? viewEditData?.[element.subName]
                      : ''
                  }`"
                  width="300"
                  :type="element?.type"
                  :name="element.subName"
                  :disabled="element.disabled"
                  @customFunction="getInputAndLookUpValueAction"
                />
              </span>
              <span
                v-else-if="element.type === 'radio'"
                class="flex flex-col items-start mb-1"
              >
                <el-radio
                  v-for="(elem, inx) in element?.list"
                  :key="inx"
                  v-model="radio"
                  :disabled="element.disabled"
                  :label="elem.subName"
                ></el-radio>
              </span>
            </template>
          </div>

          <div class="flex items-center gap-3 mt-3">
            <generic-button
              name="Go Back"
              type="primary"
              icon-name-attribute="arrow-left"
              @click="$router.push('/currencies.htm')"
            />
            <generic-button
              v-if="pageType !== 'view'"
              :name="pageType === 'edit' ? 'Save changes' : 'Save'"
              :type="pageType === 'edit' ? 'success' : 'primary'"
              :icon-name-attribute="pageType === 'edit' ? 'edit' : ''"
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
      pageType: null,
      pageID: null,
      viewEditData: {},
      allInputAndLookUpValue: {},
      elementData: [],
      radio: 'Enabled',
    }
  },

  // WATCH
  watch: {
    radio(newVal) {
      if (newVal === 'Enabled') this.allInputAndLookUpValue.active = true
      else if (newVal === 'Disabled') this.allInputAndLookUpValue.active = false
      else this.allInputAndLookUpValue.active = false
    },
  },

  // CREATED
  created() {
    // page ID sini olish
    this.pageID = this.$route.params?.id
    // page Type
    this.pageType = this.$route.query?.page_type
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
          .post(`/currency/currencyViewAjaxLoad`, {
            id: this.pageID,
            page_current: 1,
            page_size: 25,
          })
          .then(({ data }) => {
            this.viewEditData = data.currency
            data.currency.active
              ? (this.radio = 'Enabled')
              : (this.radio = 'Disabled')
            this.isLoading = !this.isLoading
          })
          .catch((error) => {
            this.isLoading = !this.isLoading
            // eslint-disable-next-line no-console
            console.log(error)
          })
      } else if (this.pageType === 'edit') {
        this.$axios
          .post(`/currency/prepareCurrencyAjaxLoad`, {
            id: this.pageID,
            page_current: 1,
            page_size: 25,
          })
          .then(({ data }) => {
            this.viewEditData = data.currency
            data.currency.active
              ? (this.radio = 'Enabled')
              : (this.radio = 'Disabled')
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
      let body = {}
      let currency = {}
      if (this.pageID && this.pageType === 'edit') {
        currency = {
          id: this.pageID,
          name:
            this.allInputAndLookUpValue?.name ?? this.viewEditData?.name ?? '',
          short_code:
            this.allInputAndLookUpValue?.short_code ??
            this.viewEditData?.short_code ??
            '',
          symbol:
            this.allInputAndLookUpValue?.symbol ??
            this.viewEditData?.symbol ??
            '',
          country_name:
            this.allInputAndLookUpValue?.country_name ??
            this.viewEditData?.country_name ??
            '',
          rounding1:
            this.allInputAndLookUpValue?.rounding1 ??
            this.viewEditData?.rounding1 ??
            '',
          rounding2:
            this.allInputAndLookUpValue?.rounding2 ??
            this.viewEditData?.rounding2 ??
            '',
          rounding3:
            this.allInputAndLookUpValue?.rounding3 ??
            this.viewEditData?.rounding3 ??
            '',
          rounding4:
            this.allInputAndLookUpValue?.rounding4 ??
            this.viewEditData?.rounding4 ??
            '',
          rounding5:
            this.allInputAndLookUpValue?.rounding5 ??
            this.viewEditData?.rounding5 ??
            '',
          active:
            this.allInputAndLookUpValue?.active ??
            this.viewEditData?.active ??
            false,
        }
      } else {
        currency = {
          name: this.allInputAndLookUpValue?.name ?? '',
          short_code: this.allInputAndLookUpValue?.short_code ?? '',
          symbol: this.allInputAndLookUpValue?.symbol ?? '',
          country_name: this.allInputAndLookUpValue?.country_name ?? '',
          rounding1: this.allInputAndLookUpValue?.rounding1 ?? '',
          rounding2: this.allInputAndLookUpValue?.rounding2 ?? '',
          rounding3: this.allInputAndLookUpValue?.rounding3 ?? '',
          rounding4: this.allInputAndLookUpValue?.rounding4 ?? '',
          rounding5: this.allInputAndLookUpValue?.rounding5 ?? '',
          active: this.allInputAndLookUpValue?.active ?? false,
        }
      }
      body = {
        page_size: this.pageSize_value,
        page_current: 1,
        currency,
      }

      this.isLoading = !this.isLoading
      const method = this.pageID ? 'put' : 'post'
      this.$axios[method](
        `/currency/${this.pageID ? 'editCurrencie' : 'addCurrencie'}`,
        body
      )
        .then(() => {
          this.isLoading = !this.isLoading
          this.$router.push('/currencies.htm')
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
          name: 'Short Code',
          subName: 'short_code',
          type: 'text',
          show: true,
          required: true,
          disabled: this.pageType === 'view',
        },
        {
          name: 'Symbol',
          subName: 'symbol',
          type: 'text',
          show: true,
          disabled: this.pageType === 'view',
        },
        {
          name: 'Country',
          subName: 'country_name',
          type: 'text',
          show: true,
          required: true,
          disabled: this.pageType === 'view',
        },
        {
          name: 'Rounding 1',
          subName: 'rounding1',
          type: 'number',
          show: true,
          required: true,
          disabled: this.pageType === 'view',
        },
        {
          name: 'Rounding 2',
          subName: 'rounding2',
          type: 'number',
          show: true,
          required: true,
          disabled: this.pageType === 'view',
        },
        {
          name: 'Rounding 3',
          subName: 'rounding3',
          type: 'number',
          show: true,
          required: true,
          disabled: this.pageType === 'view',
        },
        {
          name: 'Rounding 4',
          subName: 'rounding4',
          type: 'number',
          show: true,
          required: true,
          disabled: this.pageType === 'view',
        },
        {
          name: 'Rounding 5',
          subName: 'rounding5',
          type: 'number',
          show: true,
          required: true,
          disabled: this.pageType === 'view',
        },
        {
          name: 'Status',
          type: 'radio',
          show: true,
          disabled: this.pageType === 'view',
          list: [{ subName: 'Enabled' }, { subName: 'Disabled' }],
        },
      ]
      this.elementData = data
    },
  },
}
</script>
