<template>
  <div class="w-full p-[0px_10px_0px_4px]">
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
            @click="$router.push('/colorVariant.htm')"
          />
          <h1 class="font-bold text-[rgb(49,126,172)] text-[14px] uppercase">
            Design Variant
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
        <!-- Top static table -->
        <table class="w-full text-[13px] mt-1">
          <tbody>
            <tr
              v-for="(row, indexOne) in elementData"
              :key="indexOne"
              class="bg-[rgba(239,243,249,0.7)] hover:bg-gradient-to-b hover:from-transparent hover:via-transparent hover:to-[rgba(220,229,243,0.7)]"
            >
              <td
                v-for="(col, indexTwo) in row"
                :key="indexTwo"
                class="border-[1px] border-solid border-[#778899] p-1"
                :style="{ width: `${col?.width}px !important` }"
              >
                <template v-if="col?.name">
                  <span class="font-medium">{{ col?.name }}</span>
                </template>
                <template v-else>
                  {{ editData?.[col?.valueName] }}
                </template>
              </td>
            </tr>
          </tbody>
        </table>
        <!-- Top static table -->

        <!-- --START-- Custom Table -->
        <div class="m-1">
          <span class="text-[14px]"
            >Color Variant Item.
            <strong class="text-[14px] text-[rgb(156,0,78)]"
              >Parent ID = {{ pageID }}</strong
            ></span
          >
          <div class="flex gap-1 flex-wrap">
            <GenericButton
              name="Column Setting"
              type="info"
              icon-name-attribute="setting"
              @click="openColumnConfig"
            />
            <span v-if="hideButton" class="flex gap-1 flex-wrap">
              <GenericButton name="Save" type="primary" @click="saveAction" />
              <GenericButton
                name="Discard"
                @click="discardSewModalOperationAction"
              />
            </span>
            <GenericButton
              v-else
              name="Edit"
              type="success"
              icon-name-attribute="edit"
              @click="editSewModalOperationAction"
            />
            <GenericButton
              name="Delete"
              type="danger"
              icon-name-attribute="delete"
              @click="deleteAction"
            />
          </div>
          <GenericPrepareTablePage
            ref="customTableRef"
            department-name="production"
            :addmodalorrow="false"
            :tablehead="headData"
            :tableheadlength="headData.length"
            :response-data="bodyData"
            :ui-show-hide="uiShowHide"
            :is-edit="isEdit"
            :height="450"
            delete-url-row="colorVariant/prepareDeleteColorVariantItemUrl"
            class="bg-[rgba(255,255,255,0.5)] mt-1"
            @rowValues="getRowElements"
          />
        </div>
        <!-- --END-- Custom Table -->
      </div>
    </template>
  </div>
</template>

<script>
import GenericButton from '@generics/GenericButton.vue'
import LoadingPage from '@components/Loading/LoadingPage.vue'
import MessageBox from '@components/MessageBox.vue'
import GenericPrepareTablePage from '@components/GenericPrepareTable/GenericPrepareTablePage.vue'
import ColumnConfigPage from '@components/ColumnConfig/ColumnConfigPage.vue'
export default {
  components: {
    GenericButton,
    LoadingPage,
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
      // column config uchun
      tableData: [],
      tableData2: [],
      rightMap: {},
      leftMap: {},
      rightData: {},
      leftData: {},
      // column config uchun
      elementData: [],
      editData: {},
      headData: [],
      bodyData: [],
      uiShowHide: false,
      isEdit: false,
      hideButton: false,
      actionUrl: null,
    }
  },

  // CREATED
  created() {
    this.pageID = this.$route.params?.id
    if (this.pageID) {
      this.getTableRequest(this.pageID)
      this.isEdit = true
      this.hideButton = false
    }
  },

  // MOUNTED
  mounted() {
    // function
    this.dataCreatedAction()
  },

  // METHODS
  methods: {
    // Column Config function
    handleValue(checkModal) {
      this.checkModal = checkModal
    },
    openColumnConfig() {
      this.isLoading = !this.isLoading
      this.$axios
        .post(`/base/columnsConfigU`, {
          actionUrl: this.actionUrl,
        })
        .then(({ data: { leftColumns, rightColumns } }) => {
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

    // Table page ni ochish va yopish uchun
    isOpen() {
      this.isOpenTable = !this.isOpenTable
    },
    isClose() {
      this.isCloseTable = !this.isCloseTable
    },

    // PAGE request
    getTableRequest(pageID) {
      this.isLoading = !this.isLoading
      this.$axios
        .post(`/colorVariant/prepareColorVariantAjaxLoad`, {
          id: pageID,
          page_current: 1,
          page_size: 25,
        })
        .then(({ data: { colorVariant, linkedHashMaps } }) => {
          this.actionUrl = 'designColorVariantItemTable'
          this.editData = colorVariant
          this.headData = linkedHashMaps
          this.bodyData = colorVariant?.colorVariantRecipeList
          this.isLoading = !this.isLoading
        })
        .catch((error) => {
          this.isLoading = !this.isLoading
          // eslint-disable-next-line no-console
          console.log(error)
        })
    },

    // edit sewModelOperation
    editSewModalOperationAction() {
      this.hideButton = !this.hideButton

      // GenericTablePage da ishlab beruvchi function
      this.$refs.customTableRef.getEditRowAction(this.pageID)
      this.uiShowHide = false
    },

    // discard sewModelOperation
    discardSewModalOperationAction() {
      // GenericTablePage da ishlab beruvchi function
      this.$refs.customTableRef.arrayFiltered()

      this.hideButton = !this.hideButton
      this.uiShowHide = true
    },

    // object value filtered action
    responseArrayFilteredAction(resArray) {
      // bu loop ichidagi shart custom table to'g'rilansa olib tashlanadi
      this.bodyData = resArray.map((obj) => {
        for (const key in obj) {
          if (!obj[key]) delete obj[key]
        }
        if (obj?.colorVariant && typeof obj?.colorVariant !== 'object')
          obj.colorVariant = { id: obj.colorVariant }
        if (typeof obj?.dyingReciepeCalculationType === 'object')
          obj.dyingReciepeCalculationType = obj.dyingReciepeCalculationType?.id
        return obj
      })
      // bu loop ichidagi shart custom table to'g'rilansa olib tashlanadi
    },

    // EMIT action
    getRowElements(arr, hideBtn) {
      // function
      this.responseArrayFilteredAction(arr)
      this.hideButton = !hideBtn

      const colorVariant = {}
      colorVariant.id = this.pageID
      colorVariant.pressing = null
      colorVariant.speed = null
      colorVariant.volume = null
      colorVariant.colorVariantRecipeList = this.bodyData

      this.isLoading = !this.isLoading
      this.$axios
        .post(`/colorVariant/prepareCreateEditColorVariant`, {
          colorVariant,
        })
        .then(({ data: { colorVariantJson } }) => {
          this.editData = colorVariantJson
          this.bodyData = colorVariantJson?.colorVariantRecipeList
          this.uiShowHide = true
          this.isLoading = !this.isLoading
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
        [
          { name: 'Date', width: 300 },
          { valueName: 'date', width: 300 },
          { name: 'Color Variant Type', width: 300 },
          { valueName: 'colorVariantType' },
        ],
        [
          { name: 'Color', width: 300 },
          { valueName: 'color', width: 300 },
          { name: 'Color Variant', width: 300 },
          { valueName: 'name' },
        ],
        [
          { name: 'Color Depth', width: 300 },
          { valueName: 'colorDepth', width: 300 },
          { name: 'Pressing', width: 300 },
          { valueName: 'pressing' },
        ],
        [
          { name: 'Product Types', width: 300 },
          { valueName: 'productType', width: 300 },
          { name: 'Volume', width: 300 },
          { valueName: 'volume' },
        ],
        [
          { name: 'Products', width: 300 },
          { valueName: 'product', width: 300 },
          { name: 'Speed', width: 300 },
          { valueName: 'speed' },
        ],
        [
          { name: 'Color Group', width: 300 },
          { valueName: 'colorGroup', width: 300 },
          { name: 'Batch Process Stage', width: 300 },
          { valueName: 'batchProcessStage' },
        ],
      ]
      this.elementData = data
    },

    // Filter Action
    getFilterData(leftColumns, rightColumns) {
      rightColumns.forEach((obj) => {
        this.rightMap[obj.name] = obj
      })
      leftColumns.forEach((obj) => {
        this.leftMap[obj.name] = obj
      })

      this.rightData = this.rightMap
      this.leftData = this.leftMap
    },

    // Message box action
    getEmitProp(propMessage, id) {
      if (propMessage === 'confirm') {
        this.$axios
          .delete(`/sewModel/prepareSewmodelDelete`, {
            data: {
              deleteItemId: id,
            },
          })
          .then(({ status }) => {
            if (status < 300) this.$router.push('/colorVariant.htm')
          })
          .catch((error) => {
            // eslint-disable-next-line no-console
            console.log(error)
          })
      }
    },

    // Save btn action
    saveAction() {
      // GenericTablePage da ishlab beruvchi function
      this.$refs.customTableRef.getSaveRowAction()
    },

    // Delete action
    deleteAction() {
      this.$refs.messageBoxRef.open(this.pageID)
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
