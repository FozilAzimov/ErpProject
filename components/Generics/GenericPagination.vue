<template>
  <div class="w-full flex items-center justify-center gap-3">
    <div class="flex items-center gap-2">
      <span class="text-[13px] flex items-center gap-1 text-nowrap"
        >Page: <span class="font-semibold">{{ pageCurrent }}</span></span
      >
      <span class="text-[13px] flex items-center gap-1 text-nowrap"
        >Total: <span class="font-semibold">{{ total }}</span></span
      >
    </div>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total * 10"
      :current-page.sync="pageCurrent"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
    <div class="flex items-center gap-1">
      <span class="text-[13px] text-nowrap">Go to</span>
      <generic-input
        :value="`${pageCurrent}`"
        width="60"
        type="number"
        name=""
        @enter="handleCurrentChange"
      />
    </div>
  </div>
</template>
<script>
import GenericInput from '@generics/GenericInput.vue'
export default {
  // COMPONENTS
  components: { GenericInput },

  // PROPS
  props: {
    total: {
      type: Number,
      default: 0,
    },
  },

  // DATA
  data() {
    return {
      pageCurrent: 1,
    }
  },

  // METHODS
  methods: {
    handleCurrentChange(val) {
      if (val) this.pageCurrent = parseFloat(val)
      else this.pageCurrent = 1
    },
  },
}
</script>
