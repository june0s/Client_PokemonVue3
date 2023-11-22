<template>
  <h1>Users</h1>
  <router-link to="/users/add" class="btn btn-sm btn-success mb-2"
    >Add User</router-link
  >
  <table class="table table-striped">
    <thead>
      <tr>
        <th style="width: 30%">First Name</th>
        <th style="width: 30%">Last Name</th>
        <th style="width: 30%">Username</th>
        <th style="width: 30%">Role</th>
        <th style="width: 10%"></th>
      </tr>
    </thead>
    <tbody>
      <template v-if="users.length > 0">
        <div>{{ params.pageNo }} /{{ pageCount }}</div>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.firstName }}</td>
          <td>{{ user.lastName }}</td>
          <td>{{ user.username }}</td>
          <td>{{ user.role }}</td>
          <td style="white-space: nowrap">
            <router-link
              :to="`/users/edit/${user.id}`"
              class="btn btn-sm btn-primary mr-1"
              >Edit</router-link
            >
            <button
              @click="usersStore.delete(user.id)"
              class="btn btn-sm btn-danger btn-delete-user"
              :disabled="user.isDeleting"
            >
              <span
                v-if="user.isDeleting"
                class="spinner-border spinner-border-sm"
              ></span>
              <span v-else>Delete</span>
            </button>
          </td>
        </tr>
      </template>
      <tr v-if="users.loading">
        <td colspan="4" class="text-center">
          <span class="spinner-border spinner-border-lg align-center"></span>
        </td>
      </tr>
      <tr v-if="users.error">
        <td colspan="4">
          <div class="text-danger">Error loading users: {{ users.error }}</div>
        </td>
      </tr>
    </tbody>
  </table>
  <nav class="mt-5" aria-label="Page navigation example">
    <ul class="pagination justify-content-center">
      <li class="page-item" :class="{ disabled: !(params.pageNo > 1) }">
        <a
          class="page-link"
          href="#"
          aria-label="Previous"
          @click.prevent="--params.pageNo"
        >
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <template v-if="pageCount >= 1">
        <li
          v-for="page in pageCount"
          :key="page"
          class="page-item"
          :class="{ active: params.pageNo === page }"
        >
          <a class="page-link" href="#" @click.prevent="params.pageNo = page">{{
            page
          }}</a>
        </li>
      </template>
      <li class="page-item" :class="{ disabled: !(params.pageNo < pageCount) }">
        <a
          class="page-link"
          href="#"
          aria-label="Next"
          @click.prevent="++params.pageNo"
        >
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { reactive, watch, computed, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useUsersStore } from "@/stores";

// reactive 반응형으로 동작하는 객체 선언. 변수의 값이 바뀌면 인지.
const params = reactive({
  pageNo: 0,
  pageSize: 3,
});

const usersStore = useUsersStore();
// pageInfo: 서버에서 준 page 관련 객체
const { users, pageInfo } = storeToRefs(usersStore);

//const totalCount = pageInfo.totalElements;
// computed 로 감싸면, totalElements 나 pageSize 에 변동이 있을 때 계산한다.
const pageCount = computed(() =>
  Math.ceil(pageInfo.value.totalElements / params.pageSize)
);
// 화면이 마운트 되면 호출.
onMounted(() => {
  fetchData();
  //pageCount.value = Math.ceil(pageInfo.value.totalElements / params.pageSize)
});

const fetchData = () => {
  if (params.pageNo >= 1) {
    // jpa 페이징 처리가 0부터 시작해서
    console.log("pageNo가 1보다 크면 빼기");
    const newParams = {
      ...params, // pageNo 외의 내용도 펼쳐지는 것.
      pageNo: params.pageNo - 1,
    };
    usersStore.getAll(newParams);
  } else {
    usersStore.getAll(params);
  }
};

// pageNo 가 바뀌는 것을 watch, 바뀌면 fetch 한다.
watch(() => params.pageNo, fetchData);
</script>
