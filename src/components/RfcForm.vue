<template>
  <section class="card">
    <h1 class="title">Generador de RFC</h1>

    <form @submit.prevent="generarRFC" class="form">
      <div class="field">
        <label>Nombre</label>
        <input v-model="nombre" type="text" required placeholder="Ej. JUAN" />
      </div>

      <div class="field">
        <label>Apellido paterno</label>
        <input v-model="apellidoP" type="text" required placeholder="Ej. PÉREZ" />
      </div>

      <div class="field">
        <label>Apellido materno</label>
        <input v-model="apellidoM" type="text" required placeholder="Ej. LÓPEZ" />
      </div>

      <div class="field">
        <label>Fecha de nacimiento</label>
        <input v-model="fecha" type="date" required />
      </div>

      <button class="btn" type="submit">Generar RFC</button>
    </form>

    <div v-if="rfc" class="result">
      <h2>RFC generado</h2>
      <p class="rfc">{{ rfc }}</p>
    </div>
  </section>
</template>

<script>
export default {
  name: "RfcForm",
  data() {
    return {
      nombre: "",
      apellidoP: "",
      apellidoM: "",
      fecha: "",
      rfc: ""
    };
  },
  methods: {
    generarRFC() {
      const nom = this.nombre.trim().toUpperCase();
      const apP = this.apellidoP.trim().toUpperCase();
      const apM = this.apellidoM.trim().toUpperCase();
      const fecha = this.fecha.replaceAll("-", "").slice(2); // YYMMDD
      this.rfc = apP.slice(0, 2) + (apM[0] || "") + (nom[0] || "") + fecha;
    }
  }
};
</script>

<style scoped>
.card {
  width: 100%;
  max-width: 520px;
  background: #ffffff;
  border-radius: 16px;
  padding: 28px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.08);
  border: 1px solid #eef1f5;
}

.title {
  margin: 0 0 18px;
  font-size: 24px;
  font-weight: 800;
  color: #2a6b56;
  text-align: center;
  letter-spacing: 0.3px;
}

.form {
  display: grid;
  gap: 14px;
}

.field label {
  display: block;
  font-size: 13px;
  color: #56606b;
  margin-bottom: 6px;
}

.field input {
  width: 100%;
  border: 1px solid #dfe3ea;
  border-radius: 10px;
  padding: 10px 12px;
  font-size: 15px;
  background: #fafbfc;
  outline: none;
  transition: box-shadow .15s ease, border-color .15s ease;
}

.field input:focus {
  border-color: #3fb27f;
  box-shadow: 0 0 0 3px rgba(63,178,127,0.15);
  background: #fff;
}

.btn {
  margin-top: 4px;
  width: 100%;
  border: none;
  background: #3fb27f;
  color: #fff;
  font-weight: 700;
  padding: 12px 14px;
  border-radius: 12px;
  cursor: pointer;
  transition: transform .06s ease, background .15s ease;
}

.btn:hover { background: #329a6c; }
.btn:active { transform: translateY(1px); }

.result {
  margin-top: 18px;
  padding: 14px 16px;
  background: #f2fbf6;
  border: 1px solid #d6f0e2;
  border-radius: 12px;
}

.result h2 {
  margin: 0 0 4px;
  font-size: 16px;
  color: #2a6b56;
}

.rfc {
  margin: 0;
  font-size: 22px;
  font-weight: 800;
  letter-spacing: 1px;
  color: #184b3a;
  text-align: center;
}
</style>