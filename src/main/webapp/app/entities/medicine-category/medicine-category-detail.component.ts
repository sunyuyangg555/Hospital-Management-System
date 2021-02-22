import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMedicineCategory } from 'app/shared/model/medicine-category.model';

@Component({
  selector: 'jhi-medicine-category-detail',
  templateUrl: './medicine-category-detail.component.html',
})
export class MedicineCategoryDetailComponent implements OnInit {
  medicineCategory: IMedicineCategory | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ medicineCategory }) => (this.medicineCategory = medicineCategory));
  }

  previousState(): void {
    window.history.back();
  }
}
