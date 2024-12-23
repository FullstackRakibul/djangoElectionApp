import { createRouter, createWebHistory } from "vue-router";
import PrivateLayout from "@/layouts/PrivateLayout.vue";
import NotFound from "@/layouts/404.vue";

const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/layouts/auth/Login.vue"),
  },
  {
    path: "/",
    component: PrivateLayout,
    children: [
      {
        path: "",
        name: "dashboardTabSwitcher",
        component: () =>
          import("@/views/core/dashboard/TabSwitcher/DashboardTabSwitcher.vue"),
      },
      {
        path: "usertype_list",
        name: "usertypeList",
        component: () => import("@/views/users/UserTypeList.vue"),
      },
      {
        path: "user_list",
        name: "userList",
        component: () => import("@/views/users/UserList.vue"),
      },
      {
        path: "add_designation",
        name: "addDesignation",
        component: () => import("@/views/forms/DesignationForm.vue"),
      },
      {
        path: "add_country",
        name: "addCountry",
        component: () => import("@/views/forms/CountryForm.vue"),
      },
      {
        path: "add_company",
        name: "addCompany",
        component: () => import("@/views/forms/CompanyForm.vue"),
      },
      {
        path: "add_address",
        name: "addAddress",
        component: () => import("@/views/forms/AddressForm.vue"),
      },
      {
        path: "add_division",
        name: "addDivision",
        component: () => import("@/views/forms/DivisionForm.vue"),
      },
      {
        path: "add_citycorporation",
        name: "addCityCorporation",
        component: () => import("@/views/forms/CityCorporationForm.vue"),
      },
      {
        path: "add_district",
        name: "addDistrict",
        component: () => import("@/views/forms/DistrictForm.vue"),
      },
      {
        path: "add_upzillah",
        name: "addUpzillah",
        component: () => import("@/views/forms/UpzillahForm.vue"),
      },
      {
        path: "add_union",
        name: "addUnion",
        component: () => import("@/views/forms/UnionForm.vue"),
      },
      {
        path: "add_ward",
        name: "addWard",
        component: () => import("@/views/forms/WardForm.vue"),
      },
      {
        path: "audit-result",
        name: "auditResult",
        component: () => import("@/views/operations/AuditResult.vue"),
      },
      {
        path: "election-center",
        name: "electionCenter",
        component: () => import("@/views/core/election/ElectionCenter.vue"),
      },
      {
        path: "election-data",
        name: "electionData",
        component: () => import("@/views/core/election/ElectionData.vue"),
      },
      {
        path: "election-details",
        name: "electionDetails",
        component: () => import("@/views/core/election/ElectionDetails.vue"),
      },
      {
        path: "election-info",
        name: "electionInfo",
        component: () => import("@/views/core/election/ElectionInfo.vue"),
      },
      {
        path: "election-seat",
        name: "electionSeat",
        component: () => import("@/views/core/election/ElectionSeat.vue"),
      },
      {
        path: "election-type",
        name: "electionType",
        component: () => import("@/views/core/election/ElectionType.vue"),
      },
      {
        path: "election-party",
        name: "electionparty",
        component: () => import("@/views/forms/ElectionPartyForm.vue"),
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    name: "404",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
