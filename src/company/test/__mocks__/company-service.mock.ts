import { CompanyDataMock } from "./company-data.mock";
import { CompanyMock } from "./company.mock";

export class MockCompanyService {
	static create = jest .fn().mockResolvedValue(CompanyMock)

	static findAll  = jest.fn().mockResolvedValue(CompanyDataMock)

	static query = jest.fn().mockResolvedValue(CompanyDataMock)

	static findByName = jest.fn().mockResolvedValue(CompanyMock)
	
	static findOne = jest.fn().mockResolvedValue(CompanyMock)
	
	static update = jest.fn().mockResolvedValue(CompanyMock)

	static remove = jest.fn().mockResolvedValue({})
}