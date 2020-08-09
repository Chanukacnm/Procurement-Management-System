import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy, DatePipe } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { JwtHelperService, JWT_OPTIONS } from "@auth0/angular-jwt"; 
import { MatDialog, MatDialogRef, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material'




import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

import { AppComponent } from './app.component';

// Import containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';

const APP_CONTAINERS = [
  DefaultLayoutComponent
];



import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from '@coreui/angular';

// Import routing module
import { AppRoutingModule } from './app.routing';

// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts';
import { ActionpopupComponent } from './views/actionpopup/actionpopup.component';
import { ActionpopupModule } from './views/actionpopup/actionpopup.module';
import { PurchaserequestModule } from './views/purchaserequest/purchaserequest.module';
import { PurchaserequestComponent } from './views/purchaserequest/purchaserequest.component';
import { SuppliermasterComponent } from './views/suppliermaster/suppliermaster.component';
import { SuppliermasterModule } from './views/suppliermaster/suppliermaster.module';
import { RfqpopupModule } from './views/rfqpopup/rfqpopup.module';
import { RfqpopupComponent } from './views/rfqpopup/rfqpopup.component';
import { ArnpopupModule } from './views/arnpopup/arnpopup.module';
import { ArnpopupComponent } from './views/arnpopup/arnpopup.component';
import { QuotationattachedpopupModule } from './views/quotationattachedpopup/quotationattachedpopup.module';
import { QuotationattachedpopupComponent } from './views/quotationattachedpopup/quotationattachedpopup.component';
import { AuthguardService } from './guards/authguard.service';
import { PurchaseorderModule } from './views/purchaseorder/purchaseorder.module';
import { PurchaseorderComponent } from './views/purchaseorder/purchaseorder.component';
import { PoapprovalpopupModule } from './views/poapprovalpopup/poapprovalpopup.module';
import { PoapprovalpopupComponent } from './views/poapprovalpopup/poapprovalpopup.component';
import { DeletepopupModule } from './views/deletepopup/deletepopup.module';
import { DeletepopupComponent } from './views/deletepopup/deletepopup.component';
import { ApprovalscreenrequestviewModule } from './views/approvalscreenrequestview/approvalscreenrequestview.module';
import { ApprovalscreenrequestviewComponent } from './views/approvalscreenrequestview/approvalscreenrequestview.component';
import { QuotationenterviewModule } from './views/quotationenterview/quotationenterview.module';
import { QuotationenterviewComponent } from './views/quotationenterview/quotationenterview.component';
//import { PoreportComponent } from './views/poreport/poreport.component';





import { ButtonRenderer } from './views/renderer/button-renderer/button-renderer.component';
import { SecondeditbuttonRenderer } from './views/renderer/button-renderer/secondeditbutton-renderer.component';
import { CancelbuttonRenderer } from './views/renderer/button-renderer/cancelbutton-renderer.component';
import { DeleteButtonRenderer } from './views/renderer/button-renderer/deletebutton-renderer.component';
import { SeconddeletebuttonRenderer } from './views/renderer/button-renderer/seconddeletebutton-renderer.component';
import { ThirddeletebuttonRenderer } from './views/renderer/button-renderer/thirddeletebutton-renderer.component';
import { MoredetailsbuttonRenderer } from './views/renderer/button-renderer/moredetailsbutton-renderer.component';
import { RfqbuttonRenderer } from './views/renderer/button-renderer/rfqbutton-renderer.component';
import { CheckboxRenderer } from './views/renderer/button-renderer/checkbox-renderer.component';
import { QuotationattachedpopupRenderer } from './views/renderer/button-renderer/quotationattachedpopup-renderer.component';
import { CheckboxsaveRenderer } from './views/renderer/button-renderer/checkboxsave-renderer.component';
import { ActionbuttonRenderer } from './views/renderer/button-renderer/actionbutton-renderer.component';
import { IssueactionbuttonRenderer } from './views/renderer/button-renderer/issueactionbutton-renderer.component';
import { SecondSelectionCheckboxRenderer } from './views/renderer/button-renderer/second-selection-checkbox-renderer.component';
import { PoapprovalpopupRendererComponent } from './views/renderer/button-renderer/poapprovalpopup-renderer.component';
import { QuotationenterRendererComponent } from './views/renderer/button-renderer/quotationenter-renderer.component';
import { ThirdselectioncheckboxRenderer } from './views/renderer/button-renderer/thirdselectioncheckbox-renderer.component';
import { AggroupcellRenderer } from './views/renderer/button-renderer/aggroupcell-renderer.component';
import { RaisepobuttonRenderer } from './views/renderer/button-renderer/raisepobutton-renderer.component';
import { RemovebuttonRenderer } from './views/renderer/button-renderer/removebutton-renderer.component';
import { ArnButtonrenderer } from './views/renderer/button-renderer/arn-buttonrenderer.component';
import { AttachbuttonRenderer } from './views/renderer/button-renderer/attachbutton-renderer.component';
import { DatepickerRenderer } from './views/renderer/button-renderer/datepicker-renderer.component';


 


@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    MatDialogModule,
    MatTabsModule,
    FormsModule,
    HttpClientModule,
    ActionpopupModule,
    PurchaserequestModule,
    SuppliermasterModule,
    RfqpopupModule,
    ArnpopupModule,
    QuotationattachedpopupModule,
    PurchaseorderModule,
    PoapprovalpopupModule,
    DeletepopupModule,
    ApprovalscreenrequestviewModule,
    QuotationenterviewModule
    

  ],
  exports: [
    MatDialogModule,
    MatTabsModule,
    ButtonRenderer,
    SecondeditbuttonRenderer,
    CancelbuttonRenderer,
    DeleteButtonRenderer,
    SeconddeletebuttonRenderer,
    ThirddeletebuttonRenderer,
    MoredetailsbuttonRenderer,
    RfqbuttonRenderer,
    CheckboxRenderer,
    QuotationattachedpopupRenderer,
    CheckboxsaveRenderer,
    ActionbuttonRenderer,
    IssueactionbuttonRenderer,
    SecondSelectionCheckboxRenderer,
    PoapprovalpopupRendererComponent,
    QuotationenterRendererComponent,
    ThirdselectioncheckboxRenderer,
    AggroupcellRenderer,
    RaisepobuttonRenderer,
    RemovebuttonRenderer,
    ArnButtonrenderer,
    AttachbuttonRenderer,
    DatepickerRenderer
  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    P404Component,
    P500Component,
    LoginComponent,
    RegisterComponent,
    ActionpopupComponent,
    RfqpopupComponent,
    ArnpopupComponent,
    QuotationattachedpopupComponent,
    PoapprovalpopupComponent,
    ButtonRenderer,
    SecondeditbuttonRenderer,
    CancelbuttonRenderer,
    DeleteButtonRenderer,
    SeconddeletebuttonRenderer,
    ThirddeletebuttonRenderer,
    MoredetailsbuttonRenderer,
    RfqbuttonRenderer,
    CheckboxRenderer,
    QuotationattachedpopupRenderer,
    CheckboxsaveRenderer,
    ActionbuttonRenderer,
    IssueactionbuttonRenderer,
    SecondSelectionCheckboxRenderer,
    PoapprovalpopupRendererComponent,
    QuotationenterRendererComponent,
    ThirdselectioncheckboxRenderer,
    AggroupcellRenderer,
    DeletepopupComponent,
    ApprovalscreenrequestviewComponent,
    QuotationenterviewComponent,
    RaisepobuttonRenderer,
    RemovebuttonRenderer,
    ArnButtonrenderer,
    AttachbuttonRenderer,
    DatepickerRenderer,
    //PoreportComponent

    
  ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy,
    
  },
    { provide: DatePipe},
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: [] }
    , JwtHelperService],

  bootstrap: [AppComponent],
  entryComponents: [SuppliermasterComponent, ActionpopupComponent, PurchaserequestComponent, RfqpopupComponent,
    ArnpopupComponent, QuotationattachedpopupComponent, ButtonRenderer, SecondeditbuttonRenderer, CancelbuttonRenderer, DeleteButtonRenderer, SeconddeletebuttonRenderer,
    ThirddeletebuttonRenderer, MoredetailsbuttonRenderer, RfqbuttonRenderer, CheckboxRenderer, QuotationattachedpopupRenderer,
    CheckboxsaveRenderer, ActionbuttonRenderer, IssueactionbuttonRenderer, PurchaseorderComponent, SecondSelectionCheckboxRenderer,
    PoapprovalpopupRendererComponent, PoapprovalpopupComponent, QuotationenterRendererComponent,
    ThirdselectioncheckboxRenderer, AggroupcellRenderer, DeletepopupComponent, ApprovalscreenrequestviewComponent, QuotationenterviewComponent,
    RaisepobuttonRenderer, RemovebuttonRenderer, ArnButtonrenderer, AttachbuttonRenderer, DatepickerRenderer] 
})
export class AppModule { }
