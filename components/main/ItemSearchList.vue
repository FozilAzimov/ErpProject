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
                  @change="getSelectValue"
                />
              </template>
              <template v-else-if="item?.type === 'label'">
                <GenericInput :value="itemSearchList[item?.name]" />
              </template>
              <template v-else-if="item?.type === 'list'">
                <generic-look-up :defvalue="itemSearchList[item?.name]?.text" />
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
import GenericInput from '@generics/GenericInput.vue'
import GenericInputDatePage from '@components/InputDate/GenericInputDatePage.vue'
import GenericLookUp from '@generics/GenericLookUp.vue'
export default {
  components: {
    GenericInput,
    GenericButton,
    GenericLookUp,
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
