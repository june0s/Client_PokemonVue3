import { Layout, Login, Register } from "@/views/account";

export default {
  path: "/account",
  component: Layout,
  children: [
    { path: "", redirect: "login" },
    { path: "login", component: Login }, // <route-view> 자리에 login view 가 나온다.
    { path: "register", component: Register },
  ],
};
