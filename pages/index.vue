<template>
  <div class="mt-10">
    <generic-look-up
      dwidth="200"
      placeholder="Selected"
      :options-data="optionData"
      @customFunction="selectedAction"
    />
    <pre>{{ getText }}</pre>
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
        { name: 'English', id: 'en' },
        { name: 'Russian', id: 'ru' },
        { name: 'O`zbekistan', id: 'uz' },
        { name: 'Turkiya', id: 'tr' },
      ],
    }
  },

  computed: {
    // Store getters
    ...mapGetters('translate', ['GET_CORE_STRING']),
    getText() {
      // function
      this.customFunc()
      return this.GET_CORE_STRING
    },
  },

  methods: {
    ...mapActions('translate', ['FETCH_TRANSLATE']),

    selectedAction(name, value) {
      this.FETCH_TRANSLATE(value)
    },

    customFunc() {
      console.log('Page Request')
    },
  },
}
</script>
