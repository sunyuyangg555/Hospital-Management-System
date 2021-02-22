import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IConsultationResource } from 'app/shared/model/consultation-resource.model';

type EntityResponseType = HttpResponse<IConsultationResource>;
type EntityArrayResponseType = HttpResponse<IConsultationResource[]>;

@Injectable({ providedIn: 'root' })
export class ConsultationResourceService {
  public resourceUrl = SERVER_API_URL + 'api/consultation-resources';

  constructor(protected http: HttpClient) {}

  create(consultationResource: IConsultationResource): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(consultationResource);
    return this.http
      .post<IConsultationResource>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(consultationResource: IConsultationResource): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(consultationResource);
    return this.http
      .put<IConsultationResource>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IConsultationResource>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IConsultationResource[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(consultationResource: IConsultationResource): IConsultationResource {
    const copy: IConsultationResource = Object.assign({}, consultationResource, {
      fromdate:
        consultationResource.fromdate && consultationResource.fromdate.isValid()
          ? consultationResource.fromdate.format(DATE_FORMAT)
          : undefined,
      todate:
        consultationResource.todate && consultationResource.todate.isValid() ? consultationResource.todate.format(DATE_FORMAT) : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.fromdate = res.body.fromdate ? moment(res.body.fromdate) : undefined;
      res.body.todate = res.body.todate ? moment(res.body.todate) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((consultationResource: IConsultationResource) => {
        consultationResource.fromdate = consultationResource.fromdate ? moment(consultationResource.fromdate) : undefined;
        consultationResource.todate = consultationResource.todate ? moment(consultationResource.todate) : undefined;
      });
    }
    return res;
  }
}
