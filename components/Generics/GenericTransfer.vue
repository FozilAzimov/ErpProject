<template>
  <div>
    <el-transfer
      v-model="right_ID_data"
      filterable
      :filter-method="filterMethod"
      filter-placeholder="Search..."
      :data="data"
      :titles="['Source', 'Target']"
    >
    </el-transfer>
  </div>
</template>

<script>
export default {
  // PROPS
  props: {
    leftData: {
      type: Array,
      default: () => [],
    },
    rightData: {
      type: Array,
      default: () => [],
    },
  },

  // DATA
  data() {
    return {
      data: [],
      right_ID_data: [],
      filterMethod(query, item) {
        return item?.initial?.name
          ?.toLowerCase()
          ?.includes(query?.toLowerCase())
      },
    }
  },

  // WATCH
  watch: {
    leftData: {
      handler(newVal) {
        this.generateData(newVal)
      },
      deep: true,
    },
    rightData: {
      handler(newVal) {
        this.filteredAction(newVal)
      },
      deep: true,
    },
  },

  // METHODS
  methods: {
    generateData(propData) {
      propData.forEach(({ id, name }, index) => {
        this.data.push({
          label: name,
          key: id,
          initial: propData[index],
        })
      })
    },

    // Ref function
    refTransferAction() {
      this.$emit('customFunction', this.leftData, this.right_ID_data)
    },

    filteredAction(propData) {
      const rightID = []
      propData.forEach(({ id }) => {
        rightID.push(id)
      })
      this.right_ID_data = rightID
    },
  },
}
</script>
