import UserTypeList from '@/views/users/UserTypeList.vue';
import ElectionOperation from '@/views/core/ElectionOperation.vue';
import CRUDCountry from '@/views/forms/CRUD.Country.vue';
import Login from '@/layouts/auth/Login.vue';
import PrivateLayout from '@/layouts/PrivateLayout.vue';
import NotFound from '@/layouts/404.vue'
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory('/#/'),
  routes: [
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/",
      component: PrivateLayout,
      children: [
        {
          path: "",
          name: "electionOperation",
          component: ElectionOperation
        },
        {
          path: "/usertype_list",
          name: "usertypeList",
          component: UserTypeList,
        },
        {
          path: "/add_country",
          name: "addCountry",
          component: CRUDCountry,
        },
        
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      name: "404",
      component: NotFound,
    }
  ],
});

export default router;
