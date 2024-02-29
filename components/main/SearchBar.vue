<template>
  <div v-if="selectList" class="flex gap-4 flex-wrap">
    <div v-for="(item, index) in titleList" :key="index">
      <div class="flex items-center gap-1">
        <label
          v-if="!vithoutTitle"
          :for="`bill${index}`"
          class="text-[13px] text-[] cursor-pointer"
          >{{ item.title }}</label
        >
        <GenericSelect
          :id="item.name"
          v-model="formData.from"
          :form-data-id="item.id"
          :data="selectList[item.name]"
          :is-def-option="vithoutTitle"
          :is-def-option-title="item.title"
          textsize="13"
          @change="getSelectValue"
        />
      </div>
    </div>
  </div>
</template>

<script>
import GenericSelect from '../Select/GenericSelect.vue'

export default {
  components: {
    GenericSelect,
  },
  props: {
    searchList: {
      type: Array,
      default: () => [],
    },
    titleList: {
      type: Array,
      default: () => [],
    },
    vithoutTitle: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      formData: {
        from: null,
      },
      selectList: [],
      selectedValues: {},
    }
  },
  mounted() {
    this.selectList = this.searchList[0]
  },
  methods: {
    getSelectValue(value, id) {
      this.selectedValues[id] = value
      this.$emit('form-data-values', this.selectedValues)
    },
  },
}
</script>
