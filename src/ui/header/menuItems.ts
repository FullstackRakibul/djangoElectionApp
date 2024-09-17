import { ref, h } from 'vue';
import {
  AuditOutlined,
  UsergroupAddOutlined,
  ReconciliationOutlined,
  DotChartOutlined,
  FundViewOutlined,
} from '@ant-design/icons-vue';

const selectedKeys = ref<string[]>(['1']);
const openKeys = ref<string[]>([]);



// Menu items with `keyPath` (route)
const items = ref([
  {
    key: '1',
    icon: () => h(FundViewOutlined),
    label: 'Election Summary',
    keyPath: '/',  // This is the route
  },
  {
    key: '2',
    icon: () => h(UsergroupAddOutlined),
    label: 'Users',
    children: [
      {
        key: '2-1',
        label: 'Users',
        keyPath: '/usertype_list',  // Route for adding a user
      },
      {
        key: '2-2',
        label: 'Add Designation',
        keyPath: '/add_designation',  // Route for user type list
      },
      {
        key: '2-3',
        label: 'User Address',
        keyPath: '/add_address',  // Route for user type list
      },

    ],
  },
  {
    key: '3',
    icon: () => h(AuditOutlined),
    label: 'Common',
    children: [
      {
        key: '3-1',
        label: 'Country',
        keyPath: '/add_country',
      },
      // {
      //   key: '3-2',
      //   label: 'Company',
      //   keyPath: '/add_company',
      // },
      {
        key: '3-3',
        label: 'Division',
        keyPath: '/add_division',
      },
      {
        key: '3-4',
        label: 'CityCorporation',
        keyPath: '/add_citycorporation',
      },
      {
        key: '3-5',
        label: 'Municipality',
        keyPath: '/add_citycorporation',
      },
      {
        key: '3-6',
        label: 'District',
        keyPath: '/add_district',
      },
      {
        key: '3-7',
        label: 'Upzilla',
        keyPath: '/add_upzillah',
      },
      {
        key: '3-8',
        label: 'Union',
        keyPath: '/add_union',
      },
      {
        key: '3-9',
        label: 'Ward',
        keyPath: '/add_ward',
      },
    ],
  },
  {
    key: '4',
    icon: () => h(DotChartOutlined),
    label: 'Operations',
    children: [
      {
        key: '4-1',
        label: 'Checking and Evaluation',
        keyPath: '/operation-dashboard',
      },
      {
        key: '4-2',
        label: 'Audit Result',
        keyPath: '/audit-result',
      },
    ],
  },
]);

export default items;