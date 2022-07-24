import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MenuModule } from './menu/menu.module';
import { CategoryModule } from './category/category.module';
import { FoodModule } from './food/food.module';
import { StoreModule } from './store/store.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    UsersModule,
    AuthModule,
    MenuModule,
    CategoryModule,
    FoodModule,
    StoreModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
