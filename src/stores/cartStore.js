import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useCartStore = defineStore("cart", ()=>{
    const cartItems = ref([])

    const addToCart = (product) =>{
        const existing = cartItems.value.find(
            (item) => item._id === product._id
        )

        if(existing){
            existing.quantity += 1
        }
        else{
            cartItems.value.push({
                ...product,
                quantity: 1
            })
        }
    }

    const removeFromCart = (productId) =>{
        cartItems.value = cartItems.value.filter((item)=>item._id !== productId._id)
    }

    const updateQuantity = (productId, quantity) => {
        const item = cartItems.value.find((i)=> i._id === productId._id)
        if(item) item.quantity = quantity  // it likes +=1
    }

    const totalPrice = computed(()=>{
        cartItems.value.reduce((total, item)=> total + item.price * item.quantity, 0)
    })

    const cartCount = computed(()=>{
        cartItems.value.reduce((total, item)=> total + item.quantity, 0)
    })
    return {addToCart, removeFromCart, updateQuantity, totalPrice, cartCount,  cartItems}
})