<template>
  <select
    v-model="selectValue"
    :disabled="disabled"
    class="cursor-pointer py-[4px] rounded-[5px] border-[1px] border-solid border-[rgba(119,136,153,0.3)] outline-none focus:bg-gradient-to-b focus:from-transparent focus:via-transparent focus:to-[rgba(228,228,228,0.5)] focus:border-[1px] focus:border-solid focus:border-[rgba(131,137,150,0.5)] duration-[0.4s] focus:shadow-[0_0_5px_rgba(131,137,150,0.5)]"
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
    <option v-else value="" selected>-- Please Select --</option>

    <template
      v-if="
        id === 'personStatus' ||
        id === 'departments' ||
        id === 'company' ||
        id === 'warehouse' ||
        id === 'warehouseRef' ||
        id === 'type'
      "
    >
      <option v-for="(item, inx) in data" :key="`${inx}+key`" :value="item.id">
        {{ item.name }}
      </option>
    </template>

    <template v-else-if="id === 'creator'">
      <option v-for="(item, inx) in data" :key="`${inx}+key`" :value="item.id">
        {{
          `${item?.employee_number} ${item?.fname} ${item?.lname} ${item?.middleName}`
        }}
      </option>
    </template>

    <template v-else-if="id === 'deny' || id === 'pay'">
      <option v-for="(item, index2) in data" :key="index2" :value="item.value">
        {{ item.name }}
      </option>
    </template>

    <template v-else-if="id === 'companies' || id === 'p_o_creator'">
      <option
        v-for="(item, index3) in data"
        :key="index3"
        :value="item.code.value"
      >
        {{ item.name.value }}
      </option>
    </template>

    <template v-else-if="id === 'title.colorVariant.sub'">
      <option
        v-for="(item, index4) in data"
        :key="index4"
        :value="item.id.value"
      >
        {{ item.name.value }}
      </option>
    </template>

    <template v-else>
      <option v-for="(item, index5) in data" :key="index5" :value="item.name">
        {{ item.value }}
      </option>
    </template>
  </select>
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
        this.index,
        this.id
      )
    },
  },
}
</script>
