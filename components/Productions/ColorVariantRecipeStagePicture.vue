<template>
  <div class="w-full p-[0px_12px_0px_10px]">
    <LoadingPage
      v-if="isLoading"
      class="absolute left-[50%] top-[8px] translate-x-[-50%]"
    />
    <transition name="fade">
      <ColumnConfigPage
        v-show="checkModal"
        api="saveColumnConfig"
        class="z-[10000]"
        @checkModal="handleValue"
      />
    </transition>
    <template v-if="isCloseTable">
      <div
        class="border-[1px] border-solid border-[rgba(0,0,0,0.05)] p-[12px] bg-gradient-to-b from-transparent via-transparent to-gray-200 shadow-md flex items-center justify-between mt-1"
      >
        <div class="flex items-center gap-[10px]">
          <img
            src="../../assets/icons/user-black.png"
            alt="user"
            class="w-[14px]"
          />
          <h1 class="font-bold text-[rgb(49,126,172)] text-[14px] uppercase">
            Color Variant Recipe Stage Child List
          </h1>
        </div>
        <div>
          <ul class="flex items-center gap-4">
            <li
              class="p-[7px] rounded-[50%] cursor-pointer border-[1px] border-[solid] border-[rgba(0,0,0,0.1] hover:border-[#3b89e9] duration-[0.4s]"
              :style="{
                background: 'radial-gradient(#fff, rgba(32,111,162,0.2))',
              }"
              @click="openColumnConfig"
            >
              <img
                class="w-[11px]"
                src="../../assets/icons/gear.png"
                alt="gear"
              />
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
                src="../../assets/icons/arrow.png"
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
                src="../../assets/icons/remove.png"
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
        <div class="w-fit">
          <generic-nuxt-link-button
            name="Add New"
            pl="8"
            pt="3"
            pr="8"
            pb="3"
            bg="rgba(54, 155, 215, 0.8)"
            textsize="13"
            margin="8"
            to="/prepareColorVariantRecipeStagePicture.htm"
          />
        </div>
        <div class="mt-3 p-2">
          <div class="flex items-center justify-between mb-1">
            <div class="text-[14px]">
              <select
                v-model="pageSize_value"
                class="border-[1px] border-solid border-[rgba(171,177,187,0.7)] w-[60px] px-[5px] py-[3px] cursor-pointer rounded-[2px] text-[14px] outline-none"
                @change="getTableRequest()"
              >
                <option value="1">1</option>
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
                v-model="keywordValue"
                width="200"
                height="30"
                pl="10"
                pr="10"
                pt="2"
                pb="2"
                textsize="13"
                type="text"
                placeholder="Search..."
                @enter="getTableRequest"
                @input="getInputValue"
              />
              <GenericButton
                name="Search"
                pl="10"
                pt="4"
                pr="10"
                pb="4"
                bg="rgba(54, 155, 215, 0.8)"
                textsize="14"
                :url="imgUrl.search"
                :istherepicture="true"
                @click="getTableRequest"
              />
            </div>
          </div>
          <GenericTablePage
            :tablehead="tableHead"
            :tablebody="tableBody"
            :tableheadlength="tableHeadLength"
            :istherebody="isThereBody"
            open-url="prepareColorVariantRecipeStagePicture"
            :productions-action-buttons="true"
            delete-row-url="colorVariantRecipeStageChild/prepareColorVariantRecipeStageChildDelete"
            height="600"
            @pageEmitAction="getTableRequest"
          />
        </div>
      </div>
    </template>
  </div>
</template>

<script>
// Icons url
import search from '../../assets/icons/search.png'
// Components
import LoadingPage from '../Loading/LoadingPage.vue'
import GenericButton from '../Button/GenericButton.vue'
import GenericInput from '../Input/GenericInput.vue'
import ColumnConfigPage from '../ColumnConfig/ColumnConfigPage.vue'
import GenericTablePage from '../GenericTable/GenericTablePage.vue'
import GenericNuxtLinkButton from '../Generics/GenericNuxtLink/GenericNuxtLinkButton.vue'
export default {
  components: {
    LoadingPage,
    GenericButton,
    GenericInput,
    ColumnConfigPage,
    GenericTablePage,
    GenericNuxtLinkButton,
  },
  data() {
    return {
      isLoading: false,
      pageSize_value: 10,
      keywordValue: '',
      tableHead: {
        id: { name: 'Id', code: 'id' },
        picture: {
          name: 'Picture',
          code: 'id',
        },
        name: {
          name: 'Name',
          code: 'name',
        },
      },
      tableBody: [],
      tableHeadLength: null,
      isThereBody: false,
      imgUrl: {
        search,
      },
      checkModal: false,
      isOpenTable: true,
      isCloseTable: true,
    }
  },
  mounted() {
    this.tableHeadLength = Object.keys(this.tableHead).length + 1
    // Table function
    this.getTableRequest()
  },

  // Methods
  methods: {
    handleValue(checkModal) {
      this.checkModal = checkModal
    },
    openColumnConfig() {
      this.checkModal = true
    },

    getTableRequest() {
      this.isLoading = !this.isLoading
      this.$axios
        .post(
          `/colorVariantRecipeStagePicture/colorVariantRecipeStagePictureAjaxLoad`,
          {
            searchForm: {
              keyword: this.keywordValue,
            },
            pagingForm: {
              pageSize: this.pageSize_value,
              currentPage: 1,
              pageCount: 14,
              total: 328,
            },
          }
        )
        .then(({ data: { colorVariantRecipeStagePicture } }) => {
          this.isLoading = !this.isLoading
          this.tableBody = colorVariantRecipeStagePicture
          this.tableBody.length
            ? (this.isThereBody = true)
            : (this.isThereBody = false)
        })
        .catch((error) => {
          this.isLoading = !this.isLoading
          // eslint-disable-next-line no-console
          console.log(error)
        })
    },

    // Generic_Input value
    getInputValue(inputVal) {
      this.keywordValue = inputVal
    },

    // Table page ni ochish va yopish uchun
    isOpen() {
      this.isOpenTable = !this.isOpenTable
    },
    isClose() {
      this.isCloseTable = !this.isCloseTable
    },
  },
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
