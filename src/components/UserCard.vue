<template>
  <a :href="user.html_url" target="_blank">
    <div class="flex gap-2 hover:bg-gray-800 py-2 px-2">
      <img :src="user.avatar_url" class="w-12"/>
      <div>
        <span class="text-gray-200 text-sm">{{ user.login }}</span>
      </div>
    </div>
    <div>
      <ul class="list-disc" v-if="repos.length">
        <li v-if="isLoading">
          <LoadingCard/>
        </li>
        <li v-else v-for="repo in repos">
          <p>{{repo.name}} - {{repo.description}}</p>
          <span>language</span>
        </li>
      </ul>
    </div>

  </a>
</template>

<script setup>
import {ref, watch} from "vue";
import LoadingCard from "./LoadingCard.vue";

const props = defineProps({
  user: {
    type: Object,
    required: true
  },
});
const isLoading = ref(false);
const repos = ref([]);


function searchRepo(user) {
  isLoading.value = true;
  fetch(`https://api.github.com/users/${user}/repos`)
      .then((response) => response.json())
      .then((data) => {
        repos.value = data;
      }).catch((error) => {
    console.log('Error:', error);
  }).finally(() => {
    isLoading.value = false;
  });
}

searchRepo(props.user.login);


</script>
