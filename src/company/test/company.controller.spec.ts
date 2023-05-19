import { Test } from '@nestjs/testing';
import { CompanyController } from '../company.controller';
import { MockCompanyService } from './__mocks__/company-service.mock';
import { CompanyService } from '../company.service';
import { CompanyDataMock } from './__mocks__/company-data.mock';

describe('CompanyController', () => {
  let controller: CompanyController;
  let service: CompanyService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [CompanyController],
      providers: [CompanyService],
    })
    // .overrideProvider(CompanyService)
    // .useValue(MockCompanyService)
      .compile();

    controller = moduleRef.get<CompanyController>(CompanyController);
    service = moduleRef.get<CompanyService>(CompanyService);
  	});

  describe('Get all Companies', () => {
    describe('when findAll is called', () => {
      let findAllController;

      const serviceList = jest.spyOn(service, 'findAll');

      beforeEach(async () => {
			  findAllController = await controller.findAll();
      });

      it('should invoke CompanyService list', async () => {
			  	expect(serviceList).toBeCalledTimes(1);
      });

      it('should invoke CompanyService list with no error', async () => {
        expect(serviceList).toBeTruthy();
		  	});
			  it('should return', async () => {
        expect(findAllController).toBe(CompanyDataMock);
		  	});
    });
  });
});
