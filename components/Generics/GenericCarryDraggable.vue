<template>
  <div class="flex items-start gap-7 m-2">
    <!-- lyaut One -->
    <div
      class="w-[250px] h-[400px] p-2 border-[2px] rounded-md overflow-y-auto"
      style="box-shadow: 0 0 10px #000"
    >
      <draggable :list="leftData" group="people" @change="lyautChangeAction">
        <template v-if="leftData?.length">
          <div
            v-for="element in leftData"
            :key="element.name"
            class="bg-white border-[1px] border-solid border-[#BBDCAA] px-3 py-[5px] text-[13px] font-light mb-1 cursor-move"
          >
            {{ element?.headerText || element?.name }}
          </div>
        </template>
        <el-empty
          v-else
          :image-size="60"
          description="No Data"
          style="
            padding: 0;
            width: 100%;
            height: 350px;
            display: flex;
            align-items: center;
            justify-items: center;
          "
        >
          <template #description>
            <p style="font-size: 13px; margin-top: -10px">No Data</p>
          </template>
        </el-empty>
      </draggable>
    </div>
    <!-- lyaut One -->

    <!-- lyaut Two -->
    <div
      class="w-[250px] h-[400px] p-2 border-[2px] rounded-md overflow-y-auto"
      style="box-shadow: 0 0 10px #000"
    >
      <draggable :list="rightData" group="people" @change="lyautChangeAction">
        <template v-if="rightData?.length">
          <div
            v-for="element in rightData"
            :key="element.name"
            class="bg-white border-[1px] border-solid border-[#BBDCAA] px-3 py-[5px] text-[13px] font-light mb-1 cursor-move"
          >
            {{ element?.headerText || element?.name }}
          </div>
        </template>
        <el-empty
          v-else
          :image-size="60"
          description="No Data"
          style="
            padding: 0;
            width: 100%;
            height: 350px;
            display: flex;
            align-items: center;
            justify-items: center;
          "
        >
          <template #description>
            <p style="font-size: 13px; margin-top: -10px">No Data</p>
          </template>
        </el-empty>
      </draggable>
    </div>
    <!-- lyaut Two -->
  </div>
</template>
<script>
import draggable from 'vuedraggable'

export default {
  // draggable uchun
  name: 'TwoLists',
  display: 'Two Lists',
  order: 1,
  // draggable uchun
  // COMPONENTS
  components: {
    draggable,
  },

  // PROPS
  props: {
    lyautOneData: {
      type: Array,
      default: () => [],
    },
    lyautTwoData: {
      type: Array,
      default: () => [],
    },
  },

  // DATA
  data() {
    return {
      leftData: this.lyautOneData,
      rightData: this.lyautTwoData,
    }
  },

  // WATCH
  watch: {
    lyautOneData: {
      handler(newVal) {
        this.leftData = newVal
      },
      deep: true,
    },
    lyautTwoData: {
      handler(newVal) {
        this.rightData = newVal
      },
      deep: true,
    },
  },

  // MOUNTED
  mounted() {
    // function
    this.lyautChangeAction()
  },

  // METHODS
  methods: {
    // Change action
    lyautChangeAction() {
      // Emit Action
      this.$emit('customEmitFunction', this.leftData, this.rightData)
    },
  },
}
</script>
