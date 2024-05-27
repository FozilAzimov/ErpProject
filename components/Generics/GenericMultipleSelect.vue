<template>
  <el-select
    v-model="value1"
    :size="size"
    multiple
    placeholder="Select Some Options"
  >
    <el-option
      v-for="item in optionsData"
      :key="item.id"
      :label="item.name"
      :value="item.id"
    >
    </el-option>
  </el-select>
</template>

<script>
export default {
  props: {
    size: {
      type: String,
      default: '',
    },
    optionsData: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      value1: [],
      value2: [],
    }
  },
}
</script>
