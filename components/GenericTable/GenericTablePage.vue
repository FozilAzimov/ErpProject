<template>
  <div>
    <div
      class="flex flex-col items-start overflow-scroll"
      :style="`height:${height}px`"
    >
      <message-box ref="messageBoxRef" @emitProp="getEmitProp" />
      <table class="w-full border-[1px] border-solid border-[#F0F0F0]">
        <thead class="bg-[rgb(229,235,245)] sticky top-[-1px]">
          <tr>
            <th
              v-for="(headName, key) in tablehead"
              :key="key"
              class="text-[13px] font-semibold border-[1px] border-solid border-[rgba(119,136,153,0.3)] p-4 cursor-pointer whitespace-nowrap"
              :class="`w-[${headName?.width}px]`"
            >
              {{ headName.name }}
            </th>
            <th
              class="text-[13px] font-semibold border-[1px] border-solid border-[rgba(119,136,153,0.2)] p-2 cursor-pointer"
            >
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          <template v-if="istherebody">
            <tr
              v-for="(value, index) in tablebody"
              :key="index"
              class="bg-gradient-to-b from-transparent via-transparent to-[#F4F4F4]"
            >
              <td
                v-for="(key, inx) in tablehead"
                :key="inx"
                class="border-[1px] text-[12px] p-2"
              >
                <span
                  v-if="
                    key?.code === 'status' ||
                    key?.code === 'invoiceOnWayStatus' ||
                    key?.code === 'type' ||
                    key?.code === 'orderProductionType'
                  "
                  class="p-[2px_5px] italic text-white font-bold rounded-[5px] bg-[rgb(102,149,51)]"
                  v-html="value[key.code]"
                ></span>
                <span
                  v-else-if="key.code === 'invoiceConfirmedStatus'"
                  class="p-[2px_5px] italic text-white font-bold rounded-[5px] bg-[rgb(221,86,0)]"
                  v-html="value[key.code]"
                ></span>

                <!-- Bill Status col -->
                <span
                  v-else-if="
                    key.code === 'invoiceBillStatus' &&
                    String(value[key.code]).includes('Not')
                  "
                  class="p-[2px_5px] italic text-white font-bold rounded-[5px] bg-[rgb(221,86,0)]"
                  v-html="value[key.code]"
                ></span>
                <span
                  v-else-if="
                    key.code === 'invoiceBillStatus' &&
                    !String(value[key.code]).includes('Not')
                  "
                  class="p-[2px_5px] italic text-white font-bold rounded-[5px] bg-[rgb(102,149,51)]"
                  v-html="value[key.code]"
                ></span>
                <!-- Bill Status col -->
                <img
                  v-else-if="key.code === 'images'"
                  :src="
                    value?.[key?.code]
                      ? value?.[key?.code]
                      : '../../assets/images/no-image.png'
                  "
                  :alt="value?.[key?.code]"
                  class="w-[50px]"
                />
                <span
                  v-else-if="
                    $route.path.includes('colors.htm') &&
                    key?.code === 'code' &&
                    value[key.code]
                  "
                  class="flex items-center gap-2"
                >
                  <span
                    class="w-[15px] h-[15px] block rounded-[50%]"
                    :style="{ backgroundColor: value[key.code] }"
                  >
                  </span>
                  {{ value[key.code] }}
                </span>
                <span
                  v-else-if="
                    $route.path.includes('designVariants.htm') &&
                    key?.code === 'recipe'
                  "
                >
                  <generic-nuxt-link-button
                    name="recipeDesignItem"
                    pl="8"
                    pt="3"
                    pr="8"
                    pb="3"
                    bg="rgba(54, 155, 215, 0.8)"
                    textsize="13"
                    margin="8"
                  />
                  <!-- recipeDesignItem btn ning  url li -->
                  <!-- to="/prepareDesignColorVariant.htm" -->
                </span>
                <span v-else>
                  {{ value[key.code] }}
                </span>
              </td>

              <!-- productions uchun -->
              <td v-if="productionsActionButtons" class="border-[1px] p-2">
                <span
                  v-if="$route.path.includes('sewmodel.htm')"
                  class="flex items-center justify-center gap-2 p-2"
                >
                  <generic-nuxt-link-button
                    :to="`${openUrl}.htm/${value.id}`"
                    name="Open"
                    pl="8"
                    pt="2"
                    pr="8"
                    pb="2"
                    bg="rgb(126,183,62)"
                    textsize="13"
                  />
                </span>
                <span v-else class="flex items-center justify-center gap-2 p-2">
                  <GenericButton
                    name="View"
                    pl="8"
                    pt="2"
                    pr="8"
                    pb="2"
                    bg="rgb(126,183,62)"
                    textsize="13"
                    @click="goToNextAction(value?.id, 'view')"
                  />
                  <GenericButton
                    name="Edit"
                    pl="8"
                    pt="2"
                    pr="8"
                    pb="2"
                    bg="#9E6AB8"
                    textsize="13"
                    @click="goToNextAction(value?.id, 'edit')"
                  />
                  <GenericButton
                    name="Delete"
                    pl="8"
                    pt="2"
                    pr="8"
                    pb="2"
                    bg="#C02C2C"
                    textsize="13"
                    @click="rowDelAction(value.id)"
                  />
                </span>
              </td>

              <!-- invoices uchun -->
              <td
                v-else
                class="border-[1px] flex items-center justify-center gap-2 p-2"
              >
                <generic-nuxt-link-button
                  v-if="!$route.path.includes('simpleProductionInvoice.htm')"
                  :to="`${openUrl}.htm/${value.id}`"
                  name="Open"
                  pl="8"
                  pt="2"
                  pr="8"
                  pb="2"
                  bg="rgb(126,183,62)"
                  textsize="13"
                />
                <generic-nuxt-link-button
                  v-if="$route.path.includes('simpleProductionInvoice.htm')"
                  :to="`${openUrl}.htm/${value.id}`"
                  name="Edit"
                  pl="8"
                  pt="2"
                  pr="8"
                  pb="2"
                  bg="rgb(126,183,62)"
                  textsize="13"
                />
                <generic-nuxt-link-button
                  v-if="
                    $route.path.includes('internalInvoice.htm') ||
                    $route.path.includes('viabranchreceive.htm')
                  "
                  :name="btnName"
                  pl="8"
                  pt="2"
                  pr="8"
                  pb="2"
                  bg="rgb(126,183,62)"
                  textsize="13"
                />
                <GenericButton
                  v-if="
                    !$route.path.includes('salesReturn.htm') &&
                    !$route.path.includes('inputReturn.htm') &&
                    !$route.path.includes('simpleProductionInvoice.htm') &&
                    !$route.path.includes('outputToPrOrder.htm') &&
                    !$route.path.includes('outputToServiceInvoice.htm') &&
                    !$route.path.includes('inputToServiceInvoice.htm') &&
                    !$route.path.includes('outputToPrOrderReturn.htm') &&
                    !$route.path.includes('outputToProductionCompany.htm') &&
                    !$route.path.includes(
                      'outputToProductionCompanyReturn.htm'
                    ) &&
                    !$route.path.includes('purchaseServiceInvoice.htm') &&
                    !$route.path.includes('saleServiceInvoice.htm') &&
                    !$route.path.includes('internalInvoice.htm') &&
                    !$route.path.includes('viabranchreceive.htm')
                  "
                  name="qrCode"
                  pl="8"
                  pt="2"
                  pr="8"
                  pb="2"
                  bg="rgb(126,183,62)"
                  textsize="13"
                />
                <GenericButton
                  v-if="
                    !$route.path.includes('salesReturn.htm') &&
                    !$route.path.includes('inputReturn.htm') &&
                    !$route.path.includes('simpleProductionInvoice.htm') &&
                    !$route.path.includes('outputToPrOrder.htm') &&
                    !$route.path.includes('outputToServiceInvoice.htm') &&
                    !$route.path.includes('inputToServiceInvoice.htm') &&
                    !$route.path.includes('outputToPrOrderReturn.htm') &&
                    !$route.path.includes('outputToProductionCompany.htm') &&
                    !$route.path.includes(
                      'outputToProductionCompanyReturn.htm'
                    ) &&
                    !$route.path.includes('purchaseServiceInvoice.htm') &&
                    !$route.path.includes('saleServiceInvoice.htm') &&
                    !$route.path.includes('internalInvoice.htm') &&
                    !$route.path.includes('viabranchreceive.htm')
                  "
                  name="forDevice"
                  pl="8"
                  pt="2"
                  pr="8"
                  pb="2"
                  bg="rgb(126,183,62)"
                  textsize="13"
                />
              </td>
            </tr>
          </template>
          <template v-else>
            <tr>
              <td
                :colspan="tableheadlength"
                class="text-center border-[1px] border-solid border-[#F0F0F0] text-[12px] p-3"
              >
                <div
                  class="flex flex-col justify-center items-start text-[rgba(0,0,0,0.5)]"
                >
                  <span class="flex flex-col items-center">
                    <img
                      src="../../assets/icons/no-data.png"
                      alt="no-data-icons"
                    />
                    No data
                  </span>
                </div>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
    <div
      class="border-[1px] border-solid border-[rgba(0,0,0,0.05)] py-3 bg-gradient-to-b from-transparent via-transparent to-gray-100 shadow-md flex items-center justify-center"
    >
      <generic-pagination :total="10" />
    </div>
  </div>
</template>

<script>
import GenericButton from '../Button/GenericButton.vue'
import GenericNuxtLinkButton from '../Generics/GenericNuxtLink/GenericNuxtLinkButton.vue'
import MessageBox from '../MessageBox.vue'
import GenericPagination from '../Generics/GenericPagination.vue'
export default {
  components: {
    GenericButton,
    MessageBox,
    GenericNuxtLinkButton,
    GenericPagination,
  },

  // PROPS
  props: {
    tablehead: {
      type: Object,
      default: () => ({}),
    },
    tablebody: {
      type: Array,
      default: () => [],
    },
    tableheadlength: {
      type: Number,
      default: 0,
    },
    istherebody: {
      type: Boolean,
      default: false,
    },
    height: {
      type: String,
      default: '0',
    },
    openUrl: {
      type: String,
      default: '',
    },
    btnName: {
      type: String,
      default: '',
    },
    productionsActionButtons: {
      type: Boolean,
      default: false,
    },
    deleteRowUrl: {
      type: String,
      default: '',
    },
  },

  // METHODS
  methods: {
    goToNextAction(rowID, btnName) {
      if (btnName === 'view')
        localStorage.setItem(
          'allTrueAndFalseData',
          JSON.stringify({ id: rowID, type: 'view' })
        )
      else if (btnName === 'edit')
        localStorage.setItem(
          'allTrueAndFalseData',
          JSON.stringify({ id: rowID, type: 'edit' })
        )
      this.$router.push(`${this.openUrl}.htm/${rowID}`)
    },

    // row delete action
    rowDelAction(id) {
      this.$refs.messageBoxRef.open(id)
    },

    // Message box EMIT action
    getEmitProp(propMessage, id) {
      if (propMessage === 'confirm') {
        this.$axios
          .delete(`/${this.deleteRowUrl}`, {
            data: {
              id,
              pagingForm: {
                pageSize: 25,
                currentPage: 1,
                pageCount: 14,
                total: 328,
              },
            },
          })
          .then(({ status }) => {
            if (status === 200) this.$emit('pageEmitAction', true)
          })
      }
    },
  },
}
</script>
