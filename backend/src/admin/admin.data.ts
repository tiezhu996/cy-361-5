export interface DeviceUsageItem {
  deviceId: number;
  deviceName: string;
  deviceCode: string;
  category: string;
  totalHours: number;
  availableHours: number;
  usageRate: number;
  reservationCount: number;
}

export interface BreachRankingItem {
  userId: number;
  userName: string;
  department: string;
  breachCount: number;
  totalReservations: number;
  breachRate: number;
  reasons: string[];
}

export interface DashboardSummary {
  totalReservations: number;
  completedReservations: number;
  breachCount: number;
  breachRate: number;
  avgUsageRate: number;
  topDevice: string;
}

export interface AdminDashboardResponse {
  period: string;
  summary: DashboardSummary;
  deviceUsage: DeviceUsageItem[];
  breachRanking: BreachRankingItem[];
  dateRange: {
    start: string;
    end: string;
  };
  exportAvailable: boolean;
}

const weekDeviceUsage: DeviceUsageItem[] = [
  { deviceId: 1, deviceName: "扫描电子显微镜", deviceCode: "DEV-001", category: "光学仪器", totalHours: 18, availableHours: 40, usageRate: 45, reservationCount: 5 },
  { deviceId: 2, deviceName: "液相色谱仪", deviceCode: "DEV-002", category: "生化设备", totalHours: 12, availableHours: 40, usageRate: 30, reservationCount: 3 },
  { deviceId: 3, deviceName: "示波器", deviceCode: "DEV-003", category: "电子仪器", totalHours: 9, availableHours: 40, usageRate: 22.5, reservationCount: 3 },
  { deviceId: 4, deviceName: "紫外可见分光光度计", deviceCode: "DEV-004", category: "光学仪器", totalHours: 6, availableHours: 40, usageRate: 15, reservationCount: 2 },
  { deviceId: 5, deviceName: "原子吸收光谱仪", deviceCode: "DEV-005", category: "生化设备", totalHours: 3, availableHours: 40, usageRate: 7.5, reservationCount: 1 },
  { deviceId: 6, deviceName: "万用表", deviceCode: "DEV-006", category: "电子仪器", totalHours: 2, availableHours: 40, usageRate: 5, reservationCount: 1 },
  { deviceId: 7, deviceName: "傅里叶变换红外光谱仪", deviceCode: "DEV-007", category: "光学仪器", totalHours: 3, availableHours: 40, usageRate: 7.5, reservationCount: 1 },
  { deviceId: 8, deviceName: "离心机", deviceCode: "DEV-008", category: "生化设备", totalHours: 2, availableHours: 40, usageRate: 5, reservationCount: 1 },
  { deviceId: 9, deviceName: "函数发生器", deviceCode: "DEV-009", category: "电子仪器", totalHours: 0, availableHours: 40, usageRate: 0, reservationCount: 0 },
  { deviceId: 10, deviceName: "激光共聚焦显微镜", deviceCode: "DEV-010", category: "光学仪器", totalHours: 0, availableHours: 40, usageRate: 0, reservationCount: 0 },
];

const monthDeviceUsage: DeviceUsageItem[] = [
  { deviceId: 1, deviceName: "扫描电子显微镜", deviceCode: "DEV-001", category: "光学仪器", totalHours: 72, availableHours: 176, usageRate: 40.9, reservationCount: 18 },
  { deviceId: 2, deviceName: "液相色谱仪", deviceCode: "DEV-002", category: "生化设备", totalHours: 54, availableHours: 176, usageRate: 30.7, reservationCount: 14 },
  { deviceId: 3, deviceName: "示波器", deviceCode: "DEV-003", category: "电子仪器", totalHours: 42, availableHours: 176, usageRate: 23.9, reservationCount: 12 },
  { deviceId: 4, deviceName: "紫外可见分光光度计", deviceCode: "DEV-004", category: "光学仪器", totalHours: 36, availableHours: 176, usageRate: 20.5, reservationCount: 10 },
  { deviceId: 5, deviceName: "原子吸收光谱仪", deviceCode: "DEV-005", category: "生化设备", totalHours: 30, availableHours: 176, usageRate: 17, reservationCount: 8 },
  { deviceId: 6, deviceName: "万用表", deviceCode: "DEV-006", category: "电子仪器", totalHours: 24, availableHours: 176, usageRate: 13.6, reservationCount: 7 },
  { deviceId: 7, deviceName: "傅里叶变换红外光谱仪", deviceCode: "DEV-007", category: "光学仪器", totalHours: 21, availableHours: 176, usageRate: 11.9, reservationCount: 6 },
  { deviceId: 8, deviceName: "离心机", deviceCode: "DEV-008", category: "生化设备", totalHours: 18, availableHours: 176, usageRate: 10.2, reservationCount: 5 },
  { deviceId: 9, deviceName: "函数发生器", deviceCode: "DEV-009", category: "电子仪器", totalHours: 12, availableHours: 176, usageRate: 6.8, reservationCount: 4 },
  { deviceId: 10, deviceName: "激光共聚焦显微镜", deviceCode: "DEV-010", category: "光学仪器", totalHours: 9, availableHours: 176, usageRate: 5.1, reservationCount: 3 },
];

const yearDeviceUsage: DeviceUsageItem[] = [
  { deviceId: 1, deviceName: "扫描电子显微镜", deviceCode: "DEV-001", category: "光学仪器", totalHours: 864, availableHours: 2112, usageRate: 40.9, reservationCount: 216 },
  { deviceId: 2, deviceName: "液相色谱仪", deviceCode: "DEV-002", category: "生化设备", totalHours: 648, availableHours: 2112, usageRate: 30.7, reservationCount: 168 },
  { deviceId: 3, deviceName: "示波器", deviceCode: "DEV-003", category: "电子仪器", totalHours: 504, availableHours: 2112, usageRate: 23.9, reservationCount: 144 },
  { deviceId: 4, deviceName: "紫外可见分光光度计", deviceCode: "DEV-004", category: "光学仪器", totalHours: 432, availableHours: 2112, usageRate: 20.5, reservationCount: 120 },
  { deviceId: 5, deviceName: "原子吸收光谱仪", deviceCode: "DEV-005", category: "生化设备", totalHours: 360, availableHours: 2112, usageRate: 17, reservationCount: 96 },
  { deviceId: 6, deviceName: "万用表", deviceCode: "DEV-006", category: "电子仪器", totalHours: 288, availableHours: 2112, usageRate: 13.6, reservationCount: 84 },
  { deviceId: 7, deviceName: "傅里叶变换红外光谱仪", deviceCode: "DEV-007", category: "光学仪器", totalHours: 252, availableHours: 2112, usageRate: 11.9, reservationCount: 72 },
  { deviceId: 8, deviceName: "离心机", deviceCode: "DEV-008", category: "生化设备", totalHours: 216, availableHours: 2112, usageRate: 10.2, reservationCount: 60 },
  { deviceId: 9, deviceName: "函数发生器", deviceCode: "DEV-009", category: "电子仪器", totalHours: 144, availableHours: 2112, usageRate: 6.8, reservationCount: 48 },
  { deviceId: 10, deviceName: "激光共聚焦显微镜", deviceCode: "DEV-010", category: "光学仪器", totalHours: 108, availableHours: 2112, usageRate: 5.1, reservationCount: 36 },
];

const weekBreachRanking: BreachRankingItem[] = [
  { userId: 3, userName: "王五", department: "物理学院", breachCount: 2, totalReservations: 4, breachRate: 50, reasons: ["超时未签到", "迟到30分钟"] },
  { userId: 2, userName: "李四", department: "化学与化工学院", breachCount: 1, totalReservations: 4, breachRate: 25, reasons: ["超时未签到"] },
  { userId: 5, userName: "陈七", department: "电子信息学院", breachCount: 1, totalReservations: 2, breachRate: 50, reasons: ["未签到未取消"] },
];

const monthBreachRanking: BreachRankingItem[] = [
  { userId: 6, userName: "周八", department: "材料科学与工程学院", breachCount: 2, totalReservations: 5, breachRate: 40, reasons: ["未签到未取消", "迟到45分钟"] },
  { userId: 3, userName: "王五", department: "物理学院", breachCount: 2, totalReservations: 6, breachRate: 33.3, reasons: ["超时未签到", "迟到30分钟"] },
  { userId: 2, userName: "李四", department: "化学与化工学院", breachCount: 1, totalReservations: 5, breachRate: 20, reasons: ["超时未签到"] },
  { userId: 5, userName: "陈七", department: "电子信息学院", breachCount: 2, totalReservations: 4, breachRate: 50, reasons: ["未签到未取消", "迟到45分钟"] },
  { userId: 1, userName: "张三", department: "材料科学与工程学院", breachCount: 0, totalReservations: 6, breachRate: 0, reasons: [] },
];

const yearBreachRanking: BreachRankingItem[] = [
  { userId: 6, userName: "周八", department: "材料科学与工程学院", breachCount: 8, totalReservations: 25, breachRate: 32, reasons: ["未签到未取消", "迟到45分钟", "超时未签到"] },
  { userId: 3, userName: "王五", department: "物理学院", breachCount: 7, totalReservations: 30, breachRate: 23.3, reasons: ["超时未签到", "迟到30分钟"] },
  { userId: 5, userName: "陈七", department: "电子信息学院", breachCount: 6, totalReservations: 20, breachRate: 30, reasons: ["未签到未取消", "迟到45分钟"] },
  { userId: 2, userName: "李四", department: "化学与化工学院", breachCount: 4, totalReservations: 28, breachRate: 14.3, reasons: ["超时未签到"] },
  { userId: 4, userName: "赵六", department: "生命科学学院", breachCount: 2, totalReservations: 15, breachRate: 13.3, reasons: ["迟到15分钟"] },
  { userId: 1, userName: "张三", department: "材料科学与工程学院", breachCount: 1, totalReservations: 35, breachRate: 2.9, reasons: ["迟到5分钟"] },
];

function getWeekRange(): { start: string; end: string } {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  const monday = new Date(now);
  monday.setDate(now.getDate() + diffToMonday);
  monday.setHours(0, 0, 0, 0);
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  sunday.setHours(23, 59, 59, 999);
  return {
    start: monday.toISOString().split("T")[0],
    end: sunday.toISOString().split("T")[0],
  };
}

function getMonthRange(): { start: string; end: string } {
  const now = new Date();
  const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
  const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  return {
    start: firstDay.toISOString().split("T")[0],
    end: lastDay.toISOString().split("T")[0],
  };
}

function getYearRange(): { start: string; end: string } {
  const now = new Date();
  const firstDay = new Date(now.getFullYear(), 0, 1);
  const lastDay = new Date(now.getFullYear(), 11, 31);
  return {
    start: firstDay.toISOString().split("T")[0],
    end: lastDay.toISOString().split("T")[0],
  };
}

function calculateSummary(deviceUsage: DeviceUsageItem[], breachRanking: BreachRankingItem[]): DashboardSummary {
  const totalReservations = deviceUsage.reduce((sum, d) => sum + d.reservationCount, 0);
  const breachCount = breachRanking.reduce((sum, b) => sum + b.breachCount, 0);
  const avgUsageRate = deviceUsage.length > 0
    ? deviceUsage.reduce((sum, d) => sum + d.usageRate, 0) / deviceUsage.length
    : 0;
  const topDevice = deviceUsage.length > 0
    ? [...deviceUsage].sort((a, b) => b.usageRate - a.usageRate)[0].deviceName
    : "";

  return {
    totalReservations,
    completedReservations: Math.floor(totalReservations * 0.85),
    breachCount,
    breachRate: totalReservations > 0 ? (breachCount / totalReservations) * 100 : 0,
    avgUsageRate: Math.round(avgUsageRate * 10) / 10,
    topDevice,
  };
}

export function getAdminDashboard(period: string): AdminDashboardResponse {
  let deviceUsage: DeviceUsageItem[];
  let breachRanking: BreachRankingItem[];
  let dateRange: { start: string; end: string };
  let exportAvailable = false;

  switch (period) {
    case "week":
      deviceUsage = weekDeviceUsage;
      breachRanking = weekBreachRanking;
      dateRange = getWeekRange();
      break;
    case "month":
      deviceUsage = monthDeviceUsage;
      breachRanking = monthBreachRanking;
      dateRange = getMonthRange();
      exportAvailable = true;
      break;
    case "year":
      deviceUsage = yearDeviceUsage;
      breachRanking = yearBreachRanking;
      dateRange = getYearRange();
      break;
    default:
      deviceUsage = weekDeviceUsage;
      breachRanking = weekBreachRanking;
      dateRange = getWeekRange();
  }

  return {
    period,
    summary: calculateSummary(deviceUsage, breachRanking),
    deviceUsage: [...deviceUsage].sort((a, b) => b.usageRate - a.usageRate),
    breachRanking: [...breachRanking].sort((a, b) => b.breachCount - a.breachCount),
    dateRange,
    exportAvailable,
  };
}

export function getExportData(period: string) {
  const dashboard = getAdminDashboard(period);
  return {
    summary: dashboard.summary,
    deviceUsage: dashboard.deviceUsage.map((d) => ({
      "设备编号": d.deviceCode,
      "设备名称": d.deviceName,
      "设备分类": d.category,
      "使用时长(小时)": d.totalHours,
      "可用时长(小时)": d.availableHours,
      "使用率(%)": d.usageRate,
      "预约次数": d.reservationCount,
    })),
    breachRanking: dashboard.breachRanking.map((b, idx) => ({
      "排名": idx + 1,
      "用户姓名": b.userName,
      "所属部门": b.department,
      "违约次数": b.breachCount,
      "总预约次数": b.totalReservations,
      "违约率(%)": b.breachRate,
      "违约原因": b.reasons.join("、"),
    })),
    dateRange: dashboard.dateRange,
    period,
  };
}
