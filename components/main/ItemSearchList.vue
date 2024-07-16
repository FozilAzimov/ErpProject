<template>
  <div>
    <table class="w-full text-[13px] mt-2">
      <tbody>
        <tr
          v-for="(row, index) in groupedItems"
          :key="index"
          class="bg-[rgba(239,243,249,0.7)] hover:bg-gradient-to-b hover:from-transparent hover:via-transparent hover:to-[rgba(220,229,243,0.7)]"
        >
          <div v-for="(item, itemIndex) in row" :key="itemIndex">
            <td
              class="w-[15%] border-[1px] border-[solid] border-[#778899] p-[2px]"
            >
              {{ item.text }}
            </td>
            <td
              class="w-[15%] border-[1px] border-[solid] border-[#778899] p-[2px]"
            >
              <template v-if="item?.type === 'input'">
                <GenericInput :value="itemSearchList[item?.name]" />
              </template>
              <template v-else-if="item?.type === 'date'">
                <GenericInputDatePage
                  id="from"
                  :value="itemSearchList[item?.name]"
                  width="165"
                  height="30"
                  pl="10"
                  pr="10"
                  pt="1"
                  pb="1"
                  textsize="13"
                  type="datetime-local"
                  valuecolor="rgba(0,0,0,0.7)"
                  @change="getSelectValue"
                />
              </template>
              <template v-else-if="item?.type === 'label'">
                <GenericInput :value="itemSearchList[item?.name]" />
              </template>
              <template v-else-if="item?.type === 'list'">
                <LookUp :defvalue="itemSearchList[item?.name]?.text" />
              </template>
              <template v-else-if="item?.type === 'button'">
                <GenericButton :value="itemSearchList[item?.name]" />
              </template>
            </td>
          </div>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import GenericButton from '@components/Button/GenericButton.vue'
import GenericInput from '@components/Input/GenericInput.vue'
import GenericInputDatePage from '@components/InputDate/GenericInputDatePage.vue'
import LookUp from '@generics/LookUp.vue'
export default {
  components: {
    GenericInput,
    GenericButton,
    LookUp,
    GenericInputDatePage,
  },

  // PROPS
  props: {
    itemSearchList: {
      type: Object,
      default: () => ({}),
    },
    staticList: {
      type: Array,
      default: () => [],
    },
  },

  // DATA
  data() {
    return {
      itemsList: this.staticList,
      columns: 2,
    }
  },

  // COMPUTED
  computed: {
    groupedItems() {
      const result = []
      for (let i = 0; i < this.itemsList.length; i += this.columns) {
        result.push(this.itemsList.slice(i, i + this.columns))
      }
      return result
    },
  },
}
</script>
