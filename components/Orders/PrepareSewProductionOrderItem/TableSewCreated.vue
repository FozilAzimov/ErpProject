<template>
  <table class="w-full text-[13px] mt-1">
    <tbody>
      <tr
        v-for="(row, index) in elementData"
        :key="index"
        class="bg-[rgba(239,243,249,0.7)] hover:bg-gradient-to-b hover:from-transparent hover:via-transparent hover:to-[rgba(220,229,243,0.7)]"
      >
        <td
          v-for="(obj, innerIndex) in row"
          :key="innerIndex"
          class="border-[1px] border-solid border-[#778899] p-[2px_5px]"
          :style="{ width: `${obj?.width}px !important` }"
        >
          <template v-if="obj?.type === 'text'">
            <span v-if="obj?.name" class="font-medium whitespace-nowrap">{{
              obj?.name
            }}</span>
            <span v-else-if="obj?.subName" class="whitespace-nowrap">{{
              allLookUpAndInputValue?.[obj?.subName] ??
              editData?.[obj?.subName] ??
              ''
            }}</span>
            <span v-if="obj?.required" class="text-red-600 text-[16px]">*</span>
          </template>
          <template v-else-if="obj?.type === 'select'">
            <template v-if="pageID">{{
              typeof editData?.[obj?.subName] === 'object'
                ? editData?.[obj?.subName]?.text
                : editData?.[obj?.subName]
            }}</template>
            <generic-look-up
              v-else
              :defvalue="
                typeof allLookUpAndInputValue?.[obj?.subName] === 'object'
                  ? allLookUpAndInputValue?.[obj?.subName]?.text
                  : allLookUpAndInputValue?.[obj?.subName]
              "
              :name="obj?.subName"
              dwidth="300"
              :durl="obj?.url"
              :dparam="obj?.param"
              :disabled="
                !!(
                  obj?.subName === 'product' &&
                  typeof allLookUpAndInputValue?.[obj?.subName] === 'object'
                )
              "
              @customFunction="setLookUpAndInputValueAction"
            />
          </template>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import GenericLookUp from '@generics/GenericLookUp.vue'
export default {
  components: {
    GenericLookUp,
  },

  // PROPS
  props: {
    editData: {
      type: Object,
      default: () => ({}),
    },
  },

  // DATA
  data() {
    return {
      pageID: null,
      elementData: [],
      allLookUpAndInputValue: {},
    }
  },

  // CREATED
  created() {
    this.pageID = this.$route.params?.id
  },

  // MOUNTED
  mounted() {
    // function
    this.dataCreatedAction()
  },

  // METHODS
  methods: {
    // get LookUps and Inputs value
    setLookUpAndInputValueAction(name, value) {
      this.$set(this.allLookUpAndInputValue, name, value)
      // function
      name === 'sewModel' && this.sewModelLookUpChangeAction(value)
      this.$emit('emitActionTwo', this.allLookUpAndInputValue)
    },

    // sewModel LookUp change action
    sewModelLookUpChangeAction(value) {
      if (value) {
        this.$axios
          .post(`/productionOrder/findSewModelData`, { id: value })
          .then(({ data: { sewModelObject } }) => {
            sewModelObject?.product &&
              this.$set(
                this.allLookUpAndInputValue,
                'product',
                sewModelObject?.product ?? ''
              )
            this.$emit('emitAction', sewModelObject, value, true)
          })
          .catch((error) => {
            // eslint-disable-next-line no-console
            console.log(error)
          })
      } else {
        this.$set(this.allLookUpAndInputValue, 'product', '')
        this.$emit('emitAction', {}, '', false)
      }
    },

    // Data created
    dataCreatedAction() {
      const data = [
        [
          {
            width: '250',
            name: 'Order Production Type',
            type: 'text',
            required: true,
          },
          {
            subName: 'orderProductionType',
            url: 'findAllOrderProductionType',
            param: { tabName: 'purchaseInvoice' },
            type: 'select',
            required: true,
          },
        ],
        [
          {
            width: '250',
            name: 'Product Production',
            type: 'text',
            required: true,
          },
          {
            subName: 'productProductionType',
            url: 'findAllProductProduction',
            param: { planningTypeId: 4 },
            type: 'select',
            required: true,
          },
        ],
        [
          {
            width: '250',
            name: 'Warehouse',
            type: 'text',
            required: true,
          },
          {
            subName: 'warehouse',
            url: 'findAllWarehouse',
            param: { planningTypeId: 4 },
            type: 'select',
            required: true,
          },
        ],
        [
          {
            width: '250',
            name: 'Sewmodel',
            type: 'text',
            required: true,
          },
          {
            subName: 'sewModel',
            url: 'findAllSewModel',
            param: { planningTypeId: 4 },
            type: 'select',
            required: true,
          },
        ],
        [
          {
            width: '250',
            name: 'Product',
            type: 'text',
            required: true,
          },
          {
            subName: 'product',
            url: 'searchProductList',
            param: { planningTypeTypeId: 4 },
            type: 'select',
            required: true,
          },
        ],
      ]
      this.elementData = data
    },
  },
}
</script>
