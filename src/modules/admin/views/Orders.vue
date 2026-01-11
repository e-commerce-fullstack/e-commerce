<template>
    <div class="p-8 max-w-6xl mx-auto">
        <div class="mb-10 flex justify-between items-end">
            <div>
                <h1 class="text-2xl font-extrabold tracking-tight text-slate-900">Payment Approvals</h1>
                <p class="text-slate-500 mt-2 text-lg">Cross-check the reference numbers with your bank receipts.</p>
            </div>
            <Badge variant="outline" class="px-4 py-1 text-sm font-semibold border-slate-300">
                {{ pendingPayments.length }} Pending
            </Badge>
        </div>

        <div v-if="pendingPayments.length > 0" class="grid gap-6 md:grid-cols-2">
            <Card v-for="item in pendingPayments" :key="item._id"
                class="overflow-hidden border-slate-200 transition-all hover:shadow-md">
                <CardHeader class="bg-slate-50/50 border-b pb-4">
                    <div class="flex justify-between items-center">
                        <span class="text-xs font-bold text-slate-400 uppercase tracking-widest">Order ID</span>
                        <Badge class="bg-blue-100 text-blue-700 hover:bg-blue-100 border-none px-3">QR Payment</Badge>
                    </div>
                    <CardTitle class="text-slate-800 pt-1">#{{ item.order?._id.toUpperCase() }}</CardTitle>
                </CardHeader>

                <CardContent class="pt-6">
                    <div class="space-y-4">
                        <div>
                            <span class="text-xs font-semibold text-slate-400 uppercase">Bank Transaction ID</span>
                            <div class="text-2xl font-mono font-bold text-slate-900 mt-1 select-all">
                                {{ item.transactionId }}
                            </div>
                        </div>

                        <div class="flex items-center justify-between pt-4 border-t border-slate-100">
                            <div>
                                <span class="text-xs font-semibold text-slate-400 uppercase">Amount Due</span>
                                <div class="text-3xl font-black text-green-600">${{ item.amount }}</div>
                            </div>

                            <div class="flex flex-col gap-2">
                                <Button @click="handleVerify(item.order?._id)"
                                    class="bg-blue-600 hover:bg-blue-700 px-8 py-6 text-md font-bold shadow-lg shadow-blue-200">
                                    Verify & Approve
                                </Button>
                                <button class="text-slate-400 text-xs hover:text-red-500 transition-colors">Reject Fake
                                    Ref</button>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>

        <div v-else
            class="flex flex-col items-center justify-center py-24 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/30">
            <div class="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                <CreditCard class="w-8 h-8 text-slate-300" />
            </div>
            <h3 class="text-xl font-semibold text-slate-900">All caught up!</h3>
            <p class="text-slate-500 mt-1">No new payments are waiting for verification.</p>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CreditCard } from 'lucide-vue-next'
import api from '@/api/api.js'

const pendingPayments = ref([])

// 1. Fetch the data from your Payment Controller
const fetchPending = async () => {
    try {
        // const res = await axios.get('http://localhost:4001/api/v1/payment/pending')
        const res = await api.get('/payment/pending')
        pendingPayments.value = res.data
    } catch (err) {
        console.error("Failed to fetch pending payments:", err)
    }
}

// 2. Trigger the Verify function to stop the User's Loading Spinner
const handleVerify = async (orderId) => {
    if (!confirm("Have you checked your bank account for this transaction?")) return

    try {
        // await axios.patch(`http://localhost:4001/api/v1/payment/verify/${orderId}`)
        await api.patch(`/payment/verify/${orderId}`)

        fetchPending() // Refresh UI
    } catch (err) {
        console.error("Verification failed:", err)
        alert("Error: Verification could not be completed.")
    }
}

onMounted(fetchPending)
</script>