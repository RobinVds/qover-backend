import { Module } from '@nestjs/common';
import { IDataServices } from '../../abstract/data-services.interface';
import { MemoryDataServices } from './memory.service';

@Module({
  imports: [
  ],
  providers: [
    {
      provide: IDataServices,
      useClass: MemoryDataServices,
    },
  ],
  exports: [IDataServices]
})

export class MemoryDataServicesModule {}
