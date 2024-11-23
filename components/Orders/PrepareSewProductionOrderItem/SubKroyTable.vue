<template>
  <div>
    <LoadingPage
      v-if="isLoading"
      class="absolute left-[50%] top-[8px] translate-x-[-50%]"
    />
    <div class="max-h-[500px] overflow-scroll mt-5">
      <table class="w-full border-[1px] border-solid border-[#F0F0F0]">
        <thead class="bg-[rgb(229,235,245)] z-[999] sticky top-0">
          <tr>
            <th
              v-for="(obj, key) in tableHeadData"
              :key="key"
              class="text-[13px] font-semibold border-[1px] border-solid border-[rgba(119,136,153,0.3)] p-2 cursor-pointer whitespace-nowrap"
            >
              <div
                v-if="obj?.type === 'btns'"
                class="flex items-center justify-center gap-3"
              >
                {{ obj.name }}
                <generic-button
                  circle
                  type="primary"
                  icon-name-attribute="circle-plus"
                  @click="addTableBodyDataAction"
                />
                <generic-button
                  name="Save"
                  type="primary"
                  :disabled="isSaveDisabled"
                  @click="saveAction"
                />
              </div>
              <template v-else>
                {{ obj.name }}
                <!-- <pre>{{ obj }}</pre> -->
              </template>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(row, index) in tableBodyData"
            :key="index"
            class="bg-gradient-to-b from-transparent via-transparent to-[#F4F4F4]"
          >
            <td
              v-for="(obj, inx) in tableHeadData"
              :key="inx"
              class="border-[1px] text-[12px] p-[2px] text-center"
            >
              <template v-if="obj?.type === 'text'">
                {{ obj?.[obj.subName] }}
              </template>
              <template v-else-if="obj?.type === 'select'">
                <generic-look-up
                  dwidth="150"
                  :defvalue="obj?.[obj.subName] ?? ''"
                  :durl="obj.api"
                  :name="obj.subName"
                  :order="index"
                  @customFunction="setLookUpAndInputValueAction"
                />
              </template>
              <template
                v-else-if="obj?.type === 'number' || obj?.type === 'textarea'"
              >
                <generic-input
                  :value="
                    tableLookUpAndInputObj?.[`${index + 1}_${obj.subName}`] ??
                    ''
                  "
                  :order="index"
                  width="100"
                  :type="obj.type"
                  :name="obj.subName"
                  :feature="`${obj?.item}`"
                  :clearable="false"
                  @customFunction="setLookUpAndInputValueAction"
                />
              </template>
              <div
                v-else-if="obj?.type === 'btns'"
                class="flex items-center justify-center gap-5"
              >
                <div v-for="(elem, i) in obj?.list" :key="i">
                  <generic-button
                    v-if="elem?.type === 'btn'"
                    :circle="elem.circle"
                    :type="elem.btnType"
                    :icon-name-attribute="elem.icon"
                    @click="rowDeleteAction(index)"
                  />
                  <generic-check-box
                    v-else-if="elem?.type === 'checkbox'"
                    :name="elem.subName"
                    :order="index"
                    @customFunction="setLookUpAndInputValueAction"
                  />
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import GenericButton from '@generics/GenericButton.vue'
export default {
  // COMPONENTS
  components: {
    GenericButton,
  },

  // PROPS
  props: {
    headData: {
      type: Array,
      default: () => [],
    },
    tableType: {
      type: String,
      default: '',
    },
  },

  // DATA
  data() {
    return {
      isLoading: false,
      isSaveDisabled: false,
      tableHeadData: [],
      tableBodyData: [],
      tableLookUpAndInputObj: {},
    }
  },

  // WATCH
  watch: {
    headData: {
      handler(newVal) {
        this.tableHeadData = newVal
        !this.tableBodyData?.length && this.tableBodyData.push(newVal)
      },
      deep: true,
      immediate: true,
    },
    tableBodyData: {
      handler(newVal) {
        newVal?.length
          ? (this.isSaveDisabled = false)
          : (this.isSaveDisabled = true)
      },
      deep: true,
      immediate: true,
    },
  },

  // CREATED
  created() {
    this.pageID = this.$route.params?.id
  },

  // METHODS
  methods: {
    // LookUp and Inputs set value action
    setLookUpAndInputValueAction(name, value, index, feature) {
      const i = index + 1

      feature?.includes('true') && this.tableLookUpAndInputObj?.[`${i}_all`]
        ? this.checkedRowSetValueAction(value, i) // function
        : this.$set(this.tableLookUpAndInputObj, `${i}_${name}`, value)
    },
    checkedRowSetValueAction(value, i) {
      this.tableHeadData.forEach((obj) => {
        if (obj?.item) {
          this.$set(this.tableLookUpAndInputObj, `${i}_${obj?.subName}`, value)
        }
      })
    },

    // Add Row Data
    addTableBodyDataAction() {
      this.tableBodyData.push(this.tableHeadData)
    },

    // Row delete action
    rowDeleteAction(i) {
      this.tableBodyData = this.tableBodyData?.filter((arr, inx) => i !== inx)
      for (const key in this.tableLookUpAndInputObj) {
        if (key?.includes(`${i + 1}`)) delete this.tableLookUpAndInputObj[key]
      }
    },

    // Save Action
    saveAction() {
      for (const key in this.tableLookUpAndInputObj) {
        key?.includes('all') && delete this.tableLookUpAndInputObj[key]
      }
      const body = {
        id: this.pageID,
      }
      this.tableType === 'kroyTop'
        ? (body.kroyListMapObj = this.tableLookUpAndInputObj)
        : this.tableType === 'kroyBottom'
        ? (body.kroyBottomListMapObj = this.tableLookUpAndInputObj)
        : (body.productionListMapObj = this.tableLookUpAndInputObj)

      this.isLoading = !this.isLoading
      this.$axios
        .post(`/productionOrderNew/createProductionInvoceAndKroyItems`, body)
        .then(({ data }) => {
          this.$emit('emitAction', false)
          this.tableHeadData = []
          this.tableBodyData = []
          this.tableLookUpAndInputObj = {}
          this.isLoading = !this.isLoading
        })
        .catch((error) => {
          this.isLoading = !this.isLoading
          // eslint-disable-next-line no-console
          console.log(error)
        })
    },
  },
}
</script>
