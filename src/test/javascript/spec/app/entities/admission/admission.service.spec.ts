import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { AdmissionService } from 'app/entities/admission/admission.service';
import { IAdmission, Admission } from 'app/shared/model/admission.model';

describe('Service Tests', () => {
  describe('Admission Service', () => {
    let injector: TestBed;
    let service: AdmissionService;
    let httpMock: HttpTestingController;
    let elemDefault: IAdmission;
    let expectedResult: IAdmission | IAdmission[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(AdmissionService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Admission(0, false, currentDate, currentDate);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            fromDateTime: currentDate.format(DATE_FORMAT),
            toDateTime: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Admission', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            fromDateTime: currentDate.format(DATE_FORMAT),
            toDateTime: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            fromDateTime: currentDate,
            toDateTime: currentDate,
          },
          returnedFromService
        );

        service.create(new Admission()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Admission', () => {
        const returnedFromService = Object.assign(
          {
            isActive: true,
            fromDateTime: currentDate.format(DATE_FORMAT),
            toDateTime: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            fromDateTime: currentDate,
            toDateTime: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Admission', () => {
        const returnedFromService = Object.assign(
          {
            isActive: true,
            fromDateTime: currentDate.format(DATE_FORMAT),
            toDateTime: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            fromDateTime: currentDate,
            toDateTime: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Admission', () => {
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
