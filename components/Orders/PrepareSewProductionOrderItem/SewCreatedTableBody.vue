<template>
  <div class="max-h-[500px] overflow-scroll my-1">
    <table class="w-full border-[1px] border-solid border-[#F0F0F0]">
      <thead class="bg-[rgb(229,235,245)] z-[999] sticky top-0">
        <tr>
          <th
            v-for="(obj, key) in tableHeadData"
            :key="key"
            class="text-[13px] font-semibold border-[1px] border-solid border-[rgba(119,136,153,0.3)] p-2 cursor-pointer whitespace-nowrap"
            :style="{ width: `${obj?.width}px` }"
          >
            <div
              v-if="obj?.type === 'btns' && !pageID"
              class="flex items-center justify-center gap-3"
            >
              {{ obj.size_name }}
              <generic-button
                name="Add Row"
                type="primary"
                @click="addTableBodyDataAction"
              />
            </div>
            <template v-else>
              {{ obj.size_name }}
              <!-- <pre>{{ obj }}</pre> -->
            </template>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(row, index) in tableBodyData"
          :key="index"
          class="bg-gradient-to-b from-transparent via-transparent to-[#F4F4F4]"
        >
          <td
            v-for="(obj, inx) in tableHeadData"
            :key="inx"
            class="border-[1px] text-[12px] p-[2px] text-center"
          >
            <template v-if="obj?.type === 'label'">
              {{ index + 1 }}
            </template>
            <template v-else-if="obj?.type === 'text'"></template>
            <template v-else-if="obj?.type === 'select'">
              <generic-look-up
                :defvalue="`${
                  tableLookUpAndInputData?.[index]?.[
                    `${index + 1}${obj.subName}`
                  ] ?? ''
                }`"
                :dwidth="obj.width"
                :durl="obj.api"
                :name="obj.subName"
                :order="index"
                :dparam="
                  obj?.param
                    ? obj?.param
                    : obj?.subName === `item3` &&
                      tableLookUpAndInputData?.[index]?.[`${index + 1}item2`]
                    ? {
                        colorId:
                          tableLookUpAndInputData[index][`${index + 1}item2`],
                      }
                    : {}
                "
                :required="
                  !!(
                    !obj?.required ||
                    tableLookUpAndInputData?.[index]?.[
                      `${index + 1}${obj.subName}`
                    ]
                  )
                "
                @customFunction="setLookUpAndInputValueAction"
              />
            </template>
            <template
              v-else-if="obj?.type === 'number' || obj?.type === 'textarea'"
            >
              <div v-if="obj?.multiple" class="flex items-center gap-1">
                <generic-input
                  v-for="(element, i) in obj.list"
                  :key="i"
                  :value="`${
                    tableLookUpAndInputData?.[index]?.[
                      `${index + 1}${element.subName}`
                    ] ?? ''
                  }`"
                  :order="index"
                  :type="obj.type"
                  :width="obj.width"
                  :name="element.subName"
                  :placeholder="element.placeholder"
                  :clearable="obj.clearable"
                  :feature="`${obj?.size_id}`"
                  :required="
                    !!(
                      !obj?.required ||
                      tableLookUpAndInputData?.[index]?.[
                        `${index + 1}${element.subName}`
                      ]
                    )
                  "
                  @customFunction="setLookUpAndInputValueAction"
                />
              </div>
              <generic-input
                v-else
                :value="`${
                  tableLookUpAndInputData?.[index]?.[
                    `${index + 1}${obj.subName}`
                  ] ?? ''
                }`"
                :order="index"
                :width="obj.width"
                :type="obj.type"
                :name="obj.subName"
                :clearable="obj.clearable"
                @customFunction="setLookUpAndInputValueAction"
              />
            </template>
            <generic-check-box
              v-else-if="obj?.type === 'checkbox'"
              :default-value="
                tableLookUpAndInputData?.[index]?.[
                  `${index + 1}${obj.subName}`
                ] ?? false
              "
              :name="obj.subName"
              :order="index"
              @customFunction="setLookUpAndInputValueAction"
            />
            <div
              v-else-if="obj?.type === 'btns'"
              class="flex items-center justify-center gap-1"
            >
              <generic-button
                v-for="(btn, i) in obj.list"
                v-show="btn.showAndHide"
                :key="i"
                :name="btn.name"
                :type="btn.type"
                :circle="btn?.circle"
                :icon-name-attribute="btn?.iconNameAttribute"
                @click="tableBtnAction(btn.clickType, index)"
              />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import GenericLookUp from '@generics/GenericLookUp.vue'
import GenericInput from '@generics/GenericInput.vue'
import GenericCheckBox from '@generics/GenericCheckBox.vue'
import GenericButton from '@generics/GenericButton.vue'
export default {
  components: {
    GenericInput,
    GenericButton,
    GenericLookUp,
    GenericCheckBox,
  },

  // PROPS
  props: {
    sewModelObject: {
      type: Object,
      default: () => ({}),
    },
    sewModelId: {
      type: String,
      default: '',
    },
  },

  // DATA
  data() {
    return {
      pageID: null,
      tableHead: [],
      tableHeadData: [],
      tableBodyData: [],
      tableLookUpAndInputData: [],
    }
  },

  // WATCH
  watch: {
    sewModelObject: {
      handler(newVal) {
        this.tableHead = newVal?.sizeItem
      },
      deep: true,
      immediate: true,
    },
    sewModelId(newVal) {
      this.dataCreatedAction() // function
    },
  },

  // CREATED
  created() {
    this.pageID = this.$route.params?.id
  },

  // MOUNTED
  mounted() {
    // function
    this.dataCreatedAction()
  },

  // METHODS
  methods: {
    // get LookUps and Inputs value
    setLookUpAndInputValueAction(name, value, order, feature) {
      !this.tableLookUpAndInputData[order] &&
        this.$set(this.tableLookUpAndInputData, order, {
          [`${order + 1}item1`]: order + 1,
          [`${order + 1}all`]: false,
          [`${order + 1}foiz`]: '',
        })
      feature
        ? this.setSizeItemValueAction(name, value, order) // function
        : name === 'foiz'
        ? this.setFoizCombinationAction(name, value, order) // function
        : this.$set(
            this.tableLookUpAndInputData[order],
            `${order + 1}${name}`,
            value
          )

      // Color tanlanganda "Color Variant" qiymatini o'chirish
      name === `item2` &&
        this.$set(this.tableLookUpAndInputData[order], `${order + 1}item3`, '')
    },

    // Size Item value'sini va foiz combinations action
    setSizeItemValueAction(name, value, order) {
      const obj = this.tableLookUpAndInputData[order]
      const i = order + 1
      const val = parseFloat(value || 0)
      const foizValue = parseFloat(obj[`${i}foiz`] || 0)
      const kroy = parseInt(val + (foizValue * val) / 100)

      if (obj[`${i}all`] && name?.includes('item')) {
        const parentList = []
        this.tableHeadData.forEach((obj) => {
          obj?.size_id && parentList.push(obj?.list)
        })
        parentList.forEach((arr) => {
          this.$set(obj, `${i}${arr[0].subName}`, val)
          this.$set(obj, `${i}${arr[1].subName}`, kroy)
        })
      } else if (name?.includes('item_kroy')) {
        this.$set(obj, `${i}${name}`, value)
      } else if (name?.includes('item')) {
        const newName = name.replace('item', `${i}item_kroy`)
        this.$set(obj, `${i}${name}`, value)
        this.$set(obj, newName, kroy)
      }
    },

    // Foiz combination action
    setFoizCombinationAction(name, value, order) {
      const obj = this.tableLookUpAndInputData[order]
      const i = order + 1
      this.$set(obj, `${i}${name}`, value)
      const val = parseFloat(value || 0)
      const parentList = []
      this.tableHeadData.forEach((obj) => {
        obj?.size_id && parentList.push(obj?.list)
      })
      parentList.forEach((arr) => {
        const itemVal = parseFloat(obj[`${i}${arr[0].subName}`] || 0)
        const newKroyVal = parseInt(itemVal + (val * itemVal) / 100)
        this.$set(obj, `${i}${arr[1].subName}`, newKroyVal)
      })
    },

    // Add Row Data
    addTableBodyDataAction() {
      this.tableBodyData.push(this.tableHeadData)
    },

    // Delete action
    tableBtnAction(type, index) {
      if (type === 'delete') {
        this.tableBodyData = this.tableBodyData.filter((arr, i) => i !== index)
        this.tableLookUpAndInputData = this.tableLookUpAndInputData.filter(
          (obj, i) => i !== index
        )
      }
    },

    // Asosiy pagedan kelgan
    saveAction() {
      this.tableLookUpAndInputData?.length &&
        this.$emit('emitActionTwo', this.tableLookUpAndInputData)
    },

    // Data created
    dataCreatedAction() {
      this.tableBodyData = []
      this.tableLookUpAndInputData = []
      const data = [
        {
          size_name: '№',
          subName: 'item1',
          type: 'label',
        },
        {
          width: '150',
          size_name: 'Color',
          subName: 'item2',
          api: 'findAllColor',
          param: {
            sewModelId: this.sewModelId,
          },
          required: true,
          type: 'select',
        },
        {
          width: '150',
          size_name: 'Panton',
          subName: 'panton',
          type: 'text',
        },
        {
          width: '200',
          size_name: 'Description',
          subName: 'item_description',
          type: 'textarea',
        },
        {
          width: '150',
          size_name: 'Color Variant',
          subName: 'item3',
          api: 'findAllColorVariant',
          type: 'select',
        },
        {
          width: '150',
          size_name: 'Design',
          subName: 'item4',
          api: 'findAllDesign',
          type: 'select',
        },
        {
          width: '70',
          size_name: 'Size',
          subName: 'size',
          type: 'text',
        },
        {
          width: '70',
          clearable: false,
          size_name: '%',
          subName: 'foiz',
          type: 'number',
        },
        {
          size_name: 'All',
          subName: 'all',
          type: 'checkbox',
        },
      ]
      const sizeListMap = {}
      this.tableHead?.forEach((obj, i) => {
        const itemIndex = i + 5
        obj.width = '80'
        obj.multiple = true
        obj.type = 'number'
        obj.clearable = false
        obj.required = true
        obj.list = [
          {
            subName: `item${itemIndex}`,
          },
          {
            subName: `item_kroy${itemIndex}`,
            placeholder: 'kroyReqQty',
          },
        ]
        data.push(obj)
        sizeListMap[`size${itemIndex}`] = obj?.size_id
      })
      const action = {
        size_name: 'Actions',
        type: 'btns',
        list: [
          {
            name: 'Add',
            type: 'warning',
            clickType: 'addKroyTop',
            showAndHide: !!this.pageID,
          },
          {
            name: 'Add Kroy Top',
            type: 'primary',
            clickType: 'addKroyTop',
            showAndHide: !!this.pageID,
          },
          {
            name: 'Add Kroy Bottom',
            type: 'primary',
            clickType: 'addKroyBottom',
            showAndHide: !!this.pageID,
          },
          {
            name: 'Add Production Invoice',
            type: 'primary',
            clickType: 'addProductionInvoice',
            showAndHide: !!this.pageID,
          },
          {
            circle: true,
            iconNameAttribute: 'delete',
            type: 'danger',
            clickType: 'delete',
            showAndHide: !this.pageID,
          },
        ],
      }
      data.push(action)
      this.tableHeadData = data
      // Emit sizeItem obj
      this.$emit('emitAction', sizeListMap)

      // function
      this.addTableBodyDataAction()
    },
  },
}
</script>
