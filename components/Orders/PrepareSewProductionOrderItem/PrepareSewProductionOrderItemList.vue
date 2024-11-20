<template>
  <div class="w-full px-1">
    <LoadingPage
      v-if="isLoading"
      class="absolute left-[50%] top-[8px] translate-x-[-50%]"
    />
    <message-box ref="messageBoxRef" @emitProp="getEmitProp" />
    <div
      class="border-[1px] border-solid border-[rgba(0,0,0,0.05)] p-[12px] bg-gradient-to-b from-transparent via-transparent to-gray-200 shadow-md flex items-center justify-between mt-1"
    >
      <div class="flex items-center gap-1">
        <generic-button
          v-for="(btn, i) in allBtnData"
          v-show="btn.showAndHide"
          :key="i"
          :name="btn.name"
          :type="btn.type"
          :icon-name-attribute="btn?.icon"
          @click="topAllBtnAction(btn.clickType)"
        />
      </div>
    </div>
    <div class="border-[1px] border-solid border-[rgba(0,0,0,0.1)]">
      <!-- Static top table -->
      <static-top-table-list
        :edit-data="topTableEditData"
        @emitAction="setTopStaticTableObjValueAction"
      />
      <!-- Sew Created Table -->
      <table-sew-created
        :edit-data="tableSewCreated"
        @emitAction="sewCreatedTableAction"
        @emitActionTwo="getSewCreatedTableDataAction"
      />
      <!-- Sew Created Table Body -->
      <sew-created-table-body
        v-if="sewCreatedTaleBodyShowAndHide && !pageID"
        ref="sewCreatedTableBody"
        :sew-model-object="sewModelObject"
        :sew-model-id="sewModelId"
        @emitAction="getSizeItamObjAction"
        @emitActionTwo="getSewCreatedTableBodyData"
      />
      <sew-created-table-body-edit
        v-else
        :order-list="tableSewCreated?.orderList"
        :kroy-list="tableSewCreated?.kroyList"
        @emitAction="editTableEmitAction"
      />
    </div>
  </div>
</template>

<script>
import MessageBox from '@components/MessageBox.vue'
import GenericButton from '@generics/GenericButton.vue'
import LoadingPage from '@components/Loading/LoadingPage.vue'
import StaticTopTableList from '@components/Orders/PrepareSewProductionOrderItem/StaticTopTableList.vue'
import TableSewCreated from '@components/Orders/PrepareSewProductionOrderItem/TableSewCreated.vue'
import SewCreatedTableBody from '@components/Orders/PrepareSewProductionOrderItem/SewCreatedTableBody.vue'
import SewCreatedTableBodyEdit from '@components/Orders/PrepareSewProductionOrderItem/SewCreatedTableBodyEdit.vue'
export default {
  components: {
    GenericButton,
    LoadingPage,
    MessageBox,
    StaticTopTableList,
    TableSewCreated,
    SewCreatedTableBody,
    SewCreatedTableBodyEdit,
  },

  // DATA
  data() {
    return {
      actionUrl: null,
      isLoading: false,
      pageSize_value: 25,
      pageID: null,
      allBtnData: [],
      topTableEditData: {},
      topTableValueObj: {},
      // table-sew-created
      tableSewCreated: {},
      // table-sew-created
      // Sew Created Table Body uchun
      itemListMapObj: {},
      sewModelObject: {},
      sewSizeItemObj: {},
      sewCreatedTableValueObj: {},
      sewModelId: null,
      sewCreatedTaleBodyShowAndHide: false,
      // Sew Created Table Body uchun
    }
  },

  // CREATED
  created() {
    this.pageID = this.$route.params?.id
  },

  // MOUNTED
  mounted() {
    this.getTableRequest(this.pageID) // function
    this.pageID && this.findNewUISewingOrderAction(this.pageID) // function
    this.dataCreatedAction() // function
  },

  // METHODS
  methods: {
    // PAGE request
    getTableRequest(pageID) {
      const body = {}
      if (pageID) body.id = pageID
      this.isLoading = !this.isLoading
      this.$axios
        .post(`/sewProductionOrder/prepareSewProductionOrderItem`, body)
        .then(({ data }) => {
          this.topTableEditData = data?.productionOrderJson
          this.isLoading = !this.isLoading
        })
        .catch((error) => {
          this.isLoading = !this.isLoading
          // eslint-disable-next-line no-console
          console.log(error)
        })
    },

    setTopStaticTableObjValueAction(obj) {
      this.topTableValueObj = obj
    },

    // Sew Created Table Emit Action
    getSewCreatedTableDataAction(obj) {
      this.sewCreatedTableValueObj = obj
    },

    // Sew Created Table Body Emit Action
    getSizeItamObjAction(obj) {
      this.sewSizeItemObj = obj
    },

    // Sew Created Table Emit Action
    sewCreatedTableAction(sewModelObject, sewModelId, showAndHide) {
      this.sewModelId = sewModelId
      this.sewModelObject = sewModelObject
      this.sewCreatedTaleBodyShowAndHide = showAndHide
    },

    // Edit Table Emit Action
    editTableEmitAction(prop) {
      prop && this.pageID && this.findNewUISewingOrderAction(this.pageID) // function
    },

    // Message box action
    getEmitProp(propMessage, id, index, type) {
      this.isLoading = !this.isLoading
      if (propMessage === 'confirm' && type === 'changePrice') {
        this.$axios
          .put(`/sewModel/changePriceInModelUrl`, { id })
          .then(() => {
            this.getTableRequest(this.pageID) // function
            this.findNewUISewingOrderAction(this.pageID) // function
            this.isLoading = !this.isLoading
          })
          .catch((error) => {
            this.isLoading = !this.isLoading
            // eslint-disable-next-line no-console
            console.log(error)
          })
      }
    },

    topAllBtnAction(type) {
      if (type === 'back') this.$router.push('/productionorder.htm')
      else if (type === 'save') this.saveAction() // function
      // else if (type === 'addNew') console.log(type)
      // else if (type === 'saveKroy') console.log(type)
      // else if (type === 'create') console.log(type)
      // else if (type === 'printer') console.log(type)
      // else if (type === 'sewBarcode') console.log(type)
      // else if (type === 'kroy') console.log(type)
      // else if (type === 'openKnitting') console.log(type)
      else if (type === 'changePrice') {
        this.$refs.messageBoxRef.open(this.pageID, '', type)
      }
    },

    // Save Action
    saveAction() {
      if (
        (this.topTableValueObj?.date || this.topTableEditData?.date) &&
        (this.topTableValueObj?.dueDate || this.topTableEditData?.dueDate) &&
        (this.topTableValueObj?.company || this.topTableEditData?.company?.id)
      ) {
        const productionOrder = {
          clientOrder:
            this.topTableValueObj?.clientOrder ??
            this.topTableEditData?.clientOrder ??
            null,
          company: {
            id:
              this.topTableValueObj?.company ??
              this.topTableEditData?.company?.id ??
              null,
          },
          companyCurrencyRate:
            this.topTableValueObj?.companyCurrencyRate ??
            this.topTableEditData?.companyCurrencyRate ??
            null,
          currencyRate:
            this.topTableValueObj?.currencyRate ??
            this.topTableEditData?.currencyRate ??
            null,
          date:
            this.topTableValueObj?.date ??
            this.$formatDate(
              this.topTableEditData?.date,
              'yyyy-mm-dd hh:mm:ss'
            ) ??
            null,
          dueDate:
            this.topTableValueObj?.dueDate ??
            this.$formatDate(
              this.topTableEditData?.dueDate,
              'yyyy-mm-dd hh:mm:ss'
            ) ??
            null,
          notes:
            this.topTableValueObj?.notes ??
            this.topTableEditData?.notes ??
            null,
          orderNumber:
            this.topTableValueObj?.orderNumberPo ??
            this.topTableEditData?.orderNumberPo ??
            null,
          orderNumberPo:
            this.topTableValueObj?.orderNumberPo ??
            this.topTableEditData?.orderNumberPo ??
            null,
          productionOrderItems: [],
        }
        this.isLoading = !this.isLoading
        this.$axios
          .post(`/productionOrder/prepareCreateEditProductionOrder`, {
            productionOrder,
          })
          .then(({ data: { productionOrderJson } }) => {
            this.topTableEditData = productionOrderJson
            if (!this.pageID && productionOrderJson?.id) {
              this.$router.push(
                `/prepareSewProductionOrderItem.htm/${productionOrderJson?.id}`
              )
              this.sewCreatedTableRequestAction(productionOrderJson?.id) // function
            }
            this.isLoading = !this.isLoading
          })
          .catch((error) => {
            this.isLoading = !this.isLoading
            // eslint-disable-next-line no-console
            console.log(error)
          })
      } else this.$notification(`Ma'lumotni to'liq to'ldiring!`)
    },

    //
    getSewCreatedTableBodyData(arrData) {
      arrData.forEach((obj, i) => {
        delete obj[`${i + 1}all`]
        delete obj[`${i + 1}foiz`]
        this.itemListMapObj = { ...this.itemListMapObj, ...obj }
      })
    },

    // Sew Created Table datasini jo'natish
    sewCreatedTableRequestAction(id) {
      // Sew Created Table Body componentda ishlab beradi
      this.$refs.sewCreatedTableBody.saveAction()
      // Start Request Body
      const newOrderItem = {
        orderProductionType: {
          id: this.sewCreatedTableValueObj?.orderProductionType ?? null,
        },
        productProductionType: {
          id: this.sewCreatedTableValueObj?.productProductionType ?? null,
        },
        id: this.sewCreatedTableValueObj?.warehouse ?? null,
        sewModel: {
          id: this.sewCreatedTableValueObj?.sewModel ?? null,
        },
        item: this.sewCreatedTableValueObj?.product,
      }
      const body = {
        id,
        newOrderItem,
        sizeListMap: this.sewSizeItemObj,
        itemListMapObj: this.itemListMapObj,
      }
      // End Request Body
      this.isLoading = !this.isLoading
      this.$axios
        .post(`/productionOrderNew/createNewSewingOrderItem`, body)
        .then(() => {
          this.findNewUISewingOrderAction(id) // function
          this.isLoading = !this.isLoading
        })
        .catch((error) => {
          this.isLoading = !this.isLoading
          // eslint-disable-next-line no-console
          console.log(error)
        })
    },

    // Action
    findNewUISewingOrderAction(id) {
      const body = {
        id,
        planningTypeTypeId: 4,
      }
      this.isLoading = !this.isLoading
      this.$axios
        .post(`/productionOrderNew/findNewUISewingOrderUrl`, body)
        .then(({ data: { uIViewSewPrOrderMap } }) => {
          this.tableSewCreated = uIViewSewPrOrderMap
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
      const btnData = [
        {
          name: 'Back',
          type: 'primary',
          icon: 'arrow-left',
          path: 'productionorder.htm',
          clickType: 'back',
          showAndHide: true,
        },
        {
          name: 'Save',
          type: 'primary',
          clickType: 'save',
          showAndHide: true,
        },
        {
          name: 'Add New',
          type: 'primary',
          clickType: 'addNew',
          showAndHide: !!this.pageID,
        },
        {
          name: 'Save kroy',
          type: 'primary',
          clickType: 'saveKroy',
          showAndHide: !!this.pageID,
        },
        {
          name: 'Create',
          type: 'primary',
          clickType: 'create',
          showAndHide: !!this.pageID,
        },
        {
          name: 'Print Preview',
          type: 'success',
          icon: 'printer',
          clickType: 'printer',
          showAndHide: !!this.pageID,
        },
        {
          name: 'Sew barcode',
          type: 'info',
          clickType: 'sewBarcode',
          showAndHide: !!this.pageID,
        },
        {
          name: 'Kroy',
          type: 'success',
          clickType: 'kroy',
          showAndHide: !!this.pageID,
        },
        {
          name: 'Open Knitting',
          type: 'primary',
          clickType: 'openKnitting',
          showAndHide: !!this.pageID,
        },
        {
          name: 'Change Price',
          type: 'danger',
          clickType: 'changePrice',
          showAndHide: !!this.pageID,
        },
      ]
      this.allBtnData = btnData
    },
  },
}
</script>
