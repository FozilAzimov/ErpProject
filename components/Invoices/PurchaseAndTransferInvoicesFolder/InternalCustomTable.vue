<template>
  <table class="w-fit border-[1px] border-solid border-[#F0F0F0]">
    <thead
      v-if="topHeadName"
      class="bg-[rgb(33,95,135,0.9)] sticky top-[-1px] text-center text-[#fff]"
    >
      <th
        :colspan="headData.length"
        class="text-[12px] font-semibold border-[1px] border-solid border-[rgba(119,136,153,0.3)] py-2 px-6 cursor-pointer whitespace-nowrap"
      >
        {{ topHeadName }}
      </th>
    </thead>
    <thead
      class="bg-[rgb(33,95,135,0.9)] sticky top-[-1px] text-center text-[#fff]"
    >
      <th
        v-for="(name, index) in headData"
        :key="index"
        class="text-[12px] font-semibold border-[1px] border-solid border-[rgba(119,136,153,0.3)] py-2 px-6 cursor-pointer whitespace-nowrap"
      >
        {{ name }}
      </th>
    </thead>
    <tbody>
      <template v-if="type === 'subTable'">
        <tr
          v-for="(row, index) in bodyData"
          :key="index"
          class="bg-gradient-to-b from-transparent via-transparent to-[#F4F4F4] text-center"
        >
          <td
            v-if="headData?.includes('№')"
            class="border-[1px] text-[12px] p-2"
          >
            {{ index + 1 }}
          </td>
          <td
            v-for="(element, inx) in row"
            :key="inx"
            class="border-[1px] text-[12px] px-1"
          >
            <template v-if="element?.type === 'date'">
              <generic-input-date-page
                :width="element?.width"
                :widthtype="element?.widthtype"
                height="28"
                pl="10"
                pr="10"
                textsize="12"
                :name="element?.subName"
                type="datetime-local"
                valuecolor="rgba(0,0,0,0.7)"
              />
            </template>
            <template v-else-if="element?.type === 'select'">
              <generic-look-up
                :dwidth="element?.width"
                :widthtype="element?.widthtype"
                :name="element?.subName"
                :durl="element?.url"
                :options-data="[]"
              />
            </template>
            <template v-else-if="element?.type === 'number'">
              <generic-input
                type="number"
                :name="element?.subName"
                :width="element?.width"
                :widthtype="element?.widthtype"
              />
            </template>
            <template v-else-if="element?.type === 'text'">
              <generic-input
                type="text"
                :name="element?.subName"
                :width="element?.width"
                :widthtype="element?.widthtype"
              />
            </template>
            <div
              v-else-if="element?.type === 'btn'"
              class="flex items-center gap-1"
            >
              <generic-button
                v-for="(elem, i) in element?.data"
                :key="i"
                :name="elem?.name"
                :type="elem?.type"
                :disabled="elem?.disabled"
                :icon-name-attribute="elem?.iconName"
                @click="allBtnAction(elem?.btnClickType)"
              />
            </div>
          </td>
        </tr>
      </template>
      <template v-else>
        <tr
          class="bg-gradient-to-b from-transparent via-transparent to-[#F4F4F4] text-center"
        >
          <td
            v-for="(element, index) in bodyData"
            :key="index"
            class="border-[1px] text-[12px] p-2"
          >
            <template v-if="element?.type === 'date'">
              <generic-input-date-page
                :width="element?.width"
                height="28"
                pl="10"
                pr="10"
                textsize="12"
                :name="element?.subName"
                type="datetime-local"
                valuecolor="rgba(0,0,0,0.7)"
              />
            </template>
            <template v-else-if="element?.type === 'select'">
              <generic-look-up
                :dwidth="element?.width"
                :name="element?.subName"
                :durl="element?.url"
                :options-data="[]"
              />
            </template>
            <template v-else-if="element?.type === 'number'">
              <generic-input
                type="number"
                :name="element?.subName"
                :width="element?.width"
              />
            </template>
            <div
              v-else-if="element?.type === 'btn'"
              class="flex items-center gap-1"
            >
              <generic-button
                v-for="(elem, inx) in element?.data"
                :key="inx"
                :name="elem?.name"
                :type="elem?.type"
                :disabled="elem?.disabled"
                :icon-name-attribute="elem?.iconName"
                @click="allBtnAction(elem?.btnClickType)"
              />
            </div>
          </td>
        </tr>
      </template>
    </tbody>
  </table>
</template>

<script>
import GenericInputDatePage from '@components/InputDate/GenericInputDatePage.vue'
import GenericLookUp from '@generics/GenericLookUp.vue'
import GenericButton from '@generics/GenericButton.vue'
import GenericInput from '@generics/GenericInput.vue'
export default {
  // COMPONENTS
  components: {
    GenericInputDatePage,
    GenericLookUp,
    GenericButton,
    GenericInput,
  },

  // PROPS
  props: {
    type: {
      type: String,
      default: '',
    },
    topHeadName: {
      type: String,
      default: '',
    },
    headData: {
      type: Array,
      default: () => [],
    },
    bodyData: {
      type: Array,
      default: () => [],
    },
  },

  // METHODS
  methods: {
    allBtnAction(btnType) {
      if (btnType === 'create_item') {
        this.$emit('additionTableDataAction')
      }
    },
  },
}
</script>
