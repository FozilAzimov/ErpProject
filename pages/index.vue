<template>
  <div class="w-full flex flex-col items-center gap-5">
    <h1>{{ GET_TRANSLATE_VALUE }}</h1>
    <generic-look-up
      dwidth="200"
      placeholder="Selected"
      :options-data="optionData"
      @customFunction="selectedAction"
    />

    <generic-date />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import GenericLookUp from '@generics/GenericLookUp.vue'
export default {
  components: {
    GenericLookUp,
  },

  data() {
    return {
      optionData: [
        { id: 1, name: 'English' },
        { id: 2, name: 'Russian' },
        { id: 3, name: 'O`zbekistan' },
        { id: 4, name: 'Turkiya' },
      ],
    }
  },

  computed: {
    ...mapGetters('translate', ['GET_TRANSLATE_VALUE']),
  },

  methods: {
    ...mapActions('translate', ['CHANGE_TRANSLATE']),

    selectedAction(name, value) {
      this.CHANGE_TRANSLATE(value)
    },
  },
}
</script>
