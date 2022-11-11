<template>
  <h1>add user</h1>
  <form @submit.prevent="addUser">
    <input v-model="firstName" type="text" placeholder="first name" />
    <input v-model="lastName" type="text" placeholder="last name" />
    <button type="submit">submit</button>
  </form>
  <input v-model="userId" disabled />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import axios from '@/utils/axios';

console.log("hello!")
let firstName = ref<String>('');
let lastName = ref<String>('');
let userId = ref<String>('');

interface UserParams {
  firstName: String;
  lastName: String;
  type: 'consumer';
}

const login = async () => {
  const userId = window.localStorage.getItem('userId');
  const {
    data: { authorization: token },
  } = await axios.post(`/login/${userId}`);

  window.localStorage.setItem('token', token);
};
const addUser = async () => {
  const { data } = await axios.post('/users', {
    firstName: firstName.value,
    lastName: lastName.value,
    type: 'consumer',
  } as UserParams);

  if (data?.success) {







    
    const { user } = data;
    userId.value = user._id;
    window.localStorage.setItem('userId', userId.value.toString());
    await login();
  }
};
</script>
