<template>
  <div
    class="w-fit border-[1px] border-solid border-[#D9DBDF] flex items-center gap-1 p-2"
  >
    <generic-button name="Connect" type="primary" />
    <div class="flex items-center gap-1">
      <span class="text-[15px]">Baud:</span>
      <generic-look-up
        dwidth="100"
        :defvalue="selectedSelectValue"
        :options-data="selectData"
        :popper-append-to-body="true"
      />
    </div>
    <generic-button name="Clear" />
    <generic-input
      :value="`${baundRate}` || ''"
      width="80"
      height="25"
      pl="10"
      pr="10"
      pt="2"
      pb="2"
      textsize="13"
      type="text"
      :disabled="!isNaN(baundRate) ? false : true"
      placeholder="weighType"
    />
    <generic-input
      width="80"
      height="25"
      pl="10"
      pr="10"
      pt="2"
      pb="2"
      textsize="13"
      type="text"
      placeholder="def.commands"
    />
    <generic-input
      :value="`${selectedSelectValue}` || ''"
      width="80"
      height="25"
      pl="10"
      pr="10"
      pt="2"
      pb="2"
      textsize="13"
      type="text"
      placeholder="baundRate"
      :disabled="!isNaN(selectedSelectValue) ? false : true"
    />
    <generic-input
      width="80"
      height="25"
      pl="10"
      pr="10"
      pt="2"
      pb="2"
      textsize="13"
      type="text"
      placeholder="def.commands"
    />
    <generic-input
      width="80"
      height="25"
      pl="10"
      pr="10"
      pt="2"
      pb="2"
      textsize="13"
      type="text"
      placeholder="leftMargin"
    />
    <generic-input
      width="80"
      height="25"
      pl="10"
      pr="10"
      pt="2"
      pb="2"
      textsize="13"
      type="text"
      placeholder="rightMargin"
    />
    <generic-input
      width="80"
      height="25"
      pl="10"
      pr="10"
      pt="2"
      pb="2"
      textsize="13"
      type="text"
      placeholder="value"
    />
    <generic-input
      width="80"
      height="25"
      pl="10"
      pr="10"
      pt="2"
      pb="2"
      textsize="13"
      type="text"
      placeholder="value"
    />
    <generic-button name="Save params" type="primary" />
  </div>
</template>

<script>
import GenericButton from '@generics/GenericButton.vue'
import GenericInput from '@generics/GenericInput.vue'
import GenericLookUp from '@generics/GenericLookUp.vue'
export default {
  components: {
    GenericButton,
    GenericInput,
    GenericLookUp,
  },

  // PROPS
  props: {
    defaultData: {
      type: Object,
      default: () => {},
    },
  },

  // DATA
  data() {
    return {
      selectData: [
        { id: 110, name: 110 },
        { id: 300, name: 300 },
        { id: 600, name: 600 },
        { id: 1200, name: 1200 },
        { id: 2400, name: 2400 },
        { id: 4800, name: 4800 },
        { id: 9600, name: 9600 },
        { id: 14400, name: 14400 },
        { id: 19200, name: 19200 },
        { id: 38400, name: 38400 },
        { id: 57600, name: 57600 },
        { id: 115200, name: 115200 },
        { id: 128000, name: 128000 },
        { id: 256000, name: 256000 },
      ],
      selectedSelectValue: '',
      baundRate: '',
    }
  },

  // WATCH
  watch: {
    defaultData: {
      handler(newVal) {
        this.selectedSelectValue = newVal?.defaultWeighBaudRate
        this.baundRate = newVal?.defaultWeighType
      },
      deep: true,
    },
  },
}
</script>
GenericLookUp
