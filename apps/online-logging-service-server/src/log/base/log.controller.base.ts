/*
------------------------------------------------------------------------------ 
This code was generated by Amplication. 
 
Changes to this file will be lost if the code is regenerated. 

There are other ways to to customize your code, see this doc to learn more
https://docs.amplication.com/how-to/custom-code

------------------------------------------------------------------------------
  */
import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import { isRecordNotFoundError } from "../../prisma.util";
import * as errors from "../../errors";
import { Request } from "express";
import { plainToClass } from "class-transformer";
import { ApiNestedQuery } from "../../decorators/api-nested-query.decorator";
import * as nestAccessControl from "nest-access-control";
import * as defaultAuthGuard from "../../auth/defaultAuth.guard";
import { LogService } from "../log.service";
import { AclValidateRequestInterceptor } from "../../interceptors/aclValidateRequest.interceptor";
import { AclFilterResponseInterceptor } from "../../interceptors/aclFilterResponse.interceptor";
import { LogCreateInput } from "./LogCreateInput";
import { Log } from "./Log";
import { LogFindManyArgs } from "./LogFindManyArgs";
import { LogWhereUniqueInput } from "./LogWhereUniqueInput";
import { LogUpdateInput } from "./LogUpdateInput";

@swagger.ApiBearerAuth()
@common.UseGuards(defaultAuthGuard.DefaultAuthGuard, nestAccessControl.ACGuard)
export class LogControllerBase {
  constructor(
    protected readonly service: LogService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}
  @common.UseInterceptors(AclValidateRequestInterceptor)
  @common.Post()
  @swagger.ApiCreatedResponse({ type: Log })
  @nestAccessControl.UseRoles({
    resource: "Log",
    action: "create",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async createLog(@common.Body() data: LogCreateInput): Promise<Log> {
    return await this.service.createLog({
      data: {
        ...data,

        application: data.application
          ? {
              connect: data.application,
            }
          : undefined,
      },
      select: {
        application: {
          select: {
            id: true,
          },
        },

        createdAt: true,
        id: true,
        message: true,
        timestamp: true,
        updatedAt: true,
      },
    });
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @common.Get()
  @swagger.ApiOkResponse({ type: [Log] })
  @ApiNestedQuery(LogFindManyArgs)
  @nestAccessControl.UseRoles({
    resource: "Log",
    action: "read",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async logs(@common.Req() request: Request): Promise<Log[]> {
    const args = plainToClass(LogFindManyArgs, request.query);
    return this.service.logs({
      ...args,
      select: {
        application: {
          select: {
            id: true,
          },
        },

        createdAt: true,
        id: true,
        message: true,
        timestamp: true,
        updatedAt: true,
      },
    });
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @common.Get("/:id")
  @swagger.ApiOkResponse({ type: Log })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @nestAccessControl.UseRoles({
    resource: "Log",
    action: "read",
    possession: "own",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async log(@common.Param() params: LogWhereUniqueInput): Promise<Log | null> {
    const result = await this.service.log({
      where: params,
      select: {
        application: {
          select: {
            id: true,
          },
        },

        createdAt: true,
        id: true,
        message: true,
        timestamp: true,
        updatedAt: true,
      },
    });
    if (result === null) {
      throw new errors.NotFoundException(
        `No resource was found for ${JSON.stringify(params)}`
      );
    }
    return result;
  }

  @common.UseInterceptors(AclValidateRequestInterceptor)
  @common.Patch("/:id")
  @swagger.ApiOkResponse({ type: Log })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @nestAccessControl.UseRoles({
    resource: "Log",
    action: "update",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async updateLog(
    @common.Param() params: LogWhereUniqueInput,
    @common.Body() data: LogUpdateInput
  ): Promise<Log | null> {
    try {
      return await this.service.updateLog({
        where: params,
        data: {
          ...data,

          application: data.application
            ? {
                connect: data.application,
              }
            : undefined,
        },
        select: {
          application: {
            select: {
              id: true,
            },
          },

          createdAt: true,
          id: true,
          message: true,
          timestamp: true,
          updatedAt: true,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
        );
      }
      throw error;
    }
  }

  @common.Delete("/:id")
  @swagger.ApiOkResponse({ type: Log })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @nestAccessControl.UseRoles({
    resource: "Log",
    action: "delete",
    possession: "any",
  })
  @swagger.ApiForbiddenResponse({
    type: errors.ForbiddenException,
  })
  async deleteLog(
    @common.Param() params: LogWhereUniqueInput
  ): Promise<Log | null> {
    try {
      return await this.service.deleteLog({
        where: params,
        select: {
          application: {
            select: {
              id: true,
            },
          },

          createdAt: true,
          id: true,
          message: true,
          timestamp: true,
          updatedAt: true,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
        );
      }
      throw error;
    }
  }
}