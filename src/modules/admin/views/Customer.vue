<template>
    <div class="p-6 space-y-6">
        <h1 class="text-2xl font-bold tracking-tight">Customer Directory</h1>

        <div class="bg-white rounded-lg shadow-sm border">
            <table class="w-full text-left">
                <thead class="bg-slate-50 border-b">
                    <tr>
                        <th class="p-4 font-medium">User</th>
                        <th class="p-4 font-medium">Name</th>
                        <th class="p-4 font-medium">Email</th>
                        <th class="p-4 font-medium">Role</th>
                        <th class="p-4 font-medium">Joined</th>
                    </tr>
                </thead>
                <tbody class="divide-y">
                    <tr v-for="user in customers" :key="user._id">
                        <td class="p-4">
                            <div
                                class="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold">
                                {{ user.profile }}
                            </div>
                        </td>

                        <td class="p-4">{{ user.name }}</td>

                        <td class="p-4 text-slate-600">{{ user.email }}</td>

                        <td class="p-4">
                            <span
                                :class="user.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'"
                                class="px-2 py-1 rounded text-xs font-bold uppercase">
                                {{ user.role }}
                            </span>
                        </td>

                        <td class="p-4 text-slate-500 text-sm">
                            {{ new Date(user.createdAt).toLocaleDateString() }}
                        </td>
                    </tr>

                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from '@/api/api.js'
const customers = ref([]);

onMounted(async () => {
    try {
        const res = await api.get('/users/all'); // Update to your route
        customers.value = res.data.allUsers
        console.log(res.data.allUsers);

    } catch (err) {
        console.error("Failed to fetch customers", err);
    }
});
</script>