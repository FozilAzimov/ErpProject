<template>
  <el-transfer
    v-model="value"
    filterable
    :filter-method="filterMethod"
    filter-placeholder="Search..."
    :data="data"
    :titles="['Source', 'Target']"
  >
  </el-transfer>
</template>

<script>
export default {
  data() {
    const generateData = () => {
      const data = []
      const states = [
        'California',
        'Illinois',
        'Maryland',
        'Texas',
        'Florida',
        'Colorado',
        'Connecticut ',
      ]
      const initials = [
        'California',
        'Illinois',
        'Maryland',
        'Texas',
        'Florida',
        'Colorado',
        'Connecticut ',
      ]
      states.forEach((city, index) => {
        data.push({
          label: city,
          key: index,
          initial: initials[index],
        })
      })
      return data
    }
    return {
      data: generateData(),
      value: [],
      filterMethod(query, item) {
        return item.initial.toLowerCase().includes(query.toLowerCase())
      },
    }
  },
}
</script>
