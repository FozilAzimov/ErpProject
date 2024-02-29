<template>
  <div class="w-full p-[4px_10px_4px_4px]">
    <MainHeader header-title="production order" />
    <ItemSearchList
      v-if="ItemSearchList"
      :static-list="[
        {
          type: 'date',
          name: 'date',
          text: 'date',
        },
        {
          type: 'input',
          name: 'orderNumberPo',
          text: 'Order Sequence number',
        },
        {
          type: 'date',
          name: 'dueDate',
          text: 'due date',
        },
        {
          type: 'label',
          name: 'years',
          text: 'year',
        },
        {
          type: 'list',
          name: 'company',
          text: 'customer',
        },
        {
          type: 'label',
          name: 'orderNoSequenceValue',
          text: 'Sequence No',
        },
        {
          type: 'button',
          name: 'closeItem',
          text: 'closeItem',
        },
        {
          type: 'list',
          name: 'supplier',
          text: 'Performer',
        },
        {
          type: 'list',
          name: 'department',
          text: 'department',
        },
        {
          type: 'input',
          name: 'customOrderNo',
          text: 'custom Order №',
        },
        {
          type: 'list',
          name: 'currency',
          text: 'currency',
        },
        {
          type: 'nothing',
          name: '',
          text: '',
        },
        {
          type: 'input',
          name: 'notes',
          text: 'Notes',
        },
      ]"
      :item-search-list="ItemSearchList"
    />
  </div>
</template>

<script>
import MainHeader from '@/components/main/MainHeader.vue'
import ItemSearchList from '@/components/main/ItemSearchList.vue'

export default {
  components: { MainHeader, ItemSearchList },
  data() {
    return {
      userId: null,
      ItemSearchList: null,
    }
  },
  created() {
    this.userId = this.$route.params.id
  },
  mounted() {
    this.getProductionOrderItem()
  },
  methods: {
    getProductionOrderItem() {
      const id = this.userId ? this.userId : null
      this.isLoading = !this.isLoading
      this.$axios
        .post(
          `${this.baseURL}/productionOrder/prepareProductionOrderItemAjaxLoad`,
          { id },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
              'x-auth-token': localStorage.getItem('authToken'),
            },
          }
        )
        .then((res) => {
          this.ItemSearchList = res.data?.paramsObject
          //   const timestamp = 1707822786633 // Your timestamp value

          //   const date = new Date(timestamp) // Create a new Date object using the timestamp

          //   const year = date.getFullYear() // Get the year
          //   const month = date.getMonth() + 1 // Get the month (Note: Months are zero-based, so we add 1)
          //   const day = date.getDate() // Get the day of the month

          //   console.log(year, month, day)
        })
    },
  },
}
</script>

<style></style>
