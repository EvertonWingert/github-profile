<template>
  <div @click="showRepositories(user.login)">
    <div class="flex gap-2 hover:bg-gray-800 py-2 px-2">
      <img :src="user.avatar_url" class="w-12"/>
      <div>
        <span class="text-gray-200 text-sm">{{ user.login }}</span>
      </div>
    </div>
  </div>

</template>

<script setup>
const props = defineProps({
  user: {
    type: Object,
    required: true
  },
});
const emit = defineEmits(['onPressed']);


function showRepositories(user){
  emit("onPressed", user);
}



</script>
