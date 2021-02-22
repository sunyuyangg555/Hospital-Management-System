import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMedicineGroup } from 'app/shared/model/medicine-group.model';

@Component({
  selector: 'jhi-medicine-group-detail',
  templateUrl: './medicine-group-detail.component.html',
})
export class MedicineGroupDetailComponent implements OnInit {
  medicineGroup: IMedicineGroup | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ medicineGroup }) => (this.medicineGroup = medicineGroup));
  }

  previousState(): void {
    window.history.back();
  }
}
