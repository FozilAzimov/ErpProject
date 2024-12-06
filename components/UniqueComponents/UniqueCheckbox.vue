<template>
    <div>
      <el-checkbox v-model="inputValue" :disabled="defDisabled" :checked="defChecked" @change="handleInput">{{ defLabel }}</el-checkbox>
      {{ inputValue }}
    </div>
  </template>
  
  <script>
  export default {
    props: {
      defLabel:{
        type: String,
        default: ''
      },
      defValue: {
        type: Boolean,
        default: false
      },
      defDisabled:{
        type: Boolean,
        default: false
      },
      defChecked:{
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        inputValue: this.defValue
      }
    },
    watch: {
      defValue(newValue) {
        this.inputValue = newValue;
        console.log(this.inputValue, 'this.inputValue')
        this.$emit('newValue', this.inputValue);
      }
    },
    mounted(){
      if(this.inputValue){
        console.log('initial data render for checkbox')
        this.handleInput()
      }
    },
    methods: {
      handleInput(value) {
        console.log(this.inputValue, 'this.inputValue________this.inputValue')
        this.$emit('newValue', this.inputValue);
      }
    }
  };
  </script>
<style>
    
</style>