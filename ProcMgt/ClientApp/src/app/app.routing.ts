import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { AuthguardService } from './guards/authguard.service';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',//'dashboard',
    pathMatch: 'full',
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'base',
        loadChildren: () => import('./views/base/base.module').then(m => m.BaseModule),
        canActivate: [AuthguardService]
      },
      {
        path: 'buttons',
        loadChildren: () => import('./views/buttons/buttons.module').then(m => m.ButtonsModule),
        canActivate: [AuthguardService]
      },
      {
        path: 'charts',
        loadChildren: () => import('./views/chartjs/chartjs.module').then(m => m.ChartJSModule),
        canActivate: [AuthguardService]
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule),
        canActivate: [AuthguardService]
      },
      {
        path: 'changepassword',
        loadChildren: () => import('./views/changepassword/changepassword.module').then(m => m.ChangepasswordModule),
        canActivate: [AuthguardService]
      },
      {
        path: 'icons',
        loadChildren: () => import('./views/icons/icons.module').then(m => m.IconsModule),
        canActivate: [AuthguardService]
      },
      {
        path: 'notifications',
        loadChildren: () => import('./views/notifications/notifications.module').then(m => m.NotificationsModule),
        canActivate: [AuthguardService]
      },
      {
        path: 'theme',
        loadChildren: () => import('./views/theme/theme.module').then(m => m.ThemeModule),
        canActivate: [AuthguardService]
      },
      {
        path: 'widgets',
        loadChildren: () => import('./views/widgets/widgets.module').then(m => m.WidgetsModule),
        canActivate: [AuthguardService]
      },
      {
        path: 'quotationenter',
        loadChildren: () => import('./views/quotationenter/quotationenter.module').then(m => m.QuotationenterModule),
        canActivate: [AuthguardService]
      },
      {
        path: 'quotationapproval',
        loadChildren: () => import('./views/quotationapproval/quotationapproval.module').then(m => m.QuotationapprovalModule),
        canActivate: [AuthguardService]
      },
      {
        path: 'itemgroup',
        loadChildren: () => import('./views/itemgroup/itemgroup.module').then(m => m.ItemgroupModule),
        canActivate: [AuthguardService]
      },
      {
        path: 'itemcategory',
        loadChildren: () => import('./views/itemcategory/itemcategory.module').then(m => m.ItemcategoryModule),
        canActivate: [AuthguardService]
      },
      {
        path: 'purchaserequest',
        loadChildren: () => import('./views/purchaserequest/purchaserequest.module').then(m => m.PurchaserequestModule),
        canActivate: [AuthguardService]
      },
      {
        path: 'useraccount',
        loadChildren: () => import('./views/useraccount/useraccount.module').then(m => m.UseraccountModule),
        canActivate: [AuthguardService]
      },
      {
        path: 'suppliermaster',
        loadChildren: () => import('./views/suppliermaster/suppliermaster.module').then(m => m.SuppliermasterModule),
        canActivate: [AuthguardService]
      },
      {
        path: 'assetregistrysearch',
        loadChildren: () => import('./views/assetregistrysearch/assetregistrysearch.module').then(m => m.AssetregistrysearchModule),
        canActivate: [AuthguardService]
      },
      {
        path: 'make',
        loadChildren: () => import('./views/make/make.module').then(m => m.MakeModule),
        canActivate: [AuthguardService]
      },
      {
        path: 'model',
        loadChildren: () => import('./views/model/model.module').then(m => m.ModelModule),
        canActivate: [AuthguardService]
      },
      {
        path: 'approvalscreen',
        loadChildren: () => import('./views/approvalscreen/approvalscreen.module').then(m => m.ApprovalscreenModule),
        canActivate: [AuthguardService]
      },
      {
        path: 'quotationrequest',
        loadChildren: () => import('./views/quotationrequest/quotationrequest.module').then(m => m.QuotationrequestModule),
        canActivate: [AuthguardService]
      },
      {
        path: 'approvalflowmanagement',
        loadChildren: () => import('./views/approvalflowmanagement/approvalflowmanagement.module').then(m => m.ApprovalflowmanagementModule),
        canActivate: [AuthguardService]
      }, 
      {
        path: 'supplierselection',
        loadChildren: () => import('./views/supplierselection/supplierselection.module').then(m => m.SupplierselectionModule),
        canActivate: [AuthguardService]
      },
      {
        path: 'purchaseorder',
        loadChildren: () => import('./views/purchaseorder/purchaseorder.module').then(m => m.PurchaseorderModule),
        canActivate: [AuthguardService]
      },
      {
        path: 'issue',
        loadChildren: () => import('./views/issue/issue.module').then(m => m.IssueModule),
        canActivate: [AuthguardService]
      },
      {
        path: 'item',
        loadChildren: () => import('./views/item/item.module').then(m => m.ItemModule),
        canActivate: [AuthguardService]
      },
      {
        path: 'poapproval',
        loadChildren: () => import('./views/poapproval/poapproval.module').then(m => m.PoapprovalModule),
        canActivate: [AuthguardService]
      },
      {
        path: 'department',
        loadChildren: () => import('./views/department/department.module').then(m => m.DepartmentModule),
        canActivate: [AuthguardService]
      },
      {
        path: 'userrole',
        loadChildren: () => import('./views/userrole/userrole.module').then(m => m.UserroleModule),
        canActivate: [AuthguardService]
      },
      {
        path: 'designation',
        loadChildren: () => import('./views/designation/designation.module').then(m => m.DesignationModule),
        canActivate: [AuthguardService]
      },
      {
        path: 'company',
        loadChildren: () => import('./views/company/company.module').then(m => m.CompanyModule),
        canActivate: [AuthguardService]
      },
      {
        path: 'userroleaccers',
        loadChildren: () => import('./views/userroleaccers/userroleaccers.module').then(m => m.UserroleaccersModule),
        canActivate: [AuthguardService]
      },
      {
        path: 'tax',
        loadChildren: () => import('./views/tax/tax.module').then(m => m.TaxModule),
        canActivate: [AuthguardService]
      },
      {
        path: 'itemtypmaster',
        loadChildren: () => import('./views/itemtypmaster/itemtypmaster.module').then(m => m.ItemtypmasterModule),
        canActivate: [AuthguardService]
      },
      {
        path: 'categorymaster',
        loadChildren: () => import('./views/categorymaster/categorymaster.module').then(m => m.CategorymasterModule),
        canActivate: [AuthguardService]
      },
      {
        path: 'arnentry',
        loadChildren: () => import('./views/arnentry/arnentry.module').then(m => m.ArnentryModule),
        canActivate: [AuthguardService]
      },
      {
        path: 'approvalpatterntype',
        loadChildren: () => import('./views/approvalpatterntype/approvalpatterntype.module').then(m => m.ApprovalpatterntypeModule),
        canActivate: [AuthguardService]
      },
      {
        path: 'measurementunits',
        loadChildren: () => import('./views/measurementunits/measurementunits.module').then(m => m.MeasurementunitsModule),
        canActivate: [AuthguardService]
      },
      {
        path: 'paymentmethod',
        loadChildren: () => import('./views/paymentmethod/paymentmethod.module').then(m => m.PaymentmethodModule),
        canActivate: [AuthguardService]

      },
      {
        path: 'report',
        loadChildren: () => import('./views/report/report.module').then(m => m.ReportModule),
        canActivate: [AuthguardService]
      }

    ]
  },
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
