<template>
  <Dialog>
    <DialogTrigger asChild>
      <Button v-if="isEdit" variant="ghost" size="icon" class="text-slate-500 hover:text-blue-600">
        <Edit class="w-4 h-4" />
      </Button>
      <Button v-else class="bg-blue-600 hover:bg-blue-700 text-white">
        <Plus class="w-4 h-4 mr-2" /> Add Product
      </Button>
    </DialogTrigger>

    <DialogContent class="sm:max-w-2xl">
      <DialogHeader>
        <DialogTitle>{{ isEdit ? 'Edit Product' : 'Add New Product' }}</DialogTitle>
        <DialogDescription>
          {{ isEdit ? 'Update the existing product information.' : 'Enter details to list a new product in the store.' }}
        </DialogDescription>
      </DialogHeader>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
        <div class="space-y-4">
          <div class="space-y-1">
            <label class="text-sm font-bold">Product Name</label>
            <input v-model="form.name" placeholder="e.g. Surface Pro 9" class="w-full p-2 border rounded shadow-sm" />
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-1">
              <label class="text-sm font-bold">Price ($)</label>
              <input v-model.number="form.price" type="number" class="w-full p-2 border rounded shadow-sm" />
            </div>
            <div class="space-y-1">
              <label class="text-sm font-bold">Stock</label>
              <input v-model.number="form.stock" type="number" class="w-full p-2 border rounded shadow-sm" />
            </div>
          </div>

          <div class="space-y-1">
            <label class="text-sm font-bold">Category</label>
            <select v-model="form.category" class="w-full p-2 border rounded shadow-sm bg-white">
              <option value="" disabled>Select a category</option>
              <option v-for="cat in productStore.categories" :key="cat" :value="cat">{{ cat }}</option>
            </select>
          </div>
        </div>

        <div class="space-y-1">
          <label class="text-sm font-bold">Product Image</label>
          <div class="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center bg-gray-50 min-h-[220px]">
            <template v-if="imagePreview">
              <img :src="imagePreview" class="h-32 w-auto object-contain rounded shadow-md mb-2" />
              <Button variant="ghost" size="sm" @click="clearImage" class="text-red-500 hover:bg-red-50">Remove & Replace</Button>
            </template>
            <template v-else>
              <label class="cursor-pointer flex flex-col items-center">
                <input type="file" @change="handleFileChange" accept="image/*" class="hidden" />
                <div class="p-3 bg-white rounded-full shadow-sm border mb-2">
                  <Plus class="w-6 h-6 text-gray-400" />
                </div>
                <span class="text-xs text-gray-500">Click to upload image</span>
              </label>
            </template>
          </div>
        </div>
      </div>

      <DialogFooter>
        <Button variant="outline" @click="">Cancel</Button>
        <Button @click="submitProduct" :disabled="loading" class="bg-blue-600 hover:bg-blue-700">
          {{ loading ? "Processing..." : (isEdit ? "Update Product" : "Save Product") }}
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { useProductStore } from "@/stores/productStore";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Plus, Edit } from "lucide-vue-next";

const props = defineProps({
  product: {
    type: Object,
    default: null
  }
});

const productStore = useProductStore();
const isEdit = computed(() => !!props.product);
const loading = ref(false);

const form = ref({
  name: "",
  price: 0,
  stock: 0,
  category: "",
});

const imageFile = ref(null);
const imagePreview = ref(null);

// Watch the prop to fill the form for Edit or clear it for Add
watch(() => props.product, (newVal) => {
  if (newVal) {
    form.value = {
      name: newVal.name,
      price: newVal.price,
      stock: newVal.stock,
      category: newVal.category,
    };
    imagePreview.value = newVal.image; // Existing URL from backend
    imageFile.value = null; // Important: reset the file picker state
  } else {
    // resetForm();
  }
}, { immediate: true });

const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    imageFile.value = file;
    imagePreview.value = URL.createObjectURL(file);
  }
};

const clearImage = () => {
  imageFile.value = null;
  imagePreview.value = null;
};

const resetForm = () => {
  form.value = { name: "", price: 0, stock: 0, category: "" };
  imageFile.value = null;
  imagePreview.value = null;
};

const submitProduct = async () => {
  if (!form.value.name) return alert("Product name is required");

  loading.value = true;
  try {
    const payload = { ...form.value };
    
    // Only send 'image' property if a new file was actually picked
    if (imageFile.value) {
      payload.image = imageFile.value;
    }

    if (isEdit.value) {
      await productStore.updateProductStore(props.product._id, payload);
      alert("Product updated successfully!");
    } else {
      if (!imageFile.value) return alert("Image is required for new products");
      await productStore.createProducts(payload);
      alert("Product added successfully!");
      // resetForm();
    }
  } catch (err) {
    console.error("Submission failed:", err);
  } finally {
    loading.value = false;
  }
};
</script>