import { Injectable } from '@angular/core';
import { Status } from '../models/status';


@Injectable({
  providedIn: 'root'
})
export class StatusService {
  statusList: Status[];

  constructor() { }

  getStatusList() {

    this.statusList = [{ statusID: "1", statusName: "Active" },
      { statusID: "2", statusName: "Inactive" },
    { statusID: "3", statusName: "Delete" }
    ];
    return this.statusList;
  }
}
