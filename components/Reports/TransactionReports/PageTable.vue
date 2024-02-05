<template>
  <table class="text-[9px]">
    <thead class="bg-[rgb(190,190,190)]">
      <tr
        v-if="Object.keys(topheader).length"
        class="bg-gradient-to-b from-transparent via-transparent to-[rgb(206,206,206)]"
      >
        <th
          :colspan="Object.keys(topheader).length + 1"
          class="text-[11px] border-[1px] border-[solid] border-[rgb(119,136,153)] font-medium p-2"
        >
          february
        </th>
      </tr>
      <tr
        class="bg-gradient-to-b from-transparent via-transparent to-[rgb(206,206,206)]"
      >
        <th
          v-for="(headerName, index) in header"
          :key="index"
          class="border-[1px] border-[solid] border-[rgb(119,136,153)] font-medium p-2"
        >
          {{ headerName }}
        </th>
      </tr>
    </thead>
    <tbody class="bg-[rgb(240,243,250)]">
      <tr v-for="(row, inx) in tablebody" :key="inx">
        <td
          v-if="!row.count"
          class="border-[1px] border-[solid] border-[rgb(119,136,153)] text-center p-2"
        >
          {{ inx + 1 }}
        </td>
        <td
          v-if="row.warehouse || row.warehouse === null"
          class="border-[1px] border-[solid] border-[rgb(119,136,153)] text-center p-2"
        >
          {{ row.warehouse }}
        </td>
        <td
          v-if="row.name"
          class="border-[1px] border-[solid] border-[rgb(119,136,153)] text-center p-2"
        >
          {{ row.name }}
        </td>
        <td
          v-if="!row.transaction_name && row.credit"
          class="border-[1px] border-[solid] border-[rgb(119,136,153)] text-center p-2"
        ></td>
        <td
          v-if="row.transaction_name === 1"
          class="border-[1px] border-[solid] border-[rgb(119,136,153)] text-center p-2"
        >
          Cashbox
        </td>
        <td
          v-if="row.transaction_name === 2"
          class="border-[1px] border-[solid] border-[rgb(119,136,153)] text-center p-2"
        >
          Banks
        </td>
        <td
          v-if="row.transaction_name === 3"
          class="border-[1px] border-[solid] border-[rgb(119,136,153)] text-center p-2"
        >
          Employee
        </td>
        <td
          v-if="row.transaction_name === 4"
          class="border-[1px] border-[solid] border-[rgb(119,136,153)] text-center p-2"
        >
          Companies
        </td>
        <td
          v-if="row.debit"
          class="border-[1px] border-[solid] border-[rgb(119,136,153)] text-center p-2"
        >
          {{ row.debit }}
        </td>
        <td
          v-if="row.credit"
          class="border-[1px] border-[solid] border-[rgb(119,136,153)] text-center p-2"
        >
          {{ row.credit }}
        </td>
        <td
          v-if="row.saldo_debit"
          class="border-[1px] border-[solid] border-[rgb(119,136,153)] text-center p-2"
        >
          {{ row.saldo_debit }}
        </td>
        <td
          v-if="row.saldo_credit"
          class="border-[1px] border-[solid] border-[rgb(119,136,153)] text-center p-2"
        >
          {{ row.saldo_credit }}
        </td>
        <td
          v-if="row.credit_saldo || row.credit_saldo === null"
          class="border-[1px] border-[solid] border-[rgb(119,136,153)] text-center p-2"
        >
          {{ row.credit_saldo }}
        </td>
        <td
          v-if="row.design_variant || row.design_variant === 0"
          class="border-[1px] border-[solid] border-[rgb(119,136,153)] text-center p-2"
        >
          {{ row.design_variant }}
        </td>
        <td
          v-if="row.color_variant || row.color_variant === 0"
          class="border-[1px] border-[solid] border-[rgb(119,136,153)] text-center p-2"
        >
          {{ row.color_variant }}
        </td>
        <td
          v-if="row.department"
          class="border-[1px] border-[solid] border-[rgb(119,136,153)] text-center p-2"
        >
          {{ row.department }}
        </td>
        <td
          v-if="row.qty || row.qty === 0"
          class="border-[1px] border-[solid] border-[rgb(119,136,153)] text-center p-2"
        >
          {{ row.qty }}
        </td>
        <td
          v-if="row.um"
          class="border-[1px] border-[solid] border-[rgb(119,136,153)] text-center p-2"
        >
          {{ row.um }}
        </td>
        <td
          v-if="row.count"
          class="border-[1px] border-[solid] border-[rgb(119,136,153)] text-center p-2"
        >
          {{ row.count }}
        </td>
        <td
          v-if="row.entry || row.entry === 0"
          class="border-[1px] border-[solid] border-[rgb(119,136,153)] text-center p-2"
        >
          {{ row.entry }}
        </td>
        <td
          v-if="row.late || row.late === 0"
          class="border-[1px] border-[solid] border-[rgb(119,136,153)] text-center p-2"
        >
          {{ row.late }}
        </td>
        <td
          v-if="row.absent"
          class="border-[1px] border-[solid] border-[rgb(119,136,153)] text-center p-2"
        >
          {{ row.absent }}
        </td>
        <td
          v-if="row.missing || row.missing === 0"
          class="border-[1px] border-[solid] border-[rgb(119,136,153)] text-center p-2"
        >
          {{ row.missing }}
        </td>
        <td
          v-if="row.february_credit || row.february_credit === 0"
          class="border-[1px] border-[solid] border-[rgb(119,136,153)] text-center p-2"
        >
          {{ row.february_credit }}
        </td>
        <td
          v-if="row.february_debit || row.february_debit === 0"
          class="border-[1px] border-[solid] border-[rgb(119,136,153)] text-center p-2"
        >
          {{ row.february_debit }}
        </td>
        <td
          v-if="row.february_saldo || row.february_saldo === 0"
          class="border-[1px] border-[solid] border-[rgb(119,136,153)] text-center p-2"
        >
          {{ row.february_saldo }}
        </td>
        <td
          v-if="row.round || row.round === 0"
          class="border-[1px] border-[solid] border-[rgb(119,136,153)] text-center p-2"
        >
          {{ row.round }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    topheader: {
      type: Object,
      default: () => ({}),
    },
    header: {
      type: Array,
      default: () => [],
    },
    tablebody: {
      type: Array,
      default: () => [],
    },
  },
}
</script>
