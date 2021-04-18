<template>
  <CFlex
    as="nav"
    align="center"
    justify="space-between"
    wrap="wrap"
    bg="gray.500"
    color="white"
    boxShadow="md"
    mb="3"
    padding="1.5rem">
    <CFlex align="center" mr="5">
      <CHeading as="h1" size="lg" letter-spacing="-0.1rem">
        NFT Explorer
      </CHeading>
    </CFlex>
    <CBox
      :display="{sm: 'none'}"
      @click="toggleMenu">
      <svg
        fill="white"
        width="12px"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>Menu</title>
        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
      </svg>
    </Cbox>

    <CBox
      width="auto"
      display="flex"
      align-items="center"
      flex-grow="1"
    >
      <CMenu>
        <CMenuItem>Shop</CMenuItem>
        <CMenuItem>Contacts</CMenuItem>
      </CMenu>
    </CBox>
  </CFlex>
</template>

<script>
  import {
    CBox,
    CFlex,
    CHeading,
    CMenu,
    CMenuItem
  } from '@chakra-ui/vue'

  export default {
    name: 'Header',
    components: {
      CBox,
      CFlex,
      CHeading,
      CMenu,
      CMenuItem
    },
    inject: ['$chakraColorMode', '$toggleColorMode'],
    data () {
      return {
        show: false,
        showModal: false,
        mainStyles: {
          dark: {
            bg: 'gray.700',
            color: 'whiteAlpha.900'
          },
          light: {
            bg: 'white',
            color: 'gray.900'
          }
        }
      }
    },
    computed: {
      colorMode () {
        return this.$chakraColorMode()
      },
      theme () {
        return this.$chakraTheme()
      },
      toggleColorMode () {
        return this.$toggleColorMode
      },
      toggleMenu() {
        return this.$toggleColorMode
      }
    },
  }
</script>
