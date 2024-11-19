<template>
  <div class="w-full p-[0px_12px_0px_10px] mt-1">
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
            Menu Settings
          </h1>
        </div>
        <div>
          <ul class="flex items-center gap-4">
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
        <div class="p-2">
          <div class="flex items-center gap-2 mt-3">
            <generic-button type="success" name="Save changes" />
            <generic-button type="primary" name="Reset" @click="sortAction" />
          </div>
          <hr class="my-5" />
          <div class="flex items-center justify-between">
            <div class="row w-1/3 h-[620px] overflow-y-auto">
              <div class="col-6">
                <draggable
                  v-model="list"
                  tag="ul"
                  v-bind="dragOptions"
                  @start="drag = true"
                  @end="drag = false"
                >
                  <transition-group
                    type="transition"
                    :name="!drag ? 'flip-list' : null"
                  >
                    <li
                      v-for="element in list"
                      :key="element?.order"
                      class="cursor-move bg-gradient-to-b from-[#fafafa] to-[#eee] hover:from-[#fff] hover:to-[#fff] border-[1px] border-solid border-[rgb(149,183,221)] my-[5px] p-[8px_10px] rounded-sm text-[14px] font-light hover:text-[#2e8de5]"
                    >
                      {{ GET_CORE_STRING?.[element?.name] || element?.name }}
                    </li>
                  </transition-group>
                </draggable>
              </div>
            </div>
            <div class="w-2/3"></div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import draggable from 'vuedraggable'
import LoadingPage from '@components/Loading/LoadingPage.vue'
import GenericButton from '@generics/GenericButton.vue'
export default {
  // COMPONENTS
  components: {
    draggable,
    LoadingPage,
    GenericButton,
  },

  // DATA
  data() {
    return {
      isLoading: false,
      selectValue: {},
      isOpenTable: true,
      isCloseTable: true,
      message: [
        'Currency',
        'Product Types',
        'Delivery Methods',
        'User Access Logs',
        'Phone Type',
        'User Types',
        'User Payment Types',
        'Income Expense Types',
        'Measure Types',
        'Price Types',
        'Transfer Code Type',
        'Transaction Group',
        'User Serial',
        'Company Type',
        'Company Group',
        'Product Prices',
        'Product Packages',
      ],
      resData: [],
      drag: false,
    }
  },

  // COMPUTED
  computed: {
    // Store getters
    ...mapGetters('translate', ['GET_CORE_STRING']),
    dragOptions() {
      return {
        animation: 200,
        group: 'description',
        disabled: false,
      }
    },
    list() {
      return this.resData.map((obj, index) => ({
        name: obj?.name,
        order: index + 1,
      }))
    },
  },

  // CREATED
  created() {
    // Table function
    this.getTableRequest()
  },

  // METHODS
  methods: {
    // Table page ni ochish va yopish uchun
    isOpen() {
      this.isOpenTable = !this.isOpenTable
    },
    isClose() {
      this.isCloseTable = !this.isCloseTable
    },
    // Table page ni ochish va yopish uchun

    // page request action
    getTableRequest() {
      const body = {}

      this.isLoading = !this.isLoading
      this.$axios
        .post(`/menuSetting/menuSettings`, body)
        .then(({ data: { list } }) => {
          this.resData = list
          this.isLoading = !this.isLoading
        })
        .catch((error) => {
          this.isLoading = !this.isLoading
          // eslint-disable-next-line no-console
          console.log(error)
        })
    },

    // Sorted action
    sortAction() {
      this.list = this.list.sort((a, b) => a.order - b.order)
    },
  },
}
</script>
