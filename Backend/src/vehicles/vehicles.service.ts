import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { vehicleResponse } from 'src/types/type.response';

@Injectable()
export class VehiclesService {
  constructor(private prisma: PrismaService) {}

  async getVehicleById(id): Promise<vehicleResponse> {
    const data = await this.prisma.vehicles.findUnique({
      select: {
        id: true,
        make: true,
        model: true,
        variant: true,
        body: true,
      },
      where: {
        id,
      },
    });
    if (!data) {
      throw new NotFoundException(`Model with Id ${id} does not exist`);
    }
    return data;
  }

  async getAllVehicles(): Promise<any> {
    const getAllVehicles = await this.prisma.vehicles.findMany({
      select: {
        id: true,
        make: true,
        model: true,
        variant: true,
        body: true,
      },
      orderBy: [
        { make: 'asc' },
        { model: 'asc' },
        { variant: 'asc' },
        { body: 'asc' },
      ],
    });
    return getAllVehicles;
  }

  async getAllVehiclesByMM(make, model): Promise<any> {
    const getAllVehiclesByMM = await this.prisma.vehicles.findMany({
      select: {
        // id: true,
        make: true,
        model: true,
        variant: true,
        body: true,
      },
      orderBy: [
        { make: 'asc' },
        { model: 'asc' },
        { variant: 'asc' },
        { body: 'asc' },
      ],
      where: { make: make.toUpperCase(), model: model.toUpperCase() },
    });
    return getAllVehiclesByMM;
  }

  async addVehicle(data): Promise<any> {
    const vehicle = await this.prisma.vehicles.create({
      select: {
        id: true,
        make: true,
        model: true,
        variant: true,
        body: true,
      },
      data: {
        make: data.make.toUpperCase(),
        model: data.model.toUpperCase(),
        variant: data.variant.toUpperCase(),
        body: data.body.toUpperCase(),
      },
    });
    return vehicle;
  }

  // async updateVehicle(
  //   id: number,
  //   make: string,
  //   model: string,
  //   variant: string,
  //   body: string,
  // ): Promise<vehicleResponse> {
  //   const found = await this.prisma.model.findFirst({
  //     where: { id },
  //   });
  //   if (!found) {
  //     throw new NotFoundException(`Make with Id ${id} does not exist`);
  //   }
  //   const updateVehicle = await this.prisma.vehicles.update({
  //     select: {
  //       make: true,
  //       model: true,
  //       variant: true,
  //       body: true,
  //     },
  //     data: { make: make, model: model, variant: variant, body: body },
  //     where: { id },
  //   });
  //   return updateVehicle;
  // }

  async deleteVehicle(params): Promise<vehicleResponse> {
    const { id } = params;
    const found = await this.prisma.vehicles.findFirst({
      where: { id },
    });
    if (!found) {
      throw new NotFoundException(`Make with Id ${id} does not exist`);
    }
    const deleteVehicle = await this.prisma.vehicles.delete({
      select: {
        make: true,
        model: true,
        variant: true,
        body: true,
      },
      where: {
        id,
      },
    });
    return deleteVehicle;
  }

  async distinctMakeCount() {
    return await this.prisma.vehicles.findMany({
      select: { make: true },
      distinct: ['make'],
    });
  }

  async distinctVehicleCount() {
    const count = await this.prisma.vehicles.count({});
    return {
      totalVehicleCount: count,
    };
  }

  async distinctBodyCount() {
    return this.prisma.vehicles.findMany({
      select: { body: true },
      distinct: ['body'],
      orderBy: [{ body: 'asc' }],
    });
  }

  async distinctModel(make) {
    return this.prisma.vehicles.findMany({
      select: { make: true, model: true },
      distinct: ['model'],
      orderBy: [{ model: 'asc' }],
      where: { make: make.toUpperCase() },
    });
  }
}
