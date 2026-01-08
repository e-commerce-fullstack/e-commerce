<script setup>
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-vue-next'
import { useProductStore } from '@/stores/productStore';

// 1. Define the props to receive the ID from the parent
const props = defineProps({
  productId: {
    type: String,
    required: true
  }
});

const productsStore = useProductStore()

const emitDelete = async () => {
  // 2. Use props.productId instead of product._id
  await productsStore.deletedProduct(props.productId)
  productsStore.fetchProducts(productsStore.page)
}
</script>

<template>
  <AlertDialog>
    <AlertDialogTrigger as-child>
      <Button variant="ghost" size="icon" class="text-red-500 hover:text-red-600 hover:bg-red-50">
        <Trash2 class="w-4 h-4" />
      </Button>
    </AlertDialogTrigger>

    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Delete product?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete the product from the database.
        </AlertDialogDescription>
      </AlertDialogHeader>

      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction @click="emitDelete" class="bg-red-600 hover:bg-red-700">
          Delete
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>