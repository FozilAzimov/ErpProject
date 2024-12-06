<template>
    <div>
        <!-- <transition name="el-fade-in-linear"> -->
            <el-dialog 
                :title="tableActionUrl"
                :visible.sync="dialogTableVisible"
                width="31%"
                @close="toggleVisibleStatus"
                height="400px"
            >


                <div v-if="localCheckboxStatus" class="checkbox-content flex gap-5">
                    <div class="flex gap-0.5">
                        <UniqueCheckbox 
                            :defLabel="'Автом.Высота'"
                            :def-value="autoHeightStatus"
                            @newValue="(value)=>autoHeightStatus = value"
                        />
                    </div>
                    <div class="flex gap-0.5">
                        <UniqueCheckbox 
                            :defLabel="'Интерфейс Строчный/Книжный'"
                            :def-value="interfaceStatus"
                            @newValue="(value)=>interfaceStatus = value"
                        />
                    </div>
                    <div class="flex gap-0.5">
                        <UniqueCheckbox 
                            :defLabel="'Режим редактора'"
                            :def-value="editStatus"
                            @newValue="(value)=>editStatus = value"
                        />
                    </div>
                </div>

                <div class="flex h-[500px] gap-10">

                    <!-- INVISIBLE BELOW!!!!!!!!!!!!!! -->
                    <div>
                        <el-card class="box-card text-center my-2.5">
                            <h1 class="text-xl font-medium text-sky-600">Hidden columns</h1>
                        </el-card>

                        <div class="toggle-section">
                            <UniqueCheckbox 
                                :def-value="swipeRight"
                                @newValue="(value)=>swipeRight = value"
                            />
                            <el-button type="success" :disabled="!swipeRight" size="mini" @click="swipeToRight">Swipe to right</el-button>
                        </div>
                        
                        <draggable v-model="hiddenHeaderElements" class="hiddenColumnsSection scrollable-content w-[250px]" group="items">
                            <div
                                v-for="(item, index) in hiddenHeaderElements"
                                :key="index"
                                class="left-column columns"
                                @click="appendToVisible(item)"
                            >
                                {{ item.headerText ? item.headerText : item.name }}
                                <div class="widthInputSection">
                                    <UniqueInput 
                                        :defValue="item.dwidth ? item.dwidth : item.width ? item.width : '120'"
                                        @newValue="(value) => item.dwidth ? item.dwidth = value : item.width = value"
                                        @click.native.stop
                                    />
                                </div>
                            </div>
                        </draggable>
                    </div>

                    <!-- VISIBLE BELOW!!!!!!!!!!!!!! -->
                    <div>
                        <el-card class="box-card text-center my-2.5">
                            <h1 class="text-xl font-medium text-sky-600">Visible columns</h1>
                        </el-card>

                        <div class="toggle-section">
                            <UniqueCheckbox 
                                :def-value="swipeLeft"
                                @newValue="(value)=>swipeLeft = value"
                            />
                            <el-button type="success" :disabled="!swipeLeft" size="mini" @click="swipeToLeft">Swipe to left</el-button>
                        </div>
                        <draggable v-model="visibleHeaderElements" class="hiddenColumnsSection scrollable-content w-[250px]" group="items">
                            <div
                                v-for="(item, index) in visibleHeaderElements"
                                :key="index"
                                class="right-column columns"
                            >
                                {{ item.headerText ? item.headerText : item.name }}
                                <div class="widthInputSection">
                                    <UniqueInput
                                        :defValue="item.dwidth ? item.dwidth : item.width ? item.width : '120'"
                                        @newValue="(value) => item.dwidth ? item.dwidth = value : item.width = value"
                                    />
                                </div>
                                <el-button type="danger" icon="el-icon-remove" circle size="mini" class="removeButton" @click="removeElement(item)"></el-button>
                            </div>
                        </draggable>
                    </div>
                </div>
                <div class="flex justify-center mt-[30px]">
                    <el-button type="info" size="mini" @click="toggleVisibleStatus">Close</el-button>
                    <el-button type="primary" size="mini" @click="saveColumnConfig">Save</el-button>
                </div>
            </el-dialog>
        <!-- </transition> -->
    </div>
</template>
<script>
import Draggable from 'vuedraggable'
import UniqueCheckbox from './UniqueCheckbox.vue'
import UniqueInput from './UniqueInput.vue'
export default {
    component:{
        Draggable,
        UniqueCheckbox,
        UniqueInput
    },
    props:{
        dialogVisible: {
            type: Boolean,
            default: false
        },
        actionUrl:{
            type: String,
            default: '',
        },
        saveUrl:{
            type: String,
            default: 'saveColumnConfigU',
        },
        visibleData:{
            type: [Array, Object],
            default: ()=>[]
        },
        hiddenData:{
            type: [Array, Object],
            default: ()=>[]
        },
        checkboxStatus:{
            type: Boolean,
            default: true
        }
    },
    data(){
        return {
            dialogTableVisible: this.dialogVisible,
            tableActionUrl: this.actionUrl ? this.actionUrl : '',
            visibleHeaderElements: [],
            hiddenHeaderElements: [],
            saveValUrl: this.saveUrl,

            autoHeightStatus: false,
            interfaceStatus: false,
            editStatus: false,

            swipeRight: false,
            swipeLeft: false,

            localCheckboxStatus: this.checkboxStatus
        } 
    },
    computed:{
        filteredVisibleHeaders() {
            if (Array.isArray(this.visibleData) && this.visibleData.length > 0) {
                return this.visibleData.filter(item => item.type !== 'hidden');
            } else if (typeof this.visibleData === 'object' && this.visibleData !== null && Object.keys(this.visibleData).length > 0) {
                const newArr = []
                Object.entries(this.visibleData).forEach(([key, value]) => {
                    if(value.type !== 'hidden'){
                        value.unique_name = key
                        newArr.push(value)
                    }
                })
                return newArr;
            }
            return [];
        },
        filteredHiddenHeaders(){
            if (Array.isArray(this.hiddenData) && this.hiddenData.length > 0) {
                return this.hiddenData.filter(item => item.type !== 'hidden');
            } else if (typeof this.hiddenData === 'object' && this.hiddenData !== null && Object.keys(this.hiddenData).length > 0) {
                const newArr = []
                Object.entries(this.hiddenData).forEach(([key, value]) => {
                    if(value.type !== 'hidden'){
                        value.unique_name = key
                        newArr.push(value)
                    }
                })
                return newArr;
            }
            return [];
        }
    },
    watch:{
        dialogVisible(newValue) {
            this.swipeRight = false
            this.swipeLeft = false
            this.dialogTableVisible = newValue
        },

        filteredVisibleHeaders(newVal) {
            this.visibleHeaderElements = newVal;
        },
        visibleData: {
            deep: true,
            handler() {
                this.visibleHeaderElements = this.filteredVisibleHeaders;
            }
        },
        filteredHiddenHeaders(newVal) {
            this.hiddenHeaderElements = newVal;
        },
        hiddenData: {
            deep: true,
            handler() {
                this.hiddenHeaderElements = this.filteredHiddenHeaders;
            }
        },

        saveUrl(newVal){
            this.saveValUrl = newVal
        },
        actionUrl(newVal){
            this.tableActionUrl = newVal
        },
        checkboxStatus(newVal){
            this.localCheckboxStatus = newVal
        }
    },
    mounted() {
        this.visibleHeaderElements = this.filteredVisibleHeaders;
        this.hiddenHeaderElements = this.filteredHiddenHeaders;
    },
    methods:{
        toggleVisibleStatus() {
            this.dialogTableVisible = false
            this.$emit('newStatus', this.dialogTableVisible)
        },
        swipeToRight(){
            this.hiddenHeaderElements.forEach(item => {
                this.visibleHeaderElements.push(item)
            })
            this.hiddenHeaderElements = []
        },
        swipeToLeft(){
            this.visibleHeaderElements.forEach(item => {
                this.hiddenHeaderElements.push(item)
            })
            this.visibleHeaderElements = []
        },
        appendToVisible(item){
            const index = this.hiddenHeaderElements.indexOf(item)
            this.hiddenHeaderElements.splice(index, 1)
            console.log(item, 'item')
            this.visibleHeaderElements.push(item)
        },
        removeElement(item){
            const index = this.visibleHeaderElements.indexOf(item)
            this.visibleHeaderElements.splice(index, 1)
            this.hiddenHeaderElements.push(item)
        },
        saveColumnConfig(){
            console.log(this.visibleHeaderElements, 'this.visibleHeaderElements')
            const keyValueStrings = this.visibleHeaderElements.map(item => `${item.unique_name ? item.unique_name : item.name}=${item.dwidth ? item.dwidth : item.width}`);
            const resultString = keyValueStrings.join(',');

            const data = {
                actionUrl: this.tableActionUrl,
                userColumns: resultString,
            }
            if(this.localCheckboxStatus){
                data.autoHeightItem = this.autoHeightStatus
                data.openPopupItem = this.interfaceStatus
                data.autoEditOpenItem = this.editStatus
            }
            console.log(data, 'data')

            this.$axios
            .post(
                `/base/${this.saveValUrl}`,
                data,
                {
                    headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'x-auth-token': localStorage.getItem('authToken'),
                    },
                }
            )
            .then((res) => {
                this.$emit('newVisibleColumnData', this.visibleHeaderElements, res.data.status)
            })
            .catch((err) => {
                console.log(err, 'err 1111')
            })
            this.toggleVisibleStatus()
        }
    }
}
</script>
<style scoped>
.transition-box {
    margin-bottom: 10px;
    width: 200px;
    height: 100px;
    border-radius: 4px;
    background-color: #409EFF;
    text-align: center;
    color: #fff;
    padding: 40px 20px;
    box-sizing: border-box;
    margin-right: 20px;
}
.toggle-section{
    height: 40px;
    display: flex;
    align-items: center;
    padding: 5px;
    box-sizing: border-box;
    margin-bottom: 10px;
    margin-inline: 25px;
    width: 200px;
    gap: 10px
}
.scrollable-content {
    height: 380px;
    overflow-y: auto;
    padding: 5px 10px;
    box-sizing: border-box;
    border: 1px solid #ebcbcb;
    border-radius: 5px;
}
.columns{
    margin: 2px 0;
    border: 1px solid #edb5b5;
    border-radius: 10px;
    padding: 5px;
    box-sizing: border-box;
    cursor: pointer;
    position: relative;
}
.removeButton{
    position: absolute;
    bottom: 5px;
    right: 5px;
    display: none;
}
.right-column:hover .removeButton {
    display: block;
}
.widthInputSection{
    width: 60px;
}
</style>