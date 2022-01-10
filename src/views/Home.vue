<template>
  <div class=" w-full  px-12 space-y-5">
    <div class="sticky">
      <form @submit.prevent="searchUser(search)" class="flex gap-2">
        <input type="search" v-model="search"
               class="border border-gray-700 bg-gray-800 text-gray-600 shadow px-2 py-2 rounded w-full focus:ring-emerald-500 focus:ring-2  "
               placeholder="Procure por um perfil" autocomplete="name" required>
        <button type="submit" class="bg-emerald-500 text-white rounded px-6 py-2 shadow hover:bg-emerald-600">Buscar
        </button>
      </form>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4">

      <div class="col-span-1">
        <div class="space-y-5">
          <div class="flex justify-between items-center gap-2 border-b border-gray-700 pb-3">
            <h3 class="text-lg text-white leading-6">Usuários</h3>
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
            <li v-else v-for="user in users" :key="user">
              <UserCard :user="user" :active="activeUser?.id === user.id" @showRepositories="searchRepositories" @click="activeUser = user"/>
            </li>
          </ul>
          <div class="flex justify-between items-center gap-2 border-gray-700 border-t pt-2">
            <button v-if="!isEmpty && currentPage > 1" @click="previousPage"
                    class="bg-gray-700 hover:bg-gray-800 text-gray-300 rounded px-2 py-1 text-xs"> Anterior
            </button>
            <button v-if="!isLastPage && users.length > 10" @click="nextPage"
                    class="bg-gray-700 hover:bg-gray-800 text-gray-300 rounded px-2 py-1 text-xs"> Próximo
            </button>
          </div>
        </div>
      </div>
      <div class="col-span-1">
        <div class="space-y-5">
          <div class="flex justify-between items-center gap-2 border-b border-gray-700 pb-3">
            <h3 class="text-lg text-white leading-6">Repositórios</h3>
            <span v-if="repositories.length" class="text-gray-600 text-sm">Repositórios encontrados: {{ repositories.length }}</span>
          </div>
          <ul class="space-y-5  overflow-x-auto divide-y divide-gray-700">
            <li v-if="isLoadingRepositories">
              <LoadingCard/>
            </li>
            <li v-else-if="error">
              <ErrorCard/>
            </li>
            <li v-else-if="isNotFound">
              <p>Não encontrado</p>
            </li>
            <li v-else v-for="repository in repositories" :key="repository.id">
              <RepositoryCard :repository="repository"/>
            </li>
          </ul>
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
import RepositoryCard from "../components/RepositoryCard.vue";

const isLoadingUser = ref(false);
const error = ref(null);
const search = ref('');
const users = ref([]);
const totalUsers = ref(0);
const currentPage = ref(1);
const activeUser = ref(null);
const isNotFound = ref(false);

function searchUser(name) {
  isLoadingUser.value = true;
  error.value = null;
  isNotFound.value = false;

  fetch(`https://api.github.com/search/users?q=${name}&page=${currentPage.value}&per_page=10`)
      .then((response) => response.json())
      .then((data) => {

        if (data.total_count === 0) isNotFound.value = true;

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

const isLoadingRepositories = ref(false);
const repositories = ref([]);
function searchRepositories(user) {
  isLoadingRepositories.value = true;
  fetch(`https://api.github.com/users/${user}/repos`)
      .then((response) => response.json())
      .then((data) => {
        repositories.value = data;
      }).catch((error) => {
    console.log('Error:', error);
  }).finally(() => {
    isLoadingRepositories.value = false;
  });
}


</script>

