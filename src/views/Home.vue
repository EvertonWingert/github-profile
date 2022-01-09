<template>
  <div class="sm:w-1/3 w-full sm:px-0 px-2">
    <div class="space-y-5">
      <form @submit.prevent="searchUser(search)" class="flex gap-2">
        <input type="search" v-model="search"
               class="border border-gray-700 bg-gray-800 text-gray-600 shadow px-2 py-2 rounded w-full focus:ring-emerald-500 focus:ring-2  "
               placeholder="Procure por um perfil" autocomplete="name" required>
        <button type="submit" class="bg-emerald-500 text-white rounded px-6 py-2 shadow hover:bg-emerald-600">Buscar
        </button>
      </form>

      <div class="space-y-5">
        <div class="flex justify-between items-center gap-2 border-b border-gray-700 pb-3">
          <h3 class="text-lg text-white leading-6">Usuário</h3>
          <span v-if="users.length" class="text-gray-600 text-sm">Usuários encontrados: {{ totalUsers }}</span>
        </div>
        <ul class="space-y-5  overflow-x-auto divide-y divide-gray-700">
          <li v-if="isLoadingUser">
            <LoadingCard/>
          </li>
          <li v-else-if="error">
            <ErrorCard/>
          </li>
          <li v-if="isNotFound">
            <p>Não encontrado</p>
          </li>
          <li v-else v-for="user in users" :key="user" >
            <UserCard :user="user"/>
          </li>
        </ul>
        <div class="flex justify-between items-center gap-2 border-gray-700 border-t pt-2">
          <button v-if="!isEmpty && currentPage > 1" @click="previousPage"
                  class="bg-gray-700 hover:bg-gray-800 text-gray-300 rounded px-2 py-1 text-xs"> Anterior
          </button>
          <button v-if="!isLastPage" @click="nextPage"
                  class="bg-gray-700 hover:bg-gray-800 text-gray-300 rounded px-2 py-1 text-xs"> Próximo
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {computed, ref, watch} from "vue";

import UserCard from "../components/UserCard.vue";
import ErrorCard from "../components/ErrorCard.vue";
import LoadingCard from "../components/LoadingCard.vue";

const isLoadingUser = ref(false);
const error = ref(null);
const search = ref('');
const users = ref([]);
const totalUsers = ref(0);
const currentPage = ref(1);

const isNotFound = ref(false);

function searchUser(name) {
  isLoadingUser.value = true;
  error.value = null;
  isNotFound.value = false;

  fetch(`https://api.github.com/search/users?q=${name}&page=${currentPage.value}&per_page=10`)
      .then((response) => response.json())
      .then((data) => {

        if(data.total_count === 0) isNotFound.value = true;

        users.value = data.items;
        totalUsers.value = data.total_count;
      }).catch((error) => {
    error.value = error;
    console.log('Error:', error);
  }).finally(() => {
    isLoadingUser.value = false;
  });

}



function nextPage() {
  currentPage.value++;
}

function previousPage() {
  //return if current page is 1
  if (currentPage.value === 1) return;

  currentPage.value--;
}

watch(() => currentPage.value, () => {
  searchUser(search.value);
});


const isEmpty = computed(() => {
  return !users.value.length;
});

const isLastPage = computed(() => {
  return isEmpty.value;
});


</script>

