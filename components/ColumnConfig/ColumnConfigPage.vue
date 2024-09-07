<!-- eslint-disable vue/require-default-prop -->
<template>
  <div class="settings-container">
    <h2>Column config</h2>
    <ul
      v-if="createEdit"
      class="w-[97%] flex items-center justify-between p-2 border border-[#ccc]"
    >
      <li>
        <!-- <label for="">Auto Edit Open Item</label>
        <input type="checkbox" /> -->
        <el-button type="primary" @click="toggle1"
          >Auto Edit Open Item</el-button
        >
        <el-checkbox id="check" v-model="editOpen1" size="large" border />
      </li>
      <li>
        <el-button type="primary" @click="toggle2">Open popup</el-button>
        <el-checkbox id="check" v-model="openPopup1" size="large" border />
      </li>
      <li>
        <el-button type="primary" @click="toggle3">Auto Height Item</el-button>
        <el-checkbox id="check" v-model="autoHeight1" size="large" border />
      </li>
    </ul>
    <div class="column-container">
      <div style="width: 325px" class="left-box">
        <h3>Все колонки</h3>
        <el-checkbox v-model="checked1" size="large" border />
        <el-button
          :disabled="!checked1"
          class="btn"
          type="primary"
          @click="swapToRight"
          >Swap to right</el-button
        >
        <draggable v-model="leftItems" class="columns-box" group="items">
          <div
            v-for="(item, index) in leftItems"
            :key="index"
            class="left-column"
            @click="moveToRight(item)"
          >
            {{ item.name }}
            <div class="sub-div">
              <input readonly class="input" type="text" :value="120" />
            </div>
          </div>
        </draggable>
      </div>
      <div style="width: 325px" class="right-box">
        <h3>Используемые колонки</h3>
        <el-checkbox v-model="checked2" size="large" border />
        <el-button
          name="right"
          :disabled="!checked2"
          data-type="left"
          class="btn"
          type="primary"
          @click="swapToLeft"
          >Swap to left</el-button
        >
        <draggable v-model="rightItems" class="columns-box" group="items">
          <div
            v-for="(item, index) in rightItems"
            :key="index"
            class="right-column"
            @mouseleave="mouseLeave(index)"
            @mouseover="mouseOver(index)"
          >
            {{ item.name }}
            <div class="sub-div">
              <input
                :class="'input right-item__' + index"
                type="text"
                :value="
                  (item.width || item.dwidth) !== null
                    ? item.width || item.dwidth
                    : 120
                "
              />
              <span
                style="display: none"
                :class="'icon icon-' + index"
                @click="moveToLeft(item)"
                >-</span
              >
            </div>
          </div>
        </draggable>
      </div>
    </div>
    <div class="buttons">
      <el-button type="success" @click="postColumns">Save</el-button>
      <el-button type="danger" @click="closePopup">Close</el-button>
    </div>
  </div>
</template>

<script>
import Draggable from 'vuedraggable'
import { ref } from 'vue'

export default {
  components: {
    Draggable,
  },

  // PROPS
  props: {
    checkColumnConfig: Boolean,
    createEdit: {
      type: Boolean,
      default: false,
    },
    right: {
      type: Object,
      default: () => ({}),
    },
    left: {
      type: Object,
      default: () => ({}),
    },
    url: {
      type: String,
      default: '',
    },
    api: {
      type: String,
      default: '',
    },
    autoheight: {
      type: Boolean,
      default: false,
    },
    openpopup: {
      type: Boolean,
      default: false,
    },
    editopen: {
      type: Boolean,
      default: false,
    },
    object: {
      type: Object,
      default: () => ({}),
    },
  },

  // DATA
  data() {
    return {
      leftItems: [],
      rightItems: [],
      checkModal: this.checkColumnConfig,
      checked1: ref(false),
      checked2: ref(false),
      editOpen1: ref(this.editopen),
      openPopup1: ref(this.openpopup),
      autoHeight1: ref(this.autoheight),
    }
  },

  // WATCH
  watch: {
    right: {
      handler(newRight) {
        this.editOpen1 = this.editopen
        this.openPopup1 = this.openpopup
        this.autoHeight1 = this.autoheight
        for (const item in newRight) {
          newRight[item].postKey = item
          this.rightItems.push(newRight[item])
        }
      },
      deep: true,
    },
    left: {
      handler(newLeft) {
        for (const item in newLeft) {
          newLeft[item].postKey = item
          this.leftItems.push(newLeft[item])
        }
      },
      deep: true,
    },
  },

  // METHOD
  methods: {
    toggle1() {
      this.editOpen1 = !this.editOpen1
    },
    toggle2() {
      this.openPopup1 = !this.openPopup1
    },
    toggle3() {
      this.autoHeight1 = !this.autoHeight1
    },

    mouseOver(index) {
      const icon = document.querySelector('.icon-' + index)
      icon.style.display = 'flex'
    },

    mouseLeave(index) {
      const icon = document.querySelector('.icon-' + index)
      icon.style.display = 'none'
    },

    moveToLeft(item) {
      const index = this.rightItems.indexOf(item)
      this.rightItems.splice(index, 1)
      this.leftItems.push(item)
    },

    moveToRight(item) {
      const index = this.leftItems.indexOf(item)
      this.leftItems.splice(index, 1)
      this.rightItems.push(item)
    },

    swapToRight() {
      this.leftItems.map((item) => {
        this.rightItems.push(item)
        return item
      })
      this.leftItems = []
    },
    swapToLeft() {
      this.rightItems.map((item) => {
        this.leftItems.push(item)
        return item
      })
      this.rightItems = []
    },
    postColumns() {
      let rightItemsName = ''
      // eslint-disable-next-line array-callback-return
      this.rightItems.map((item, index) => {
        const inputVal = document.querySelector('.right-item__' + index)
        if (index === this.rightItems.length - 1) {
          rightItemsName += `${item.postKey}=${inputVal.value}`
        } else {
          rightItemsName += `${item.postKey}=${inputVal.value},`
        }
      })

      let data = {}
      if (this.createEdit) {
        data = {
          actionUrl: this.url,
          userColumns: rightItemsName,
          autoEditOpenItem: this.editOpen1,
          autoHeightItem: this.autoHeight1,
          openPopupItem: this.openPopup1,
        }
      } else {
        data = {
          actionUrl: this.url,
          userColumns: rightItemsName,
        }
      }
      this.$axios
        .post(`/base/${this.api}`, data)
        .then(() => {
          this.checkModal = false
          this.$emit('checkModal', this.checkModal)
          location.reload()
        })
        .catch((error) => {
          alert(error)
        })
    },
    closePopup() {
      this.checkModal = false
      this.$emit('checkModal', this.checkModal)
    },
  },
}
</script>

<style scoped>
.settings-container {
  position: absolute;
  top: 150px;
  left: 25%;
  transform: translate(25%);
  padding: 15px 5px;
  box-shadow: 1px 1px 10px #000;
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  background: white;
  transition: 0.5s;
}

.columns-box {
  width: 100%;
  height: 80%;
  overflow-y: scroll;
  overflow-x: hidden;
}

.column-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.left-column,
.right-column {
  font-size: 14px;
  padding: 2px;
  width: 95%;
  border: 1px solid rgba(0, 0, 0, 0.3);
  margin-top: 3px;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  align-items: center;
}

.left-box,
.right-box {
  width: 200px;
  height: 400px;
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10px;
  float: left;
}

.btn {
  margin: 10px 0;
}

.el-checkbox.is-bordered {
  padding: 10px 12px !important;
}

.input {
  text-align: center;
  width: 85%;
  outline: none;
  border: 1px solid rgba(0, 0, 0, 0.5);
}

.icon {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15px;
  height: 15px;
  position: absolute;
  right: -19%;
  top: 10%;
  border-radius: 50%;
  color: white;
  font-size: 25px;
  background: red;
  padding: 8px;
}

.sub-div {
  width: 20%;
  justify-content: space-between;
  align-items: center;
  position: relative;
}
</style>
