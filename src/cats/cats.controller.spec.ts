import { Test, TestingModule } from "@nestjs/testing";
import { CatsController } from "./cats.controller";
import { CatsService } from "./cats.service";
import { Cat } from "./entities/cats.entities";
import { HttpStatus } from "@nestjs/common";
import { JwtAuthGuard } from "../common/guards/jwt.guard";
import { RolesGuard } from "../common/guards/roles.guard";
import { AuthGuard } from "@nestjs/passport";
import { createResponse } from "node-mocks-http";

describe("CatsController", () => {
  let module: TestingModule;
  let catsController: CatsController;
  const mockCat: Cat = {
    id: 1,
    name: "Pixel",
    age: "2",
    breed: "Bombay",
  };

  const mockResponse = createResponse();

  const mockCatsService = {
    findAll: jest.fn(),
    create: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    addCatAsFavourite: jest.fn(),
  };

  beforeEach(async () => {
    module = await Test.createTestingModule({
      controllers: [CatsController],
      providers: [
        CatsService,
        {
          provide: JwtAuthGuard,
          useValue: jest.fn().mockImplementation(() => true),
        },
        {
          provide: RolesGuard,
          useValue: jest.fn().mockImplementation(() => true),
        },
        {
          provide: AuthGuard,
          useValue: jest.fn().mockImplementation(() => true),
        },
      ],
    })
      .overrideProvider(CatsService)
      .useValue(mockCatsService)
      .compile();

    catsController = module.get<CatsController>(CatsController);
  });

  it("should compile the module", async () => {
    expect(module).toBeDefined();
  });

  describe("findAll", () => {
    it("should return all cats", async () => {
      jest.spyOn(mockCatsService, "findAll").mockImplementation(() => {
        return {
          statusCode: HttpStatus.OK,
          message: "Request completed successfully",
          data: [mockCat],
        };
      });

      await catsController.findAll(mockResponse);

      expect(mockCatsService.findAll).toHaveBeenCalled();
      expect(mockResponse.statusCode).toBe(200);
      expect(mockResponse._getData()).toEqual({
        statusCode: HttpStatus.OK,
        message: "Request completed successfully",
        data: [mockCat],
      });
    });
  });

  describe("create", () => {
    it("should create a new cat", async () => {
      const dto = {
        name: mockCat.name,
        age: mockCat.age,
        breed: mockCat.breed,
      };

      jest.spyOn(mockCatsService, "create").mockImplementation(() => {
        return {
          statusCode: HttpStatus.OK,
          message: "Request completed successfully",
          data: mockCat,
        };
      });

      await catsController.publicRegister(dto, mockResponse);

      expect(mockCatsService.create).toHaveBeenCalledTimes(1);
      expect(mockCatsService.create).toHaveBeenCalledWith(dto);
      expect(mockResponse.statusCode).toBe(200);
      expect(mockResponse._getData()).toEqual({
        statusCode: HttpStatus.OK,
        message: "Request completed successfully",
        data: mockCat,
      });
    });
  });

  describe("findOne", () => {
    it("should return a single cat", async () => {
      const id = 1;

      jest.spyOn(mockCatsService, "findOne").mockImplementation(() => {
        return {
          statusCode: HttpStatus.OK,
          message: "Request completed successfully",
          data: mockCat,
        };
      });

      await catsController.findOne(mockResponse, id);

      expect(mockCatsService.findOne).toHaveBeenCalled();
      expect(mockResponse.statusCode).toBe(200);
      expect(mockResponse._getData()).toEqual({
        statusCode: HttpStatus.OK,
        message: "Request completed successfully",
        data: mockCat,
      });
    });

    it("should return a 404 if the cat does not exist", async () => {
      const id = 2;

      jest
        .spyOn(mockCatsService, "findOne")
        .mockReset()
        .mockImplementation(() => {
          return {
            statusCode: HttpStatus.NOT_FOUND,
            message: "Cat does not exist",
          };
        });

      await catsController.findOne(mockResponse, id);

      expect(mockResponse.statusCode).toBe(404);
      expect(mockResponse._getData()).toEqual({
        statusCode: HttpStatus.NOT_FOUND,
        message: "Cat does not exist",
      });
    });
  });

  describe("update", () => {
    it("should update a cat", async () => {
      const id = 1;
      const dto = {
        name: mockCat.name,
        age: mockCat.age,
        breed: mockCat.breed,
      };

      jest.spyOn(mockCatsService, "findOne").mockImplementation(() => {
        return {
          statusCode: HttpStatus.OK,
          message: "Request completed successfully",
          data: mockCat,
        };
      });

      jest.spyOn(mockCatsService, "update").mockImplementation(() => {
        return {
          statusCode: HttpStatus.OK,
          message: "Cat successfully updated",
        };
      });

      await catsController.update(mockResponse, id, dto);

      expect(mockCatsService.findOne).toHaveBeenCalled();
      expect(mockCatsService.update).toHaveBeenCalled();
      expect(mockResponse.statusCode).toBe(200);
      expect(mockResponse._getData()).toEqual({
        statusCode: HttpStatus.OK,
        message: "Cat successfully updated",
      });
    });

    it("should return a 404 if the cat does not exist", async () => {
      const id = 2;
      const dto = {
        name: mockCat.name,
        age: mockCat.age,
        breed: mockCat.breed,
      };

      jest.spyOn(mockCatsService, "findOne").mockImplementation(() => {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: "Cat does not exist",
        };
      });

      jest.spyOn(mockCatsService, "update").mockImplementation(() => {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: "Cat does not exist",
        };
      });

      await catsController.update(mockResponse, id, dto);
      expect(mockResponse.statusCode).toBe(404);
      expect(mockResponse._getData()).toEqual({
        statusCode: HttpStatus.NOT_FOUND,
        message: "Cat does not exist",
      });
    });
  });
  describe("delete", () => {
    it("should delete a cat", async () => {
      const id = 1;

      jest.spyOn(mockCatsService, "findOne").mockImplementation(() => {
        return {
          statusCode: HttpStatus.OK,
          message: "Request completed successfully",
          data: mockCat,
        };
      });

      jest.spyOn(mockCatsService, "delete").mockImplementation(() => {
        return {
          statusCode: HttpStatus.OK,
          message: "Cat successfully deleted",
        };
      });

      await catsController.delete(mockResponse, id);

      expect(mockCatsService.findOne).toHaveBeenCalled();
      expect(mockCatsService.delete).toHaveBeenCalled();
      expect(mockResponse.statusCode).toBe(200);
      expect(mockResponse._getData()).toEqual({
        statusCode: HttpStatus.OK,
        message: "Cat successfully deleted",
      });
    });

    it("should return a 404 if the cat does not exist", async () => {
      const id = 2;

      jest.spyOn(mockCatsService, "findOne").mockImplementation(() => {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: "Cat does not exist",
        };
      });

      jest.spyOn(mockCatsService, "delete").mockImplementation(() => {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: "Cat does not exist",
        };
      });

      await catsController.delete(mockResponse, id);
      expect(mockResponse.statusCode).toBe(404);
      expect(mockResponse._getData()).toEqual({
        statusCode: HttpStatus.NOT_FOUND,
        message: "Cat does not exist",
      });
    });
  });

  describe("addCatAsFavourite", () => {
    it("should add a cat as favourite", async () => {
      const id = 1;
      const catId = 1;

      jest.spyOn(mockCatsService, "findOne").mockImplementation(() => {
        return {
          statusCode: HttpStatus.OK,
          message: "Request completed successfully",
          data: mockCat,
        };
      });

      jest
        .spyOn(mockCatsService, "addCatAsFavourite")
        .mockImplementation(() => {
          return {
            statusCode: HttpStatus.OK,
            message: "Cat successfully added as favourite",
          };
        });

      await catsController.addCatAsFavourite(mockResponse, { catId }, id);

      expect(mockCatsService.findOne).toHaveBeenCalled();
      expect(mockCatsService.addCatAsFavourite).toHaveBeenCalled();
      expect(mockResponse.statusCode).toBe(200);
      expect(mockResponse._getData()).toEqual({
        statusCode: HttpStatus.OK,
        message: "Cat successfully added as favourite",
      });
    });

    it("should return a 404 if the cat does not exist", async () => {
      const id = 2;
      const catId = 2;

      jest.spyOn(mockCatsService, "findOne").mockImplementation(() => {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: "Cat does not exist",
        };
      });

      jest
        .spyOn(mockCatsService, "addCatAsFavourite")
        .mockImplementation(() => {
          return {
            statusCode: HttpStatus.NOT_FOUND,
            message: "Cat does not exist",
          };
        });

      await catsController.addCatAsFavourite(mockResponse, { catId }, id);
      expect(mockResponse.statusCode).toBe(404);
      expect(mockResponse._getData()).toEqual({
        statusCode: HttpStatus.NOT_FOUND,
        message: "Cat does not exist",
      });
    });
  });
});
