import { ref, h } from "vue";
import {
  AuditOutlined,
  UsergroupAddOutlined,
  SisternodeOutlined,
  DotChartOutlined,
  FundViewOutlined,
  TableOutlined,
  DatabaseOutlined,
  FundProjectionScreenOutlined,
  ClusterOutlined,
  DeploymentUnitOutlined,
  ForkOutlined,
  UserSwitchOutlined,
  UsergroupDeleteOutlined,
  UserAddOutlined,
  ReconciliationOutlined
} from "@ant-design/icons-vue";

const selectedKeys = ref<string[]>(["1"]);
const openKeys = ref<string[]>([]);

// Menu items with `keyPath` (route)
const items = ref([
  {
    key: "1",
    icon: () => h(FundViewOutlined),
    label: "Election Summary",
    keyPath: "/", // This is the route
  },
  {
    key: "2",
    icon: () => h(UsergroupAddOutlined),
    label: "Users",
    children: [
      {
        key: "2-1",
        label: "Users",
        keyPath: "/usertype_list",
        icon: () => h(UserSwitchOutlined),
        children: [
          {
            key: "2-1-1",
            label: "User Type",
            keyPath: "/usertype_list",
            icon: () => h(UsergroupDeleteOutlined),
          },
          {
            key: "2-1-2",
            label: "Users",
            keyPath: "/user_list",
            icon: () => h(UserAddOutlined),
          },
        ]
      },
      {
        key: "2-3",
        label: "User Address",
        keyPath: "/add_address", // Route for user type list
        icon: () => h(ForkOutlined),
      },
      {
        key: "2-4",
        label: "Party Details",
        keyPath: "/election-party", // Route for user type list
        icon: () => h(ForkOutlined),
      },
    ],
  },
  {
    key: "3",
    icon: () => h(AuditOutlined),
    label: "Common",

    children: [
      {
        key: "3-1",
        label: "Country",
        keyPath: "/add_country",
        icon: () => h(ReconciliationOutlined),
      },
      {
        key: "3-3",
        label: "Division",
        keyPath: "/add_division",
        icon: () => h(ReconciliationOutlined),
      },
      {
        key: "3-4",
        label: "District",
        keyPath: "/add_district",
        icon: () => h(ReconciliationOutlined),
      },
      {
        key: "3-5",
        label: "Municipality",
        keyPath: "/#",
        icon: () => h(ReconciliationOutlined),
      },
      {
        key: "3-6",
        label: "CityCorporation",
        keyPath: "/#",
        icon: () => h(ReconciliationOutlined),
      },
      {
        key: "3-7",
        label: "Upzilla",
        keyPath: "/add_upzillah",
        icon: () => h(ReconciliationOutlined),
      },
      {
        key: "3-8",
        label: "Union",
        keyPath: "/add_union",
        icon: () => h(ReconciliationOutlined),
      },
      {
        key: "3-9",
        label: "Ward",
        keyPath: "/add_ward",
        icon: () => h(ReconciliationOutlined),
      },
    ],
  },
  {
    key: "4",
    icon: () => h(DotChartOutlined),
    label: "Operations",
    children: [
      {
        key: "4-1",
        label: "Checking and Evaluation",
        keyPath: "/#",
        icon: () => h(ForkOutlined),
      },
      {
        key: "4-2",
        label: "Audit Result",
        keyPath: "/audit-result",
        icon: () => h(ForkOutlined),
      },
    ],
  },
  {
    key: "5",
    icon: () => h(SisternodeOutlined),
    label: "Election",
    children: [
      {
        key: "5-1",
        icon: () => h(ClusterOutlined),
        label: "নির্বাচন কেন্দ্র",
        keyPath: "/election-center",
      },
      {
        key: "5-2",
        icon: () => h(DatabaseOutlined),
        label: "নির্বাচনী তথ্য",
        keyPath: "/election-data",
      },
      {
        key: "5-3",
        icon: () => h(TableOutlined),
        label: "নির্বাচন ও তথ্যের বিবরণ",
        keyPath: "/election-details",
      },
      {
        key: "5-4",
        icon: () => h(FundProjectionScreenOutlined),
        label: "নির্বাচন",
        keyPath: "/election-info",
      },
      {
        key: "5-5",
        icon: () => h(DeploymentUnitOutlined),
        label: " আসন সমূহ",
        keyPath: "/election-seat",
      },
      {
        key: "5-6",
        icon: () => h(ForkOutlined),
        label: "নির্বাচনের ধরন",
        keyPath: "/election-type",
      },
    ],
  },
]);

export default items;
