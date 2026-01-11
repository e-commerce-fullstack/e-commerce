<template>
  <Dialog>
    <DialogTrigger asChild>
      <Button class="bg-blue-600 hover:bg-blue-700 text-white">
        <Plus class="w-4 h-4 mr-2" /> Add Product
      </Button>
    </DialogTrigger>

    <DialogContent class="sm:max-w-2xl">
      <DialogHeader>
        <DialogTitle>Add New Product</DialogTitle>
        <DialogDescription>
          The details here will be sent as FormData to match your API.
        </DialogDescription>
      </DialogHeader>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
        <div class="space-y-4">
          <div class="space-y-1">
            <label class="text-sm font-bold">Product Name (name)</label>
            <input v-model="name" placeholder="e.g. surface 3" class="w-full p-2 border rounded shadow-sm" />
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-1">
              <label class="text-sm font-bold">Price (price)</label>
              <input v-model.number="price" type="number" placeholder="899"
                class="w-full p-2 border rounded shadow-sm" />
            </div>
            <div class="space-y-1">
              <label class="text-sm font-bold">Stock (stock)</label>
              <input v-model.number="stock" type="number" placeholder="11"
                class="w-full p-2 border rounded shadow-sm" />
            </div>
          </div>

          <div class="space-y-1">
            <label class="text-sm font-bold">Category (category)</label>
            <input v-model="category" list="category-list" placeholder="e.g. laptop"
              class="w-full p-2 border rounded shadow-sm" />
            <datalist id="category-list">
              <option v-for="cat in store.categories" :key="cat.id" :value="cat.name" />
            </datalist>
          </div>
        </div>

        <div class="space-y-1">
          <label class="text-sm font-bold">Product Image (image)</label>
          <div
            class="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center bg-gray-50 min-h-[200px]">
            <template v-if="imagePreview">
              <img :src="imagePreview" class="h-32 w-auto object-contain rounded shadow-md mb-2" />
              <Button variant="ghost" size="sm" @click="clearImage" class="text-red-500">Remove</Button>
            </template>
            <template v-else>
              <input type="file" @change="handleFileChange" accept="image/*" class="text-sm" />
              <p class="text-xs text-gray-400 mt-2 text-center">Upload Image here</p>
            </template>
          </div>
        </div>
      </div>

      <DialogFooter>
        <Button variant="outline" @click="resetForm">Reset</Button>
        <Button @click="submitProduct" :disabled="loading" class="bg-blue-600">
          {{ loading ? "Creating..." : "Save Product" }}
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script setup>
import { ref } from "vue";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Plus } from "lucide-vue-next";
import { useProductStore } from "@/stores/productStore";

const store = useProductStore();
const loading = ref(false);

// Form State
const name = ref("");
const price = ref(0);
const stock = ref(0);
const category = ref("");
const imageFile = ref(null);
const imagePreview = ref(null);

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
  name.value = "";
  price.value = 0;
  stock.value = 0;
  category.value = "";
  clearImage();
};
const submitProduct = async () => {
  if (!name.value || !imageFile.value) {
    alert("Please provide a name and an image.");
    return;
  }

  loading.value = true;
  try {
    // PASS A PLAIN OBJECT ONLY
    const payload = {
      name: name.value,
      price: price.value,
      stock: stock.value,
      category: category.value,
      image: imageFile.value // This is the raw File object
    };

    await store.createProducts(payload); // Send plain object to store
    resetForm();
    alert("Product added successfully!");
  } catch (err) {
    console.error("Submission error:", err);
  } finally {
    loading.value = false;
  }
};
</script>