<template>
  <div id="app">
    <h1>Selecione um ponto ou digite um endereço</h1>

    <div class="form">
      <input v-model="address" placeholder="Digite um endereço" />
      <button @click="geocodeAddress">Buscar</button>
    </div>

    <div id="map" class="map"></div>

    <div class="actions">
      <button @click="sendCoordinates">Enviar Coordenadas</button>
      <p v-if="lat && lng">Latitude: {{ lat }}, Longitude: {{ lng }}</p>
    </div>
  </div>
</template>

<script>
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default {
  data() {
    return {
      address: "",
      map: null,
      marker: null,
      lat: null,
      lng: null,
    };
  },
  mounted() {
    this.map = L.map("map").setView([0, 0], 2);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(this.map);

    this.map.on("click", (e) => {
      this.setMarker(e.latlng.lat, e.latlng.lng);
    });
  },
  methods: {
    async geocodeAddress() {
      if (!this.address) return;

      const query = encodeURIComponent(this.address);
      const url = `https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=1`;

      try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.length === 0) {
          alert("Endereço não encontrado.");
          return;
        }

        const result = data[0];
        this.setMarker(parseFloat(result.lat), parseFloat(result.lon));
        this.map.setView([result.lat, result.lon], 14);
      } catch (err) {
        alert("Erro ao buscar o endereço.");
      }
    },

    setMarker(lat, lng) {
      this.lat = lat;
      this.lng = lng;

      if (this.marker) this.marker.remove();
      this.marker = L.marker([lat, lng]).addTo(this.map);
    },

    async sendCoordinates() {
      if (!this.lat || !this.lng) {
        alert("Selecione um ponto ou digite um endereço.");
        return;
      }

      try {
        const res = await fetch("http://localhost:3000/salvar", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ lat: this.lat, lgn: this.lng }),
        });

        const msg = await res.text();
        alert(msg);
      } catch (err) {
        alert("Erro ao enviar dados.");
      }
    },
  },
};
</script>

<style>
body {
  margin: 0;
  font-family: Arial, sans-serif;
}

#app {
  padding: 20px;
  max-width: 800px;
  margin: auto;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

.form {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

input {
  flex: 1;
  padding: 10px;
  font-size: 16px;
}

button {
  padding: 10px 16px;
  font-size: 16px;
  cursor: pointer;
  background-color: #1976d2;
  color: white;
  border: none;
  border-radius: 4px;
}

button:hover {
  background-color: #135ba1;
}

.map {
  height: 500px;
  border: 2px solid #ccc;
  border-radius: 6px;
}

.actions {
  margin-top: 20px;
  text-align: center;
}
</style>
