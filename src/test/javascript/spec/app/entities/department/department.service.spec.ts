import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { DepartmentService } from 'app/entities/department/department.service';
import { IDepartment, Department } from 'app/shared/model/department.model';

describe('Service Tests', () => {
  describe('Department Service', () => {
    let injector: TestBed;
    let service: DepartmentService;
    let httpMock: HttpTestingController;
    let elemDefault: IDepartment;
    let expectedResult: IDepartment | IDepartment[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(DepartmentService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Department(0, 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', currentDate, 'AAAAAAA');
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            openingDate: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Department', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            openingDate: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            openingDate: currentDate,
          },
          returnedFromService
        );

        service.create(new Department()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Department', () => {
        const returnedFromService = Object.assign(
          {
            name: 'BBBBBB',
            hierarchy: 'BBBBBB',
            descriptions: 'BBBBBB',
            openingDate: currentDate.format(DATE_FORMAT),
            extraId: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            openingDate: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Department', () => {
        const returnedFromService = Object.assign(
          {
            name: 'BBBBBB',
            hierarchy: 'BBBBBB',
            descriptions: 'BBBBBB',
            openingDate: currentDate.format(DATE_FORMAT),
            extraId: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            openingDate: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Department', () => {
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
