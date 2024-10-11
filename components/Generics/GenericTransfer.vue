<template>
  <div>
    <el-transfer
      v-model="rightValue"
      filterable
      :filter-method="filterMethod"
      filter-placeholder="Search..."
      :data="transferData"
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
      transferData: [],
      right_ID_data: [],
      filterMethod(query, item) {
        return item?.initial?.name
          ?.toLowerCase()
          ?.includes(query?.toLowerCase())
      },
    }
  },

  computed: {
    rightValue() {
      return this.right_ID_data
    },
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
    // Left data action
    generateData(propData) {
      propData.forEach(({ id, name }, index) => {
        this.transferData.push({
          label: name,
          key: id,
          initial: propData[index],
        })
      })
    },

    // Right data action
    filteredAction(propData) {
      const rightID = []
      propData.forEach(({ id }) => {
        rightID.push(id)
      })
      this.right_ID_data = rightID
    },

    // Ref function
    refTransferAction() {
      this.$emit('customFunction', this.leftData, this.right_ID_data)
    },
  },
}
</script>
