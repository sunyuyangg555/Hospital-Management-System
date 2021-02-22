import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IMedicineGroup } from 'app/shared/model/medicine-group.model';

type EntityResponseType = HttpResponse<IMedicineGroup>;
type EntityArrayResponseType = HttpResponse<IMedicineGroup[]>;

@Injectable({ providedIn: 'root' })
export class MedicineGroupService {
  public resourceUrl = SERVER_API_URL + 'api/medicine-groups';

  constructor(protected http: HttpClient) {}

  create(medicineGroup: IMedicineGroup): Observable<EntityResponseType> {
    return this.http.post<IMedicineGroup>(this.resourceUrl, medicineGroup, { observe: 'response' });
  }

  update(medicineGroup: IMedicineGroup): Observable<EntityResponseType> {
    return this.http.put<IMedicineGroup>(this.resourceUrl, medicineGroup, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IMedicineGroup>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IMedicineGroup[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
