<template>
  <main class="app-shell">
    <PuntoVenta />
  </main>
</template>

<script>
import PuntoVenta from './components/PuntoVenta.vue'

export default {
  name: 'App',
  components: { PuntoVenta }
}
</script>

<style scoped>
.app-shell {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: linear-gradient(135deg, #eef7f3 0%, #f7fafc 100%);
}
</style>