<template>
  <div>
    <span class="flex items-center gap-2">
      <span v-if="title" class="text-[16px] font-semibold text-[#317eac]">{{
        title
      }}</span>

      <generic-button
        v-for="(elem, index) in buttons"
        :key="index"
        :name="elem?.name"
        :type="elem?.type"
        :icon-name-attribute="elem?.iconNameAttribute"
        @click="handleButtonClick(elem?.action)"
      />
    </span>

    <div class="w-full h-fit overflow-x-auto">
      <table class="w-full border-[1px] border-solid border-[#F0F0F0] mt-2">
        <thead class="bg-[rgb(229,235,245)]">
          <tr>
            <th
              v-for="(headName, key) in data"
              :key="key"
              class="text-[13px] font-semibold border-[1px] border-solid border-[rgba(119,136,153,0.3)] p-6 cursor-pointer whitespace-nowrap"
              :class="`w-[${headName?.width}px]`"
            >
              {{ headName?.name }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(row, inx) in tableData"
            :key="inx"
            class="bg-gradient-to-b from-transparent via-transparent to-[#F4F4F4]"
          >
            <td
              v-for="(element, index) in row"
              :key="index"
              class="border-[1px] text-[12px] text-center p-2"
            >
              <template v-if="element?.type === 'label'">{{
                1 + inx
              }}</template>
              <template v-else-if="element?.type === 'date'">
                <generic-input-date-page type="datetime-local" />
              </template>
              <template v-else-if="element?.type === 'select'">
                <generic-look-up dwidth="150" />
              </template>
              <template v-else-if="element?.type === 'text'">
                <generic-input width="150" type="text" />
              </template>
              <template v-else-if="element?.type === 'textarea'">
                <generic-input width="150" type="textarea" />
              </template>
              <template v-else-if="element?.type === 'checkbox'">
                <generic-check-box />
              </template>
              <template v-else-if="element?.type === 'button'">
                <generic-button type="success" :name="element?.btnName" />
              </template>
              <template v-else-if="element?.type === 'del'">
                <generic-button
                  type="danger"
                  :circle="true"
                  icon-name-attribute="delete"
                  @click="deleteRowAction(inx, tableData)"
                />
              </template>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import GenericButton from '@generics/GenericButton.vue'
import GenericLookUp from '@generics/GenericLookUp.vue'
import GenericInput from '@generics/GenericInput.vue'
import GenericCheckBox from '@generics/GenericCheckBox.vue'
import GenericInputDatePage from '@components/InputDate/GenericInputDatePage.vue'
export default {
  // COMPONENTS
  components: {
    GenericButton,
    GenericLookUp,
    GenericInput,
    GenericCheckBox,
    GenericInputDatePage,
  },

  props: {
    pageId: {
      type: String,
      default: '',
    },
    data: {
      type: Array,
      default: () => [],
    },
    title: {
      type: String,
      default: '',
    },
    buttons: {
      type: Array,
      default: () => [],
    },
  },

  // DATA
  data() {
    return {
      tableData: [],
    }
  },

  // METHODS
  methods: {
    // Row Delete action
    deleteRowAction(index, rows) {
      rows.splice(index, 1)
    },

    handleButtonClick(action) {
      this.customFunctionAction(action)
    },
    customFunctionAction(name) {
      if (name === 'add') {
        this.tableData.push(this.data)
      } else if (name === 'save') {
        const body = {
          id: this.pageId,
        }
        this.isLoading = !this.isLoading
        this.$axios
          .post(`/packagings/addPackagingDetails`, body)
          .then(() => {
            this.isLoading = !this.isLoading
          })
          .catch((error) => {
            this.isLoading = !this.isLoading
            // eslint-disable-next-line no-console
            console.log(error)
          })
      }
    },
  },
}
</script>
