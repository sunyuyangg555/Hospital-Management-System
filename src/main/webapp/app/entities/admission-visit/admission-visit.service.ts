import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IAdmissionVisit } from 'app/shared/model/admission-visit.model';

type EntityResponseType = HttpResponse<IAdmissionVisit>;
type EntityArrayResponseType = HttpResponse<IAdmissionVisit[]>;

@Injectable({ providedIn: 'root' })
export class AdmissionVisitService {
  public resourceUrl = SERVER_API_URL + 'api/admission-visits';

  constructor(protected http: HttpClient) {}

  create(admissionVisit: IAdmissionVisit): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(admissionVisit);
    return this.http
      .post<IAdmissionVisit>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(admissionVisit: IAdmissionVisit): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(admissionVisit);
    return this.http
      .put<IAdmissionVisit>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IAdmissionVisit>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IAdmissionVisit[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(admissionVisit: IAdmissionVisit): IAdmissionVisit {
    const copy: IAdmissionVisit = Object.assign({}, admissionVisit, {
      dateTime: admissionVisit.dateTime && admissionVisit.dateTime.isValid() ? admissionVisit.dateTime.format(DATE_FORMAT) : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dateTime = res.body.dateTime ? moment(res.body.dateTime) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((admissionVisit: IAdmissionVisit) => {
        admissionVisit.dateTime = admissionVisit.dateTime ? moment(admissionVisit.dateTime) : undefined;
      });
    }
    return res;
  }
}
