import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IMedicalService } from 'app/shared/model/medical-service.model';

type EntityResponseType = HttpResponse<IMedicalService>;
type EntityArrayResponseType = HttpResponse<IMedicalService[]>;

@Injectable({ providedIn: 'root' })
export class MedicalServiceService {
  public resourceUrl = SERVER_API_URL + 'api/medical-services';

  constructor(protected http: HttpClient) {}

  create(medicalService: IMedicalService): Observable<EntityResponseType> {
    return this.http.post<IMedicalService>(this.resourceUrl, medicalService, { observe: 'response' });
  }

  update(medicalService: IMedicalService): Observable<EntityResponseType> {
    return this.http.put<IMedicalService>(this.resourceUrl, medicalService, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IMedicalService>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IMedicalService[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
