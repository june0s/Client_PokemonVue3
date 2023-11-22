import { Layout, List, AddEdit } from "@/views/users";

export default {
  path: "/users",
  component: Layout,
  children: [
    { path: "", component: List },
    { path: "add", component: AddEdit },
    { path: "edit/:id", component: AddEdit },
  ], // /users 가 호출되면 매핑되는 component 가 List 다.
};
