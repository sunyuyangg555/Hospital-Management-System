import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IAdmission } from 'app/shared/model/admission.model';

type EntityResponseType = HttpResponse<IAdmission>;
type EntityArrayResponseType = HttpResponse<IAdmission[]>;

@Injectable({ providedIn: 'root' })
export class AdmissionService {
  public resourceUrl = SERVER_API_URL + 'api/admissions';

  constructor(protected http: HttpClient) {}

  create(admission: IAdmission): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(admission);
    return this.http
      .post<IAdmission>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(admission: IAdmission): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(admission);
    return this.http
      .put<IAdmission>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IAdmission>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IAdmission[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(admission: IAdmission): IAdmission {
    const copy: IAdmission = Object.assign({}, admission, {
      fromDateTime: admission.fromDateTime && admission.fromDateTime.isValid() ? admission.fromDateTime.format(DATE_FORMAT) : undefined,
      toDateTime: admission.toDateTime && admission.toDateTime.isValid() ? admission.toDateTime.format(DATE_FORMAT) : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.fromDateTime = res.body.fromDateTime ? moment(res.body.fromDateTime) : undefined;
      res.body.toDateTime = res.body.toDateTime ? moment(res.body.toDateTime) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((admission: IAdmission) => {
        admission.fromDateTime = admission.fromDateTime ? moment(admission.fromDateTime) : undefined;
        admission.toDateTime = admission.toDateTime ? moment(admission.toDateTime) : undefined;
      });
    }
    return res;
  }
}
