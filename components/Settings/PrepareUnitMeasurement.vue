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
                ? 'View MEASUREMENT'
                : pageType === 'edit'
                ? 'Edit MEASUREMENT'
                : 'Add MEASUREMENT'
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
                v-if="
                  element.type === 'text' ||
                  element.type === 'textarea' ||
                  element.type === 'number'
                "
                class="flex flex-col items-start mb-1"
              >
                <span class="text-[13px]">{{ element.name }}</span>
                <generic-input
                  :value="
                    viewEditData?.[element.subName]
                      ? viewEditData?.[element.subName]
                      : ''
                  "
                  width="300"
                  :type="element.type"
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
                  :text="element?.name"
                  :name="element?.subName"
                  :disabled="element.disabled"
                  :default-value="
                    viewEditData?.[element.subName]
                      ? viewEditData?.[element.subName]
                      : false
                  "
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
              @click="$router.push('/unitmeasurement.htm')"
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
import GenericCheckBox from '@generics/GenericCheckBox.vue'
export default {
  components: {
    LoadingPage,
    GenericButton,
    GenericInput,
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
      viewEditData: {},
      allInputAndLookUpValue: {},
      elementData: [],
      currencyData: [],
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
    // Table page ni ochish va yopish uchun
    isOpen() {
      this.isOpenTable = !this.isOpenTable
    },
    isClose() {
      this.isCloseTable = !this.isCloseTable
    },

    // Page request
    getTableRequest() {
      if (this.pageType === 'view') {
        this.isLoading = !this.isLoading
        this.$axios
          .post(`/unitmeasurement/prepareUnitMeasurementView`, {
            id: this.pageID,
            page_current: 1,
            page_size: 25,
          })
          .then(({ data: { unitMeasurement } }) => {
            this.viewEditData = unitMeasurement
            this.isLoading = !this.isLoading
          })
          .catch((error) => {
            this.isLoading = !this.isLoading
            // eslint-disable-next-line no-console
            console.log(error)
          })
      } else if (this.pageType === 'edit') {
        this.isLoading = !this.isLoading
        this.$axios
          .post(`/unitmeasurement/prepareUnitMeasurement`, {
            id: this.pageID,
            page_current: 1,
            page_size: 25,
          })
          .then(({ data: { unitMeasurement } }) => {
            this.viewEditData = unitMeasurement
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
      let unitMeasurement = {}
      if (this.pageID && this.pageType === 'edit') {
        unitMeasurement = {
          id: this.pageID,
          name:
            this.allInputAndLookUpValue?.name ?? this.viewEditData?.name ?? '',
          description:
            this.allInputAndLookUpValue?.description ??
            this.viewEditData?.description ??
            '',
          ratio:
            this.allInputAndLookUpValue?.ratio ??
            this.viewEditData?.ratio ??
            '',
          dyeingRecipeRatio:
            this.allInputAndLookUpValue?.dyeingRecipeRatio ??
            this.viewEditData?.dyeingRecipeRatio ??
            '',
          groupId:
            this.allInputAndLookUpValue?.groupId ??
            this.viewEditData?.groupId ??
            '',
          use_expense_dyeing_param:
            this.allInputAndLookUpValue?.use_expense_dyeing_param ??
            this.viewEditData?.use_expense_dyeing_param ??
            false,
        }
      } else {
        unitMeasurement = {
          name: this.allInputAndLookUpValue?.name ?? '',
          description: this.allInputAndLookUpValue?.description ?? '',
          ratio: this.allInputAndLookUpValue?.ratio ?? '',
          dyeingRecipeRatio:
            this.allInputAndLookUpValue?.dyeingRecipeRatio ?? '',
          groupId: this.allInputAndLookUpValue?.groupId ?? '',
          use_expense_dyeing_param:
            this.allInputAndLookUpValue?.use_expense_dyeing_param ?? false,
        }
      }
      body = {
        page_size: this.pageSize_value,
        page_current: 1,
        unitMeasurement,
      }

      this.isLoading = !this.isLoading
      const method = this.pageID ? 'put' : 'post'
      this.$axios[method](
        `/unitmeasurement/${
          this.pageID ? 'editUnitMeasurement' : 'addUnitMeasurement'
        }`,
        body
      )
        .then(() => {
          this.isLoading = !this.isLoading
          this.$router.push('/unitmeasurement.htm')
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
          name: 'Description',
          subName: 'description',
          type: 'textarea',
          show: true,
          disabled: this.pageType === 'view',
        },
        {
          name: 'Ratio',
          subName: 'ratio',
          type: 'number',
          show: true,
          disabled: this.pageType === 'view',
        },
        {
          name: 'Multiply To Batch Qty',
          subName: 'dyeingRecipeRatio',
          type: 'number',
          show: true,
          disabled: this.pageType === 'view',
        },
        {
          name: 'Group Id',
          subName: 'groupId',
          type: 'number',
          show: true,
          disabled: this.pageType === 'view',
        },
        {
          name: 'Use Expense Dyeing Param',
          subName: 'use_expense_dyeing_param',
          type: 'checkbox',
          show: true,
          disabled: this.pageType === 'view',
        },
      ]
      this.elementData = data
    },
  },
}
</script>
