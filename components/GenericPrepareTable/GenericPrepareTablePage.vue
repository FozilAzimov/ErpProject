<template>
  <div>
    <GenericInvoiceItemModalPage
      v-if="isOpenModal"
      :tabledata="tablehead"
      @customCloseAction="closeAction"
      @customInputValueObj="inputValuesAction"
    />
    <div class="flex items-start overflow-scroll" :class="`h-[${height}px]`">
      <table class="w-full border-[1px] border-[solid] border-[#F0F0F0]">
        <thead class="bg-[rgb(229,235,245)]">
          <!-- Open PopUp 'true' Table head -->
          <tr v-if="addmodalorrow">
            <th
              class="text-[13px] font-semibold border-[1px] border-[solid] border-[rgba(119,136,153,0.2)] p-2"
            >
              №
            </th>
            <th
              v-for="(headName, key) in filteredTablehead"
              :key="key"
              class="text-[13px] font-semibold border-[1px] border-[solid] border-[rgba(119,136,153,0.2)] p-2"
              :class="headName.width ? `w-[${headName.width}px]` : ''"
            >
              <template v-if="headName.type !== 'hidden'">
                {{ headName.headerText }}
              </template>
            </th>
            <th
              class="text-[13px] font-semibold border-[1px] border-[solid] border-[rgba(119,136,153,0.2)] p-2"
            >
              Delete
            </th>
          </tr>
          <!-- Open PopUp 'false' Table head -->
          <tr v-else>
            <th
              class="text-[13px] font-semibold border-[1px] border-[solid] border-[rgba(119,136,153,0.2)] p-2"
            >
              №
            </th>
            <th
              v-for="(headName, key) in filteredTablehead"
              :key="key"
              class="text-[13px] font-semibold border-[1px] border-[solid] border-[rgba(119,136,153,0.2)] p-2"
              :class="headName.width ? `w-[${headName.width}px]` : ''"
            >
              <template v-if="headName.type !== 'hidden'">
                {{ headName.headerText }}
              </template>
            </th>
            <th
              class="text-[13px] font-semibold border-[1px] border-[solid] border-[rgba(119,136,153,0.2)] p-2"
            >
              Delete
            </th>
          </tr>
        </thead>
        <tbody>
          <!-- Open PopUp 'true' Table body -->
          <template v-if="addmodalorrow">
            <tr
              v-for="(value, indexOne) in arr"
              :key="indexOne"
              class="bg-gradient-to-b from-transparent via-transparent to-[#F4F4F4]"
            >
              <td class="border-[1px] text-[12px] p-2 text-center">
                {{ indexOne + 1 }}
              </td>
              <td
                v-for="(item, indexToo) in filteredTablehead"
                :key="indexToo"
                class="border-[1px] text-[12px] p-2"
              >
                <!-- Edit UI start -->
                <template v-if="isedit">
                  <template v-if="item.type === 'button'">
                    <GenericButton
                      name="button"
                      pl="10"
                      pt="3"
                      pr="10"
                      pb="3"
                      bg="rgb(119,191,120)"
                      textsize="14"
                      @click="openModal"
                    ></GenericButton>
                  </template>
                  <template
                    v-else-if="item.type === 'hidden' && item.param === 'date'"
                  >
                    <input class="hidden" onclick="customDateSetVal()" />
                  </template>
                  <template v-else-if="item.type === 'hidden'">
                    <input class="hidden" onclick="customDateSetVal()" />
                  </template>
                  <template v-else-if="item.type === 'label'">
                    <label>{{ value[item.name] }}</label>
                  </template>
                  <template v-else-if="item.type === 'float'">
                    <input type="text" hidden limit="2" />
                  </template>
                  <template v-else-if="item.type === 'intNumber'">
                    <input type="text" hidden limit="2" />
                  </template>
                  <template v-else-if="item.type === 'integer'">
                    <input ref="input" @keypress="intNumber" />
                  </template>
                  <template v-else-if="item.type === 'string'">
                    <input type="text" />
                  </template>
                  <template v-else-if="item.type === 'checkbox'">
                    <input type="checkbox" />
                  </template>
                  <template v-else-if="item.type === 'date'">
                    <input type="date" />
                  </template>
                  <template v-else-if="item.type === 'list'">
                    <LookUp
                      :defvalue="value[item.name]"
                      :durl="`invoiceBase/${item.durl}`"
                      dwidth="200"
                      dlist="200"
                    />
                  </template>
                  <template v-else>
                    <label>{{ value[item.name] }}</label>
                  </template>
                </template>
                <!-- Edit UI end -->

                <!-- UI start -->
                <template v-else>
                  <label>{{ value[item.name] }}</label>
                </template>
                <!-- UI end -->
              </td>
              <td class="border-[1px] text-[12px] p-2 text-center">
                <span
                  class="flex justify-center active:scale-[1.2] duration-[0.2s]"
                >
                  <img
                    :src="img.del"
                    alt="delete"
                    class="w-[18px] cursor-pointer"
                  />
                </span>
              </td>
            </tr>
          </template>
          <!-- Open PopUp 'false' Table body -->
          <template v-else>
            <tr
              v-for="(item, indexOne) in tableBody"
              :key="indexOne"
              class="bg-gradient-to-b from-transparent via-transparent to-[#F3F3F3]"
            >
              <td class="border-[1px] text-[12px] p-2 text-center">
                {{ indexOne + 1 }}
              </td>
              <td
                v-for="(value, indexToo) in item"
                :key="indexToo"
                class="border-[1px] text-[12px] p-2"
                :class="`w-[${value.dwidth}px]`"
              >
                <LookUp
                  v-if="value.type === 'list'"
                  :durl="`invoiceBase/${value.durl}`"
                  dwidth="250"
                  :name="value.name"
                  @customFunction="getInputValue"
                />
                <GenericInput
                  v-else-if="value.type === 'float' || value.type === 'integer'"
                  width="150"
                  height="23"
                  pl="10"
                  pr="10"
                  pt="2"
                  pb="2"
                  textsize="13"
                  type="number"
                  :name="value.name"
                  @customFunction="getInputValue"
                />
                <GenericInput
                  v-else-if="value.type === 'string'"
                  width="150"
                  height="23"
                  pl="10"
                  pr="10"
                  pt="2"
                  pb="2"
                  textsize="13"
                  type="text"
                  :name="value.name"
                  @customFunction="getInputValue"
                />
                <GenericInputDatePage
                  v-else-if="value.type === 'date'"
                  width="170"
                  height="23"
                  pl="10"
                  pr="10"
                  pt="1"
                  pb="1"
                  textsize="13"
                  type="datetime-local"
                  valuecolor="rgba(0,0,0,0.7)"
                  :name="value.name"
                  @customFunction="getInputValue"
                />
                <GenericInput
                  v-else-if="value.type === 'checkbox'"
                  type="checkbox"
                  :name="value.name"
                  @customFunction="getInputValue"
                />
                <GenericButton
                  v-else-if="value.type === 'button'"
                  :name="value.headerText"
                  pl="10"
                  pt="3"
                  pr="10"
                  pb="3"
                  bg="rgb(156,104,183)"
                  textsize="12"
                />
              </td>
              <td class="border-[1px] text-[12px] p-2 text-center">
                <span
                  class="flex justify-center active:scale-[1.2] duration-[0.2s]"
                >
                  <img
                    :src="img.del"
                    alt="delete"
                    class="w-[18px] cursor-pointer"
                    @click="rowDelAction(indexOne)"
                  />
                </span>
              </td>
            </tr>
          </template>
          <tr>
            <td
              :colspan="tableheadlength + 2"
              class="text-center border-[1px] border-[solid] border-[#F0F0F0] text-[12px] py-3"
            >
              <div
                class="flex flex-col justify-center items-start text-[rgba(0,0,0,0.5)]"
              >
                <GenericButton
                  name="Add an Item"
                  pl="10"
                  pt="3"
                  pr="10"
                  pb="3"
                  bg="rgb(119,191,120)"
                  textsize="14"
                  :url="img.plus"
                  :istherepicture="true"
                  @click="openModal"
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
// import icons
import plus from '../../assets/icons/plus.png'
import del from '../../assets/icons/delete-button.png'

// import components
import GenericButton from '../Button/GenericButton.vue'
import GenericInvoiceItemModalPage from '../GenericInvoiceItemModal/GenericInvoiceItemModalPage.vue'
import GenericInput from '../Input/GenericInput.vue'
import LookUp from '../Lookup/LookUp.vue'

export default {
  // COMPONENTS
  components: {
    GenericButton,
    GenericInvoiceItemModalPage,
    LookUp,
    GenericInput,
  },

  // PROPS
  props: {
    tablehead: {
      type: Array,
      default: () => [],
    },
    tableheadlength: {
      type: Number,
      default: 0,
    },
    height: {
      type: String,
      default: '0',
    },
    addmodalorrow: {
      type: Boolean,
      default: true,
    },
    isedit: {
      type: Boolean,
      default: false,
    },
  },

  // DATA
  data() {
    return {
      img: {
        plus,
        del,
      },
      isOpenModal: false,
      allInputValues: {},
      tableBody: [],
      arr: [],
      objData: null,
      inputValuesObj: new Map(),
    }
  },

  // COMPUTED
  computed: {
    filteredTablehead() {
      return this.tablehead.filter((headName) => headName.type !== 'hidden')
    },
  },

  // MOUNTED
  mounted() {},

  // METHODS
  methods: {
    // Modal Open
    openModal() {
      this.addmodalorrow ? this.yesOpenModal() : this.noOpenModal()
    },
    yesOpenModal() {
      this.isOpenModal = true
    },
    noOpenModal() {
      this.tableBody.push(this.filteredTablehead)
    },

    // row delete action
    rowDelAction(index) {
      this.tableBody = this.tableBody.filter((row, inx) => inx !== index)
    },

    // Modal Close
    closeAction(isClose) {
      this.isOpenModal = isClose
    },

    // Lookup's Valuesini olish
    getInputValue(key, value) {
      this.inputValuesObj.set(key, value)
      this.objData = Object.fromEntries(this.inputValuesObj)
      this.arr.push(this.objData)
      this.$emit('customInputValueObj', this.arr)
    },

    //  inputValuesObj action
    inputValuesAction(valuesObj) {
      this.objData = Object.fromEntries(valuesObj)
      this.arr.push(this.objData)
      this.$emit('input-values-updated', this.arr)
    },

    // intNumber
    intNumber(evt) {
      const theEvent = evt || window.event
      let key = theEvent.keyCode || theEvent.which
      const x = key
      key = String.fromCharCode(key)
      const textVal = this.$refs.input.value
      if (x === 46 && textVal.includes('.')) {
        theEvent.preventDefault()
      }
      const regex = /[0-9]|\./
      if (
        ((!regex.test(key) && x !== 8 && x !== 37 && x !== 39) || x === 46) &&
        x !== 9
      ) {
        theEvent.returnValue = false
        if (theEvent.preventDefault) theEvent.preventDefault()
      }
    },
  },
}
</script>
