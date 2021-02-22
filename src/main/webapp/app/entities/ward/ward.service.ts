import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IWard } from 'app/shared/model/ward.model';

type EntityResponseType = HttpResponse<IWard>;
type EntityArrayResponseType = HttpResponse<IWard[]>;

@Injectable({ providedIn: 'root' })
export class WardService {
  public resourceUrl = SERVER_API_URL + 'api/wards';

  constructor(protected http: HttpClient) {}

  create(ward: IWard): Observable<EntityResponseType> {
    return this.http.post<IWard>(this.resourceUrl, ward, { observe: 'response' });
  }

  update(ward: IWard): Observable<EntityResponseType> {
    return this.http.put<IWard>(this.resourceUrl, ward, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IWard>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IWard[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
