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
            LANGUAGE LIST
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
            ? 'duration-[1s] h-fit overflow-hidden'
            : 'duration-[1s] h-0 overflow-hidden'
        "
      >
        <div class="flex items-center gap-2 m-2">
          <generic-look-up
            dwidth="150"
            name="addSelect"
            placeholder="select a language"
            :options-data="selectData?.passiveLanguages"
            @customFunction="allSelectAndInputAction"
          />
          <generic-button
            name="Add New"
            type="primary"
            icon-name-attribute="circle-plus-outline"
            @click="addAndDeleteLanguageAction('add')"
          />
        </div>
        <div class="flex items-center gap-2 m-2">
          <generic-look-up
            dwidth="150"
            name="deleteSelect"
            placeholder="delete a language"
            :options-data="selectData?.activeLanguages"
            @customFunction="allSelectAndInputAction"
          />
          <generic-button
            name="Delete"
            type="danger"
            icon-name-attribute="delete"
            @click="addAndDeleteLanguageAction('del')"
          />
        </div>
        <div class="p-2">
          <div class="flex items-center justify-between mb-1">
            <div class="text-[14px]">
              <select
                v-model="pageSize_value"
                class="border-[1px] border-solid border-[rgba(171,177,187,0.7)] w-[60px] px-[5px] py-[3px] cursor-pointer rounded-[2px] text-[14px] outline-none"
                @change="getTableRequest"
              >
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
                <option value="500">500</option>
              </select>
              Records
            </div>
            <div class="flex items-center gap-2">
              <GenericInput
                name="keyword"
                placeholder="Search..."
                @enter="getTableRequest"
                @customFunction="allSelectAndInputAction"
              />
              <GenericButton
                name="Search"
                type="primary"
                icon-name-attribute="search"
                @click="getTableRequest"
              />
            </div>
          </div>
          <div class="h-[600px] flex flex-col items-start overflow-scroll">
            <table class="w-full border-[1px] border-solid border-[#F0F0F0]">
              <thead class="bg-[rgb(229,235,245)] sticky top-[-1px] z-[999]">
                <tr>
                  <th
                    v-for="(obj, index) in selectData?.activeLanguages"
                    :key="index"
                    class="text-[13px] font-semibold border-[1px] border-solid border-[rgba(119,136,153,0.3)] p-4 cursor-pointer whitespace-nowrap"
                  >
                    {{ obj.name }}
                  </th>
                  <th
                    class="w-[100px] text-[13px] font-semibold border-[1px] border-solid border-[rgba(119,136,153,0.2)] p-2 cursor-pointer"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                <template v-if="istherebody">
                  <tr
                    v-for="(value, key) in messages"
                    :key="key"
                    class="bg-gradient-to-b from-transparent via-transparent to-[#F4F4F4]"
                  >
                    <td
                      v-for="(obj, innerIndex) in selectData?.activeLanguages"
                      :key="innerIndex"
                      class="border-[1px] text-[12px] p-2"
                    >
                      <span v-if="obj?.systemLanguage" class="text-[12px]"
                        >[{{ key }}]</span
                      >
                      <generic-input
                        type="textarea"
                        width="100"
                        widthtype="%"
                        :value="obj?.messages?.[key]"
                      />
                    </td>
                    <td class="border-[1px] p-2">
                      <GenericButton
                        name="Edit"
                        type="success"
                        icon-name-attribute="edit"
                        @click="
                          $router.push(`prepareLanguage.htm/messageKey=${key}`)
                        "
                      />
                    </td>
                  </tr>
                </template>
                <template v-else>
                  <tr>
                    <td
                      :colspan="1"
                      class="border-[1px] border-solid border-[#F0F0F0] text-[12px] p-3"
                    >
                      <div class="flex justify-start">
                        <el-empty
                          :image-size="60"
                          description="No Data"
                          style="padding: 0"
                        >
                          <template #description>
                            <p style="font-size: 13px; margin-top: -10px">
                              No Data
                            </p>
                          </template>
                        </el-empty>
                      </div>
                    </td>
                  </tr>
                </template>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import LoadingPage from '@components/Loading/LoadingPage.vue'
import GenericButton from '@generics/GenericButton.vue'
import GenericInput from '@generics/GenericInput.vue'
import GenericLookUp from '@generics/GenericLookUp.vue'
export default {
  components: {
    LoadingPage,
    GenericButton,
    GenericInput,
    GenericLookUp,
  },

  // DATA
  data() {
    return {
      isLoading: false,
      pageSize_value: 25,
      tableHeadLength: null,
      isOpenTable: true,
      isCloseTable: true,
      istherebody: false,
      messages: {},
      selectData: {},
      allSelectAndInputValue: {},
      selectVal: {},
    }
  },

  // MOUNTED
  mounted() {
    this.tableHeadLength = this.selectData?.activeLanguages?.length + 1
    // Table function
    this.getTableRequest()
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

    // PAGE request
    getTableRequest() {
      this.isLoading = !this.isLoading
      this.$axios
        .post(`/language/languagesAjaxLoad`, {
          searchForm: {
            keyword: this.allSelectAndInputValue?.keyword ?? '',
          },
          pagingForm: {
            pageSize: this.pageSize_value,
            currentPage: 1,
            pageCount: 14,
            total: 328,
          },
        })
        .then(({ data: { passiveLanguages, activeLanguages, messages } }) => {
          this.isLoading = !this.isLoading
          // this.tableBody = batchProcessList
          this.selectData.passiveLanguages = passiveLanguages
          this.selectData.activeLanguages = activeLanguages
          this.messages = messages
          this.istherebody = true
        })
        .catch((error) => {
          this.isLoading = !this.isLoading
          this.istherebody = false
          // eslint-disable-next-line no-console
          console.log(error)
        })
    },

    // Generic_Input value
    allSelectAndInputAction(name, value) {
      this.$set(this.allSelectAndInputValue, name, value)
    },

    // Add and Delete action
    addAndDeleteLanguageAction(clickType) {
      const addSelectValue = this.allSelectAndInputValue?.addSelect?.trim()
      const deleteSelectValue =
        this.allSelectAndInputValue?.deleteSelect?.trim()

      if (
        (clickType === 'add' && addSelectValue) ||
        (clickType === 'del' && deleteSelectValue)
      ) {
        let bodyData = {}
        const add = {
          language: {
            code: addSelectValue,
          },
        }
        const del = {
          data: {
            language: {
              code: deleteSelectValue,
            },
          },
        }
        bodyData = clickType === 'del' ? del : add

        this.isLoading = !this.isLoading
        const method = clickType === 'del' ? 'delete' : 'post'
        this.$axios?.[method](
          `/language/${
            clickType === 'add' ? 'addLanguage' : 'deleteLanguageAjaxLoad'
          }`,
          bodyData
        )
          .then(() => {
            // function
            this.getTableRequest()
            this.$notification(
              clickType === 'add' ? 'Saved' : 'Deleted',
              'Success',
              'success'
            )
            this.isLoading = !this.isLoading
          })
          .catch((error) => {
            this.isLoading = !this.isLoading
            // eslint-disable-next-line no-console
            console.log(error)
            this.$notification('Error', 'Error', 'error')
          })
      } else {
        this.$notification('Selectni tanlang', 'Warning', 'warning')
      }
    },
  },
}
</script>
