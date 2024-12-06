<template>
  <div>
    <div class="overflow-scroll border-l-2 border-r-2 my-2" :style="'max-height:' + tableHeightVal + 'px'">
      <table class="w-full text-[13px]">
        <thead>
          <tr>
            <th
              v-for="(item, idx) in tableHeaderArr"
              :key="idx"
              class="border-[1px] border-[solid] border-[#778899] p-[2px]"
            >
              {{ item.text }}
            </th>
            <th
              class="border-[1px] border-[solid] border-[#778899] p-[2px]"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(element, index) in tableBodyArr" :key="index">
            <td
              v-for="(item, idx) in tableHeaderArr"
              :key="idx"
              class="border-[1px] border-[solid] border-[#778899] p-[5px] text-center"
            >
              {{ element[item.name] }}
            </td>
            <td class="border-[1px] border-[solid] border-[#778899] p-[5px] text-center">

              <div class="float-left">
                <el-button
                  v-for="(item, idx) in buttonsArr"
                  :key="idx"
                  :type="item.type"
                  size="mini"
                  :icon="item.name === 'view' ? 'el-icon-view' : item.name === 'edit' ? 'el-icon-edit' : item.name === 'delete' ? 'el-icon-delete' : ''"
                  @click="()=>{ $emit('handleTableAction', item.name, element.id) }"
                >
                  {{ item.text }}
                </el-button>
              </div>

            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div>
      <el-card class="box-card">
        hello
        <p class="mb-2">
          Pages: {{ currentPage }} / {{ Math.ceil(tableBodyArr.length/defaulPageSize) }}
        </p>
        <el-pagination
          background
          :total="tableBodyArr.length"
          layout="total, prev, pager, next, jumper"
          :page-size="defaulPageSize"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </el-card>
    </div>



  </div>
</template>
<script>
export default {
  props:{
    headerElements:{
      type: Array,
      default: ()=>[]
    },
    bodyElements:{
      type: Array,
      default: ()=>[]
    },
    tableHeight:{
      type: (Number, String),
      default: '500'
    },
    actionBtnsArr:{
      type: Array,
      default: ()=>[]
    },
    pageSize:{
      type: Number,
      default: 25
    }
  },
  data(){
    return{
      tableHeaderArr: this.headerElements,
      tableBodyArr: this.bodyElements,
      tableHeightVal: this.tableHeight,
      buttonsArr: this.actionBtnsArr,
      defaulPageSize: this.pageSize,
      currentPage: 1
    }
  },
  watch: {
    headerElements(newVal){
      this.tableHeaderArr = newVal
    },
    bodyElements(newVal){
      this.tableBodyArr = newVal
    },
    actionBtnsArr(newVal){
      this.buttonsArr = newVal
    },
    pageSize(newVal){
      this.defaulPageSize = newVal
    }
  },
  methods:{
    handleCurrentChange(val) {
      console.log(`current page: ${val}`);
      this.currentPage = val
    }
  }
}
</script>
<style scoped></style>