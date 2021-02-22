import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IConsultationResource } from 'app/shared/model/consultation-resource.model';

@Component({
  selector: 'jhi-consultation-resource-detail',
  templateUrl: './consultation-resource-detail.component.html',
})
export class ConsultationResourceDetailComponent implements OnInit {
  consultationResource: IConsultationResource | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ consultationResource }) => (this.consultationResource = consultationResource));
  }

  previousState(): void {
    window.history.back();
  }
}
