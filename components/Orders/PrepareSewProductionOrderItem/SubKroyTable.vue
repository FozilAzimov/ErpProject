<template>
  <div>
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
                v-if="obj?.type === 'btn'"
                class="flex items-center justify-center gap-3"
              >
                {{ obj.name }}
                <generic-button
                  circle
                  type="primary"
                  icon-name-attribute="circle-plus"
                  @click="addTableBodyDataAction"
                />
              </div>
              <template v-else>
                {{ obj.name }}
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
                {{ index + 1 }}
              </template>
              <template v-else-if="obj?.type === 'select'">
                <generic-look-up
                  :defvalue="`${
                    tableLookUpAndInputData?.[index]?.[
                      `${index + 1}${obj.subName}`
                    ] ?? ''
                  }`"
                  dwidth="150"
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
                  :value="`${
                    tableLookUpAndInputData?.[index]?.[
                      `${index + 1}${obj.subName}`
                    ] ?? ''
                  }`"
                  :order="index"
                  width="100"
                  :type="obj.type"
                  :name="obj.subName"
                  :clearable="false"
                  @customFunction="setLookUpAndInputValueAction"
                />
              </template>
              <generic-check-box
                v-else-if="obj?.type === 'checkbox'"
                :default-value="
                  tableLookUpAndInputData?.[index]?.[
                    `${index + 1}${obj.subName}`
                  ] ?? false
                "
                :name="obj.subName"
                :order="index"
                @customFunction="setLookUpAndInputValueAction"
              />
              <div
                v-else-if="obj?.type === 'btn'"
                class="flex items-center justify-center gap-1"
              >
                <generic-button
                  circle
                  type="danger"
                  icon-name-attribute="delete"
                  @click="rowDeleteAction(index)"
                />
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
  },

  // DATA
  data() {
    return {
      tableHeadData: [],
      tableBodyData: [],
      tableLookUpAndInputData: [],
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
  },

  // METHODS
  methods: {
    setLookUpAndInputValueAction(name, value, index) {
      console.log(name, value, index)
    },

    // Add Row Data
    addTableBodyDataAction() {
      this.tableBodyData.push(this.tableHeadData)
    },

    rowDeleteAction(i) {
      this.tableBodyData = this.tableBodyData.filter((arr, inx) => i !== inx)
    },
  },
}
</script>
