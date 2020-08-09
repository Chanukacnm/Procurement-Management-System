import { Injectable } from '@angular/core';
import { Assetcode } from '../models/assetcode';

@Injectable({
  providedIn: 'root'
})
export class AssetcodeService {

  assetCodeList: Assetcode[];
  constructor() { }

  getAssetCodeList() {

    this.assetCodeList = [{ assetCodeID: "1", assetCodeName: "Fixed Asset"},
      { assetCodeID: "2", assetCodeName: "Financial Assets"},
      { assetCodeID: "3", assetCodeName: "Current Assets"}
    ];

    return this.assetCodeList;

  }
}
