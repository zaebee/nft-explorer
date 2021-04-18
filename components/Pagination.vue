<template>
  <c-button-group :spacing="4">
    <c-box as="span" v-for="page in pages" :key="page">
      <c-button @click="changePage(page)" variant-color="blue" size="sm">{{ page }}</c-button>
    </c-box>
  </c-button-group>
</template>

<script lang="js">
  import {
    CButton,
    CButtonGroup,
    CBox,
  } from '@chakra-ui/vue'

  export default {
    name: 'Pagination',
    components: {
      CButton,
      CButtonGroup,
      CBox,
    },
    props: [
      'pages'
    ],
    data () {
      return {
        activePage: 1,
      }
    },
    methods: {
      changePage (page) {
        console.log('changing page..', page)
      }
    }
  }
</script>
