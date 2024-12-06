<template>
    <div>
        <el-select 
            v-model="value" 
            multiple
            filterable
            remote
            default-first-option
            size="mini"
            placeholder="Multi Select"
            no-data-text="No data"
            :filter-method="handleSelect"
            @visible-change="handleSelect('')"
            @change="handleOptionChange"
        >
            <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.name"
                :value="item.id">
            </el-option>
        </el-select>
    </div>
</template>

<script>
export default{
    props:{
        customParameter:{
            type: Object,
            default: ()=>{}
        },
        customUrl: {
            type: String,
            default: ''
        },
        // defValue should be array here
        defValue:{
            type: Array,
            default: ()=>([])
        },
        defaultOptions:{
            type: Array,
            default: ()=>([])
        }
    },
    data(){
        return{
            options: this.defaultOptions,
            actionUrl: this.customUrl,
            parameters: this.customParameter,
            value: this.defValue,
            searchInput: ''
        
        }
    },
    watch:{
        defValue(newValue){
            this.value = newValue
        }
    },
    methods:{
        async handleSelect(query) {
            console.log(query, 'query');
            const data = {
                search_key: query
            };
            if(this.parameters){
                const objKeys = Object.keys(this.parameters);
                for(const item of objKeys){
                    console.log(item, 'item');
                    console.log(objKeys[item], 'objKeys[item]');
                    data[item] = this.parameters[item]
                }
            }
            
            if(this.parameters){
                data[this.parameters.name] = this.parameters.value
            }
            try {
                const response = await this.$axios.post(
                    this.actionUrl,
                    data,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                            'x-auth-token': localStorage.getItem('authToken'),
                        }
                    }
                );
                console.log(response.data, 'response.data');
                this.options = response.data;
            } catch (error) {
                console.error(error);
            }
            console.log(this.value, 'this.value');
        },
        handleOptionChange(){
            if (this.value) {
                this.$emit('newValue', this.value)
            }
        },
    }
}
</script>

<style scoped>
.el-icon-arrow-down{
    cursor: pointer
}
</style>