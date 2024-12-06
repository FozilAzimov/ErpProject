<template>
    <div>
        <el-input
            class="uniqueInputElement"
            size="mini"
            :placeholder="inputPlaceholder"
            :disabled="disabledStatus"
            v-model="inputValue"
            :type="inputType"
            @input="handleInput"
            @keydown.native.enter="handleEnterKey"
        >
        </el-input>
    </div>
</template>
<script>
export default {
    props:{
        defType: {
            type: String,
            default: 'text'
        },
        defValue: {
            type: [String, Number],
            default: ''
        },
        disabledStatus:{
            type: Boolean,
            default: false
        },
        defPlaceholder:{
            type: String,
            default: ''
        }
    },
    data() {
        return {
            inputType: this.defType,
            inputValue: this.defValue,
            inputPlaceholder: this.defPlaceholder,
        }
    },
    watch: {
        defValue(newValue){
            this.inputValue = newValue
        }
    },
    mounted() {
        if(this.inputValue){
            this.handleInput(this.inputValue)
        }
    },
    methods:{
        handleInput(value){
            const inputValue = value
            this.$emit('newValue', inputValue)
        },
        handleEnterKey(){
            this.$emit('enter')
        }
    },
}
</script>
<style scoped></style>