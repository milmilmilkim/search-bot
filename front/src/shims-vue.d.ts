/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue';

  interface User {
    firstName: string;
    lastName: string;
    type: 'consumer';
    createdAt?: string;
    updatedAt?: string;
  }

  const component: DefineComponent<{}, {}, any>;
  export default component;
}
