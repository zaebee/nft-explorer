<template>
  <c-button-group spacing="4">
    <c-box v-for="page in pagination.pages" :key="page" as="span">
      <c-button
        size="sm"
        :variantColor="outline(page)"
        @click="changePage(page)">
        {{ page }}
      </c-button>
    </c-box>
  </c-button-group>
</template>

<script lang="js">
import { mapState } from 'vuex'
import {
  CButton,
  CButtonGroup,
  CBox
} from '@chakra-ui/vue'

export default {
  name: 'Pagination',
  components: {
    CButton,
    CButtonGroup,
    CBox
  },
  props: {
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapState([
      'contract',
      'pagination',
    ]),
  },
  methods: {
    changePage (page) {
      console.log('changing page..', page)
      this.$store.dispatch('CONTRACT_DETAIL', {_id: this.contract.id, page: page})
    },
    outline (page) {
      return page === this.pagination.current ? 'blue' : 'gray'
    }
  }
}
</script>
