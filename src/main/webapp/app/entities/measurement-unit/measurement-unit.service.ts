import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IMeasurementUnit } from 'app/shared/model/measurement-unit.model';

type EntityResponseType = HttpResponse<IMeasurementUnit>;
type EntityArrayResponseType = HttpResponse<IMeasurementUnit[]>;

@Injectable({ providedIn: 'root' })
export class MeasurementUnitService {
  public resourceUrl = SERVER_API_URL + 'api/measurement-units';

  constructor(protected http: HttpClient) {}

  create(measurementUnit: IMeasurementUnit): Observable<EntityResponseType> {
    return this.http.post<IMeasurementUnit>(this.resourceUrl, measurementUnit, { observe: 'response' });
  }

  update(measurementUnit: IMeasurementUnit): Observable<EntityResponseType> {
    return this.http.put<IMeasurementUnit>(this.resourceUrl, measurementUnit, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IMeasurementUnit>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IMeasurementUnit[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
