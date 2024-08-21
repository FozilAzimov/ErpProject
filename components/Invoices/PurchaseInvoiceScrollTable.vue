<template>
  <table class="w-full border-[1px] border-solid border-[#F0F0F0]">
    <thead class="bg-[rgb(229,235,245)] sticky top-[-1px]">
      <th
        class="text-[13px] font-semibold border-[1px] border-solid border-[rgba(119,136,153,0.3)] p-4 cursor-pointer whitespace-nowrap"
      >
        ID
      </th>
      <th
        class="text-[13px] font-semibold border-[1px] border-solid border-[rgba(119,136,153,0.3)] p-4 cursor-pointer whitespace-nowrap"
      >
        Action
      </th>
      <th
        class="text-[13px] font-semibold border-[1px] border-solid border-[rgba(119,136,153,0.3)] p-4 cursor-pointer whitespace-nowrap"
      >
        Action
      </th>
      <th
        class="text-[13px] font-semibold border-[1px] border-solid border-[rgba(119,136,153,0.3)] p-4 cursor-pointer whitespace-nowrap"
      >
        Action
      </th>
      <th
        class="text-[13px] font-semibold border-[1px] border-solid border-[rgba(119,136,153,0.3)] p-4 cursor-pointer whitespace-nowrap"
      >
        Action
      </th>
      <th
        class="text-[13px] font-semibold border-[1px] border-solid border-[rgba(119,136,153,0.3)] p-4 cursor-pointer whitespace-nowrap"
      >
        Action
      </th>
      <th
        class="text-[13px] font-semibold border-[1px] border-solid border-[rgba(119,136,153,0.3)] p-4 cursor-pointer whitespace-nowrap"
      >
        Action
      </th>
      <th
        class="text-[13px] font-semibold border-[1px] border-solid border-[rgba(119,136,153,0.3)] p-4 cursor-pointer whitespace-nowrap"
      >
        Action
      </th>
      <th
        class="text-[13px] font-semibold border-[1px] border-solid border-[rgba(119,136,153,0.3)] p-4 cursor-pointer whitespace-nowrap"
      >
        Action
      </th>
      <th
        class="text-[13px] font-semibold border-[1px] border-solid border-[rgba(119,136,153,0.3)] p-4 cursor-pointer whitespace-nowrap"
      >
        Action
      </th>
      <th
        class="text-[13px] font-semibold border-[1px] border-solid border-[rgba(119,136,153,0.3)] p-4 cursor-pointer whitespace-nowrap"
      >
        Action
      </th>
    </thead>
    <tbody>
      <tr
        v-for="(row, indexOne) in bodyData"
        :key="indexOne"
        class="bg-gradient-to-b from-transparent via-transparent to-[#F4F4F4]"
      >
        <td class="border-[1px] text-[12px] p-2">
          {{ indexOne + 1 }}
        </td>
        <td
          v-for="(element, indexTwo) in row"
          :key="indexTwo"
          class="border-[1px] text-[12px] p-2"
        >
          {{ element }}
        </td>
      </tr>
    </tbody>
    <tfoot>
      <tr
        class="bg-gradient-to-b from-transparent via-transparent to-[#F4F4F4]"
      >
        <td class="border-[1px] text-[12px] p-2">
          {{ bodyData?.index ? bodyData?.index + 1 : 1 }}
        </td>
        <td class="border-[1px] text-[12px] p-2">
          <generic-input-date-page
            ref="date"
            width="100"
            widthtype="%"
            height="30"
            pl="10"
            pr="10"
            pt="1"
            pb="1"
            textsize="13"
            name="date"
            type="datetime-local"
            valuecolor="rgba(0,0,0,0.7)"
            :value="allLookUpAndInputValues?.date || ''"
            @customFunction="setLookUpAndInputValueAction"
          />
        </td>
        <td class="border-[1px] text-[12px] p-2">
          <generic-look-up
            dwidth="100"
            widthtype="%"
            durl="findAllCompany"
            name="bir"
            :defvalue="allLookUpAndInputValues?.bir || ''"
            @customFunction="setLookUpAndInputValueAction"
          />
        </td>
        <td class="border-[1px] text-[12px] p-2">
          <generic-look-up
            dwidth="100"
            widthtype="%"
            durl="searchProductList"
            name="ikki"
            :defvalue="allLookUpAndInputValues?.ikki || ''"
            @customFunction="setLookUpAndInputValueAction"
          />
        </td>
        <td class="border-[1px] text-[12px] p-2">
          <generic-look-up
            dwidth="100"
            widthtype="%"
            durl="findAllEmployee"
            name="uch"
            :defvalue="allLookUpAndInputValues?.uch || ''"
            @customFunction="setLookUpAndInputValueAction"
          />
        </td>
        <td class="border-[1px] text-[12px] p-2">
          <generic-look-up
            dwidth="100"
            widthtype="%"
            durl="findAllCompanyForInvoice"
            name="tort"
            :defvalue="allLookUpAndInputValues?.tort || ''"
            @customFunction="setLookUpAndInputValueAction"
          />
        </td>
        <td class="border-[1px] text-[12px] p-2">
          <generic-input
            type="number"
            width="100"
            widthtype="%"
            name="besh"
            :value="allLookUpAndInputValues?.besh || ''"
            @customFunction="setLookUpAndInputValueAction"
          />
        </td>
        <td class="border-[1px] text-[12px] p-2">
          <generic-input
            type="number"
            width="100"
            widthtype="%"
            name="olti"
            :value="allLookUpAndInputValues?.olti || ''"
            @customFunction="setLookUpAndInputValueAction"
          />
        </td>
        <td class="border-[1px] text-[12px] p-2">
          <generic-input
            type="number"
            width="100"
            widthtype="%"
            name="yetti"
            :value="allLookUpAndInputValues?.yetti || ''"
            @customFunction="setLookUpAndInputValueAction"
          />
        </td>
        <td class="border-[1px] text-[12px] p-2">
          <generic-input
            type="text"
            width="100"
            widthtype="%"
            name="sakkiz"
            :value="allLookUpAndInputValues?.sakkiz || ''"
            @customFunction="setLookUpAndInputValueAction"
          />
        </td>
        <td class="border-[1px] text-[12px] p-2">
          <generic-input
            type="number"
            width="100"
            widthtype="%"
            name="toqqiz"
            :value="allLookUpAndInputValues?.toqqiz || ''"
            @enter="setRowDataToBody"
            @customFunction="setLookUpAndInputValueAction"
          />
        </td>
      </tr>
    </tfoot>
  </table>
</template>

<script>
import GenericInputDatePage from '@components/InputDate/GenericInputDatePage.vue'
import GenericLookUp from '@generics/GenericLookUp.vue'
import GenericInput from '@generics/GenericInput.vue'
export default {
  components: {
    GenericInputDatePage,
    GenericLookUp,
    GenericInput,
  },

  // DATA
  data() {
    return {
      bodyData: [],
      allLookUpAndInputValues: {},
    }
  },

  // METHODS
  methods: {
    // LookUp and Input values
    setLookUpAndInputValueAction(name, value) {
      this.$set(this.allLookUpAndInputValues, name, value)
    },

    // last input enter action
    setRowDataToBody() {
      this.bodyData.push(this.allLookUpAndInputValues)
      this.allLookUpAndInputValues = {}
      this.$refs.date?.focusCustomFunction()
    },
  },
}
</script>
