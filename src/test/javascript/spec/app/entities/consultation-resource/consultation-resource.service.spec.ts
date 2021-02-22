import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { ConsultationResourceService } from 'app/entities/consultation-resource/consultation-resource.service';
import { IConsultationResource, ConsultationResource } from 'app/shared/model/consultation-resource.model';

describe('Service Tests', () => {
  describe('ConsultationResource Service', () => {
    let injector: TestBed;
    let service: ConsultationResourceService;
    let httpMock: HttpTestingController;
    let elemDefault: IConsultationResource;
    let expectedResult: IConsultationResource | IConsultationResource[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(ConsultationResourceService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new ConsultationResource(0, currentDate, currentDate, false, false);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            fromdate: currentDate.format(DATE_FORMAT),
            todate: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a ConsultationResource', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            fromdate: currentDate.format(DATE_FORMAT),
            todate: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            fromdate: currentDate,
            todate: currentDate,
          },
          returnedFromService
        );

        service.create(new ConsultationResource()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a ConsultationResource', () => {
        const returnedFromService = Object.assign(
          {
            fromdate: currentDate.format(DATE_FORMAT),
            todate: currentDate.format(DATE_FORMAT),
            isActive: true,
            isAdmitted: true,
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            fromdate: currentDate,
            todate: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of ConsultationResource', () => {
        const returnedFromService = Object.assign(
          {
            fromdate: currentDate.format(DATE_FORMAT),
            todate: currentDate.format(DATE_FORMAT),
            isActive: true,
            isAdmitted: true,
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            fromdate: currentDate,
            todate: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a ConsultationResource', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
