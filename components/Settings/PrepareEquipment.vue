<template>
  <div class="w-full p-1 mb-5">
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
                ? 'View EQUIPMENT'
                : pageType === 'edit'
                ? 'Edit EQUIPMENT'
                : 'Add EQUIPMENT'
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
        class="border-[1px] border-solid border-[rgba(0,0,0,0.1)] flex items-start gap-5"
        :class="
          isOpenTable
            ? 'duration-[1s] h-fit overflow-hidden'
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
                  >{{ element.name }}
                  <span
                    v-if="element?.required"
                    class="text-[16px] text-red-500"
                    >*</span
                  >
                </span>
                <generic-input
                  :value="`${
                    viewEditData?.[element.subName]
                      ? viewEditData?.[element.subName]
                      : resultJson?.[element.subName]
                      ? resultJson?.[element.subName]
                      : ''
                  }`"
                  width="300"
                  :type="element.type"
                  :name="element.subName"
                  :disabled="element.disabled"
                  @customFunction="getInputAndLookUpValueAction"
                />
              </span>
              <span
                v-else-if="element.type === 'select'"
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
                <generic-look-up
                  dwidth="300"
                  :name="element.subName"
                  :defvalue="`${
                    viewEditData?.[element.subName]
                      ? viewEditData?.[element.subName]
                      : ''
                  }`"
                  :options-data="selectData?.[element?.selectName]"
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
                  :border="true"
                  @customFunction="getInputAndLookUpValueAction"
                />
              </span>
              <span
                v-else-if="element.type === 'radio'"
                class="flex flex-col items-start mb-1"
              >
                <el-radio
                  v-for="(elem, inx) in element.list"
                  :key="inx"
                  v-model="radio"
                  :label="elem.subName"
                  :disabled="element.disabled"
                ></el-radio>
              </span>
            </template>
          </div>

          <div class="flex items-center gap-3 mt-3">
            <generic-button
              name="Go Back"
              type="primary"
              icon-name-attribute="arrow-left"
              @click="$router.push('/equipments.htm')"
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
        <div class="m-2">
          <generic-carry-draggable
            :lyaut-one-data="leftColumns"
            :lyaut-two-data="rightColumns"
            @customEmitFunction="lyautEmitAction"
          />
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
import GenericCarryDraggable from '@generics/GenericCarryDraggable.vue'
export default {
  components: {
    LoadingPage,
    GenericButton,
    GenericInput,
    GenericLookUp,
    GenericCheckBox,
    GenericCarryDraggable,
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
      radio: 'Enabled',
      viewEditData: {},
      allInputAndLookUpValue: {},
      elementData: [],
      selectData: {},
      // carry drag
      leftColumns: [],
      rightColumns: [],
      leftData: '',
      rightData: '',
      resultJson: {},
      // carry drag
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
    // page TYPE ni aniqlash
    this.pageType = this.$route?.query?.page_type
    this.allInputAndLookUpValue.active = true
  },

  // MOUNTED
  mounted() {
    // function
    this.dataCreatedAction()
    // Table function
    this.getTableRequest()
    // function
    this.lyautEmitAction(this.leftColumns, this.rightColumns)
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
      if (this.pageType === 'view' || this.pageType === 'edit') {
        this.$axios
          .post(`/equipment/prepareEquipmentSevices`, {
            id: this.pageID,
            page_current: 1,
            page_size: 25,
          })
          .then(({ data }) => {
            this.selectData = data
            this.viewEditData = data?.equipment
            this.resultJson = JSON.parse(
              JSON.parse(data?.resultJson)?.params
            )?.param
            this.$set(this, 'leftColumns', [
              ...this.leftColumns,
              ...data?.unSelectedBatchProcessStage,
            ])
            this.$set(this, 'rightColumns', [
              ...this.rightColumns,
              ...data?.selectedBatchProcessStage,
            ])
            data?.equipment?.active
              ? (this.radio = 'Enabled')
              : (this.radio = 'Disabled')
            this.isLoading = !this.isLoading
          })
          .catch((error) => {
            this.isLoading = !this.isLoading
            // eslint-disable-next-line no-console
            console.log(error)
          })
      } else {
        this.$axios
          .post(`/equipment/prepareEquipmentSevices`, {
            page_current: 1,
            page_size: 25,
          })
          .then(({ data }) => {
            this.selectData = data
            this.$set(this, 'leftColumns', [
              ...this.leftColumns,
              ...data?.unSelectedBatchProcessStage,
            ])
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
      let equipment = {}
      if (this.pageID && this.pageType === 'edit') {
        equipment = {
          id: this.pageID,
          code:
            this.allInputAndLookUpValue?.code ?? this.viewEditData?.code ?? '',
          name:
            this.allInputAndLookUpValue?.name ?? this.viewEditData?.name ?? '',
          ecode:
            this.allInputAndLookUpValue?.ecode ??
            this.viewEditData?.ecode ??
            '',
          department: {
            id:
              this.allInputAndLookUpValue?.departmentName ??
              this.viewEditData?.departmentId ??
              '',
          },
          equipmentGroupId:
            this.allInputAndLookUpValue?.equipmentGroupName ??
            this.viewEditData?.equipmentGroupName ??
            '',
          ipAddress:
            this.allInputAndLookUpValue?.ipAddress ??
            this.viewEditData?.ipAddress ??
            '',
          type:
            this.allInputAndLookUpValue?.type ?? this.viewEditData?.type ?? '',
          comb_no:
            this.allInputAndLookUpValue?.comb_no ??
            this.viewEditData?.comb_no ??
            '',
          onlyOneStart:
            this.allInputAndLookUpValue?.onlyOneStart ??
            this.viewEditData?.onlyOneStart ??
            false,
          volume:
            this.allInputAndLookUpValue?.volume ??
            this.viewEditData?.volume ??
            '',
          minLoad:
            this.allInputAndLookUpValue?.minLoad ??
            this.viewEditData?.minLoad ??
            '',
          maxLoad:
            this.allInputAndLookUpValue?.maxLoad ??
            this.viewEditData?.maxLoad ??
            '',
          ratio:
            this.allInputAndLookUpValue?.ratio ??
            this.viewEditData?.ratio ??
            '',
          reportOrder:
            this.allInputAndLookUpValue?.reportOrder ??
            this.viewEditData?.reportOrder ??
            '',
          active:
            this.allInputAndLookUpValue?.active ??
            this.viewEditData?.active ??
            false,
          equipmentParams: JSON.stringify({
            param: {
              pus:
                this.allInputAndLookUpValue?.pus ??
                this.viewEditData?.pus ??
                '',
              fein:
                this.allInputAndLookUpValue?.fein ??
                this.viewEditData?.fein ??
                '',
              system:
                this.allInputAndLookUpValue?.system ??
                this.viewEditData?.system ??
                '',
            },
          }),
        }
      } else {
        equipment = {
          code: this.allInputAndLookUpValue?.code ?? '',
          name: this.allInputAndLookUpValue?.name,
          ecode: this.allInputAndLookUpValue?.ecode ?? '',
          department: { id: this.allInputAndLookUpValue?.departmentName ?? '' },
          equipmentGroupId:
            this.allInputAndLookUpValue?.equipmentGroupName ?? '',
          ipAddress: this.allInputAndLookUpValue?.ipAddress ?? '',
          type: this.allInputAndLookUpValue?.type ?? '',
          comb_no: this.allInputAndLookUpValue?.comb_no ?? '',
          onlyOneStart: this.allInputAndLookUpValue?.onlyOneStart ?? false,
          volume: this.allInputAndLookUpValue?.volume ?? '',
          minLoad: this.allInputAndLookUpValue?.minLoad ?? '',
          maxLoad: this.allInputAndLookUpValue?.maxLoad ?? '',
          ratio: this.allInputAndLookUpValue?.ratio ?? '',
          reportOrder: this.allInputAndLookUpValue?.reportOrder ?? '',
          active: this.allInputAndLookUpValue?.active ?? false,
        }
      }
      body = {
        page_size: this.pageSize_value,
        page_current: 1,
        companyId: this.allInputAndLookUpValue?.companyName ?? '',
        rightData: this.rightData,
        equipment,
      }

      this.isLoading = !this.isLoading
      const method = this.pageID ? 'put' : 'post'
      this.$axios[method](
        `/equipment/${this.pageID ? 'editEquipment' : 'addEquipmentSevices'}`,
        body
      )
        .then(() => {
          this.isLoading = !this.isLoading
          this.$router.push('/equipments.htm')
        })
        .catch((error) => {
          this.isLoading = !this.isLoading
          // eslint-disable-next-line no-console
          console.log(error)
        })
    },

    // lyauts Emit action
    lyautEmitAction(leftData, rightData) {
      this.leftData = this.filteredAction(leftData)
      this.rightData = this.filteredAction(rightData)
    },

    // Filter action
    filteredAction(list) {
      let str = ''
      list.forEach(({ id }) => {
        str += `${id},`
      })
      return str.slice(0, -1)
    },

    // Data created
    dataCreatedAction() {
      const data = [
        {
          name: 'Code Equipment',
          subName: 'code',
          type: 'number',
          show: true,
          required: true,
          disabled: this.pageType === 'view',
        },
        {
          name: 'Equipment Name',
          subName: 'name',
          type: 'text',
          show: true,
          required: true,
          disabled: this.pageType === 'view',
        },
        {
          name: 'equipment.ecode',
          subName: 'ecode',
          type: 'text',
          show: this.pageType !== 'view',
        },
        {
          name: 'Pus',
          subName: 'pus',
          type: 'number',
          show: this.pageType === 'edit',
        },
        {
          name: 'fein',
          subName: 'fein',
          type: 'number',
          show: this.pageType === 'edit',
        },
        {
          name: 'Knitting system',
          subName: 'system',
          type: 'number',
          show: this.pageType === 'edit',
        },
        {
          name: 'Department',
          subName: 'departmentName',
          selectName: 'departmentList',
          type: 'select',
          show: true,
          disabled: this.pageType === 'view',
        },
        {
          name: 'Group Name',
          subName: 'equipmentGroupName',
          selectName: 'equipmentGroupList',
          type: 'select',
          show: true,
          disabled: this.pageType === 'view',
        },
        {
          name: 'Automatic System',
          subName: 'companyName',
          selectName: 'automaticSystemsList',
          type: 'select',
          show: this.pageType !== 'view',
        },
        {
          name: 'Ip Address',
          subName: 'ipAddress',
          type: 'text',
          show: this.pageType !== 'view',
        },
        {
          name: 'Type',
          subName: 'type',
          type: 'text',
          show: this.pageType !== 'view',
        },
        {
          name: 'Бердо №',
          subName: 'comb_no',
          type: 'text',
          show: this.pageType !== 'view',
        },
        {
          name: 'Only One Start',
          subName: 'onlyOneStart',
          type: 'checkbox',
          show: true,
          disabled: this.pageType === 'view',
        },
        {
          name: 'Volume',
          subName: 'volume',
          type: 'number',
          show: true,
          disabled: this.pageType === 'view',
        },
        {
          name: 'min load',
          subName: 'minLoad',
          type: 'number',
          show: this.pageType !== 'view',
        },
        {
          name: 'max load',
          subName: 'maxLoad',
          type: 'number',
          show: this.pageType !== 'view',
        },
        {
          name: 'Ratio',
          subName: 'ratio',
          type: 'number',
          show: this.pageType !== 'view',
        },
        {
          name: 'Report Order',
          subName: 'reportOrder',
          type: 'number',
          show: this.pageType !== 'view',
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
