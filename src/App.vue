<template>
  <main class="app-shell">
    <RfcForm />
  </main>
</template>

<script>
import RfcForm from './components/RfcForm.vue'

export default {
  name: 'App',
  components: { RfcForm }
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