<template>
  <div :class="margin ? 'm-2' : 'm-0'">
    <el-button
      v-if="circle"
      :size="btnSize"
      :type="type"
      :disabled="disabled"
      :plain="plain"
      :circle="circle"
      :icon="`el-icon-${iconNameAttribute}`"
      @click="clickAction"
    ></el-button>
    <el-button
      v-else-if="iconNameAttribute"
      :size="btnSize"
      :type="type"
      :disabled="disabled"
      :round="rounded"
      :plain="plain"
      :icon="`el-icon-${iconNameAttribute}`"
      @click="clickAction"
      >{{ name }}
      <i v-if="isIcon" :class="`el-icon-${iconNameClass} el-icon-right`"></i
    ></el-button>
    <el-button
      v-else
      :size="btnSize"
      :type="type"
      :disabled="disabled"
      :round="rounded"
      :plain="plain"
      @click="clickAction"
      >{{ name }}
      <i v-if="isIcon" :class="`el-icon-${iconNameClass} el-icon-right`"></i
    ></el-button>
  </div>
</template>

<script>
export default {
  // PROPS
  props: {
    name: {
      type: String,
      default: 'Default',
    },
    type: {
      type: String,
      default: '',
    },
    btnSize: {
      type: String,
      default: 'mini',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    rounded: {
      type: Boolean,
      default: false,
    },
    plain: {
      type: Boolean,
      default: false,
    },
    circle: {
      type: Boolean,
      default: false,
    },
    iconNameAttribute: {
      type: String,
      default: '',
    },
    iconNameClass: {
      type: String,
      default: '',
    },
    isIcon: {
      type: Boolean,
      default: false,
    },
    margin: {
      type: Boolean,
      default: false,
    },
    slotName: {
      type: String,
      default: '',
    },
  },

  // METHODS
  methods: {
    clickAction() {
      this.$emit('click')
    },
  },
}
</script>
