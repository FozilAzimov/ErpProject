<template>
  <div
    class="flex items-start overflow-scroll relative z-0 bg-white border-[1px] border-solid border-[rgba(119,136,153,0.3)]"
    :style="`max-height:${height}px`"
    style="min-height: 165px"
  >
    <table class="w-full border-[1px] border-solid border-[#F0F0F0]">
      <!-- HEAD -->
      <thead class="sticky top-[-1px] z-[1000]">
        <tr class="bg-[rgb(229,235,245)]">
          <th
            class="text-[13px] font-semibold border-[1px] border-solid border-[rgba(119,136,153,0.3)] p-4 cursor-pointer whitespace-nowrap"
          >
            №
          </th>
          <th
            v-for="(headName, key) in filteredTableHead"
            :key="key"
            class="text-[13px] font-semibold border-[1px] border-solid border-[rgba(119,136,153,0.3)] p-4 cursor-pointer whitespace-nowrap"
            :class="headName.width ? `w-[${headName.width}px]` : ''"
          >
            <div v-if="!('editableElement' in headName)">
              <span>{{ headName?.headerText }}</span>
              <div
                class="w-full h-[20px] bg-[rgb(97,221,180)] mt-1 text-[12px] font-light"
              >
                {{ totalQTY && totalQTY.toFixed(2) }}
              </div>
            </div>
            <template v-else>
              {{ headName?.headerText }}
            </template>
          </th>
        </tr>
        <!-- Filter  input -->
        <tr class="bg-[#fff]">
          <th
            class="border-[1px] text-[12px] p-[1px_3px] text-center font-normal"
          >
            <GenericInput width="50" name="index" @customFunction="''" />
          </th>
          <th
            v-for="(key, inx) in filteredTableHead"
            :key="inx"
            class="border-[1px] text-[12px] p-[1px_3px] text-center font-normal"
          >
            <GenericInput width="150" :name="key.name" @customFunction="''" />
          </th>
        </tr>
        <!-- Filter input -->
      </thead>
      <!-- HEAD -->

      <!-- BODY -->
      <tbody>
        <template v-if="bodyData?.length">
          <tr
            v-for="(row, index) in bodyData"
            :key="index"
            class="bg-gradient-to-b from-transparent via-transparent to-[#F4F4F4]"
          >
            <td class="border-[1px] text-[12px] p-2 text-center">
              {{ index + 1 }}
            </td>
            <td
              v-for="(obj, innerIndex) in filteredTableHead"
              :key="innerIndex"
              class="border-[1px] text-[12px] p-2"
            >
              <generic-input
                v-if="!('editableElement' in obj)"
                width="150"
                :name="obj?.name"
                type="number"
                :order="index"
                @customFunctionRegEx="setInputValueAction"
              />
              <template v-else-if="typeof row?.[obj.name] === 'object'">{{
                row?.[obj.name]?.text
              }}</template>
              <template v-else-if="typeof row?.[obj.name] !== 'object'">
                <span
                  v-if="
                    typeof row?.[obj?.name] === 'string' &&
                    row?.[obj?.name]?.includes('style')
                  "
                  v-html="row?.[obj?.name]"
                ></span>
                <template v-else>
                  {{ row?.[obj?.name] }}
                </template>
              </template>
            </td>
          </tr>
        </template>

        <tr
          v-else
          class="bg-gradient-to-b from-transparent via-transparent to-[#F4F4F4]"
        >
          <td
            :colspan="tableHeadDataLength"
            class="border-[1px] border-solid border-[#F0F0F0] text-[12px] p-3"
          >
            <div class="flex justify-start">
              <el-empty
                :image-size="60"
                description="No Data"
                style="padding: 0"
              >
                <template #description>
                  <p style="font-size: 13px; margin-top: -10px">No Data</p>
                </template>
              </el-empty>
            </div>
          </td>
        </tr>
      </tbody>
      <!-- BODY -->
    </table>
  </div>
</template>

<script>
import GenericInput from '@generics/GenericInput.vue'

export default {
  // COMPONENTS
  components: {
    GenericInput,
  },

  // PROPS
  props: {
    tableHeadData: {
      type: Array,
      default: () => [],
    },
    tableBodyData: {
      type: Array,
      default: () => [],
    },
    tableHeadDataLength: {
      type: Number,
      default: 0,
    },
    height: {
      type: Number,
      default: 0,
    },
  },

  // DATA
  data() {
    return {
      allSelectAndInputValue: {},
      totalQTY: null,
    }
  },

  // COMPUTED
  computed: {
    // table HEAD
    filteredTableHead() {
      return this.tableHeadData.filter((headName) => headName.showUI)
    },
    // table BODY
    bodyData() {
      return this.tableBodyData
    },
    // QTY in newBodyData
    newBodyData() {
      return this.bodyData.filter((obj) => parseFloat(obj?.qty))
    },
  },

  // METHODS
  methods: {
    // set QTY value
    setInputValueAction(name, value, rowIndex) {
      if (!this.bodyData[rowIndex]) this.$set(this.bodyData, rowIndex, {})
      this.$set(this.bodyData[rowIndex], name, value)
      // function
      this.totalQtyAction()
      // Emit action
      this.$emit('emitCustomFunc', this.newBodyData)
    },

    // total qty
    totalQtyAction() {
      this.totalQTY = this.newBodyData.reduce((summ, curr) => {
        return summ + (parseFloat(curr?.qty) || 0)
      }, 0)
    },
  },
}
</script>
