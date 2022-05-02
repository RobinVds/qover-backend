import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoDataServices } from './mongo.service';
import { User, UserSchema } from '../../schemas/user.schema';
import { IDataServices } from '../../abstract/data-services.interface';
import { config } from 'dotenv';

if (!process.env.NODE_ENV) config(); // Config service could not have been instantiated yet so we need to make sure the environment is configured.

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forRoot(process.env.MONGO_DB),
  ],
  providers: [
    {
      provide: IDataServices,
      useClass: MongoDataServices,
    },
  ],
  exports: [IDataServices],
})
export class MongoDataServicesModule {}
