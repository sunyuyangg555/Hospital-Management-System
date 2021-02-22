import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IBed } from 'app/shared/model/bed.model';

@Component({
  selector: 'jhi-bed-detail',
  templateUrl: './bed-detail.component.html',
})
export class BedDetailComponent implements OnInit {
  bed: IBed | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ bed }) => (this.bed = bed));
  }

  previousState(): void {
    window.history.back();
  }
}
