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
                ? 'View CAPITAL'
                : pageType === 'edit'
                ? 'Edit CAPITAL'
                : 'Add CAPITAL'
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
                v-if="element.type === 'text' || element.type === 'number'"
                class="flex flex-col items-start mb-1"
              >
                <span class="text-[13px]"
                  >{{ element.name
                  }}<span
                    v-if="element?.required"
                    class="text-[16px] text-red-500"
                    >*</span
                  ></span
                >
                <generic-input
                  :value="`${
                    editData?.[element.subName]
                      ? editData?.[element.subName]
                      : ''
                  }`"
                  width="250"
                  :type="element?.type"
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
                  dwidth="250"
                  :name="element.subName"
                  :durl="element?.api"
                  :defvalue="`${
                    editData?.[element.subName]
                      ? editData?.[element.subName]
                      : ''
                  }`"
                  :disabled="element.disabled"
                  @customFunction="getInputAndLookUpValueAction"
                />
              </span>
              <span
                v-else-if="element.type === 'date'"
                class="flex flex-col items-start mb-1"
              >
                <span class="text-[13px]">{{ element.name }}</span>
                <generic-input-date-page
                  :value="`${
                    editData?.[element.subName]
                      ? editData?.[element.subName]
                      : ''
                  }`"
                  width="250"
                  pl="10"
                  pr="10"
                  pt="1"
                  pb="1"
                  textsize="13"
                  type="datetime-local"
                  valuecolor="rgba(0,0,0,0.7)"
                  :name="element.subName"
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
              @click="$router.push('/capitals.htm')"
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
import GenericLookUp from '@generics/GenericLookUp.vue'
import GenericInputDatePage from '@components/InputDate/GenericInputDatePage.vue'
export default {
  components: {
    LoadingPage,
    GenericButton,
    GenericInput,
    GenericLookUp,
    GenericInputDatePage,
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
      if (this.pageType === 'edit') {
        this.isLoading = !this.isLoading
        this.$axios
          .get(`/capital/findCapital/${this.pageID}`)
          .then(({ data }) => {
            this.editData = data
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
      if (this.allInputAndLookUpValue?.amount || this.editData?.amount) {
        let body = {}
        if (this.pageID && this.pageType === 'edit') {
          body = {
            id: this.pageID,
            startDate:
              this.allInputAndLookUpValue?.startDate ??
              this.editData?.startDate ??
              '',
            endDate:
              this.allInputAndLookUpValue?.endDate ??
              this.editData?.endDate ??
              '',
            name:
              this.allInputAndLookUpValue?.name ?? this.editData?.name ?? '',
            amount:
              this.allInputAndLookUpValue?.amount ??
              this.editData?.amount ??
              '',
            companyId:
              this.allInputAndLookUpValue?.companyName ??
              this.editData?.companyId ??
              '',
          }
        } else {
          body = {
            startDate: this.allInputAndLookUpValue?.startDate ?? '',
            endDate: this.allInputAndLookUpValue?.endDate ?? '',
            name: this.allInputAndLookUpValue?.name ?? '',
            amount: this.allInputAndLookUpValue?.amount ?? '',
            companyId: this.allInputAndLookUpValue?.companyName ?? '',
          }
        }

        this.isLoading = !this.isLoading
        const method = this.pageID ? 'put' : 'post'
        this.$axios[method](
          `/capital/${this.pageID ? `updateCapital` : 'createCapital'}`,
          body
        )
          .then(() => {
            this.isLoading = !this.isLoading
            this.$router.push('/capitals.htm')
          })
          .catch((error) => {
            this.isLoading = !this.isLoading
            // eslint-disable-next-line no-console
            console.log(error)
          })
      }
    },

    // Data created
    dataCreatedAction() {
      const data = [
        {
          name: 'Start Date',
          subName: 'startDate',
          type: 'date',
          show: true,
          disabled: this.pageType === 'view',
        },
        {
          name: 'End Date',
          subName: 'endDate',
          type: 'date',
          show: true,
          disabled: this.pageType === 'view',
        },
        {
          name: 'Name',
          subName: 'name',
          type: 'text',
          show: true,
          disabled: this.pageType === 'view',
        },
        {
          name: 'Amount',
          subName: 'amount',
          type: 'number',
          show: true,
          required: true,
          disabled: this.pageType === 'view',
        },
        {
          name: 'Company',
          subName: 'companyName',
          type: 'select',
          api: 'findAllCompany',
          show: true,
          disabled: this.pageType === 'view',
        },
      ]
      this.elementData = data
    },
  },
}
</script>
