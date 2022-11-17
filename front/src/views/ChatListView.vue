<template>
  <h1>Conversations</h1>
  <a-list item-layout="horizontal" :data-source="data">
    <template #renderItem="{ item }">
      <a-list-item @click="() => goChatRoom(item.chatRoomId)">
        <a-list-item-meta :description="item.createdAt">
          <template #title>
            <span v-if="item.postedByUser._id !== userId" class="name">
              {{ item.postedByUser.firstName }} {{ item.postedByUser.lastName }}:
            </span>
            <span v-else class="name"> 나: </span>
            {{ item.message.messageText }}
          </template>
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
import { useRouter } from 'vue-router';
import axios from '@/utils/axios';

const router = useRouter();

const data = ref<any[]>();
const userId = ref<string>('');

userId.value = window.localStorage.getItem('userId') as string;

onMounted(() => {
  getChatRoomList();
});

const goChatRoom = (roomId: string) => {
  console.log('여기');
  router.push(`/chat/${roomId}`);
};
const getChatRoomList = async () => {
  const {
    data: { conversation },
  } = await axios.get('/room');
  data.value = conversation;
};
</script>

<style scoped>
span.name {
  font-weight: bolder;
}
</style>
