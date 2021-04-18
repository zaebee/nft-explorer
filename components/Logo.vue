<template>
  <svg
    class="NftLogo"
    height="2rem"
    fill="none"
    display="inline-block"
    stroke="currentcolor"
    data-chakra-component="CIcon"
    xmlns="http: //www.w3.org/2000/svg"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    viewBox="0 0 24 24"
    role="presentation">
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <path d="M16 10a4 4 0 0 1-8 0"></path>
  </svg>
</template>

<style>
  .NftLogo{
    display: inline-block;
    animation: 1s appear;
    margin: auto;
      margin-right: 0.3rem;
  }

  @keyframes appear {
    0% {
      opacity: 0;
    }
  }
</style>
