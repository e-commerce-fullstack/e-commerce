# e-commerce

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd) 
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

```

src/
├─ api/                   # All API calls
│   ├─ auth.js            # register, login
│   ├─ products.js        # createProduct, getAllProduct, getProductById
│   └─ orders.js          # createOrder, getAllOrder
│
├─ stores/                # Pinia stores
│   ├─ authStore.js
│   ├─ productStore.js
│   └─ orderStore.js
│
├─ views/                 # Pages for router
│   ├─ Home.vue
│   ├─ Login.vue
│   ├─ Register.vue
│   ├─ ProductList.vue
│   ├─ ProductDetail.vue
│   ├─ CreateProduct.vue
│   ├─ OrderList.vue
│   └─ CreateOrder.vue
│
├─ components/            # Reusable components
│   ├─ Header.vue
│   ├─ Footer.vue
│   └─ ProductCard.vue
│
├─ router/
│   └─ index.js           # Define routes
│
├─ App.vue
└─ main.js
```