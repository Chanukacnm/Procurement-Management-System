interface NavAttributes {
  [propName: string]: any;
}
interface NavWrapper {
  attributes: NavAttributes;
  element: string;
}
interface NavBadge {
  text: string;
  variant: string;
}
interface NavLabel {
  class?: string;
  variant: string;
}

export interface NavData {
   
  id?: string;
  name?: string;
  url?: string;
  icon?: string;
  badge?: NavBadge;
  title?: boolean;
  children?: NavData[];
  variant?: string;
  attributes?: NavAttributes;
  divider?: boolean;
  class?: string;
  label?: NavLabel;
  wrapper?: NavWrapper;
}

export var navItem : NavData[];

 
//  //{
//  //  name: 'Dashboard',
//  //  url: '/dashboard',
//  //  icon: 'icon-speedometer',
//  //  badge: {
//  //    variant: 'info',
//  //    text: 'NEW'
//  //  }
//  //},
//  //{
//  //  title: true,
//  //  name: 'Administration'
//  //},
//  //{
//  //  name: 'Item Type',
//  //  url: '/itemgroup',
//  //  icon: 'icon-drop'
//  //},

//  //{
//  //  name: 'Item Category',
//  //  url: '/itemcategory',
//  //  icon: 'icon-drop'
//  //},
//  //{
//  //  name: 'Purchase Request',
//  //  url: '/purchaserequest',
//  //  icon: 'icon-drop'
//  //},
//  //{
//  //  title: true,
//  //  name: 'Theme'
//  //},
//  //{
//  //  name: 'Colors',
//  //  url: '/theme/colors',
//  //  icon: 'icon-drop'
//  //},
//  //{
//  //  name: 'Typography',
//  //  url: '/theme/typography',
//  //  icon: 'icon-pencil'
//  //},
//  //{
//  //  title: true,
//  //  name: 'Reference'
//  //},
//  //{
//  //  name: 'Department',
//  //  url: '/department',
//  //  icon: 'icon-briefcase'
//  //},
//  //{
//  //  name: 'User Role',
//  //  url: '/userrole',
//  //  icon: 'icon-user'
//  //},
//  //{
//  //  name: 'Tax',
//  //  url: '/tax',
//  //  icon: 'icon-credit-card'
//  //},
//  //{
//  //  name: 'Model',
//  //  url: '/model',
//  //  icon: 'icon-magic-wand'
//  //},
//  //{
//  //  name: 'Item Type Master',
//  //  url: '/itemtypmaster',
//  //  icon: 'icon-drop'
//  //},
//  //{
//  //  name: 'Make',
//  //  url: '/make',
//  //  icon: 'icon-magic-wand'
//  //},
//  //{
//  //  name: 'Category Master ',
//  //  url: '/categorymaster',
//  //  icon: 'icon-drawer'
//  //},
//  //{
//  //  name: 'Approval Pattern Type',
//  //  url: '/approvalpatterntype',
//  //  icon: 'icon-drawer'
//  //},
//  //{
//  //  name: 'Measurement Units',
//  //  url: '/measurementunits',
//  //  icon: 'icon-folder'
//  //},
//  //{
//  //  name: 'Payment Method',
//  //  url: '/paymentmethod',
//  //  icon: 'icon-folder'
//  //},
//  //{
//  //  title: true,
//  //  name: 'Components'
//  //},
//  //{
//  //  name: 'Base',
//  //  url: '/base',
//  //  icon: 'icon-puzzle',
//  //  children: [
//  //    {
//  //      name: 'Cards',
//  //      url: '/base/cards',
//  //      icon: 'icon-puzzle'
//  //    },
//  //    {
//  //      name: 'Carousels',
//  //      url: '/base/carousels',
//  //      icon: 'icon-puzzle'
//  //    },
//  //    {
//  //      name: 'Collapses',
//  //      url: '/base/collapses',
//  //      icon: 'icon-puzzle'
//  //    },
//  //    {
//  //      name: 'Forms',
//  //      url: '/base/forms',
//  //      icon: 'icon-puzzle'
//  //    },
//  //    {
//  //      name: 'Pagination',
//  //      url: '/base/paginations',
//  //      icon: 'icon-puzzle'
//  //    },
//  //    {
//  //      name: 'Popovers',
//  //      url: '/base/popovers',
//  //      icon: 'icon-puzzle'
//  //    },
//  //    {
//  //      name: 'Progress',
//  //      url: '/base/progress',
//  //      icon: 'icon-puzzle'
//  //    },
//  //    {
//  //      name: 'Switches',
//  //      url: '/base/switches',
//  //      icon: 'icon-puzzle'
//  //    },
//  //    {
//  //      name: 'Tables',
//  //      url: '/base/tables',
//  //      icon: 'icon-puzzle'
//  //    },
//  //    {
//  //      name: 'Tabs',
//  //      url: '/base/tabs',
//  //      icon: 'icon-puzzle'
//  //    }, 
//  //    {
//  //      name: 'Tooltips',
//  //      url: '/base/tooltips',
//  //      icon: 'icon-puzzle'
//  //    }
//  //  ]
//  //},
//  //{
//  //  name: 'Buttons',
//  //  url: '/buttons',
//  //  icon: 'icon-cursor',
//  //  children: [
//  //    {
//  //      name: 'Buttons',
//  //      url: '/buttons/buttons',
//  //      icon: 'icon-cursor'
//  //    },
//  //    {
//  //      name: 'Dropdowns',
//  //      url: '/buttons/dropdowns',
//  //      icon: 'icon-cursor'
//  //    },
//  //    {
//  //      name: 'Brand Buttons',
//  //      url: '/buttons/brand-buttons',
//  //      icon: 'icon-cursor'
//  //    }
//  //  ]
//  //},
//  //{
//  //  name: 'Charts',
//  //  url: '/charts',
//  //  icon: 'icon-pie-chart'
//  //},
//  //{
//  //  name: 'Icons',
//  //  url: '/icons',
//  //  icon: 'icon-star',
//  //  children: [
//  //    {
//  //      name: 'CoreUI Icons',
//  //      url: '/icons/coreui-icons',
//  //      icon: 'icon-star',
//  //      badge: {
//  //        variant: 'success',
//  //        text: 'NEW'
//  //      }
//  //    },
//  //    {
//  //      name: 'Flags',
//  //      url: '/icons/flags',
//  //      icon: 'icon-star'
//  //    },
//  //    {
//  //      name: 'Font Awesome',
//  //      url: '/icons/font-awesome',
//  //      icon: 'icon-star',
//  //      badge: {
//  //        variant: 'secondary',
//  //        text: '4.7'
//  //      }
//  //    },
//  //    {
//  //      name: 'Simple Line Icons',
//  //      url: '/icons/simple-line-icons',
//  //      icon: 'icon-star'
//  //    }
//  //  ]
//  //},
//  //{
//  //  name: 'Notifications',
//  //  url: '/notifications',
//  //  icon: 'icon-bell',
//  //  children: [
//  //    {
//  //      name: 'Alerts',
//  //      url: '/notifications/alerts',
//  //      icon: 'icon-envelope'
//  //    },
//  //    {
//  //      name: 'Badges',
//  //      url: '/notifications/badges',
//  //      icon: 'icon-star'
//  //    },
//  //    {
//  //      name: 'Modals',
//  //      url: '/notifications/modals',
//  //      icon: 'icon-bell'
//  //    }
//  //  ]
//  //},
//  //{
//  //  name: 'User Account ',
//  //  url: '/useraccount',
//  //  icon: 'icon-user'
//  //},
//  //{
//  //  name: 'Supplier Master ',
//  //  url: '/suppliermaster',
//  //  icon: 'icon-anchor'
//  //},
//  //{
//  //  name: 'Quotation Enter ',
//  //  url: '/quotationenter',
//  //  icon: 'icon-doc'
//  //},
//  //{
//  //  name: 'Asset Registry Search ',
//  //  url: '/assetregistrysearch',
//  //  icon: 'icon-magnifier'
//  //},
//  //{
//  //  name: 'Purchase Request Approval ',
//  //  url: '/approvalscreen',
//  //  icon: 'icon-direction'
//  //},
//  //{
//  //  name: 'Supplier Selection ',
//  //  url: '/supplierselection',
//  //  icon: 'icon-cursor'
//  //},
//  //{
//  //  name: 'Purchase Order ',
//  //  url: '/purchaseorder',
//  //  icon: 'icon-hourglass'
//  //},
//  //{
//  //  name: 'Quotation Request ',
//  //  url: '/quotationrequest',
//  //  icon: 'icon-directions'
//  //},
//  //{
//  //  name: 'Widgets',
//  //  url: '/widgets',
//  //  icon: 'icon-calculator',
//  //  badge: {
//  //    variant: 'info',
//  //    text: 'NEW'
//  //  }
//  //},
//  //{
//  //  divider: true
//  //},
//  //{
//  //  title: true,
//  //  name: 'Extras',
//  //},
//  //{
//  //  name: 'Pages',
//  //  url: '/pages',
//  //  icon: 'icon-star',
//  //  children: [
//  //    {
//  //      name: 'Login',
//  //      url: '/login',
//  //      icon: 'icon-star'
//  //    },
//  //    {
//  //      name: 'Register',
//  //      url: '/register',
//  //      icon: 'icon-star'
//  //    },
//  //    {
//  //      name: 'Error 404',
//  //      url: '/404',
//  //      icon: 'icon-star'
//  //    },
//  //    {
//  //      name: 'Error 500',
//  //      url: '/500',
//  //      icon: 'icon-star'
//  //    },
//  //  ]
//  //},
//  {
//    title: true,
//    name: 'References'
//  },
//  {
//    id: 'idCategoryMaster',
//    name: 'Category Master',
//    url: '/categorymaster',
//    icon: 'icon-options-vertical'//icon: 'icon-sitemap'
//  },
//  {
//    id: 'idMeasurementUnit',
//    name: 'Measurement Unit',
//    url: '/measurementunits',
//    icon: 'icon-speedometer'//icon: 'icon-balance-scale-right'
//  },
//  {
//    id: 'idItemTypeMaster',
//    name: 'Item Type Master',
//    url: '/itemtypmaster',
//    icon: 'icon-basket'//icon: 'icon-shopping-cart'
//  },
//  {
//    id: 'idMake',
//    name: 'Make',
//    url: '/make',
//    icon: 'icon-chemistry'//icon: 'icon-cut'
//  },
//  {
//    id: 'idModel',
//    name: 'Model',
//    url: '/model',
//    icon: 'icon-info'//icon: 'icon-car'
//  },
//  {
//    id: 'idDepartment',
//    name: 'Department',
//    url: '/department',
//    icon: 'icon-home'//icon: 'icon-university'
//  },
//  {
//    id: 'idApprovalPatternType',
//    name: 'Approval Pattern Type',
//    url: '/approvalpatterntype',
//    icon: 'icon-check'//icon: 'icon-clipboard-check'
//  },
//  {
//    id: 'idUserRole',
//    name: 'User Role',
//    url: '/userrole',
//    icon: 'icon-user'//icon: 'icon-user-tag'
//  },
//  {
//    id: 'idPaymentMethod',
//    name: 'Payment Method',
//    url: '/paymentmethod',
//    icon: 'icon-wallet'//icon: 'icon-money-check-alt'
//  },
//  {
//    id: 'idUserAccount',
//    name: 'User Account',
//    url: '/useraccount',
//    icon: 'icon-user'//icon: 'icon-user'
//  },
//  {
//    id: 'idSupplierMaster',
//    name: 'Supplier Master',
//    url: '/suppliermaster',
//    icon: 'icon-basket'//icon: 'icon-truck'
//  },
//  {
//    id: 'idUserRoleAccers',
//    name: 'User Role Accers',
//    url: '/userroleaccers',
//    icon: 'icon-user-following'//icon: 'icon-file-invoice-dollar'
//  },
//  {
//    id: 'idTax',
//    name: 'Tax',
//    url: '/tax',
//    icon: 'icon-briefcase'//icon: 'icon-file-invoice-dollar'
//  },
//  {
//    title: true,
//    name: 'Internal Request'
//  },
//  {
//    id: 'idItemRequest',
//    name: 'Item Request',
//    url: '/purchaserequest',
//    icon: 'icon-call-out'//icon: 'icon-cart-plus'
//  },
//  {
//    id: 'idApprovalScreen',
//    name: 'Approval',
//    url: '/approvalscreen',
//    icon: 'icon-check'//icon: 'icon-funnel-dollar'
//  },
//  {
//    title: true,
//    name: 'Quotation'
//  },
//  {
//    id: 'idQuotationRequest',
//    name: 'Request',
//    url: '/quotationrequest',
//    icon: 'icon-call-out'//icon: 'icon-file-invoice-dollar'
//  },
//  {
//    id: 'idQuotationEnter',
//    name: 'Quotation Entry',
//    url: '/quotationenter',
//    icon: 'icon-doc'//icon: 'icon-keyboard'
//  },
//  {
//    id: 'idSupplierSelection',
//    name: 'Supplier Selection',
//    url: '/supplierselection',
//    icon: 'icon-user-following'//icon: 'icon-tasks'
//  },
//  {
//    title: true,
//    name: 'Purchase'
//  },
//  {
//    id: 'idPurchaseOrder',
//    name: 'Purchase Order',
//    url: '/purchaseorder',
//    icon: 'icon-basket-loaded'//icon: 'icon-file-invoice'
//  },
//  {
//    id: 'idPOApproval',
//    name: 'Approval',
//    url: '/poapproval',
//    icon: 'icon-check'//icon: 'icon-check-double'
//  },
//  {
//    title: true,
//    name: 'Asset Receive'
//  },
//  {
//    id: 'idArnEntry',
//    name: 'ARN Entry',
//    url: '/arnentry',
//    icon: 'icon-notebook'//icon: 'icon-people-carry'
//  },
//  {
//    id: 'idApprovalFlowManagement',
//    name: 'Approval Flow Manage',
//    url: '/approvalflowmanagement',
//    icon: 'icon-chart'//icon: 'icon-clipboard-check'
//  }
//  //{
//  //  name: 'Disabled',
//  //  url: '/dashboard',
//  //  icon: 'icon-ban',
//  //  badge: {
//  //    variant: 'secondary',
//  //    text: 'NEW'
//  //  },
//  //  attributes: { disabled: true },
//  //}
//  //,
//  //{
//  //  name: 'Download CoreUI',
//  //  url: 'http://coreui.io/angular/',
//  //  icon: 'icon-cloud-download',
//  //  class: 'mt-auto',
//  //  variant: 'success',
//  //  attributes: { target: '_blank', rel: 'noopener' }
//  //},
//  //{
//  //  name: 'Try CoreUI PRO',
//  //  url: 'http://coreui.io/pro/angular/',
//  //  icon: 'icon-layers',
//  //  variant: 'danger',
//  //  attributes: { target: '_blank', rel: 'noopener' }
//  //}
//];
