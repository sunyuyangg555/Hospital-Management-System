import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IMedicineCategory } from 'app/shared/model/medicine-category.model';

type EntityResponseType = HttpResponse<IMedicineCategory>;
type EntityArrayResponseType = HttpResponse<IMedicineCategory[]>;

@Injectable({ providedIn: 'root' })
export class MedicineCategoryService {
  public resourceUrl = SERVER_API_URL + 'api/medicine-categories';

  constructor(protected http: HttpClient) {}

  create(medicineCategory: IMedicineCategory): Observable<EntityResponseType> {
    return this.http.post<IMedicineCategory>(this.resourceUrl, medicineCategory, { observe: 'response' });
  }

  update(medicineCategory: IMedicineCategory): Observable<EntityResponseType> {
    return this.http.put<IMedicineCategory>(this.resourceUrl, medicineCategory, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IMedicineCategory>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IMedicineCategory[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
