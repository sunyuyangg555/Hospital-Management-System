import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IDiagnosis } from 'app/shared/model/diagnosis.model';

type EntityResponseType = HttpResponse<IDiagnosis>;
type EntityArrayResponseType = HttpResponse<IDiagnosis[]>;

@Injectable({ providedIn: 'root' })
export class DiagnosisService {
  public resourceUrl = SERVER_API_URL + 'api/diagnoses';

  constructor(protected http: HttpClient) {}

  create(diagnosis: IDiagnosis): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(diagnosis);
    return this.http
      .post<IDiagnosis>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(diagnosis: IDiagnosis): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(diagnosis);
    return this.http
      .put<IDiagnosis>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IDiagnosis>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IDiagnosis[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(diagnosis: IDiagnosis): IDiagnosis {
    const copy: IDiagnosis = Object.assign({}, diagnosis, {
      date: diagnosis.date && diagnosis.date.isValid() ? diagnosis.date.format(DATE_FORMAT) : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.date = res.body.date ? moment(res.body.date) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((diagnosis: IDiagnosis) => {
        diagnosis.date = diagnosis.date ? moment(diagnosis.date) : undefined;
      });
    }
    return res;
  }
}
