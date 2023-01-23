<script setup lang="ts">
const props = defineProps({
  btnName: { String, required: true },
});
</script>

<template>
  <button class="btn btn-outline">
    {{ props.btnName }}
  </button>
</template>
