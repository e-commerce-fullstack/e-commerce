<script setup>
import { Button } from '@/components/ui/button'
import { CreditCard, Package, Users, LogOut } from 'lucide-vue-next'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const handleLogout = async () => {
    await authStore.logoutUser()
    router.push('/login')
}

// Helper to highlight the active link
const isActive = (path) => route.path === path
</script>

<template>
    <aside class="w-64 border-r bg-white h-full flex flex-col shadow-sm">
        <div class="p-6 font-bold text-xl tracking-tight border-b text-slate-900 flex items-center gap-2">
            <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white text-xs">A</div>
            Store Admin
        </div>
        <nav class="flex-1 p-4 space-y-1">
            <Button :variant="isActive('/admin/payments') ? 'secondary' : 'ghost'"
                class="w-full justify-start gap-3 px-4 py-6 cursor-pointer " @click="router.push('/admin/payments')">
                <CreditCard class="w-5 h-5" />
                Verify Payments
            </Button>

            <Button :variant="isActive('/admin/products') ? 'secondary' : 'ghost'"
                class="w-full justify-start gap-3 px-4 py-6 cursor-pointer " @click="router.push('/admin/products')">
                <Package class="w-5 h-5" />
                Products
            </Button>

            <Button :variant="isActive('/admin/customer') ? 'secondary' : 'ghost'"
                @click="router.push('/admin/customer')"
                class="w-full justify-start gap-3 px-4 py-6 hover:text-slate-900 cursor-pointer ">
                <Users class="w-5 h-5" />
                Customers
            </Button>
        </nav>

        <div class="p-4 border-t">
            <Button variant="ghost" @click="handleLogout"
                class="w-full justify-start gap-3 text-red-500 hover:bg-red-50 hover:text-red-600">
                <LogOut class="w-5 h-5" />
                Logout
            </Button>
        </div>
    </aside>
</template>