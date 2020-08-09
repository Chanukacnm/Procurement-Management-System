import { Injectable } from '@angular/core';
import { Premise } from '../models/premise';

@Injectable({
  providedIn: 'root'
})
export class PremiseService {

  premiseList: Premise[];

  constructor() { }

  getpremiseList() {
    this.premiseList = [{ premiseID: "1", premiseName: "Premise 01" },
      { premiseID: "2", premiseName: "Premise 02" },
      { premiseID: "3", premiseName: "Premise 03" },
    ];
    return this.premiseList;
  }

}
