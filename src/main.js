import { createApp } from 'vue'
import PrimeVue from "primevue/config";
import App from './App.vue'

// SOLO PrimeIcons - sin CSS de temas por ahora
import 'primeicons/primeicons.css'

// Importa los componentes que necesitas
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import InputNumber from 'primevue/inputnumber';

const app = createApp(App);

app.use(PrimeVue);

// Registra componentes globalmente
app.component('PButton', Button);
app.component('PInputText', InputText);
app.component('PDataTable', DataTable);
app.component('PColumn', Column);
app.component('PInputNumber', InputNumber);

app.mount('#app')