<template>
  <div class="w-full p-1">
    <LoadingPage
      v-if="isLoading"
      class="absolute left-[50%] top-[8px] translate-x-[-50%]"
    />
    <template v-if="isCloseTable">
      <div
        class="border-[1px] border-solid border-[rgba(0,0,0,0.05)] p-[12px] bg-gradient-to-b from-transparent via-transparent to-gray-200 shadow-md flex items-center justify-between"
      >
        <div class="flex items-center gap-[10px]">
          <img src="@assets/icons/user-black.png" alt="user" class="w-[14px]" />
          <h1 class="font-bold text-[rgb(49,126,172)] text-[14px] uppercase">
            Edit attendanceschedule
          </h1>
        </div>
        <div>
          <ul class="flex items-center gap-4">
            <li
              class="p-[7px] rounded-[50%] cursor-pointer border-[1px] border-[solid] border-[rgba(0,0,0,0.1] hover:border-[#3b89e9] duration-[0.4s]"
              :style="{
                background: 'radial-gradient(#fff, rgba(32,111,162,0.2))',
              }"
            >
              <img class="w-[11px]" src="@assets/icons/gear.png" alt="gear" />
            </li>
            <li
              class="p-[7px] rounded-[50%] cursor-pointer border-[1px] border-[solid] border-[rgba(0,0,0,0.1] hover:border-[#3b89e9] focus:border-[#3b89e9] duration-[0.4s]"
              :style="{
                background: 'radial-gradient(#fff, rgba(32,111,162,0.2))',
              }"
              @click="isOpen"
            >
              <img
                class="w-[11px]"
                :class="
                  isOpenTable
                    ? 'rotate-[-180deg] duration-[1s]'
                    : 'rotate-[0deg] duration-[1s]'
                "
                src="@assets/icons/arrow.png"
                alt="arrow"
              />
            </li>
            <li
              class="p-[7px] rounded-[50%] cursor-pointer border-[1px] border-[solid] border-[rgba(0,0,0,0.1] hover:border-[#3b89e9] focus:border-[#3b89e9] duration-[0.4s]"
              :style="{
                background: 'radial-gradient(#fff, rgba(32,111,162,0.2))',
              }"
              @click="isClose"
            >
              <img
                class="w-[11px]"
                src="@assets/icons/remove.png"
                alt="remove"
              />
            </li>
          </ul>
        </div>
      </div>
      <div
        class="border-[1px] border-solid border-[rgba(0,0,0,0.1)]"
        :class="
          isOpenTable
            ? 'duration-[1s] h-[755px] overflow-hidden'
            : 'duration-[1s] h-0 overflow-hidden'
        "
      >
        <div class="w-fit flex flex-col items-start m-2 gap-1">
          <generic-check-box
            text="Open Popup"
            name="openPopup"
            :border="true"
            :default-value="defaultCheckValue"
            @customFunction="getInputAndLookUpValueAction"
          />
          <generic-carry-draggable
            :lyaut-one-data="leftColumns"
            :lyaut-two-data="rightColumns"
            @customEmitFunction="lyautEmitAction"
          />
          <div class="flex items-center gap-3 mt-3">
            <generic-button
              name="Go Back"
              type="primary"
              icon-name-attribute="arrow-left"
              @click="$router.push('/columnSettings.htm')"
            />
            <generic-button
              name="Save changes"
              type="success"
              icon-name-attribute="edit"
              @click="saveAction"
            />
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import GenericButton from '@generics/GenericButton.vue'
import LoadingPage from '@components/Loading/LoadingPage.vue'
import GenericCarryDraggable from '@generics/GenericCarryDraggable.vue'
import GenericCheckBox from '@generics/GenericCheckBox.vue'
export default {
  components: {
    LoadingPage,
    GenericButton,
    GenericCarryDraggable,
    GenericCheckBox,
  },

  // DATA
  data() {
    return {
      isLoading: false,
      pageSize_value: 25,
      isOpenTable: true,
      isCloseTable: true,
      pageID: null,
      defaultCheckValue: false,
      allSelectAndInputValue: {},
      // carry Draggable
      leftColumns: [],
      rightColumns: [],
      leftData: '',
      rightData: '',
      // carry Draggable
    }
  },

  // CREATED
  created() {
    // page ID sini olish
    this.pageID = this.$route.params?.id
  },

  // MOUNTED
  mounted() {
    // Table function
    this.getTableRequest(this.pageID)
    // function
    this.lyautEmitAction(this.leftColumns, this.rightColumns)
  },

  // Methods
  methods: {
    // Table page ni ochish va yopish uchun
    isOpen() {
      this.isOpenTable = !this.isOpenTable
    },
    isClose() {
      this.isCloseTable = !this.isCloseTable
    },

    // Check_box valuesini olish
    getInputAndLookUpValueAction(name, value) {
      this.$set(this.allSelectAndInputValue, name, value)
    },

    // Page request
    getTableRequest(id) {
      this.isLoading = !this.isLoading
      this.$axios
        .post(`/columnSettings/prepareColumnSettings`, {
          id,
          page_current: 1,
          page_size: this.pageSize_value,
        })
        .then(({ data }) => {
          this.$set(this, 'leftColumns', [
            ...this.leftColumns,
            ...data?.leftColumns,
          ])
          this.$set(this, 'rightColumns', [
            ...this.rightColumns,
            ...data?.rightColumns,
          ])
          this.defaultCheckValue = data?.openPopup
          this.isLoading = !this.isLoading
        })
        .catch((error) => {
          this.isLoading = !this.isLoading
          // eslint-disable-next-line no-console
          console.log(error)
        })
    },

    // Save Changes action
    saveAction() {
      const body = {
        actionUrl: 'attendanceschedule',
        tableColumnConfig: {
          code: 'attendanceschedule',
          columns: this.rightData,
          id: this.pageID,
          openPopup:
            this.allSelectAndInputValue?.openPopup ?? this.defaultCheckValue,
        },
        userColumns: this.rightData,
      }
      this.isLoading = !this.isLoading
      this.$axios
        .post(`/base/saveColumnConfigFromURL`, body)
        .then(() => {
          // function
          this.getTableRequest(this.pageID)
          this.isLoading = !this.isLoading
        })
        .catch((error) => {
          this.isLoading = !this.isLoading
          // eslint-disable-next-line no-console
          console.log(error)
        })
    },

    // lyauts Emit action
    lyautEmitAction(leftData, rightData) {
      this.leftData = this.filteredAction(leftData)
      this.rightData = this.filteredAction(rightData)
    },

    // Filter action
    filteredAction(list) {
      let str = ''
      list.forEach(({ name }) => {
        str += `${name},`
      })
      return str.slice(0, -1)
    },
  },
}
</script>
