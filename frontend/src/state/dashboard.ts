import { localFeatures, localKpis, operationRecords } from "../data/workbench";
import type { OverviewResponse, AdminDashboardResponse } from "../types";
import { APP_CODE, APP_NAME } from "../constants/app";

export function createFallbackOverview(): OverviewResponse {
  return {
    appName: APP_NAME,
    appCode: APP_CODE,
    description: "面向高校和科研院所，提供实验设备的在线预约、使用记录追踪、维护计划管理和权限分级控制，解决设备闲置与争抢并存的矛盾。",
    features: localFeatures,
    kpis: localKpis,
    records: operationRecords,
  };
}

export function createFallbackAdminDashboard(period: string = "week"): AdminDashboardResponse {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  const monday = new Date(now);
  monday.setDate(now.getDate() + diffToMonday);
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);

  const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
  const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  const yearFirst = new Date(now.getFullYear(), 0, 1);
  const yearLast = new Date(now.getFullYear(), 11, 31);

  const dateRanges: Record<string, { start: string; end: string }> = {
    week: { start: monday.toISOString().split("T")[0], end: sunday.toISOString().split("T")[0] },
    month: { start: firstDay.toISOString().split("T")[0], end: lastDay.toISOString().split("T")[0] },
    year: { start: yearFirst.toISOString().split("T")[0], end: yearLast.toISOString().split("T")[0] },
  };

  const weekDeviceUsage = [
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

  const monthDeviceUsage = weekDeviceUsage.map(d => ({
    ...d,
    totalHours: d.totalHours * 4,
    availableHours: d.availableHours * 4.4,
    reservationCount: d.reservationCount * 3.5,
    usageRate: d.usageRate * 0.92,
  }));

  const yearDeviceUsage = weekDeviceUsage.map(d => ({
    ...d,
    totalHours: d.totalHours * 48,
    availableHours: d.availableHours * 52.8,
    reservationCount: d.reservationCount * 42,
    usageRate: d.usageRate * 0.9,
  }));

  const weekBreach = [
    { userId: 3, userName: "王五", department: "物理学院", breachCount: 2, totalReservations: 4, breachRate: 50, reasons: ["超时未签到", "迟到30分钟"] },
    { userId: 2, userName: "李四", department: "化学与化工学院", breachCount: 1, totalReservations: 4, breachRate: 25, reasons: ["超时未签到"] },
    { userId: 5, userName: "陈七", department: "电子信息学院", breachCount: 1, totalReservations: 2, breachRate: 50, reasons: ["未签到未取消"] },
  ];

  const monthBreach = [
    { userId: 6, userName: "周八", department: "材料科学与工程学院", breachCount: 2, totalReservations: 5, breachRate: 40, reasons: ["未签到未取消", "迟到45分钟"] },
    { userId: 3, userName: "王五", department: "物理学院", breachCount: 2, totalReservations: 6, breachRate: 33.3, reasons: ["超时未签到", "迟到30分钟"] },
    { userId: 5, userName: "陈七", department: "电子信息学院", breachCount: 2, totalReservations: 4, breachRate: 50, reasons: ["未签到未取消", "迟到45分钟"] },
    { userId: 2, userName: "李四", department: "化学与化工学院", breachCount: 1, totalReservations: 5, breachRate: 20, reasons: ["超时未签到"] },
    { userId: 1, userName: "张三", department: "材料科学与工程学院", breachCount: 0, totalReservations: 6, breachRate: 0, reasons: [] },
  ];

  const yearBreach = [
    { userId: 6, userName: "周八", department: "材料科学与工程学院", breachCount: 8, totalReservations: 25, breachRate: 32, reasons: ["未签到未取消", "迟到45分钟", "超时未签到"] },
    { userId: 3, userName: "王五", department: "物理学院", breachCount: 7, totalReservations: 30, breachRate: 23.3, reasons: ["超时未签到", "迟到30分钟"] },
    { userId: 5, userName: "陈七", department: "电子信息学院", breachCount: 6, totalReservations: 20, breachRate: 30, reasons: ["未签到未取消", "迟到45分钟"] },
    { userId: 2, userName: "李四", department: "化学与化工学院", breachCount: 4, totalReservations: 28, breachRate: 14.3, reasons: ["超时未签到"] },
    { userId: 4, userName: "赵六", department: "生命科学学院", breachCount: 2, totalReservations: 15, breachRate: 13.3, reasons: ["迟到15分钟"] },
    { userId: 1, userName: "张三", department: "材料科学与工程学院", breachCount: 1, totalReservations: 35, breachRate: 2.9, reasons: ["迟到5分钟"] },
  ];

  const deviceUsages: Record<string, typeof weekDeviceUsage> = {
    week: weekDeviceUsage,
    month: monthDeviceUsage,
    year: yearDeviceUsage,
  };

  const breachRankings: Record<string, typeof weekBreach> = {
    week: weekBreach,
    month: monthBreach,
    year: yearBreach,
  };

  const devices = deviceUsages[period] || weekDeviceUsage;
  const breaches = breachRankings[period] || weekBreach;
  const dateRange = dateRanges[period] || dateRanges.week;

  const totalReservations = devices.reduce((sum, d) => sum + d.reservationCount, 0);
  const breachCount = breaches.reduce((sum, b) => sum + b.breachCount, 0);
  const avgUsageRate = devices.length > 0
    ? devices.reduce((sum, d) => sum + d.usageRate, 0) / devices.length
    : 0;
  const topDevice = devices.length > 0
    ? [...devices].sort((a, b) => b.usageRate - a.usageRate)[0].deviceName
    : "";

  return {
    period,
    summary: {
      totalReservations,
      completedReservations: Math.floor(totalReservations * 0.85),
      breachCount,
      breachRate: totalReservations > 0 ? (breachCount / totalReservations) * 100 : 0,
      avgUsageRate: Math.round(avgUsageRate * 10) / 10,
      topDevice,
    },
    deviceUsage: [...devices].sort((a, b) => b.usageRate - a.usageRate),
    breachRanking: [...breaches].sort((a, b) => b.breachCount - a.breachCount),
    dateRange,
    exportAvailable: period === "month",
  };
}
