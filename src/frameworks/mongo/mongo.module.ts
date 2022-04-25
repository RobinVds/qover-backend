import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoDataServices } from './mongo.service';
import { User, UserSchema } from '../../schemas/user.schema';
import { IDataServices } from '../../abstract/data-services.interface';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
    ]),
    MongooseModule.forRoot('mongodb://localhost/qover'), // Move to env variables.
  ],
  providers: [
    {
      provide: IDataServices,
      useClass: MongoDataServices,
    },
  ],
  exports: [IDataServices]
})
export class MongoDataServicesModule {}
