export interface FeatureItem {
  id: number;
  title: string;
  description: string;
  status: string;
  metric: string;
}

export interface KpiItem {
  label: string;
  value: string;
  trend: string;
  tone: string;
}

export interface OperationRecord {
  key: string;
  name: string;
  owner: string;
  status: string;
  metric: string;
  priority: string;
}

export interface OverviewResponse {
  appName: string;
  appCode: string;
  description: string;
  features: FeatureItem[];
  kpis: KpiItem[];
  records: OperationRecord[];
}

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
