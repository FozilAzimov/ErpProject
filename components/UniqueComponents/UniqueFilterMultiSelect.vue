<template>
    <div>
        <el-select 
            v-model="value" 
            multiple
            filterable
            default-first-option
            size="mini"
            placeholder="Multi Select"
            no-data-text="No data"
            @change="handleOptionChange"
        >
            <el-option
                v-for="(item, idx) in options"
                :key="idx"
                :label="item.name ? item.name : item"
                :value="item.code ? item.code : item.id ? item.id : item"
            >
            </el-option>
        </el-select>
    </div>
</template>
<script>
export default {
    props:{
        defaultOptions: {
            type: Array,
            default: ()=>[]
        },
        defaultValue: {
            type: Array,
            default: ()=>[]
        }
    },
    data(){
        return{
            options: this.defaultOptions,
            value: this.defaultValue
        }
    },
    watch:{
        defaultValue(newValue){
            this.value = newValue
        },
        defaultOptions(newValue){
            this.options = newValue
        }
    },
    methods:{
        handleSelect(){
            this.options = this.defaultOptions
        },
        handleOptionChange(){
            if(this.value){
                this.$emit('newValue', this.value)
            }
        }
    }
}
</script>