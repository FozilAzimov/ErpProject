<template>
  <div
    class="w-fit border-[1px] border-solid border-[#D9DBDF] flex items-center gap-1 p-2"
  >
    <generic-button name="Connect" type="primary" />
    <div class="flex items-center gap-1">
      <span class="text-[15px]">Baud:</span>
      <generic-select
        textsize="13"
        :max-width="80"
        :min-width="50"
        :is-def-option="true"
        is-def-option-title=""
      />
    </div>
    <generic-button name="Clear" />
    <generic-input
      width="80"
      height="25"
      pl="10"
      pr="10"
      pt="2"
      pb="2"
      textsize="13"
      type="text"
      :disabled="true"
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
      value=""
      width="80"
      height="25"
      pl="10"
      pr="10"
      pt="2"
      pb="2"
      textsize="13"
      type="text"
      :disabled="true"
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
import GenericButton from '@components/Generics/GenericButton.vue'
import GenericInput from '@components/Input/GenericInput.vue'
import GenericSelect from '@components/Select/GenericSelect.vue'
export default {
  components: {
    GenericButton,
    GenericInput,
    GenericSelect,
  },
}
</script>
