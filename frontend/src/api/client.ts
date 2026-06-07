import { API_BASE_URL } from "../constants/app";
import type { OverviewResponse, AdminDashboardResponse } from "../types";

export async function fetchOverview(): Promise<OverviewResponse> {
  const response = await fetch(`${API_BASE_URL}/overview`, {
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    throw new Error(`Overview request failed: ${response.status}`);
  }

  return response.json() as Promise<OverviewResponse>;
}

export async function fetchAdminDashboard(period: string = "week"): Promise<AdminDashboardResponse> {
  const response = await fetch(`${API_BASE_URL}/admin/dashboard?period=${period}`, {
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    throw new Error(`Admin dashboard request failed: ${response.status}`);
  }

  return response.json() as Promise<AdminDashboardResponse>;
}

export async function exportAdminReport(period: string = "month"): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/admin/export?period=${period}`, {
    headers: { Accept: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" },
  });

  if (!response.ok) {
    throw new Error(`Export request failed: ${response.status}`);
  }

  const blob = await response.blob();
  const contentDisposition = response.headers.get("Content-Disposition");
  let filename = "设备使用报告.xlsx";
  if (contentDisposition) {
    const match = contentDisposition.match(/filename\*=UTF-8''(.+)/);
    if (match) {
      filename = decodeURIComponent(match[1]);
    }
  }

  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
}
