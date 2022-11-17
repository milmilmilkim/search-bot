<template>
  <h1>All Users</h1>
  <a-list item-layout="horizontal" :data-source="data">
    <template #renderItem="{ item }">
      <a-list-item @click="createRoom(item._id)">
        <a-list-item-meta :description="item.createdAt">
          <template #title> {{ item.firstName }} {{ item.lastName }} </template>
          <!-- <template #avatar>
            <a-avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
          </template> -->
        </a-list-item-meta>
      </a-list-item>
    </template>
  </a-list>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from '@/utils/axios';

const route = useRoute();
const router = useRouter();

const data = ref<User[]>();
onMounted(() => {
  getUserList();
});

const getUserList = async () => {
  const {
    data: { users },
  } = await axios.get('/users');
  data.value = users.filter((v: User) => v._id !== window.localStorage.getItem('userId'));
};

const createRoom = async (userId: string) => {
  const {
    data: {
      chatRoom: { chatRoomId },
    },
  } = await axios.post('/room/initiate', {
    userIds: [userId, window.localStorage.getItem('userId')],
    type: 'consumer-to-consumer',
  });

  console.log(chatRoomId);
  router.push(`chat/${chatRoomId}`);
};
</script>
