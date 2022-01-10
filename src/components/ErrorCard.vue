<template>
  <div class="bg-red-200 w-full h-24  rounded">
    <div class="px-5 py-2 flex gap-4 items-center">
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-red-800" fill="none" viewBox="0 0 24 24"
             stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
      </div>
      <div>
        <p class="text-red-800 font-bold">Falha ao buscar usuários</p>
        <span class="text-red-700 truncate  ">{{ error }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>

const props = defineProps({
  error:{
    type: [String, Object],
    default: null
  }
})

</script>

<style scoped>

</style>