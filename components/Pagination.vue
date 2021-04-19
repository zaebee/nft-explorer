<template>
  <c-button-group :spacing="4">
    <c-box v-for="page in pages" :key="page" as="span">
      <c-button variant-color="blue" size="sm" @click="changePage(page)">
        {{ page }}
      </c-button>
    </c-box>
  </c-button-group>
</template>

<script lang="js">
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
  props: [
    'pages'
  ],
  data () {
    return {
      activePage: 1
    }
  },
  methods: {
    changePage (page) {
      console.log('changing page..', page)
    }
  }
}
</script>
