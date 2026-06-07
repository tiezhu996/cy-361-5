import { useState, useEffect } from "react";
import { Segmented, Button, Table, Tag, Progress, Typography, Space, message } from "antd";
import { ExportOutlined, BarChartOutlined, WarningOutlined, FileExcelOutlined } from "@ant-design/icons";
import { fetchAdminDashboard, exportAdminReport } from "../api/client";
import { createFallbackAdminDashboard } from "../state/dashboard";
import type { AdminDashboardResponse, DeviceUsageItem, BreachRankingItem } from "../types";
import { APP_THEME } from "../constants/app";

const { Title, Text } = Typography;

interface AdminDashboardProps {
  notice: string;
  setNotice: (msg: string) => void;
}

export function AdminDashboard({ notice, setNotice }: AdminDashboardProps) {
  const [period, setPeriod] = useState<string>("week");
  const [dashboard, setDashboard] = useState<AdminDashboardResponse>(createFallbackAdminDashboard());
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    loadDashboard();
  }, [period]);

  const loadDashboard = () => {
    fetchAdminDashboard(period)
      .then((data) => {
        setDashboard(data);
        setNotice("后端服务已联通，当前展示实时接口数据。");
      })
      .catch(() => {
        setDashboard(createFallbackAdminDashboard(period));
        setNotice("后端服务未联通，当前展示本地模拟数据。");
      });
  };

  const handleExport = async () => {
    if (!dashboard.exportAvailable) {
      message.warning("仅支持按月导出报告");
      return;
    }
    setExporting(true);
    try {
      await exportAdminReport("month");
      message.success("报告导出成功");
    } catch {
      message.error("导出失败，请稍后重试");
    } finally {
      setExporting(false);
    }
  };

  const getPeriodLabel = (p: string) => {
    const labels: Record<string, string> = { week: "本周", month: "本月", year: "本年" };
    return labels[p] || p;
  };

  const getUsageColor = (rate: number) => {
    if (rate >= 40) return APP_THEME.accent;
    if (rate >= 20) return APP_THEME.warm;
    return "#9ca3af";
  };

  const kpiItems = [
    { label: "总预约次数", value: dashboard.summary.totalReservations, trend: `${getPeriodLabel(period)}`, tone: "primary" },
    { label: "已完成预约", value: dashboard.summary.completedReservations, trend: `违约 ${dashboard.summary.breachCount} 次`, tone: "warm" },
    { label: "违约率", value: `${dashboard.summary.breachRate.toFixed(1)}%`, trend: dashboard.summary.breachRate > 20 ? "偏高" : "正常", tone: dashboard.summary.breachRate > 20 ? "danger" : "primary" },
    { label: "平均使用率", value: `${dashboard.summary.avgUsageRate}%`, trend: `最高：${dashboard.summary.topDevice}`, tone: "primary" },
  ];

  const deviceColumns = [
    {
      title: "设备名称",
      dataIndex: "deviceName",
      key: "deviceName",
      render: (_: string, record: DeviceUsageItem) => (
        <div>
          <Text strong>{record.deviceName}</Text>
          <div>
            <Tag color="default">{record.deviceCode}</Tag>
            <Tag color="green">{record.category}</Tag>
          </div>
        </div>
      ),
    },
    {
      title: "使用时长",
      dataIndex: "totalHours",
      key: "totalHours",
      render: (val: number, record: DeviceUsageItem) => (
        <div>
          <Text strong>{val} 小时</Text>
          <div>
            <Text type="secondary">/ {record.availableHours} 小时可用</Text>
          </div>
        </div>
      ),
    },
    {
      title: "使用率",
      dataIndex: "usageRate",
      key: "usageRate",
      width: 200,
      render: (val: number) => (
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Progress
            percent={Math.round(val)}
            size="small"
            strokeColor={getUsageColor(val)}
            showInfo={false}
            style={{ minWidth: 100 }}
          />
          <Text strong style={{ color: getUsageColor(val), minWidth: 50 }}>{val.toFixed(1)}%</Text>
        </div>
      ),
    },
    {
      title: "预约次数",
      dataIndex: "reservationCount",
      key: "reservationCount",
      align: "center" as const,
      render: (val: number) => <Tag color="blue">{val} 次</Tag>,
    },
  ];

  const breachColumns = [
    {
      title: "排名",
      dataIndex: "index",
      key: "index",
      width: 60,
      render: (_: unknown, __: unknown, index: number) => {
        const colors = ["#d98f45", "#b45309", "#92400e", "#78716c", "#78716c"];
        return (
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              background: colors[index] || "#78716c",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
              fontSize: 14,
            }}
          >
            {index + 1}
          </div>
        );
      },
    },
    {
      title: "用户信息",
      dataIndex: "userName",
      key: "userName",
      render: (_: string, record: BreachRankingItem) => (
        <div>
          <Text strong>{record.userName}</Text>
          <div>
            <Text type="secondary">{record.department}</Text>
          </div>
        </div>
      ),
    },
    {
      title: "违约次数",
      dataIndex: "breachCount",
      key: "breachCount",
      align: "center" as const,
      render: (val: number) => (
        <Tag color="red" icon={<WarningOutlined />}>{val} 次</Tag>
      ),
    },
    {
      title: "总预约",
      dataIndex: "totalReservations",
      key: "totalReservations",
      align: "center" as const,
      render: (val: number) => <Text>{val} 次</Text>,
    },
    {
      title: "违约率",
      dataIndex: "breachRate",
      key: "breachRate",
      width: 180,
      render: (val: number) => (
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Progress
            percent={Math.round(val)}
            size="small"
            strokeColor="#ef4444"
            showInfo={false}
            style={{ minWidth: 80 }}
          />
          <Text strong style={{ color: "#ef4444", minWidth: 50 }}>{val.toFixed(1)}%</Text>
        </div>
      ),
    },
    {
      title: "违约原因",
      dataIndex: "reasons",
      key: "reasons",
      render: (reasons: string[]) => (
        <Space wrap>
          {reasons.map((r, i) => (
            <Tag key={i} color="orange">{r}</Tag>
          ))}
          {reasons.length === 0 && <Text type="secondary">无</Text>}
        </Space>
      ),
    },
  ];

  return (
    <div>
      <section className="lead-grid">
        <article className="hero-panel">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16, marginBottom: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span className="pill">{notice}</span>
              <Tag color="green" icon={<BarChartOutlined />}>管理员视图</Tag>
            </div>
            <Space>
              <Segmented
                value={period}
                onChange={setPeriod}
                options={[
                  { label: "本周", value: "week" },
                  { label: "本月", value: "month" },
                  { label: "本年", value: "year" },
                ]}
              />
              <Button
                type="primary"
                icon={<ExportOutlined />}
                onClick={handleExport}
                loading={exporting}
                disabled={!dashboard.exportAvailable}
              >
                导出月度报告
              </Button>
            </Space>
          </div>
          <Title level={2}>数据看板 — {getPeriodLabel(period)}</Title>
          <p>
            统计范围：{dashboard.dateRange.start} 至 {dashboard.dateRange.end}
            {dashboard.exportAvailable && (
              <span style={{ marginLeft: 12 }}>
                <FileExcelOutlined style={{ color: APP_THEME.accent }} /> 已到月底，支持导出 Excel 报告
              </span>
            )}
          </p>
        </article>
        <section className="metric-grid" aria-label="关键指标">
          {kpiItems.map((item) => (
            <article className="metric-card" key={item.label}>
              <span>{item.label}</span>
              <strong className="metric-value">{item.value}</strong>
              <small>{item.trend}</small>
            </article>
          ))}
        </section>
      </section>

      <section className="work-panel">
        <Title level={3}>设备使用率排行</Title>
        <Table
          dataSource={dashboard.deviceUsage}
          columns={deviceColumns}
          rowKey="deviceId"
          pagination={false}
          size="middle"
        />
      </section>

      <section className="work-panel" style={{ marginTop: 26 }}>
        <Title level={3}>违约排行</Title>
        <Table
          dataSource={dashboard.breachRanking}
          columns={breachColumns}
          rowKey="userId"
          pagination={false}
          size="middle"
        />
      </section>
    </div>
  );
}
