<template>
  <c-button-group spacing="4">
    <c-box v-for="page in pages" :key="page" as="span">
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
import {
  CBox,
  CButton,
  CButtonGroup,
} from '@chakra-ui/vue'

export default {
  name: 'Pagination',
  components: {
    CBox,
    CButton,
    CButtonGroup,
  },
  props: {
    pages: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      currentPage: 0,
    }
  },
  methods: {
    changePage (page) {
      this.$emit('changePage', page)
      this.currentPage = page
    },
    outline (page) {
      return page === this.currentPage ? 'blue' : 'gray'
    }
  }
}
</script>
