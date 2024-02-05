<template>
  <el-select
    v-model="value"
    filterable
    size="mini"
    no-match-text="no data"
    :placeholder="placeholder"
    class="w-full"
    :class="
      isrequired
        ? 'border-[1px] border-[solid] border-[red] rounded-[5px]'
        : 'border-none'
    "
    @change="getSelectValue"
  >
    <el-option
      v-for="(item, index) in data"
      :key="index"
      :label="item.value"
      :value="item.name"
    >
    </el-option>
  </el-select>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    placeholder: {
      type: String,
      default: '',
    },
    isrequired: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      key: '',
      value: '',
    }
  },

  methods: {
    getSelectValue() {
      // eslint-disable-next-line array-callback-return
      const obj = this.data.find((value) => {
        if (value.name === this.value) return value
      })
      this.$emit('customLookupValue', this.value, obj?.id)
    },
  },
}
</script>
