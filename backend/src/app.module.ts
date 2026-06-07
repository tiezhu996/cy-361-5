import { Module } from "@nestjs/common";
import { OverviewController } from "./overview/overview.controller";
import { OverviewService } from "./overview/overview.service";
import { AdminController } from "./admin/admin.controller";
import { AdminService } from "./admin/admin.service";
import { AppLogger } from "./common/app.logger";

@Module({
  controllers: [OverviewController, AdminController],
  providers: [OverviewService, AdminService, AppLogger],
})
export class AppModule {}
