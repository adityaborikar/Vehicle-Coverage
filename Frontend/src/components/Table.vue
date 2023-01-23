<script setup lang="ts">
const props = defineProps({
  data: { type: Array, required: true },
});

let dataFromProps;

const pagination: any = reactive({
  currentPage: 1,
  perPage: 10,
  totalPages: computed(() => Math.ceil(props.data.length / pagination.perPage)),
});

const paginatedData = computed(() => {
  const { currentPage, perPage } = pagination;
  const start = (currentPage - 1) * perPage;
  const stop = start + perPage;

  return props.data.slice(start, stop);
});

watch(
  () => pagination.totalPages,
  () => (pagination.currentPage = 1)
);

onMounted(() => {
  dataFromProps = props.data;
});
</script>

<template>
  <!-- Table -->
  <div class="w-[80%] mx-auto">
    <div class="flex justify-center flex-col">
      <div class="overflow-x-auto">
        <table class="table w-[1200px]">
          <thead>
            <tr>
              <th class="text-base text-left w-[180px]">Make</th>
              <th class="text-base text-left w-[320px]">Model</th>
              <th class="text-base text-left w-[520px]">Variant</th>
              <th class="text-base text-left w-[180px]">Body</th>
            </tr>
          </thead>
          <tbody>
            <tr class="hover" v-for="data in paginatedData">
              <td class="text-left w-[180px]">{{ data.make }}</td>
              <td class="text-left w-[320px]">{{ data.model }}</td>
              <td class="text-left w-[520px]">{{ data.variant }}</td>
              <td class="text-left w-[180px]">{{ data.body }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="w-full mt-3 mb-5">
        <div class="flex justify-between flex-row">
          <!-- Page No. Info -->
          <div class="flex justify-start items-center">
            <span class="font-semibold">
              Page {{ pagination.currentPage }} of {{ pagination.totalPages }}
            </span>
          </div>

          <!-- Navigation Buttons -->
          <div class="flex justify-end">
            <div class="btn-group grid grid-cols-2">
              <!-- Previous Button -->
              <button
                class="btn btn-outline"
                :disabled="pagination.currentPage <= 1"
                @click="pagination.currentPage--"
              >
                Previous
              </button>
              <!-- Next Button -->
              <button
                class="btn btn-outline"
                :disabled="pagination.currentPage >= pagination.totalPages"
                @click="pagination.currentPage++"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
