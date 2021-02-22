import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IBed } from 'app/shared/model/bed.model';

type EntityResponseType = HttpResponse<IBed>;
type EntityArrayResponseType = HttpResponse<IBed[]>;

@Injectable({ providedIn: 'root' })
export class BedService {
  public resourceUrl = SERVER_API_URL + 'api/beds';

  constructor(protected http: HttpClient) {}

  create(bed: IBed): Observable<EntityResponseType> {
    return this.http.post<IBed>(this.resourceUrl, bed, { observe: 'response' });
  }

  update(bed: IBed): Observable<EntityResponseType> {
    return this.http.put<IBed>(this.resourceUrl, bed, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IBed>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IBed[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
