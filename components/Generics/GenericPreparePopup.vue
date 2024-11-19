<template>
  <div
    :style="{ top: yPos + 'px', left: xPos + 'px' }"
    class="w-[90%] max-h-[85vh] absolute cursor-grab p-2 rounded-sm overflow-auto bg-[rgb(208,225,243)] shadow-[0px_0px_50px_rgba(0,0,0,0.2)] flex justify-between"
    @mousedown="startDrag"
  >
    <div class="w-full">
      <div class="flex items-center justify-between gap-5">
        <h2 class="font-bold text-[rgb(49,126,172)] italic">Invoice Item</h2>
        <div class="flex items-center justify-between gap-2">
          <generic-button
            name="Accept"
            type="primary"
            :disabled="isRequired"
            @click="acceptAction"
          />
          <generic-button
            name="Close"
            @click="$emit('customCloseFunction', false)"
          />
        </div>
      </div>

      <!-- Line -->
      <span class="block h-[1px] w-full bg-[rgb(119,136,153)] my-2"></span>
      <!-- Line -->

      <div
        v-for="(arr, index) in groupArr"
        :key="index"
        class="flex justify-between gap-x-5 mb-[1px]"
      >
        <div
          v-for="(obj, innerIndex) in arr"
          :key="innerIndex"
          class="w-1/3 min-w-[300px] flex justify-start items-center"
        >
          <span class="w-[250px] text-[12px] whitespace-nowrap">{{
            obj?.headerText
          }}</span>
          <generic-look-up
            v-if="obj.type === 'list'"
            dwidth="200"
            :durl="obj.durl"
            :name="obj.name"
            :is-look-up-text="true"
            :popper-append-to-body="false"
            :result-type="obj.resultType"
            :required="
              !obj?.required || allSelectAndInputValue?.[obj.name]
                ? true
                : false
            "
            @customFunction="setLookUpAndInputValue"
          />
          <generic-input
            v-else-if="
              obj.type === 'float' ||
              obj.type === 'integer' ||
              obj.type === 'string' ||
              obj.type === 'text' ||
              obj.type === 'textarea'
            "
            width="200"
            :type="
              obj.type === 'float' || obj.type === 'integer'
                ? 'number'
                : obj.type === 'textarea'
                ? 'textarea'
                : ''
            "
            :name="obj.name"
            :required="
              !obj?.required || allSelectAndInputValue?.[obj.name]
                ? true
                : false
            "
            @customFunction="setLookUpAndInputValue"
          />
          <generic-input-date-page
            v-else-if="obj.type === 'date'"
            width="200"
            :name="obj.name"
            :required="
              !obj?.required || allSelectAndInputValue?.[obj.name]
                ? true
                : false
            "
            @customFunction="setLookUpAndInputValue"
          />
          <generic-check-box
            v-else-if="obj.type === 'checkbox'"
            :border="true"
            :name="obj.name"
            @customFunction="setLookUpAndInputValue"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GenericButton from '@generics/GenericButton.vue'
import GenericLookUp from '@generics/GenericLookUp.vue'
import GenericInput from '@generics/GenericInput.vue'
import GenericInputDatePage from '@components/InputDate/GenericInputDatePage.vue'
import GenericCheckBox from '@generics/GenericCheckBox.vue'
export default {
  // COMPONENTS
  components: {
    GenericButton,
    GenericLookUp,
    GenericInput,
    GenericInputDatePage,
    GenericCheckBox,
  },

  // PROPS
  props: {
    headData: {
      type: Array,
      default: () => [],
    },
  },

  // DATA
  data() {
    return {
      // Draggable
      xPos: 0, // Boshlang'ich X pozitsiya
      yPos: 0, // Boshlang'ich Y pozitsiya
      isDragging: false,
      offset: { x: 0, y: 0 },
      // Draggable

      pageID: null,
      pageUrl: null,
      isRequired: false,
      allSelectAndInputValue: {},
      tableData: [],
      emitTableData: [],
      groupArr: [],
    }
  },

  // COMPUTED
  computed: {
    filterElementData() {
      return this.headData.filter(
        (obj) =>
          obj.type !== 'label' &&
          obj.type !== 'hidden' &&
          obj.type !== 'button' &&
          obj.type !== 'file_image'
      )
    },
    // Required Array
    requiredArr() {
      return this.filterElementData.filter(
        (obj) =>
          obj.required &&
          (obj.type === 'list' ||
            obj.type === 'float' ||
            obj.type === 'date' ||
            obj.name === 'unitPrice' ||
            obj.name === 'cost_price' ||
            obj.name === 'cashPrice')
      )
    },
  },

  // WATCH
  watch: {
    filterElementData: {
      handler(newVal) {
        this.groupArr = this.groupByArrayAction(newVal, 3) // function
      },
      deep: true,
      immediate: true,
    },
  },

  // CREATED
  created() {
    this.pageID = this.$route.params?.id
    this.pageUrl = this.$route?.name
  },

  // MOUNTED
  mounted() {
    this.setInitialPosition() // Draggable function
    this.requiredAction(this.allSelectAndInputValue) // function
  },

  // METHODS
  methods: {
    // Draggable actions ===========================================
    setInitialPosition() {
      const popupWidthPercent = 90 // Popup kengligi (foiz)
      const popupHeightPercent = 50 // Popup balandligi (foiz)
      // Popup kengligi va balandligini foizdan hisoblash
      const popupWidth = (window.innerWidth * popupWidthPercent) / 100
      const popupHeight = (window.innerHeight * popupHeightPercent) / 100
      // Ekranning markaziga joylashtirish
      this.xPos = window.innerWidth / 2 - popupWidth / 2
      this.yPos = window.innerHeight / 2 - popupHeight / 2
    },
    startDrag(event) {
      this.isDragging = true
      this.offset.x = event.clientX - this.xPos
      this.offset.y = event.clientY - this.yPos
      window.addEventListener('mousemove', this.onDragging)
      window.addEventListener('mouseup', this.stopDrag)
    },
    stopDrag() {
      this.isDragging = false
      window.removeEventListener('mousemove', this.onDragging)
      window.removeEventListener('mouseup', this.stopDrag)
    },
    onDragging(event) {
      if (this.isDragging) {
        this.xPos = event.clientX - this.offset.x
        this.yPos = event.clientY - this.offset.y
      }
    },
    // Draggable actions ===========================================

    // all Select and Input value
    setLookUpAndInputValue(name, value, order, resultType, loopUpText) {
      this.$set(
        this.allSelectAndInputValue,
        name,
        resultType === 'object' ? { id: value, text: loopUpText } : value
      )
      this.requiredAction(this.allSelectAndInputValue) // function
    },

    // Required action
    requiredAction(obj) {
      const arr = []
      this.requiredArr.forEach(({ name }) => {
        arr.push(obj?.[name] || true)
      })
      this.isRequired = arr.includes(true)
    },

    // Accept button action addition rows
    acceptAction() {
      this.$emit('popupEmitAction', this.allSelectAndInputValue, false)
    },

    // Group array action
    groupByArrayAction(array, groupSize) {
      const result = []
      const tempArray = [...array]
      while (tempArray.length > groupSize) {
        result.push(tempArray.splice(0, groupSize))
      }
      if (tempArray.length > 0) {
        result.push(tempArray)
      }
      return result
    },
  },
}
</script>
