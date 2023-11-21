<script setup>
import { storeToRefs } from "pinia";

import { useAlertStore } from "@/stores"; // @ : src 를 의미

const alertStore = useAlertStore();
const { alert } = storeToRefs(alertStore);
</script>

<template>
  <div v-if="alert" class="container">
    <div class="m-3">
      <!-- :class javascript 의 동적인 변수구나, v-bind 가 생략된 것 -->
      <div class="alert alert-dismissable" :class="alert.type">
        <button @click="alertStore.clear()" class="btn btn-link close">
          &times;
        </button>
        {{ alert.message }}
      </div>
    </div>
  </div>
</template>
