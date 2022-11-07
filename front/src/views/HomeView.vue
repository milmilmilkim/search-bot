<template>
  <h1>add user</h1>
  <form @submit.prevent="addUser">
    <input v-model="firstName" type="text" placeholder="first name" />
    <input v-model="lastName" type="text" placeholder="last name" />
    <button type="submit">submit</button>
  </form>
  <input disabled />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import axios from '@/utils/axios';

let firstName = ref<String>('');
let lastName = ref<String>('');

interface UserParams {
  firstName: String;
  lastName: String;
  type: 'consumer';
}

const addUser = async () => {
  const { data } = await axios.post('/users', {
    firstName: firstName.value,
    lastName: lastName.value,
    type: 'consumer',
  } as UserParams);

  if (data?.success) {
    const { user } = data.user;
    console.log(user);
  }
};
</script>
