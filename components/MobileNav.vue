<template>
  <CFragment>
    <CIconButton
      :display="['inline-flex', 'inline-flex', 'none']"
      aria-label="Navigation Menu"
      font-size="20px"
      variant="ghost"
      @click="toggleMenu"
    />
    <CDrawer size="xs" :is-open="isOpen" placement="left" :on-close="handleClose">
      <CDrawerOverlay />
      <CDrawerContent>
        <CDrawerBody pos="relative" p="0" overflow-y="scroll" h="100vh">
          <CCloseButton pos="absolute" top="4" right="4" @click="handleClose" />
        </CDrawerBody>
      </CDrawerContent>
    </CDrawer>
  </CFragment>
</template>

<script>
import { CDrawer, CFragment, CCloseButton, CDrawerBody, CIconButton, CDrawerOverlay, CDrawerContent } from '@chakra-ui/vue'

export default {
  name: 'MobileNav',
  components: {
    CDrawer,
    CDrawerBody,
    CDrawerOverlay,
    CDrawerContent,
    CIconButton,
    CFragment,
    CCloseButton
  },
  data () {
    return {
      isOpen: false
    }
  },
  methods: {
    toggleMenu () {
      this.isOpen = !this.isOpen
    },
    handleClose () {
      this.isOpen = false
    }
  }
}
</script>
