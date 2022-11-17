<template>
  <div class="message" ref="messageRef">
    <div v-for="item in conversation">
      <span v-if="item.postedByUser._id !== userId" class="name">
        {{ item.postedByUser.firstName }} {{ item.postedByUser.lastName }}
      </span>
      <span v-else class="name">나</span>
      {{ item.message.messageText }}
    </div>
  </div>
  <div>
    <form @submit.prevent="onSubmit">
      <input type="text" v-model="message" />
      <button>submit</button>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, Ref, nextTick } from 'vue';
import { useRoute } from 'vue-router';
import axios from '@/utils/axios';
import { io } from 'socket.io-client';

const route = useRoute();
const roomId = route.params.id as string;
const userId = ref<string>(window.localStorage.getItem('userId') as string);
const message = ref<string>('');
const conversation: Ref<Conversation[] | null> = ref(null);
const messageRef = ref<HTMLDivElement>();

type Conversation = {
  createdAt: string;
  message: {
    messageText: string;
  };
  postedByUser: User;
  readByRecipients: any[];
  type: string;
  updatedAt: string;
  _v: number;
  _id: string;
};

const socket = io('http://localhost:4000');

socket.on('new message', async ({ message }) => {
  conversation.value?.push(message);
  await nextTick(() => {
    messageRef.value!.scrollTo({ top: messageRef!.value!.scrollHeight, behavior: 'smooth' });
  });
});

onMounted(async () => {
  const { data } = await axios.get(`/room/${roomId}`);
  console.log(data);
  conversation.value = data.conversation;
  // 유저에 넣기
  socket.emit('identity', window.localStorage.getItem('userId'));
  // 구독
  socket.emit(
    'subscribe',
    roomId,
    data.users.map((v: any) => v._id)
  );
});

const onSubmit = async () => {
  axios.post(`room/${roomId}/message`, {
    messageText: message.value,
  });

  message.value = '';
};
</script>

<style scoped>
.message {
  height: 500px;
  overflow-y: scroll;
  width: 100%;
}

span.name {
  font-weight: bolder;
}

input {
  width: 100%;
}
</style>
