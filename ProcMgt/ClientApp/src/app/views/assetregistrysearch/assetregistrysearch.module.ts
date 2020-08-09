import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AssetregistrysearchComponent } from './assetregistrysearch.component';
import { AssetregistrysearchRoutingModule } from './assetregistrysearch-routing.module';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  declarations: [AssetregistrysearchComponent],
  imports: [
    FormsModule,
    CommonModule,
    AssetregistrysearchRoutingModule,
    AgGridModule.withComponents()
  ]
})
export class AssetregistrysearchModule { }
