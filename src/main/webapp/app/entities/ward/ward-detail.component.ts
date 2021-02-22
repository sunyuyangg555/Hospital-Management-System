import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IWard } from 'app/shared/model/ward.model';

@Component({
  selector: 'jhi-ward-detail',
  templateUrl: './ward-detail.component.html',
})
export class WardDetailComponent implements OnInit {
  ward: IWard | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ ward }) => (this.ward = ward));
  }

  previousState(): void {
    window.history.back();
  }
}
