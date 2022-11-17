<template>
  <div v-if="!token">
    <h1>add user</h1>
    <form @submit.prevent="addUser">
      <input v-model="firstName" type="text" placeholder="first name" :disabled="!!userId" />
      <input v-model="lastName" type="text" placeholder="last name" :disabled="!!userId" />
      <button :disabled="!!userId" type="submit">submit</button>
    </form>

    <h1>login</h1>
    <form @submit.prevent="login">
      <input v-model="userId" disabled />
      <button v-if="userId" @click="login">login</button>
      <button v-if="userId" @click="removeId">clear</button>
    </form>
  </div>
  <div v-else>
    <h1>profile</h1>
    <dt>first name</dt>
    <dd>{{ userProfile?.firstName }}</dd>
    <dt>last name</dt>
    <dd>{{ userProfile?.lastName }}</dd>
    <dt>createdAt</dt>
    <dd>{{ userProfile?.createdAt }}</dd>
    <br />
    <button @click="logout">logout</button>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted } from 'vue';
import axios from '@/utils/axios';
import { helperNameMap } from '@vue/compiler-core';

let firstName = ref<string>('');
let lastName = ref<string>('');
let userId = ref<string>((window.localStorage.getItem('userId') as string) || '');
let token = ref<string>((window.localStorage.getItem('token') as string) || '');
let userProfile = ref<User>();

onMounted(() => {
  getMyProfile();
});

watch(
  () => token.value,
  () => {
    getMyProfile();
  }
);

interface User {
  firstName: string;
  lastName: string;
  type: 'consumer';
  createdAt?: string;
  updatedAt?: string;
}

const login = async (): Promise<void> => {
  const userId = window.localStorage.getItem('userId');
  const {
    data: { authorization },
  } = await axios.post(`/login/${userId}`);

  token.value = authorization;
  window.localStorage.setItem('token', authorization);
};
const addUser = async () => {
  const { data } = await axios.post('/users', {
    firstName: firstName.value,
    lastName: lastName.value,
    type: 'consumer',
  } as User);

  if (data?.success) {
    const { user } = data;
    userId.value = user._id;
    window.localStorage.setItem('userId', userId.value.toString());
  }
};

const removeId = () => {
  userId.value = '';
  window.localStorage.removeItem('userId');
};

const removeToken = () => {
  token.value = '';
  window.localStorage.removeItem('token');
};

const logout = () => {
  removeToken();
};

const getMyProfile = async (): Promise<void> => {
  if (token.value) {
    try {
      const {
        data: { user },
      } = await axios.get(`/users/${userId.value}`);
      userProfile.value = {
        firstName: user.firstName,
        lastName: user.lastName,
        type: user.type,
        createdAt: user.createdAt,
      } as User;
    } catch (err) {
      console.error(err);
    }
  }
};
</script>
