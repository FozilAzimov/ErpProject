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
                ? 'View Cars'
                : pageType === 'edit'
                ? 'Edit Cars'
                : 'Add Cars'
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
            <div v-if="element.show" class="flex flex-col items-start mb-1">
              <span class="text-[13px]"
                >{{ element.name }}
                <span v-if="element.required" class="text-[18px] text-red-600"
                  >*</span
                ></span
              >
              <generic-input
                v-if="element.type === 'text'"
                :value="
                  viewEditData?.[element.subName]
                    ? viewEditData?.[element.subName]
                    : ''
                "
                width="300"
                type="text"
                :name="element.subName"
                :disabled="element.disabled"
                @customFunction="getInputAndLookUpValueAction"
              />
              <generic-input-date-page
                v-else-if="element.type === 'date'"
                width="300"
                height="28"
                pl="10"
                pr="10"
                pt="1"
                pb="1"
                textsize="13"
                type="datetime-local"
                :value="
                  viewEditData?.[element.subName]
                    ? new Date(viewEditData?.[element.subName])
                        .toISOString()
                        .split('.')[0]
                    : ''
                "
                valuecolor="rgba(0,0,0,0.7)"
                :name="element.name"
                @customFunction="getInputAndLookUpValueAction"
              />
              <generic-look-up
                v-else-if="element.type === 'select'"
                dwidth="300"
                :name="element.subName"
                :defvalue="
                  viewEditData?.[element.subName]
                    ? viewEditData?.[element.subName]
                    : ''
                "
                :durl="element?.api"
                @customFunction="getInputAndLookUpValueAction"
              />
            </div>
          </div>

          <div class="flex items-center gap-3 mt-3">
            <generic-button
              name="Go Back"
              type="primary"
              icon-name-attribute="arrow-left"
              @click="$router.push('/car.htm')"
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
      checkModal: false,
      isOpenTable: true,
      isCloseTable: true,
      pageType: null,
      pageID: null,
      viewEditData: {},
      allInputAndLookUpValue: {},
      elementData: [],
      selectData: {},
      radio: null,
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

    // Page request
    getTableRequest() {
      if (this.pageType === 'view') {
        this.isLoading = !this.isLoading
        this.$axios
          .post(`/car/prepareCarViewAjaxLoad`, {
            id: this.pageID,
            page_current: 1,
            page_size: 25,
          })
          .then(({ data: { car } }) => {
            this.isLoading = !this.isLoading
            this.viewEditData = car
          })
          .catch((error) => {
            this.isLoading = !this.isLoading
            // eslint-disable-next-line no-console
            console.log(error)
          })
      } else if (this.pageType === 'edit') {
        this.isLoading = !this.isLoading
        this.$axios
          .post(`/car/prepareCarAjaxLoad`, {
            id: this.pageID,
            page_current: 1,
            page_size: 25,
          })
          .then(({ data }) => {
            this.isLoading = !this.isLoading
            this.viewEditData = data?.car
            this.selectData = {
              carBodyName: data?.carBodyList,
              carChassisName: data?.carChassisList,
              carTypeName: data?.carTypeList,
              garageName: data?.contourList,
              departmentName: data?.departmentList,
              fuelTypeName: data?.fuelTypeList,
              userName: data?.personList,
              plateNumberName: data?.plateNumberList,
            }
          })
          .catch((error) => {
            this.isLoading = !this.isLoading
            // eslint-disable-next-line no-console
            console.log(error)
          })
      } else {
        this.isLoading = !this.isLoading
        this.$axios
          .post(`/car/prepareCarAjaxLoad`, {
            id: this.pageID,
            page_current: 1,
            page_size: 25,
          })
          .then(({ data }) => {
            this.isLoading = !this.isLoading
            this.selectData = {
              carBodyName: data?.carBodyList,
              carChassisName: data?.carChassisList,
              carTypeName: data?.carTypeList,
              garageName: data?.contourList,
              departmentName: data?.departmentList,
              fuelTypeName: data?.fuelTypeList,
              userName: data?.personList,
              plateNumberName: data?.plateNumberList,
            }
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
      let car = {}
      if (this.pageID && this.pageType === 'edit') {
        car = {
          id: this.pageID,
          name:
            this.allInputAndLookUpValue?.name ?? this.viewEditData.name ?? '',
          engineNumber:
            this.allInputAndLookUpValue?.engineNumber ??
            this.viewEditData.engineNumber ??
            '',
          garageContour: {
            id:
              this.allInputAndLookUpValue?.garageName ??
              this.viewEditData?.garageId ??
              '',
          },
        }
      } else {
        car = {
          name: this.allInputAndLookUpValue?.name ?? '',
          engineNumber: this.allInputAndLookUpValue?.engineNumber ?? '',
          garageContour: { id: this.allInputAndLookUpValue?.garageName ?? '' },
        }
      }
      body = {
        page_size: this.pageSize_value,
        page_current: 1,
        producedDate: this.allInputAndLookUpValue?.producedDate
          ? this.$formatDate(this.allInputAndLookUpValue?.producedDate)
          : this.viewEditData?.producedDate
          ? this.$formatDate(this.viewEditData?.producedDate)
          : '',
        personId:
          this.allInputAndLookUpValue?.userName ??
          this.viewEditData?.userId ??
          '',
        department_id:
          this.allInputAndLookUpValue?.departmentName ??
          this.viewEditData?.departmentId ??
          '',
        plateNumberId:
          this.allInputAndLookUpValue?.plateNumberName ??
          this.viewEditData?.plateNumberId ??
          '',
        carBodyId:
          this.allInputAndLookUpValue?.carBodyName ??
          this.viewEditData?.carBodyId ??
          '',
        carTypeId:
          this.allInputAndLookUpValue?.carTypeName ??
          this.viewEditData?.carTypeId ??
          '',
        carChassisId:
          this.allInputAndLookUpValue?.carChassisName ??
          this.viewEditData?.carChassisId ??
          '',
        fuelTypeId:
          this.allInputAndLookUpValue?.fuelTypeName ??
          this.viewEditData?.fuelTypeId ??
          '',
        car,
      }

      this.isLoading = !this.isLoading
      const method = this.pageID ? 'put' : 'post'
      this.$axios[method](`/car/${this.pageID ? 'editCar' : 'addCar'}`, body)
        .then(() => {
          this.isLoading = !this.isLoading
          this.$router.push('/car.htm')
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
          name: 'Cars Name',
          subName: 'name',
          type: 'text',
          show: true,
          required: true,
          disabled: this.pageType === 'view',
        },
        {
          name: 'engineNumber',
          subName: 'engineNumber',
          type: 'text',
          show: this.pageType !== 'view',
          required: true,
          disabled: this.pageType === 'view',
        },
        {
          name: 'producedDate',
          subName: 'producedDate',
          type: 'date',
          show: this.pageType !== 'view',
          required: true,
          disabled: this.pageType === 'view',
        },
        {
          name: 'User Name',
          subName: 'userName',
          api: 'findAllUsers1',
          type: 'select',
          show: this.pageType !== 'view',
          required: false,
          disabled: this.pageType === 'view',
        },
        {
          name: 'Department Name',
          subName: 'departmentName',
          api: 'findAllDepartmentByAbsoluteLogic',
          type: 'select',
          show: this.pageType !== 'view',
          required: false,
          disabled: this.pageType === 'view',
        },
        {
          name: 'Plate Number',
          subName: 'plateNumberName',
          api: 'findAllPlateNumberNative',
          type: 'select',
          show: this.pageType !== 'view',
          required: true,
          disabled: this.pageType === 'view',
        },
        {
          name: 'garage',
          subName: 'garageName',
          type: 'select',
          show: this.pageType !== 'view',
          required: true,
          disabled: this.pageType === 'view',
        },
        {
          name: 'carBody',
          subName: 'carBodyName',
          api: 'findAllCarBady',
          type: 'select',
          show: this.pageType !== 'view',
          required: true,
          disabled: this.pageType === 'view',
        },
        {
          name: 'carType',
          subName: 'carTypeName',
          type: 'select',
          show: this.pageType !== 'view',
          required: true,
          disabled: this.pageType === 'view',
        },
        {
          name: 'carChassis',
          subName: 'carChassisName',
          type: 'select',
          show: this.pageType !== 'view',
          required: true,
          disabled: this.pageType === 'view',
        },
        {
          name: 'Fuel Type',
          subName: 'fuelTypeName',
          api: 'findAllFuelType',
          type: 'select',
          show: this.pageType !== 'view',
          required: true,
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
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
