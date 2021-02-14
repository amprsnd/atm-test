<template>
  <b-navbar type="dark" variant="dark" class="justify-content-between">
    <b-navbar-brand tag="h1" class="mb-0">ATM test</b-navbar-brand>
    <span class="navbar-text">
      Доступно: {{ total }}&#8372;
    </span>
  </b-navbar>
</template>

<script>
import { BNavbar, BNavbarBrand } from 'bootstrap-vue'

export default {
  name: 'TheHeader',
  props: {
    total: Number
  },
  components: {
    BNavbar,
    BNavbarBrand
  }
}
</script>

<style lang="scss">

</style>
