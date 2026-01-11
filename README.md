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
│   ├─ api.js        
│   └─ orders.js          # createOrder, getAllOrder
│
├─ stores/                # Pinia stores
│   ├─ authStore.js
│   ├─ productStore.js
│   ├─ cartStore.js
│   └─ orderStore.js
│
├─ views/                 
│   ├─ auth/
│   │   ├─ Login.vue
│   │   ├─ Register.vue
│   ├─ auth/
│   │   ├─ Home.vue
│   │   ├─ CreateProduct.vue
│   │   ├─ Checkout.vue
│   │   └─ Order.vue 
│
├─ components/            # Reusable components
│   ├─ cart/
│   │   ├─  CartEmpty.vue
│   │   ├─  CartFooter.vue
│   │   ├─  CartItem.vue
│   │   ├─  CartHeader.vue
│   │   ├─  CartSidebar.vue
│   └─ ui/
│       ├─  BaseButton.vue
│       ├─  BaseInput.vue
│       ├─  BaseModal.vue
│
├─ router/
│   └─ index.js           # Define routes
│
├─ App.vue
└─ main.js

```

# new architecture 
```
src/
├─ api/
│   ├─ auth.js
│   ├─ products.js
│   ├─ orders.js
│   └─ api.js
│
├─ stores/                 # global (no DB)
│   ├─ authStore.js
│   ├─ productStore.js
│   ├─ cartStore.js        # cart state + localStorage
│   └─ orderStore.js
│
├─ modules/
│   ├─ auth/
│   │   └─ views/
│   │       ├─ Login.vue
│   │       └─ Register.vue
│   │
│   ├─ shop/
│   │   └─ views/
│   │       ├─ Home.vue
│   │       ├─ Checkout.vue
│   │       └─ Order.vue
│   │
│   ├─ admin/
│   │   ├─ views/
│   │   │   ├─ Dashboard.vue
│   │   │   ├─ Products.vue
│   │   │   ├─ CreateProduct.vue
│   │   │   ├─ Orders.vue
│   │   │   └─ Users.vue
│   │   └─ components/
│   │       ├─ AdminSidebar.vue
│   │       └─ AdminHeader.vue
│
├─ components/
│   ├─ cart/
│   │   ├─ CartEmpty.vue
│   │   ├─ CartFooter.vue
│   │   ├─ CartItem.vue
│   │   ├─ CartHeader.vue
│   │   └─ CartSidebar.vue
│   └─ ui/
│       ├─ BaseButton.vue
│       ├─ BaseInput.vue
│       └─ BaseModal.vue
│
├─ router/
│   └─ index.js
│
├─ App.vue
└─ main.js

```