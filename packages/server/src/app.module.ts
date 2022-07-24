import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './services/app.service';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MenuModule } from './menu/menu.module';
import { CategoryModule } from './category/category.module';
import { FoodModule } from './food/food.module';
import { StoreController } from './store/store.controller';
import { StoreModule } from './store/store.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    MenuModule,
    CategoryModule,
    FoodModule,
    StoreModule,
  ],
  controllers: [AppController, UsersController, StoreController],
  providers: [AppService],
})
export class AppModule {}
