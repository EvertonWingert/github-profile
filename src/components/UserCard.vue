<template>
  <div @click="showRepositories(user.login)">
    <div class="flex gap-2 hover:bg-gray-800 py-2 px-2 border " :class="[active ? 'border-emerald-500' : 'border-transparent']">
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
  active:{
    type: Boolean,
    default: false
  }
});
const emit = defineEmits(['showRepositories']);


function showRepositories(user){
  emit("showRepositories", user);
}



</script>
