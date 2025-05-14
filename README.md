
# 🗺️ Projeto: Localizador com Vue.js + OpenStreetMap + Node.js

Este projeto exibe um mapa interativo com OpenStreetMap, permitindo que o usuário:
- Digite um endereço ou clique em um ponto no mapa.
- Envie as coordenadas geográficas (latitude e longitude) para um backend.
- Armazene os dados em um arquivo `coordenadas.json`.

---

## Estrutura do Projeto

mp/
├── public/
├── src/
│ ├── assets/
│ ├── components/
│ ├── App.vue
│ └── main.js
├── server.js
├── package.json
├── vite.config.js
└── coordenadas.json (gerado após o envio)

---

## Como rodar o projeto

### 1. Instalar dependências

```bash
npm install
```
### 2. Rodar o backend (porta 3000)

```
node server.js
```

### 3. Rodar o frontend (porta padrão 5173)

```
npm run dev
```

## Como usar

1. Na tela inicial, digite um endereço ou clique em qualquer ponto do mapa.

2. Clique no botão "Enviar Coordenadas".

3. As coordenadas selecionadas serão enviadas para o backend e salvas em coordenadas.json.

Exemplo de saída

```
{
  "lat": -23.561414,
  "lgn": -46.655881
}
```

## Requisitos

Node.js v18 ou superior

Navegador moderno

Conexão com a internet (para acessar a API de geocodificação do OpenStreetMap)
