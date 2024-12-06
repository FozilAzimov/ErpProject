<template>
  <div>
    <el-dialog
      title="Confirm dialog"
      :visible.sync="dialogVisible"
      width="300px"
      :center="true"
      @close="handleConfirmStatus"
    >
      <!-- @close="handleConfirmStatus()" -->
      <span class="text-xl">{{defaultMsgStr}}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setConfirmStatus('cancel')">Cancel</el-button>
        <el-button type="primary" @click="setConfirmStatus('confirm')">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default{
  props: {
    dialogVisibleStatus: {
      type: Boolean,
      default: false
    },
    defaultMsg: {
      type: String,
      default: 'Are you sure?'
    }
  },
  data(){
    return{
      dialogVisible: this.dialogVisibleStatus,
      defaultMsgStr: this.defaultMsg,
      
      responseVal: ''
    }
  },
  watch:{
    dialogVisibleStatus(newVal){
      this.dialogVisible = newVal
    },
    defaultMsg(newVal){
      this.defaultMsgStr = newVal
    }
  },
  methods:{
    setConfirmStatus(val){
      this.dialogVisible = false
      this.responseVal = val
    },
    handleConfirmStatus(){
      // let responseVal = '';
      // if(type === 'confirm'){
      //   this.responseVal = type
      // }else if(type === 'cancel'){
      //   this.responseVal = type
      // }
      this.$emit('confirmStatus', this.responseVal)
    },
  }
}
</script>