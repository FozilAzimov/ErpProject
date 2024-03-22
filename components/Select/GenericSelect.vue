<template>
  <div>
    {{ isDefOptionTitleTwo }}
    <select
      v-model="selectValue"
      :disabled="disabled"
      class="cursor-pointer py-[4px] rounded-[5px] border-[1px] border-[solid] border-[rgba(228,228,228,1)] outline-none focus:bg-gradient-to-b focus:from-transparent focus:via-transparent focus:to-[rgba(228,228,228,0.5)] focus:border-[1px] focus:border-solid focus:border-[rgba(131,137,150,0.5)] duration-[0.4s] focus:shadow-[0_0_5px_rgba(131,137,150,0.5)]"
      :style="{
        fontSize: `${textsize}px`,
        maxWidth: `${maxWidth}px`,
        minWidth: `${minWidth}px`,
        cursor: disabled ? 'not-allowed' : 'pointer',
      }"
      @change="getSelectValue"
    >
      <option v-if="isDefOption" value="" selected>
        {{ isDefOptionTitleTwo ? isDefOptionTitleTwo : isDefOptionTitle }}
      </option>
      <option v-else value="" selected>Please Select</option>
      <template
        v-if="id === 'departments' || id === 'warehouse' || id === 'type'"
      >
        <option v-for="(item, index) in data" :key="index" :value="item.id">
          {{ item.name }}
        </option>
      </template>
      <template v-else-if="id === 'companies' || id === 'p_o_creator'">
        <option
          v-for="(item, index) in data"
          :key="index"
          :value="item.code.value"
        >
          {{ item.name.value }}
        </option>
      </template>
      <template v-else-if="id === 'title.colorVariant.sub'">
        <option
          v-for="(item, index) in data"
          :key="index"
          :value="item.id.value"
        >
          {{ item.name.value }}
        </option>
      </template>
      <template v-else>
        <option v-for="(item, index) in data" :key="index" :value="item.name">
          {{ item.value }}
        </option>
      </template>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      default: '',
    },
    formDataId: {
      type: String,
      default: '',
    },
    data: {
      type: Array,
      default: () => [],
    },
    textsize: {
      type: String,
      default: '',
    },
    isDefOption: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    isDefOptionTitle: {
      type: String,
      default: '',
    },
    isDefOptionTitleTwo: {
      type: Number,
      default: null,
    },
    maxWidth: {
      type: Number,
      default: 220,
    },
    minWidth: {
      type: Number,
      default: 150,
    },
    index: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      selectValue: '',
    }
  },
  methods: {
    getSelectValue() {
      this.$emit(
        'change',
        this.selectValue,
        this.formDataId,
        this.isDefOptionTitle,
        this.index
      )
    },
  },
}
</script>
