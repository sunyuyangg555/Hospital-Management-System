import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IStaff } from 'app/shared/model/staff.model';

type EntityResponseType = HttpResponse<IStaff>;
type EntityArrayResponseType = HttpResponse<IStaff[]>;

@Injectable({ providedIn: 'root' })
export class StaffService {
  public resourceUrl = SERVER_API_URL + 'api/staff';

  constructor(protected http: HttpClient) {}

  create(staff: IStaff): Observable<EntityResponseType> {
    return this.http.post<IStaff>(this.resourceUrl, staff, { observe: 'response' });
  }

  update(staff: IStaff): Observable<EntityResponseType> {
    return this.http.put<IStaff>(this.resourceUrl, staff, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IStaff>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IStaff[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
