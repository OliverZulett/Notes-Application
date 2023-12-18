<script setup lang="ts">
import router from '../router/index';
import { useUserStore } from '../stores/userStore';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

const user = ref('')
const profileId = ref('')

const store = useUserStore()
const { username, userId } = storeToRefs(store)
user.value = username.value
profileId.value = userId.value

const handleLogout = (event) => {
  localStorage.clear();
  router.push('/login')
}

const unsubscribe = store.$onAction(
  ({
    name,
    store,
    args,
    after,
    onError,
  }) => {

    if (name === 'loadUser') {
      user.value = args[0].username
    }

    onError((error) => {
      console.warn(
        `Failed "${name}" after ${Date.now() - startTime}ms.\nError: ${error}.`
      )
    })
  }
)

</script>
<template>
  <div class="p-3">
    <div class="navbar bg-secondary text-primary-content rounded-box">
      <div class="navbar-start">
        <div class="flex-1">
          <router-link to="/">
            <h1 class="text-2xl font-semibold px-4">Notes App</h1>
          </router-link>
        </div>
      </div>
      <div class="navbar-center hidden lg:flex"></div>
      <div class="navbar-end">
        <label>Hi {{ user }}!</label>
        <div class="flex">
          <div class="dropdown dropdown-end ml-3">
            <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
              <div class="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <font-awesome-icon class="text-2xl mt-2" icon="fa-solid fa-user" />
              </div>
            </div>
            <ul class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-secondary rounded-box w-40">
              <li>
                <router-link class="hover:bg-neutral hover:text-neutral-content"
                  :to="{ name: 'profile', params: { profileId: userId } }">Profile</router-link>
              </li>
              <li>
                <button @click="handleLogout" class="hover:bg-neutral hover:text-neutral-content">Logout</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
