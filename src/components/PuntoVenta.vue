<template>
    <section class="container">
        <section class="card header-card">
            <h1 class="title">Catálogo de Productos</h1>
            <p class="subtitle">Inventario de productos tecnológicos</p>
        </section>
        
        <!-- Sección de búsqueda -->
        <section class="card search-card"> 
            <div class="search-section">
                <div class="search-input-container">
                    <i class="pi pi-search search-icon"></i>
                    <PInputText 
                        type="text" 
                        v-model="searchTerm" 
                        placeholder="Buscar por ID..." 
                        class="search-input"
                        @input="searchProducts" 
                    />
                </div>
                <PButton 
                    label="Cargar Productos" 
                    icon="pi pi-refresh" 
                    class="load-button"
                    @click="fetchProducts" 
                    :loading="loading" 
                />
            </div>
        </section>

        <!-- Lista de productos -->
        <section class="card table-card" v-if="apiProducts.length > 0">
            <div class="table-header">
                <h3 class="table-title">Productos Disponibles</h3>
                <span class="product-count">{{ filteredProducts.length }} productos</span>
            </div>
            <PDataTable 
                :value="filteredProducts" 
                paginator 
                :rows="10" 
                :rowsPerPageOptions="[5, 10, 20, 50]" 
                tableStyle="min-width: 50rem"
                class="custom-datatable"
                stripedRows
            >
                <PColumn field="id" header="ID" style="width: 15%" sortable>
                    <template #body="{ data }">
                        <span class="id-badge">{{ data.id }}</span>
                    </template>
                </PColumn>
                
                <PColumn field="name" header="Producto" style="width: 35%" sortable>
                    <template #body="{ data }">
                        <span class="product-name">{{ data.name }}</span>
                    </template>
                </PColumn>
                
                <PColumn field="capacity" header="Almacenamiento" style="width: 25%" sortable>
                    <template #body="{ data }">
                        <span v-if="data.capacity" class="capacity-info">
                            {{ data.capacity }}
                        </span>
                        <span v-else class="no-data">—</span>
                    </template>
                </PColumn>
                
                <PColumn field="color" header="Color" style="width: 25%" sortable>
                    <template #body="{ data }">
                        <span v-if="data.color" class="color-info">
                            <span class="color-dot" :style="{ backgroundColor: getColorCode(data.color) }"></span>
                            {{ data.color }}
                        </span>
                        <span v-else class="no-data">—</span>
                    </template>
                </PColumn>
            </PDataTable>
        </section>

        <!-- Mensaje cuando no hay productos -->
        <section class="card empty-card" v-else-if="!loading">
            <div class="empty-state">
                <i class="pi pi-inbox empty-icon"></i>
                <h3>No hay productos cargados</h3>
                <p>Haz click en "Cargar Productos" para ver el catálogo</p>
            </div>
        </section>

        <!-- Loading -->
        <section class="card loading-card" v-if="loading">
            <div class="loading-state">
                <i class="pi pi-spinner pi-spin loading-icon"></i>
                <h3>Cargando productos...</h3>
            </div>
        </section>
    </section>
</template>

<script>
export default {
  name: "PuntoVenta",
  data() {
    return {
      apiProducts: [],
      filteredProducts: [],
      searchTerm: "",
      loading: false
    };
  },
  methods: {
    // Método para cargar productos de la API
    async fetchProducts() {
      this.loading = true;
      try {
        const response = await fetch('https://api.restful-api.dev/objects');
        const data = await response.json();
        
        // Procesar los datos de la API
        this.apiProducts = data.map(item => {
          // Extraer color
          let color = '';
          if (item.data && item.data.color) {
            color = item.data.color;
          } else if (item.data && item.data.Color) {
            color = item.data.Color;
          } else if (item.data && item.data['Strap Colour']) {
            color = item.data['Strap Colour'];
          }
          
          // Extraer capacidad/almacenamiento
          let capacity = '';
          if (item.data && item.data.capacity) {
            capacity = item.data.capacity;
          } else if (item.data && item.data.Capacity) {
            capacity = item.data.Capacity;
          } else if (item.data && item.data['capacity GB']) {
            capacity = item.data['capacity GB'] + ' GB';
          } else if (item.data && item.data['Hard disk size']) {
            capacity = item.data['Hard disk size'];
          }
          
          return {
            id: item.id,
            name: item.name,
            color: color,
            capacity: capacity,
            originalData: item
          };
        });
        
        this.filteredProducts = [...this.apiProducts];
      } catch (error) {
        console.error('Error al cargar productos:', error);
        alert('Error al cargar los productos de la API');
      } finally {
        this.loading = false;
      }
    },

    // Método para buscar productos solo por ID
    searchProducts() {
      if (!this.searchTerm) {
        this.filteredProducts = [...this.apiProducts];
        return;
      }
      
      const term = this.searchTerm.toLowerCase();
      this.filteredProducts = this.apiProducts.filter(product =>
        product.id.toLowerCase().includes(term)
      );
    },

    // Método para obtener código de color
    getColorCode(colorName) {
      const colorMap = {
        'white': '#e9ecef',
        'cloudy white': '#f8f9fa',
        'blue': '#4dabf7',
        'purple': '#cc5de8',
        'brown': '#d68c45',
        'red': '#fa5252',
        'elderberry': '#ae3ec9',
        'black': '#495057',
        'gray': '#868e96',
        'silver': '#adb5bd',
        'gold': '#fcc419'
      };
      
      return colorMap[colorName.toLowerCase()] || '#868e96';
    }
  },
  mounted() {
    // Cargar productos automáticamente al iniciar
    this.fetchProducts();
  }
};
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
}

.card {
  background: #ffffff;
  border-radius: 12px;
  padding: 28px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  border: 1px solid #f1f3f4;
  margin-bottom: 20px;
  transition: box-shadow 0.2s ease;
}

.card:hover {
  box-shadow: 0 4px 20px rgba(0,0,0,0.12);
}

.header-card {
  text-align: center;
  background: #ffffff;
  border-bottom: 3px solid #f8f9fa;
}

.title {
  font-size: 2.2rem;
  font-weight: 600;
  margin-bottom: 8px;
  color: #2b2d42;
}

.subtitle {
  font-size: 1.1rem;
  color: #6c757d;
  font-weight: 400;
}

.search-card {
  background: #f8f9fa;
  border: 1px solid #e9ecef;
}

.search-section {
  display: flex;
  gap: 16px;
  align-items: center;
  flex-wrap: wrap;
}

.search-input-container {
  position: relative;
  flex: 1;
  min-width: 300px;
}

.search-icon {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: #6c757d;
  z-index: 2;
}

.search-input {
  width: 100%;
  padding: 14px 14px 14px 42px;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.2s ease;
  background: white;
}

.search-input:focus {
  border-color: #4dabf7;
  box-shadow: 0 0 0 2px rgba(77, 171, 247, 0.1);
  outline: none;
}

.load-button {
  background: #495057;
  border: none;
  border-radius: 8px;
  padding: 14px 24px;
  font-weight: 500;
  color: white;
  transition: all 0.2s ease;
}

.load-button:hover {
  background: #343a40;
  transform: translateY(-1px);
}

.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid #f1f3f4;
}

.table-title {
  color: #2b2d42;
  font-size: 1.4rem;
  font-weight: 600;
  margin: 0;
}

.product-count {
  background: #e9ecef;
  color: #495057;
  padding: 6px 14px;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 500;
}

.custom-datatable {
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #f1f3f4;
}

.id-badge {
  background: #495057;
  color: white;
  padding: 4px 10px;
  border-radius: 6px;
  font-weight: 500;
  font-size: 0.8rem;
  display: inline-block;
}

.product-name {
  font-weight: 500;
  color: #2b2d42;
  line-height: 1.4;
}

.capacity-info {
  background: #e7f5ff;
  color: #1971c2;
  padding: 4px 10px;
  border-radius: 6px;
  font-weight: 500;
  font-size: 0.85rem;
  display: inline-block;
}

.color-info {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
  color: #495057;
}

.color-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: inline-block;
  border: 1px solid #dee2e6;
}

.no-data {
  color: #adb5bd;
  font-style: italic;
}

.empty-state, .loading-state {
  text-align: center;
  padding: 50px 30px;
}

.empty-icon {
  font-size: 3rem;
  color: #dee2e6;
  margin-bottom: 16px;
}

.loading-icon {
  font-size: 2rem;
  color: #495057;
  margin-bottom: 16px;
}

.empty-state h3, .loading-state h3 {
  color: #6c757d;
  margin-bottom: 8px;
  font-weight: 500;
}

.empty-state p {
  color: #adb5bd;
}

/* Responsive */
@media (max-width: 768px) {
  .container {
    padding: 16px;
  }
  
  .card {
    padding: 20px;
    border-radius: 8px;
  }
  
  .title {
    font-size: 1.8rem;
  }
  
  .search-section {
    flex-direction: column;
  }
  
  .search-input-container {
    min-width: 100%;
  }
  
  .load-button {
    width: 100%;
  }
  
  .table-header {
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
  }
}
</style>