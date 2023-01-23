<script setup lang="ts">
import axios from "axios";
import vehicleInterface from "../util/VehiclesInterface";
import { useRouter } from "vue-router";

const router = useRouter();
const formData = reactive<vehicleInterface>({
  make: "",
  model: "",
  variant: "",
  body: "",
});

// Api call to add New Vehicle
const add = () => {
  axios.post(`http://localhost:4000/vehicles/addVehicle`, formData);
  router.push({ path: `/` });
};
</script>

<template>
  <!-- Navbar -->
  <div class="flex justify-center items-center">
    <div class="navbar flex justify-center">
      <a class="btn btn-ghost normal-case text-3xl">Add New Vehicle</a>
    </div>
  </div>

  <!-- New Vehicle Form -->
  <div class="flex justify-center">
    <div class="w-full max-w-xs">
      <form class="px-8 pt-6 pb-8 mb-4">
        <!-- MAKE -->
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2">
            Make
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="make"
            type="text"
            placeholder="Enter Make"
            v-model="formData.make"
            required
          />
        </div>
        <!-- MODEL -->
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2">
            Model
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="model"
            type="text"
            placeholder="Enter Model"
            v-model="formData.model"
            required
          />
        </div>
        <!-- VARIANT -->
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2">
            Variant
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="variant"
            type="text"
            placeholder="Enter Variant"
            v-model="formData.variant"
            required
          />
        </div>
        <!-- BODY -->
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2">
            Bodytype
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="bodytype"
            type="text"
            placeholder="Enter Bodytype"
            v-model="formData.body"
            required
          />
        </div>
        <!-- Submit Button -->
        <div class="mb-4 mt-10">
          <button
            class="btn btn-wide btn-outline"
            @click="add()"
            :disabled="
              formData.make === '' ||
              formData.model === '' ||
              formData.variant === '' ||
              formData.body === ''
            "
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
