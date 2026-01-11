<template>
    <div class="flex h-screen bg-slate-50 overflow-hidden">
        <AdminSidebar />
        <div class="flex-1 overflow-y-auto">
            <router-view />
        </div>
    </div>
</template>

<script setup>
import AdminSidebar from '../components/AdminSidebar.vue'
</script>