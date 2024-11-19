<template>
  <div class="max-h-[500px] overflow-scroll my-1">
    <table class="w-full border-[1px] border-solid border-[#F0F0F0]">
      <thead class="bg-[rgb(229,235,245)] z-[999] sticky top-0">
        <tr>
          <th
            v-for="({ name }, key) in headData"
            :key="key"
            class="text-[13px] font-semibold border-[1px] border-solid border-[rgba(119,136,153,0.3)] p-2 cursor-pointer whitespace-nowrap"
          >
            {{ name }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(row, index) in bodyData"
          :key="index"
          class="bg-gradient-to-b from-transparent via-transparent to-[#F4F4F4]"
        >
          <td
            v-for="({ subName }, inx) in headData"
            :key="inx"
            class="border-[1px] text-[12px] p-[2px] text-center"
          >
            <div v-if="subName === 'action'" class="flex items-center gap-1">
              <generic-button
                v-for="(elem, i) in row[subName]"
                :key="i"
                :name="elem.name"
                :type="elem.type"
              />
            </div>
            <div
              v-else-if="subName?.includes('size')"
              class="flex flex-col items-center gap-2"
            >
              <generic-input value="0" width="120" type="number" disabled />

              <div v-if="row[subName]?.isEdit" class="flex items-center gap-1">
                <generic-input
                  width="100"
                  :value="`${row[subName]?.qty}`"
                  type="number"
                  :clearable="false"
                />
                <generic-input
                  width="100"
                  :value="`${row[subName]?.planReqQty}`"
                  type="number"
                  :clearable="false"
                />
              </div>
              <generic-button
                v-else
                :name="`${row[subName]?.qty} : ${row[subName]?.planReqQty}`"
                type="info"
                @click="
                  sizeItemSaveOrEditOrCanselOrPlanReqQtyBtnsAction(
                    'sizeItem',
                    row[subName],
                    subName,
                    index
                  )
                "
              />
              <div class="flex flex-col items-center gap-2">
                <div
                  v-if="row[subName]?.isEdit"
                  class="flex items-center gap-2"
                >
                  <generic-button
                    name="Cansel"
                    @click="
                      sizeItemSaveOrEditOrCanselOrPlanReqQtyBtnsAction(
                        'cansel',
                        row[subName],
                        subName,
                        index
                      )
                    "
                  />
                  <generic-button
                    name="Save"
                    type="primary"
                    @click="
                      sizeItemSaveOrEditOrCanselOrPlanReqQtyBtnsAction(
                        'save',
                        row[subName],
                        subName,
                        index
                      )
                    "
                  />
                </div>
                <generic-button
                  v-else
                  name="Edit"
                  type="success"
                  icon-name-attribute="edit"
                  @click="
                    sizeItemSaveOrEditOrCanselOrPlanReqQtyBtnsAction(
                      'edit',
                      row[subName],
                      subName,
                      index
                    )
                  "
                />
              </div>
            </div>
            <template v-else>
              {{ row[subName] }}
            </template>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import GenericButton from '@generics/GenericButton.vue'
import GenericInput from '@generics/GenericInput.vue'
export default {
  components: {
    GenericButton,
    GenericInput,
  },
  // PROPS
  props: {
    orderList: {
      type: Array,
      default: () => [],
    },
  },

  // DATA
  data() {
    return {
      headData: [],
      bodyData: [],
    }
  },

  // WATCH
  watch: {
    orderList: {
      handler(newVal) {
        this.createTableHeadDataAction(newVal[0])
      },
    },
  },

  // METHODS
  methods: {
    sizeItemSaveOrEditOrCanselOrPlanReqQtyBtnsAction(
      type,
      obj,
      colSubName,
      index
    ) {
      if (type === 'edit') {
        this.$set(this.bodyData[index][colSubName], 'isEdit', true)
      } else if (type === 'cansel') {
        this.$set(this.bodyData[index][colSubName], 'isEdit', false)
      } else if (type === 'save') {
        this.$set(this.bodyData[index][colSubName], 'isEdit', false)
      }
    },

    // Data created action
    createTableHeadDataAction(headObj) {
      this.headData = []
      this.bodyData = []
      for (const key in headObj) {
        const obj = {}
        if (headObj[key]) {
          obj.name = headObj[key]
          obj.subName =
            key === 'productionType' ? 'productProductionTypeName' : key
          this.headData.push(obj)
        }
      }
      const action = {
        name: 'Action',
        subName: 'action',
      }
      this.headData.push(action)
      // ==============================  Body data created
      this.orderList.forEach((obj, i) => {
        if (i !== 0) {
          obj.action = [
            { name: 'Add Kroy Top', type: 'primary', clickType: 'addKroyTop' },
            {
              name: 'Add Kroy Bottom',
              type: 'primary',
              clickType: 'addKroyBottom',
            },
            { name: 'Add', type: 'warning', clickType: 'add' },
            {
              name: 'Add Production Invoice',
              type: 'primary',
              clickType: 'addProductionInvoice',
            },
          ]
          this.bodyData.push(obj)
        }
      })
    },
  },
}
</script>
