import { Injectable } from "@nestjs/common";
import * as XLSX from "xlsx";
import { getAdminDashboard, getExportData } from "./admin.data";
import type { AdminDashboardResponse } from "./admin.data";

@Injectable()
export class AdminService {
  getDashboard(period: string): AdminDashboardResponse {
    return getAdminDashboard(period);
  }

  exportToExcel(period: string): { buffer: Buffer; filename: string } {
    const exportData = getExportData(period);
    const wb = XLSX.utils.book_new();

    const summaryData = [
      ["统计摘要"],
      ["统计周期", this.getPeriodLabel(exportData.period)],
      ["日期范围", `${exportData.dateRange.start} 至 ${exportData.dateRange.end}`],
      ["总预约次数", exportData.summary.totalReservations],
      ["已完成预约", exportData.summary.completedReservations],
      ["违约次数", exportData.summary.breachCount],
      ["违约率(%)", exportData.summary.breachRate.toFixed(1)],
      ["平均设备使用率(%)", exportData.summary.avgUsageRate],
      ["使用率最高设备", exportData.summary.topDevice],
    ];
    const summaryWs = XLSX.utils.aoa_to_sheet(summaryData);
    summaryWs["!cols"] = [{ wch: 20 }, { wch: 40 }];
    XLSX.utils.book_append_sheet(wb, summaryWs, "统计摘要");

    const deviceWs = XLSX.utils.json_to_sheet(exportData.deviceUsage);
    deviceWs["!cols"] = [
      { wch: 12 }, { wch: 22 }, { wch: 12 }, { wch: 14 },
      { wch: 14 }, { wch: 10 }, { wch: 10 },
    ];
    XLSX.utils.book_append_sheet(wb, deviceWs, "设备使用率");

    const breachWs = XLSX.utils.json_to_sheet(exportData.breachRanking);
    breachWs["!cols"] = [
      { wch: 8 }, { wch: 12 }, { wch: 22 }, { wch: 10 },
      { wch: 12 }, { wch: 10 }, { wch: 40 },
    ];
    XLSX.utils.book_append_sheet(wb, breachWs, "违约排行");

    const buffer = XLSX.write(wb, { type: "buffer", bookType: "xlsx" }) as Buffer;
    const dateStr = new Date().toISOString().split("T")[0];
    const filename = `设备使用报告_${this.getPeriodLabel(exportData.period)}_${dateStr}.xlsx`;

    return { buffer, filename };
  }

  private getPeriodLabel(period: string): string {
    const labels: Record<string, string> = {
      week: "本周",
      month: "本月",
      year: "本年",
    };
    return labels[period] || period;
  }
}
