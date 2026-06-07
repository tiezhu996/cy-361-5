import { Controller, Get, Query, Res } from "@nestjs/common";
import { Response } from "express";
import { AdminService } from "./admin.service";

@Controller()
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get("api/admin/dashboard")
  dashboard(@Query("period") period: string = "week") {
    return this.adminService.getDashboard(period);
  }

  @Get("api/admin/export")
  async exportExcel(@Query("period") period: string = "month", @Res() res: Response) {
    const { buffer, filename } = this.adminService.exportToExcel(period);
    res.set({
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename*=UTF-8''${encodeURIComponent(filename)}`,
    });
    res.send(buffer);
  }
}
