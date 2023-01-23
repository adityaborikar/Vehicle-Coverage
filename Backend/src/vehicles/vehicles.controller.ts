import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  // Put,
} from '@nestjs/common';
import { Query } from '@nestjs/common/decorators';
import { commonResponseType } from 'src/types/common.response';
import { getDistinctModel, vehicleResponse } from 'src/types/type.response';
import { VehiclesService } from './vehicles.service';

@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Get('getVehicleById/:id')
  async getVehicleById(
    @Param('id') id: string,
  ): Promise<commonResponseType<vehicleResponse | null>> {
    const data = await this.vehiclesService.getVehicleById(Number(id));
    if (!data) {
      return {
        success: false,
        message: `Vehicle with Id ${id} not fetched.`,
        data: null,
      };
    } else {
      return {
        success: true,
        message: `Vehicle with Id ${id} fetched.`,
        data: data,
      };
    }
  }

  @Get()
  async getAllVehicles(): Promise<commonResponseType<vehicleResponse>> {
    const data = await this.vehiclesService.getAllVehicles();
    if (!data) {
      return {
        success: false,
        message: `Vehicle not fetched.`,
        data: null,
      };
    } else {
      return {
        success: true,
        message: `Vehicle fetched.`,
        data: data,
      };
    }
  }

  @Get(`/getVehiclesByMM`)
  async getVehiclesByMM(
    @Query('make') make,
    @Query('model') model,
  ): Promise<commonResponseType<vehicleResponse>> {
    try {
      const data = await this.vehiclesService.getAllVehiclesByMM(make, model);
      return {
        success: true,
        message: `Vehicle found.`,
        data: data,
      };
    } catch (error) {
      return {
        success: false,
        message: error,
        data: null,
      };
    }
  }

  @Post('addVehicle')
  async addVehicle(
    @Body()
    vehicleData: {
      make: string;
      model: string;
      variant: string;
      body: string;
    },
  ): Promise<commonResponseType<vehicleResponse>> {
    const { make, model, variant, body } = vehicleData;
    try {
      const data = await this.vehiclesService.addVehicle({
        make,
        model,
        variant,
        body,
      });
      return {
        success: true,
        message: `Vehicle added.`,
        data: data,
      };
    } catch (error) {
      return {
        success: false,
        message: error,
        data: null,
      };
    }
  }

  // @Put('updateVehicle/:id')
  // async updateVehicle(
  //   @Param('id') id: number,
  //   @Body()
  //   vehicleData: {
  //     make: string;
  //     model: string;
  //     variant: string;
  //     body: string;
  //   },
  // ): Promise<commonResponseType<vehicleResponse>> {
  //   const { make, model, variant, body } = vehicleData;
  //   const data = await this.vehiclesService.updateVehicle(
  //     Number(id),
  //     make,
  //     model,
  //     variant,
  //     body,
  //   );
  //   return {
  //     success: true,
  //     message: `Vehicle with Id ${id} updated.`,
  //     data: data,
  //   };
  // }

  @Delete('deleteVehicle/:id')
  async deleteVehicle(
    @Param('id') id: string,
  ): Promise<commonResponseType<vehicleResponse>> {
    try {
      const data = await this.vehiclesService.deleteVehicle({
        id: Number(id),
      });
      return {
        success: true,
        message: `Vehicle with Id ${id} deleted.`,
        data: data,
      };
    } catch (error) {
      return {
        success: false,
        message: error.response.message,
        data: null,
      };
    }
  }

  @Get('distinctMake')
  async distinctMakeCount() {
    try {
      const data = await this.vehiclesService.distinctMakeCount();
      return {
        success: true,
        message: `Distinct make feteched`,
        data: data,
      };
    } catch (error) {
      return {
        success: false,
        message: error.response.message,
        data: null,
      };
    }
  }

  @Get('distinctVehicle')
  async distinctVehicleCount() {
    try {
      const data = await this.vehiclesService.distinctVehicleCount();
      return {
        success: true,
        message: `Distinct vehicles feteched`,
        data: data,
      };
    } catch (error) {
      return {
        success: false,
        message: error.response.message,
        data: null,
      };
    }
  }

  @Get('distinctBody')
  async distinctBodyCount() {
    try {
      const data = await this.vehiclesService.distinctBodyCount();
      return {
        success: true,
        message: `Distinct body feteched`,
        data: data,
      };
    } catch (error) {
      return {
        success: false,
        message: error.response.message,
        data: null,
      };
    }
  }

  @Get(`/distinctModel`)
  async distinctModel(
    @Query('make') make,
  ): Promise<commonResponseType<getDistinctModel[]>> {
    try {
      const data = await this.vehiclesService.distinctModel(make);
      return {
        success: true,
        message: `Distinct body feteched`,
        data: data,
      };
    } catch (error) {
      return {
        success: false,
        message: error.response.message,
        data: null,
      };
    }
  }
}
