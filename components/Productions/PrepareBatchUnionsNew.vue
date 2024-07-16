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
    <message-box ref="messageBoxRef" @emitProp="getEmitProp" />
    <template v-if="isCloseTable">
      <div
        class="border-[1px] border-solid border-[rgba(0,0,0,0.05)] p-[12px] bg-gradient-to-b from-transparent via-transparent to-gray-200 shadow-md flex items-center justify-between mt-1"
      >
        <div class="flex items-center gap-[10px]">
          <img src="@assets/icons/user-black.png" alt="user" class="w-[14px]" />
          <h1 class="font-bold text-[rgb(49,126,172)] text-[14px] uppercase">
            {{ isNaN(rowID) ? 'Add' : 'Edit' }} Sew Model
          </h1>
        </div>
        <div>
          <ul class="flex items-center gap-4">
            <li
              class="p-[7px] rounded-[50%] cursor-pointer border-[1px] border-solid border-[rgba(0,0,0,0.1] hover:border-[#3b89e9] duration-[0.4s]"
              :style="{
                background: 'radial-gradient(#fff, rgba(32,111,162,0.2))',
              }"
              @click="openColumnConfig"
            >
              <img class="w-[11px]" src="@assets/icons/gear.png" alt="gear" />
            </li>
            <li
              class="p-[7px] rounded-[50%] cursor-pointer border-[1px] border-solid border-[rgba(0,0,0,0.1] hover:border-[#3b89e9] focus:border-[#3b89e9] duration-[0.4s]"
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
              class="p-[7px] rounded-[50%] cursor-pointer border-[1px] border-solid border-[rgba(0,0,0,0.1] hover:border-[#3b89e9] focus:border-[#3b89e9] duration-[0.4s]"
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
            ? 'duration-[1s] h-fit overflow-hidden'
            : 'duration-[1s] h-0 overflow-hidden'
        "
      >
        <div class="flex flex-col items-start m-2 gap-2">
          <generic-button
            name="Go Back"
            pl="8"
            pt="3"
            pr="8"
            pb="3"
            bggradient="linear-gradient(to right, rgba(70,94,140,0.8),rgb(34,39,76))"
            textsize="13"
            :url="img.goBack"
            :istherepicture="true"
            @click="goBackAction"
          />
          <table class="w-full text-[13px]">
            <tbody>
              <tr
                v-for="(element, index) in elementData"
                :key="index"
                class="bg-[rgba(239,243,249,0.7)] hover:bg-gradient-to-b hover:from-transparent hover:via-transparent hover:to-[rgba(220,229,243,0.7)]"
              >
                <td
                  class="w-[150px] border-[1px] border-solid border-[#778899] pl-[10px]"
                >
                  {{ element?.subName }}
                  <span v-if="element.required" class="text-[18px] text-red-600"
                    >*</span
                  >
                </td>
                <td
                  v-if="saveEditBtnType"
                  class="border-[1px] border-solid border-[#778899] pl-[10px]"
                >
                  <look-up
                    v-if="element.type === 'select'"
                    :durl="`invoiceBase/${element?.url}`"
                    :dparam="element.param"
                    dwidth="220"
                    :defvalue="
                      editData?.[element.subName]
                        ? `${editData?.[element.subName]}`
                        : ''
                    "
                    :name="element?.subName"
                    @customFunction="getInputAndLookUpValueAction"
                  />
                  <generic-input
                    v-else-if="element.type === 'text'"
                    width="220"
                    :value="
                      editData?.[element.subName]
                        ? `${editData?.[element.subName]}`
                        : ''
                    "
                    :type="element.type"
                    :name="element?.subName"
                    @customFunction="getInputAndLookUpValueAction"
                  />
                  <generic-input
                    v-else-if="element.type === 'number'"
                    width="220"
                    :value="
                      editData?.[element.subName]
                        ? `${editData?.[element.subName]}`
                        : ''
                    "
                    :type="element.type"
                    :name="element?.subName"
                    @customFunction="getInputAndLookUpValueAction"
                  />
                  <generic-input-date-page
                    v-else-if="element.type === 'date'"
                    :value="
                      editData?.[element.subName]
                        ? `${editData?.[element.subName]}`
                        : dateDefValue
                        ? dateDefValue
                        : ''
                    "
                    width="220"
                    height="28"
                    pl="12"
                    pr="12"
                    pt="1"
                    pb="1"
                    textsize="13"
                    type="datetime-local"
                    valuecolor="rgba(0,0,0,0.7)"
                    :name="element.subName"
                    @customFunction="getInputAndLookUpValueAction"
                  />
                </td>
                <td
                  v-else
                  class="border-[1px] border-solid border-[#778899] pl-[10px]"
                >
                  {{ editData?.[element.subName] }}
                </td>
              </tr>
              <tr
                class="bg-[rgba(239,243,249,0.7)] hover:bg-gradient-to-b hover:from-transparent hover:via-transparent hover:to-[rgba(220,229,243,0.7)]"
              >
                <td
                  colspan="2"
                  class="w-[150px] border-[1px] border-solid border-[#778899] p-[3px_0_3px_10px]"
                >
                  <span class="flex items-center gap-1">
                    <generic-button
                      v-if="saveEditBtnType"
                      name="Save"
                      pl="8"
                      pt="3"
                      pr="8"
                      pb="3"
                      bg="#409EFF"
                      textsize="13"
                      @click="saveAction()"
                    />
                    <generic-button
                      v-else
                      name="Edit"
                      pl="8"
                      pt="3"
                      pr="8"
                      pb="3"
                      bg="#409EFF"
                      textsize="13"
                      @click="editAction()"
                    />
                    <generic-button
                      v-if="!isNaN(rowID) && saveEditBtnType"
                      name="Cancel"
                      pl="8"
                      pt="3"
                      pr="8"
                      pb="3"
                      bg="rgba(0,0,0,0.3)"
                      textsize="13"
                      @click="cancelAction()"
                    />
                    <template v-if="!isNaN($route.path.split('/').at(-1))">
                      <generic-button
                        v-for="(elem, inx) in allBtnName"
                        :key="inx"
                        :name="elem?.name"
                        pl="8"
                        pt="3"
                        pr="8"
                        pb="3"
                        :bg="elem?.bg"
                        textsize="13"
                        :url="img?.del"
                        :istherepicture="elem?.type"
                        @click="allBtnAction(elem.clickType)"
                      />
                    </template>
                  </span>
                </td>
              </tr>
            </tbody>
          </table>

          <template v-if="sewModelVariantSizeShowHide">
            <strong class="text-[15px]"
              >Extra Payment Details.
              <span class="text-[14px] text-[rgb(156,0,78)]"
                >Parent ID = {{ rowID ? rowID : userId }}</span
              ></strong
            >
            <div class="flex gap-1 flex-wrap">
              <span v-if="hideButton" class="flex gap-1 flex-wrap">
                <GenericButton
                  name="Save"
                  pl="8"
                  pt="2"
                  pr="8"
                  pb="2"
                  textsize="14"
                  bg="rgb(119,191,66)"
                  disabled-bg="rgba(119,191,66,0.6)"
                  @click="saveSewModelVariantSizeAction"
                />
                <GenericButton
                  name="Discard"
                  pl="8"
                  pt="2"
                  pr="8"
                  pb="2"
                  bggradient="linear-gradient(to top, rgb(205,210,212),rgba(205,210,212,0.65))"
                  textsize="14"
                  color="rgb(190,72,77)"
                  @click="discardSewModalVariantSizeAction"
                />
              </span>
              <GenericButton
                v-else
                name="Edit"
                pl="8"
                pt="2"
                pr="8"
                pb="2"
                textsize="14"
                bg="rgb(119,191,66)"
                :url="img.edit"
                :istherepicture="true"
                @click="editSewModalVariantSizeAction"
              />
            </div>
            <GenericPrepareTablePage
              ref="sewModelVariantSizeRef"
              department-name="production"
              :tablehead="sewModelVariantSizeHead"
              :tableheadlength="sewModelVariantSizeHead.length"
              :response-data="sewModelVariantSizeBody"
              :ui-show-hide="uiShowHide"
              :isedit="isEdit"
              :height="450"
              delete-url-row="sewModel/prepareCreateEditSewModelSize"
              class="bg-[rgba(255,255,255,0.5)] mt-1"
              @rowValues="getRowElements"
            />
          </template>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import GenericButton from '@components/Button/GenericButton.vue'
import GenericInput from '@components/Input/GenericInput.vue'
import GenericInputDatePage from '@components/InputDate/GenericInputDatePage.vue'
import LoadingPage from '@components/Loading/LoadingPage.vue'
import LookUp from '@generics/GenericLookUp.vue'
import MessageBox from '@components/MessageBox.vue'
import GenericPrepareTablePage from '@components/GenericPrepareTable/GenericPrepareTablePage.vue'
export default {
  components: {
    LoadingPage,
    GenericButton,
    GenericInput,
    GenericInputDatePage,
    LookUp,
    MessageBox,
    GenericPrepareTablePage,
  },

  // DATA
  data() {
    return {
      isLoading: false,
      pageSize_value: 25,
      checkModal: false,
      isOpenTable: true,
      isCloseTable: true,
      rowID: null,
      dateDefValue: null,
      allInputAndLookUpValue: {},
      elementData: [],
      allBtnName: [],
      saveEditBtnType: false,
      editData: {},
      sewModelVariantSizeHead: [],
      sewModelVariantSizeBody: [],
      uiShowHide: false,
      isEdit: false,
      sewModelVariantSizeShowHide: false,
      sewModelSizeItemList: [],
    }
  },

  // MOUNTED
  mounted() {
    this.dateDefValue = new Date().toISOString().split('.')[0]

    // function
    this.dataCreatedAction()

    // Table function
    this.rowID = this.$route.path.split('/').at(-1)
    isNaN(this.rowID)
      ? (this.saveEditBtnType = true)
      : (this.saveEditBtnType = false)
    if (!isNaN(this.rowID)) this.getTableRequest(this.rowID)
  },

  // CREATED
  created() {
    this.userId = this.$route.params?.id
    if (this.userId) {
      this.isEdit = true
      this.hideButton = false
    }
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

    // go back action
    goBackAction() {
      this.$router.push('/batchunions.htm')
    },

    // edit sewModelVarintSize
    editSewModalVariantSizeAction() {
      this.hideButton = !this.hideButton

      // GenericTablePage da ishlab beruvchi function
      this.$refs.sewModelVariantSizeRef.getEditRowAction(
        this.rowID ? this.rowID : this.userId
      )
      this.uiShowHide = false
    },

    // discard sewModelVarintSize
    discardSewModalVariantSizeAction() {
      this.hideButton = !this.hideButton
      this.uiShowHide = true
    },

    // Filter Action
    leftRightDataFilter(headData) {
      this.sewModelVariantSizeHead = headData.filter((value) => {
        return value.showUI && value
      })
    },

    getRowElements(arr, hideBtn, id) {
      this.id = +id
      this.sewModelSizeItemList = arr
      this.sewModelSizeItemList = this.sewModelSizeItemList.map((obj) => {
        if (obj.sewModel) {
          obj.sewModel = { id: obj.sewModel }
        }
        return obj
      })
      this.hideButton = !hideBtn
    },

    // Save btn action
    saveSewModelVariantSizeAction() {
      // GenericTablePage da ishlab beruvchi function
      this.$refs.sewModelVariantSizeRef.getSaveRowAction()

      const body = {}
      body.id = this.rowID
      body.sewModelSizeItemList = this.sewModelSizeItemList

      this.$axios
        .post(`/sewModel/prepareCreateEditSewModelSize`, body)
        .then(({ data }) => {
          this.sewModelVariantSizeBody = data?.sewModelSizeItem
          this.uiShowHide = true
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log(error)
        })
    },

    // Data created
    dataCreatedAction() {
      const data = [
        {
          name: 'Date',
          subName: 'date',
          type: 'date',
          required: true,
        },
        {
          name: 'Sew Model Code',
          subName: 'code',
          type: 'text',
          required: true,
        },
        {
          name: 'Product',
          subName: 'product',
          type: 'select',
          url: 'searchProductList',
          param: { planningTypeTypeId: '4' },
          required: false,
        },
        {
          name: 'Name',
          subName: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'Variant',
          subName: 'variant',
          type: 'number',
          required: true,
        },
        {
          name: 'Description',
          subName: 'description',
          type: 'text',
          required: false,
        },

        {
          name: 'Style',
          subName: 'style',
          type: 'text',
          required: false,
        },
        {
          name: 'Company',
          subName: 'company',
          type: 'select',
          url: 'findAllCompany',
          param: { branchcompany: false },
          required: false,
        },
        {
          name: 'Planning type',
          subName: 'planningType',
          type: 'select',
          url: 'findAllPlanningType',
          param: { planningTypesStr: '14' },
          required: false,
        },
      ]
      this.elementData = data

      const btnData = [
        {
          name: 'Sew Model Variant Size',
          bg: '#409EFF',
          type: false,
          clickType: 'sewModelVariantSize',
        },
        {
          name: 'sewOperation',
          bg: '#409EFF',
          type: false,
          clickType: 'sewOperation',
        },
        { name: 'Delete', bg: '#F56C6C', type: true, clickType: 'delete' },
        { name: 'Clone', bg: '#409EFF', type: false, clickType: 'clone' },
        {
          name: 'Add Image',
          bg: '#409EFF',
          type: false,
          clickType: 'addImage',
        },
        {
          name: 'Change Price',
          bg: '#F56C6C',
          type: true,
          clickType: 'changePrice',
        },
        {
          name: 'sewModelRecipe',
          bg: '#409EFF',
          type: false,
          clickType: 'sewModelRecipe',
        },
      ]
      this.allBtnName = btnData
    },

    // Page request
    getTableRequest(rowID) {
      this.isLoading = !this.isLoading
      this.$axios
        .post(`/sewModel/prepareSewModelAjaxLoad`, {
          id: rowID,
          page_current: 1,
          page_size: 25,
        })
        .then(({ data: { sewModelJson } }) => {
          this.isLoading = !this.isLoading
          if (rowID) {
            this.editData.date = new Date(sewModelJson?.date)
              .toISOString()
              .split('.')[0]
            this.editData.code = sewModelJson?.code
            this.editData.product = sewModelJson?.product?.text
            this.editData.productId = sewModelJson?.product?.id
            this.editData.name = sewModelJson?.name
            this.editData.variant = sewModelJson?.variant
            this.editData.description = sewModelJson?.description
            this.editData.style = sewModelJson?.style
            this.editData.company = sewModelJson?.company?.text
            this.editData.companyId = sewModelJson?.company?.id
            this.editData.planningType = sewModelJson?.planningType

            this.allInputAndLookUpValue.date = new Date(sewModelJson?.date)
              .toISOString()
              .split('.')[0]
            this.allInputAndLookUpValue.id = sewModelJson?.id
            this.allInputAndLookUpValue.code = sewModelJson?.code
            this.allInputAndLookUpValue.product = {
              id: sewModelJson?.product?.id,
            }
            this.allInputAndLookUpValue.name = sewModelJson?.name
            this.allInputAndLookUpValue.variant = sewModelJson?.variant
            this.allInputAndLookUpValue.description = sewModelJson?.description
            this.allInputAndLookUpValue.style = sewModelJson?.style
            this.allInputAndLookUpValue.company = {
              id: sewModelJson?.company?.id,
            }
          }
        })
        .catch((error) => {
          this.isLoading = !this.isLoading
          // eslint-disable-next-line no-console
          console.log(error)
        })
    },

    // Input value action
    getInputAndLookUpValueAction(name, value) {
      if (name === 'company' || name === 'product') {
        this.$set(this.allInputAndLookUpValue, name, { id: value })
      } else {
        this.$set(this.allInputAndLookUpValue, name, value)
      }
    },

    cancelAction() {
      this.saveEditBtnType = false
    },

    // Save
    saveAction() {
      let sewModel = {}
      if (isNaN(this.rowID)) {
        sewModel = {
          code: this.allInputAndLookUpValue?.code,
          company: this.allInputAndLookUpValue?.company,
          date:
            this.allInputAndLookUpValue?.date ||
            new Date().toISOString().split('.')[0],
          description: this.allInputAndLookUpValue?.description,
          name: this.allInputAndLookUpValue?.name,
          product: this.allInputAndLookUpValue?.product,
          style: this.allInputAndLookUpValue?.style,
          variant: this.allInputAndLookUpValue?.variant,
          // planningType: {
          //   id: parseFloat(this.allInputAndLookUpValue?.planningType),
          // },
        }
      } else {
        sewModel = this.allInputAndLookUpValue
      }

      if (
        sewModel?.date &&
        sewModel?.code &&
        sewModel?.name &&
        sewModel?.variant
      ) {
        this.isLoading = !this.isLoading
        this.$axios
          .post(`/sewModel/prepareCreateEditSewModel`, {
            sewModel,
          })
          .then(({ status }) => {
            this.isLoading = !this.isLoading
            if (status === 200) this.$router.push('/sewmodel.htm')
          })
          .catch((error) => {
            this.isLoading = !this.isLoading
            // eslint-disable-next-line no-console
            console.log(error)
          })
      }
    },

    // Edit Action
    editAction() {
      this.saveEditBtnType = true
    },

    // Message box action
    getEmitProp(propMessage, id, btnTypeProp) {
      if (propMessage === 'confirm' && btnTypeProp === 'delete') {
        this.$axios
          .delete(`/sewModel/prepareSewmodelDelete`, {
            data: {
              deleteItemId: id,
            },
          })
          .then(({ status }) => {
            if (status < 300) this.$router.push('/sewmodel.htm')
          })
          .catch((error) => {
            // eslint-disable-next-line no-console
            console.log(error)
          })
      } else if (propMessage === 'confirm' && btnTypeProp === 'clone') {
        this.$axios
          .post(`/sewModel/sewModelCloneUrl`, {
            id,
          })
          .then(({ data }) => {
            console.log(data)
          })
          .catch((error) => {
            // eslint-disable-next-line no-console
            console.log(error)
          })
      } else if (propMessage === 'confirm' && btnTypeProp === 'changePrice') {
        this.$axios
          .post(`/sewModel/prepareSewModelChangePrice`, {
            id,
          })
          .then(({ data }) => {
            console.log(data)
          })
          .catch((error) => {
            // eslint-disable-next-line no-console
            console.log(error)
          })
      }
    },

    // ALl buttons action
    allBtnAction(btnTypeProp) {
      if (btnTypeProp === 'sewModelVariantSize')
        this.rowID && this.sewModelVariantSizeBtnAction(this.rowID)
      else if (btnTypeProp === 'sewOperation')
        this.rowID && this.sewOperationBtnAction(this.rowID)
      else if (btnTypeProp === 'delete')
        this.$refs.messageBoxRef.open(this.rowID, btnTypeProp)
      else if (btnTypeProp === 'clone')
        this.$refs.messageBoxRef.open(this.rowID, btnTypeProp)
      else if (btnTypeProp === 'addImage')
        this.rowID && this.addImageBtnAction(this.rowID)
      else if (btnTypeProp === 'changePrice')
        this.$refs.messageBoxRef.open(this.rowID, btnTypeProp)
      else if (btnTypeProp === 'sewModelPrice')
        this.rowID && this.sewModelPriceBtnAction(this.rowID)
    },

    // sewModelVariantSize Btn Action
    sewModelVariantSizeBtnAction(id) {
      this.sewModelVariantSizeShowHide = true
      this.$axios
        .post(`/sewModel/prepareCreateEditSewModelSize`, {
          id,
        })
        .then(({ data: { sewModelSizeItem, sewModelItemSizeTable } }) => {
          this.sewModelVariantSizeBody = sewModelSizeItem

          // function
          this.leftRightDataFilter(sewModelItemSizeTable)
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log(error)
        })
    },

    // sewOperation Btn Action
    sewOperationBtnAction(id) {
      this.$axios
        .post(`/sewModel/prepareCreateEditSewModelOperation`, {
          id,
        })
        .then(({ data }) => {
          console.log(data)
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log(error)
        })
    },

    // sewOperation Btn Action
    addImageBtnAction(id) {
      this.$axios
        .post(`/sewModel/sewModelimageList`, {
          id,
        })
        .then(({ data }) => {
          console.log(data)
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log(error)
        })
    },

    // sewModelPrice Btn Action
    sewModelPriceBtnAction(id) {
      this.$axios
        .post(`/sewModel/prepareCreateEditSewModelRecipe`, {
          id,
        })
        .then(({ data }) => {
          console.log(data)
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log(error)
        })
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
