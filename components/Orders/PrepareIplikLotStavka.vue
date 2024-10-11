<template>
  <div class="w-full px-1">
    <LoadingPage
      v-if="isLoading"
      class="absolute left-[50%] top-[8px] translate-x-[-50%]"
    />
    <transition name="fade">
      <ColumnConfigPage
        v-show="checkModal"
        :right="rightData"
        :left="leftData"
        :url="actionUrl"
        :create-edit="true"
        :openpopup="openPopUp"
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
          <generic-button
            name="Go Back"
            type="primary"
            icon-name-attribute="arrow-left"
            @click="$router.push('/iplikLotStavka.htm')"
          />
          <h1 class="font-bold text-[rgb(49,126,172)] text-[14px] uppercase">
            {{ pageID ? 'Edit' : 'Add' }} Iplik Lot Stavka
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
        <div class="flex flex-col items-start m-1 gap-2">
          <table class="w-full text-[13px]">
            <tbody>
              <tr
                v-for="(element, index) in elementData"
                :key="index"
                class="bg-[rgba(239,243,249,0.7)] hover:bg-gradient-to-b hover:from-transparent hover:via-transparent hover:to-[rgba(220,229,243,0.7)]"
              >
                <td
                  class="w-[200px] border-[1px] border-solid border-[#778899] px-1"
                >
                  {{ element?.name }}
                  <span v-if="element.required" class="text-[18px] text-red-600"
                    >*</span
                  >
                </td>
                <td
                  v-if="saveEditBtnType"
                  class="border-[1px] border-solid border-[#778899] px-1"
                >
                  <generic-look-up
                    v-if="element.type === 'select'"
                    :durl="element?.url"
                    :dparam="element.param"
                    dwidth="220"
                    :defvalue="
                      editData?.[element.subName]?.text
                        ? `${editData?.[element.subName]?.text}`
                        : ''
                    "
                    :name="element?.subName"
                    :required="
                      !element?.required ||
                      allInputAndLookUpValue?.[element?.subName] ||
                      editData?.[element?.subName]?.id
                        ? true
                        : false
                    "
                    @customFunction="getInputAndLookUpValueAction"
                  />
                  <generic-input
                    v-else-if="
                      element.type === 'text' || element.type === 'number'
                    "
                    width="220"
                    :value="
                      editData?.[element.subName]
                        ? `${editData?.[element.subName]}`
                        : ''
                    "
                    :type="element.type"
                    :name="element?.subName"
                    :required="
                      !element?.required ||
                      allInputAndLookUpValue?.[element?.subName] ||
                      editData?.[element?.subName]
                        ? true
                        : false
                    "
                    @customFunction="getInputAndLookUpValueAction"
                  />
                  <generic-input-date-page
                    v-else-if="element.type === 'date'"
                    :value="
                      editData?.[element?.subName]
                        ? `${
                            new Date(editData?.[element?.subName])
                              .toISOString()
                              .split('.')[0]
                          }`
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
                    :required="
                      !element?.required ||
                      allInputAndLookUpValue?.[element?.subName] ||
                      editData?.[element?.subName]
                        ? true
                        : false
                    "
                    @customFunction="getInputAndLookUpValueAction"
                  />
                  <span
                    v-else-if="element?.subName === 'openClose'"
                    class="text-green-600 font-semibold text-[14px]"
                    >{{
                      editData?.[element.subName] ? 'OPENED' : 'CLOSED'
                    }}</span
                  >
                  <span v-else>{{
                    editData?.[element?.subName]?.text ||
                    editData?.[element.subName]
                  }}</span>
                </td>
                <td
                  v-else
                  class="border-[1px] border-solid border-[#778899] px-1"
                >
                  <template v-if="element.subName === 'date'">{{
                    new Date(editData?.[element.subName])
                      .toLocaleString('en-GB')
                      .split(',')
                      .join('')
                  }}</template>
                  <span
                    v-else-if="element?.subName === 'openClose'"
                    class="text-green-600 font-semibold text-[14px]"
                    >{{
                      editData?.[element.subName] ? 'OPENED' : 'closed'
                    }}</span
                  >
                  <template v-else>{{
                    editData?.[element.subName]?.text ||
                    editData?.[element.subName]
                  }}</template>
                </td>
              </tr>

              <tr
                class="bg-[rgba(239,243,249,0.7)] hover:bg-gradient-to-b hover:from-transparent hover:via-transparent hover:to-[rgba(220,229,243,0.7)]"
              >
                <td
                  colspan="2"
                  class="w-[150px] border-[1px] border-solid border-[#778899] p-1"
                >
                  <span class="flex items-center gap-1">
                    <generic-button
                      v-if="saveEditBtnType"
                      type="primary"
                      name="Save"
                      @click="saveAction"
                    />
                    <generic-button
                      v-else
                      type="success"
                      name="Edit"
                      icon-name-attribute="edit"
                      @click="editCencelAction('edit')"
                    />
                    <generic-button
                      v-if="pageID && saveEditBtnType"
                      name="Cancel"
                      icon-name-attribute="cencel"
                      @click="editCencelAction('cencel')"
                    />
                    <template v-if="pageID">
                      <generic-button
                        v-for="(elem, inx) in allBtnName"
                        :key="inx"
                        :name="elem?.name"
                        :type="elem?.type"
                        :icon-name-attribute="elem?.iconName"
                        @click="allBtnAction(elem.clickType, pageID)"
                      />
                    </template>
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- --START-- PLAN Table UI -->
        <div v-if="pageID" class="m-1">
          <span class="text-[14px]"
            >Plan.
            <strong class="text-[14px] text-[rgb(156,0,78)]"
              >Parent ID = {{ pageID }}</strong
            ></span
          >
          <div class="flex gap-1 flex-wrap">
            <GenericButton
              name="Column Setting"
              type="warning"
              icon-name-attribute="setting"
              @click="openColumnConfig('plan')"
            />
            <span v-if="planHideButton" class="flex gap-1 flex-wrap">
              <GenericButton
                name="Save"
                type="primary"
                @click="planSaveAction"
              />
              <GenericButton name="Discard" @click="planDiscardAction" />
            </span>
            <GenericButton
              v-else
              name="Edit"
              type="success"
              icon-name-attribute="edit"
              @click="planEditAction"
            />
          </div>
          <!-- TABLE -->
          <GenericPrepareTablePage
            ref="planRef"
            department-name="production"
            tab-name="iplikLotStavkaPlanTable"
            filter-type="min"
            :addmodalorrow="true"
            :tablehead="planHead"
            :tableheadlength="planHead?.length"
            :response-data="planBody"
            :ui-show-hide="planUiShowHide"
            :is-edit="isPlanEdit"
            :height="450"
            delete-url-row="iplikLotStavka/prepareCreateEditIplikLotStavkaPlan"
            class="bg-[rgba(255,255,255,0.5)] mt-1"
            @rowValues="planGetRowElements"
          />
        </div>
        <!-- --END-- PLAN Table UI -->

        <!-- --START-- RESERVE Table UI -->
        <div v-if="pageID" class="m-1">
          <span class="text-[14px]"
            >Reserve.
            <strong class="text-[14px] text-[rgb(156,0,78)]"
              >Parent ID = {{ pageID }}</strong
            ></span
          >
          <div class="flex gap-1 flex-wrap">
            <GenericButton
              name="Column Setting"
              type="warning"
              icon-name-attribute="setting"
              @click="openColumnConfig('reserve')"
            />
            <span v-if="reserveHideButton" class="flex gap-1 flex-wrap">
              <GenericButton
                name="Save"
                type="primary"
                @click="reserveSaveAction"
              />
              <GenericButton name="Discard" @click="reserveDiscardAction" />
            </span>
            <GenericButton
              v-else
              name="Edit"
              type="success"
              icon-name-attribute="edit"
              @click="reserveEditAction"
            />
          </div>
          <!-- TABLE -->
          <GenericPrepareTablePage
            ref="reserveRef"
            department-name="production"
            tab-name="iplikLotStavkaReserveTable"
            filter-type="max"
            :addmodalorrow="true"
            :tablehead="reserveHead"
            :tableheadlength="reserveHead?.length"
            :response-data="reserveBody"
            :ui-show-hide="reserveUiShowHide"
            :is-edit="isReserveEdit"
            :height="450"
            delete-url-row="iplikLotStavka/prepareCreateEditIplikLotStavkaReserve"
            class="bg-[rgba(255,255,255,0.5)] mt-1"
            @rowValues="reserveGetRowElements"
          />
        </div>
        <!-- --END-- RESERVE Table UI -->

        <!-- --START-- STAGE Table UI -->
        <div v-if="pageID" class="m-1">
          <span class="text-[14px]"
            >Stage.
            <strong class="text-[14px] text-[rgb(156,0,78)]"
              >Parent ID = {{ pageID }}</strong
            ></span
          >
          <div class="flex gap-1 flex-wrap">
            <GenericButton
              name="Column Setting"
              type="warning"
              icon-name-attribute="setting"
              @click="openColumnConfig('stage')"
            />
            <span v-if="stageHideButton" class="flex gap-1 flex-wrap">
              <GenericButton
                name="Save"
                type="primary"
                @click="stageSaveAction"
              />
              <GenericButton name="Discard" @click="stageDiscardAction" />
            </span>
            <GenericButton
              v-else
              name="Edit"
              type="success"
              icon-name-attribute="edit"
              @click="stageEditAction"
            />
          </div>
          <!-- TABLE -->
          <GenericPrepareTablePage
            ref="stageRef"
            department-name="orders"
            :addmodalorrow="openPopUp"
            :tablehead="stageHead"
            :tableheadlength="stageHead?.length"
            :response-data="stageBody"
            :ui-show-hide="stageUiShowHide"
            :is-edit="isStageEdit"
            :height="450"
            delete-url-row="iplikLotStavka/prepareCreateEditIplikLotStavkaStage"
            class="bg-[rgba(255,255,255,0.5)] mt-1"
            @rowValues="stageGetRowElements"
          />
        </div>
        <!-- --END-- STAGE Table UI -->
      </div>
    </template>
  </div>
</template>

<script>
import GenericButton from '@generics/GenericButton.vue'
import GenericInput from '@generics/GenericInput.vue'
import GenericInputDatePage from '@components/InputDate/GenericInputDatePage.vue'
import LoadingPage from '@components/Loading/LoadingPage.vue'
import GenericLookUp from '@generics/GenericLookUp.vue'
import MessageBox from '@components/MessageBox.vue'
import GenericPrepareTablePage from '@components/GenericPrepareTable/GenericPrepareTablePage.vue'
import ColumnConfigPage from '@components/ColumnConfig/ColumnConfigPage.vue'
export default {
  components: {
    GenericButton,
    GenericInput,
    GenericInputDatePage,
    LoadingPage,
    GenericLookUp,
    MessageBox,
    GenericPrepareTablePage,
    ColumnConfigPage,
  },

  // DATA
  data() {
    return {
      isLoading: false,
      pageSize_value: 25,
      checkModal: false,
      isOpenTable: true,
      isCloseTable: true,
      pageID: null,
      allInputAndLookUpValue: {},
      elementData: [],
      allBtnName: [],
      saveEditBtnType: false,
      editData: {},

      // Column config
      actionUrl: null,
      openPopUp: null,
      leftData: {},
      rightData: {},
      // Column config

      // Plan Table Start
      planHead: [],
      planBody: [],
      planUiShowHide: null,
      isPlanEdit: null,
      planHideButton: null,
      // Plan Table End

      // Reserve Table Start
      reserveHead: [],
      reserveBody: [],
      reserveUiShowHide: null,
      isReserveEdit: null,
      reserveHideButton: null,
      // Reserve Table End

      // Stage Table Start
      stageHead: [],
      stageBody: [],
      stageUiShowHide: null,
      isStageEdit: null,
      stageHideButton: null,
      // Stage Table End
    }
  },

  // COMPUTED
  computed: {
    headDataFiltered() {
      return this.planHead.filter((headName) => headName?.showUI)
    },
  },

  // CREATED
  created() {
    this.pageID = this.$route.params?.id
    this.pageID ? (this.saveEditBtnType = false) : (this.saveEditBtnType = true)
    // function
    this.pageRequestAction(this.pageID)
    // function
    this.dataCreatedAction()
    // PAGE id bo'lsa ishliydi
    if (this.pageID) {
      // Plan
      this.planUiShowHide = true
      this.isPlanEdit = true
      this.planHideButton = false
      // Reserve
      this.reserveUiShowHide = true
      this.isReserveEdit = true
      this.reserveHideButton = false
      // Stage
      this.stageUiShowHide = true
      this.isStageEdit = true
      this.stageHideButton = false
    }
  },

  // METHODS
  methods: {
    // Column Config function
    handleValue(checkModal) {
      // function
      this.getFilterData([], [])
      this.checkModal = checkModal
    },
    openColumnConfig(btnClickType) {
      // request body
      this.actionUrl =
        btnClickType === 'plan'
          ? 'iplikLotStavkaPlanTable'
          : btnClickType === 'reserve'
          ? 'iplikLotStavkaReserveTable'
          : btnClickType === 'stage'
          ? 'iplikLotStavkaStageTable'
          : ''

      this.isLoading = !this.isLoading
      this.$axios
        .post(`/base/columnsConfigU`, {
          actionUrl: this.actionUrl,
        })
        .then(({ data: { leftColumns, rightColumns, openPopup } }) => {
          this.openPopUp = openPopup
          // function
          this.getFilterData(leftColumns, rightColumns)
          this.checkModal = true
          this.isLoading = !this.isLoading
        })
        .catch((error) => {
          this.isLoading = !this.isLoading
          // eslint-disable-next-line no-console
          console.log(error)
        })
    },

    // Filter Action Column Config uchun
    getFilterData(leftColumns, rightColumns) {
      const leftMap = {}
      const rightMap = {}
      rightColumns.forEach((obj) => {
        rightMap[obj.name] = obj
      })
      leftColumns.forEach((obj) => {
        leftMap[obj.name] = obj
      })
      this.leftData = leftMap
      this.rightData = rightMap
    },

    // Table page ni ochish va yopish uchun
    isOpen() {
      this.isOpenTable = !this.isOpenTable
    },
    isClose() {
      this.isCloseTable = !this.isCloseTable
    },

    // Input value action
    getInputAndLookUpValueAction(name, value) {
      this.$set(this.allInputAndLookUpValue, name, value)
    },

    // Page request
    pageRequestAction(id) {
      this.isLoading = !this.isLoading
      this.$axios
        .post(`/iplikLotStavka/prepareIplikLotStavkaAjaxLoad`, {
          id,
          page_current: 1,
          page_size: 25,
        })
        .then(({ data: { iplikLotStavkaJson } }) => {
          this.editData = iplikLotStavkaJson
          if (id) {
            // function's
            this.planAction(id)
            this.reserveAction(id)
            this.stageAction(id)
          }
          this.isLoading = !this.isLoading
        })
        .catch((error) => {
          this.isLoading = !this.isLoading
          // eslint-disable-next-line no-console
          console.log(error)
        })
    },

    // Save
    saveAction() {
      let iplikLotStavka = {}
      if (this.pageID) {
        iplikLotStavka = {
          id: this.pageID,
          date:
            this.allInputAndLookUpValue?.date ||
            new Date(this.editData?.date).toISOString().split('.')[0],
          department: this.allInputAndLookUpValue?.department
            ? {
                id: this.allInputAndLookUpValue?.department,
              }
            : this.editData?.department,
          lot: this.allInputAndLookUpValue?.lot ?? this.editData?.lot,
          name: this.allInputAndLookUpValue?.name ?? this.editData?.name,
          note: this.allInputAndLookUpValue?.note ?? this.editData?.note,
          productProductionType: this.allInputAndLookUpValue
            ?.productProductionType
            ? {
                id: this.allInputAndLookUpValue?.productProductionType,
              }
            : this.editData?.productProductionType,
          qty: this.allInputAndLookUpValue?.qty ?? this.editData?.qty,
          year: this.allInputAndLookUpValue?.year ?? this.editData?.year,
        }
      } else {
        iplikLotStavka = {
          date:
            this.allInputAndLookUpValue?.date ||
            new Date(this.editData?.date).toISOString().split('.')[0],
          department: this.allInputAndLookUpValue?.department
            ? {
                id: this.allInputAndLookUpValue?.department,
              }
            : null,
          lot: this.allInputAndLookUpValue?.lot ?? '',
          name: this.allInputAndLookUpValue?.name ?? '',
          note: this.allInputAndLookUpValue?.note ?? '',
          productProductionType: this.allInputAndLookUpValue
            ?.productProductionType
            ? {
                id: this.allInputAndLookUpValue?.productProductionType,
              }
            : null,
          qty: this.allInputAndLookUpValue?.qty ?? '',
          year: this.allInputAndLookUpValue?.year ?? '',
        }
      }

      if (
        iplikLotStavka?.date &&
        iplikLotStavka?.year &&
        iplikLotStavka?.lot &&
        iplikLotStavka?.qty &&
        iplikLotStavka?.department?.id &&
        iplikLotStavka?.productProductionType?.id
      ) {
        this.isLoading = !this.isLoading
        this.$axios
          .post(`/iplikLotStavka/prepareCreateEditIplikLotStavka`, {
            iplikLotStavka,
          })
          .then(({ data }) => {
            this.editData = data
            this.$router.push(`/prepareIplikLotStavka.htm/${data?.id}`)
            this.saveEditBtnType = false
            this.isLoading = !this.isLoading
          })
          .catch((error) => {
            this.isLoading = !this.isLoading
            // eslint-disable-next-line no-console
            console.log(error)
          })
      } else {
        this.$notification(`Ma'lumotni to'liq kiriting!`)
      }
    },

    // Edit Cencel Action
    editCencelAction(btnType) {
      if (btnType === 'edit') this.saveEditBtnType = true
      else if (btnType === 'cencel') this.saveEditBtnType = false
    },

    // ALl buttons action
    allBtnAction(btnTypeProp, id) {
      if (btnTypeProp === 'plan') id && this.planAction(id)
      else if (btnTypeProp === 'reserve') id && this.reserveAction(id)
      else if (btnTypeProp === 'stage') id && this.stageAction(id)
      else if (btnTypeProp === 'delete')
        this.$refs.messageBoxRef.open(id, btnTypeProp)
      else if (btnTypeProp === 'openOrClose')
        this.$refs.messageBoxRef.open(id, btnTypeProp)
    },

    // Message box action
    getEmitProp(propMessage, id, btnTypeProp) {
      if (propMessage === 'confirm' && btnTypeProp === 'delete') {
        this.$axios
          .delete(`/iplikLotStavka/prepareIplikLotStavkaDelete`, {
            data: {
              deleteItemId: id,
            },
          })
          .then(() => {
            this.$router.push('/iplikLotStavka.htm')
          })
          .catch((error) => {
            // eslint-disable-next-line no-console
            console.log(error)
          })
      }
    },

    // PLAN TABLE ACTIONS start - =============================
    // Plan Btn Action
    planAction(id) {
      this.isLoading = !this.isLoading
      this.$axios
        .post(`/iplikLotStavka/prepareCreateEditIplikLotStavkaPlan`, {
          id,
        })
        .then(
          ({
            data: { iplikLotStavkaPlanColumns, iplikLotStavkaPlanListJson },
          }) => {
            this.planBody = iplikLotStavkaPlanListJson
            this.planHead = iplikLotStavkaPlanColumns
            this.planUiShowHide = true
            this.isLoading = !this.isLoading
          }
        )
        .catch((error) => {
          this.isLoading = !this.isLoading
          // eslint-disable-next-line no-console
          console.log(error)
        })
    },

    // edit Action
    planEditAction() {
      this.planHideButton = !this.planHideButton
      // GenericTablePage da ishlab beruvchi function
      this.$refs.planRef.getEditRowAction(this.pageID)
      this.planUiShowHide = false
    },

    // discard Action
    planDiscardAction() {
      this.planHideButton = !this.planHideButton
      // GenericTablePage da ishlab beruvchi function
      this.$refs.planRef.arrayFiltered()
      this.planUiShowHide = true
    },

    // Response dan qaytgan data ni filter qilish
    responseArrayFilteredAction(resArray) {
      // const newData = []
      this.headDataFiltered.forEach(({ param, type, name }) => {
        if (!param && type === 'list') {
          resArray.forEach((obj, index) => {
            for (const key in obj) {
              if (
                name in obj &&
                obj?.[key] !== null &&
                typeof obj?.[key] === 'object'
              ) {
                console.log(name, key, obj[key])
              }
            }
          })
        }
      })
      // console.log(resArray)
    },
    // Response dan qaytgan data ni filter qilish

    // Plan EMIT action
    planGetRowElements(arr, hideBtn) {
      this.planHideButton = !hideBtn
      // list set qilish
      this.responseArrayFilteredAction(arr)
      // this.planBody = arr

      // console.log(this.planBody)

      // this.isLoading = !this.isLoading
      // this.$axios
      //   .post(`/sewModel/prepareCreateEditSewModelSize`, {
      //     id: this.pageID,
      //     iplikLotStavkaPlanList: this.planBody,
      //   })
      //   .then(({ data }) => {
      //     this.planBody = data?.sewModelSizeItem
      //     this.planUiShowHide = true
      //     this.isLoading = !this.isLoading
      //     this.$notification(`Ma'lumot saqlandi!`, 'Success', 'success')
      //   })
      //   .catch((error) => {
      //     this.isLoading = !this.isLoading
      //     // eslint-disable-next-line no-console
      //     console.log(error)
      //     this.$notification(`Ma'lumot saqlanmadi!`, 'Error', 'error')
      //   })
    },

    // Save Plan action
    planSaveAction() {
      // GenericTablePage da ishlab beruvchi function
      this.$refs.planRef.getSaveRowAction()
    },
    // PLAN TABLE ACTIONS end - =============================

    // RESERVE TABLE ACTIONS start - =============================
    // Reserve Btn Acton
    reserveAction(id) {
      this.isLoading = !this.isLoading
      this.$axios
        .post(`/iplikLotStavka/prepareCreateEditIplikLotStavkaReserve`, {
          id,
        })
        .then(
          ({
            data: {
              iplikLotStavkaReserveColumns,
              iplikLotStavkaReserveListJson,
            },
          }) => {
            this.reserveHead = iplikLotStavkaReserveColumns
            this.reserveBody = iplikLotStavkaReserveListJson
            this.reserveUiShowHide = true
            this.isLoading = !this.isLoading
          }
        )
        .catch((error) => {
          this.isLoading = !this.isLoading
          // eslint-disable-next-line no-console
          console.log(error)
        })
    },

    // edit Action
    reserveEditAction() {
      this.reserveHideButton = !this.reserveHideButton
      // GenericTablePage da ishlab beruvchi function
      this.$refs.reserveRef.getEditRowAction(this.pageID)
      this.reserveUiShowHide = false
    },

    // discard Action
    reserveDiscardAction() {
      this.reserveHideButton = !this.reserveHideButton
      // GenericTablePage da ishlab beruvchi function
      this.$refs.reserveRef.arrayFiltered()
      this.reserveUiShowHide = true
    },

    // reserve EMIT action
    reserveGetRowElements(arr, hideBtn) {
      this.reserveHideButton = !hideBtn
      // list set qilish
      this.reserveBody = arr

      this.isLoading = !this.isLoading
      this.$axios
        .post(`/sewModel/prepareCreateEditSewModelSize`, {
          id: this.pageID,
          iplikLotStavkaReserveList: this.reserveBody,
        })
        .then(({ data }) => {
          this.reserveBody = data?.sewModelSizeItem
          this.reserveUiShowHide = true
          this.isLoading = !this.isLoading
          this.$notification(`Ma'lumot saqlandi!`, 'Success', 'success')
        })
        .catch((error) => {
          this.isLoading = !this.isLoading
          // eslint-disable-next-line no-console
          console.log(error)
          this.$notification(`Ma'lumot saqlanmadi!`, 'Error', 'error')
        })
    },

    // Save Reserve action
    reserveSaveAction() {
      // GenericTablePage da ishlab beruvchi function
      this.$refs.reserveRef.getSaveRowAction()
    },
    // RESERVE TABLE ACTIONS end - =============================

    // STAGE TABLE ACTIONS start - =============================
    // Stage Btn Acton
    stageAction(id) {
      this.isLoading = !this.isLoading
      this.$axios
        .post(`/iplikLotStavka/prepareCreateEditIplikLotStavkaStage`, {
          id,
        })
        .then(
          ({
            data: {
              openPopup,
              iplikLotStavkaStageColumns,
              iplikLotStavkaStageListJson,
            },
          }) => {
            this.openPopUp = openPopup
            this.stageHead = iplikLotStavkaStageColumns
            this.stageBody = iplikLotStavkaStageListJson
            this.isLoading = !this.isLoading
          }
        )
        .catch((error) => {
          this.isLoading = !this.isLoading
          // eslint-disable-next-line no-console
          console.log(error)
        })
    },

    // edit Action
    stageEditAction() {
      this.stageHideButton = !this.stageHideButton
      // GenericTablePage da ishlab beruvchi function
      this.$refs.stageRef.getEditRowAction(this.pageID)
      this.stageUiShowHide = false
    },

    // discard Action
    stageDiscardAction() {
      this.stageHideButton = !this.stageHideButton
      // GenericTablePage da ishlab beruvchi function
      this.$refs.stageRef.arrayFiltered()
      this.stageUiShowHide = true
    },

    // stage EMIT action
    stageGetRowElements(arr, hideBtn) {
      this.stageHideButton = !hideBtn
      // list set qilish
      this.stageBody = arr

      this.isLoading = !this.isLoading
      this.$axios
        .post(`/iplikLotStavka/prepareCreateEditIplikLotStavkaStage`, {
          id: this.pageID,
          iplikLotStavkaStageList: this.stageBody,
        })
        .then(({ data: { openPopup, iplikLotStavkaStageListJson } }) => {
          this.openPopUp = openPopup
          this.stageBody = iplikLotStavkaStageListJson
          this.stageUiShowHide = true
          this.isLoading = !this.isLoading
          this.$notification(`Ma'lumot saqlandi!`, 'Success', 'success')
        })
        .catch((error) => {
          this.isLoading = !this.isLoading
          // eslint-disable-next-line no-console
          console.log(error)
          this.$notification(`Ma'lumot saqlanmadi!`, 'Error', 'error')
        })
    },

    // Save Stage action
    stageSaveAction() {
      // GenericTablePage da ishlab beruvchi function
      this.$refs.stageRef.getSaveRowAction()
    },
    // STAGE TABLE ACTIONS end - =============================

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
          name: 'Year',
          subName: 'year',
          type: 'number',
          required: true,
        },
        {
          name: 'Lot',
          subName: 'lot',
          type: 'number',
          required: true,
        },
        {
          name: 'Name',
          subName: 'name',
          type: 'label',
        },
        {
          name: 'Qty',
          subName: 'qty',
          type: 'number',
          required: true,
        },
        {
          name: 'Note',
          subName: 'note',
          type: 'text',
          required: false,
        },
        {
          name: 'Department',
          subName: 'department',
          type: 'select',
          url: 'findAllDepartmentLogic',
          param: { typeStr: '0,5' },
          required: true,
        },
        {
          name: 'Product Production Type',
          subName: 'productProductionType',
          type: 'select',
          url: 'findAllProductProduction',
          required: true,
        },
        {
          name: 'Status',
          subName: 'openClose',
          type: 'label',
        },
      ]
      this.elementData = data

      const btnData = [
        {
          name: 'Plan',
          type: 'info',
          clickType: 'plan',
        },
        {
          name: 'Reserve',
          type: 'info',
          clickType: 'reserve',
        },
        {
          name: 'Stage',
          type: 'info',
          clickType: 'stage',
        },
        {
          name: 'Delete',
          type: 'danger',
          clickType: 'delete',
          iconName: 'delete',
        },
        {
          name: 'OpenOrClose',
          type: 'success',
          clickType: 'openOrClose',
        },
      ]
      this.allBtnName = btnData
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
