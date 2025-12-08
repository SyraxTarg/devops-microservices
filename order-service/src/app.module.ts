import { Module } from '@nestjs/common';
import { OrdersModule } from './orders/orders.module';
import { PrismaService } from './prisma/prisma.service';
import { HealthController } from './health.controller';

@Module({
  imports: [OrdersModule],        // Chargement du module Orders
  providers: [PrismaService],     // Service Prisma exposé à toute l'app
  controllers: [HealthController],   // Ajout du contrôleur health
})
export class AppModule { }