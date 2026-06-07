CREATE TABLE IF NOT EXISTS operation_records (
  id INT AUTO_INCREMENT PRIMARY KEY,
  module_name VARCHAR(120) NOT NULL,
  owner_name VARCHAR(80) NOT NULL,
  status VARCHAR(40) NOT NULL,
  metric VARCHAR(40) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS devices (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  model VARCHAR(80) NOT NULL,
  device_code VARCHAR(40) NOT NULL UNIQUE,
  category VARCHAR(60) NOT NULL,
  location VARCHAR(120) NOT NULL,
  purchase_date DATE,
  status VARCHAR(20) DEFAULT 'available',
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(60) NOT NULL UNIQUE,
  real_name VARCHAR(60) NOT NULL,
  email VARCHAR(120),
  department VARCHAR(80),
  role VARCHAR(20) DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS reservations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  device_id INT NOT NULL,
  user_id INT NOT NULL,
  start_time DATETIME NOT NULL,
  end_time DATETIME NOT NULL,
  status VARCHAR(20) DEFAULT 'reserved',
  checkin_time DATETIME,
  checkout_time DATETIME,
  is_breach TINYINT(1) DEFAULT 0,
  breach_reason VARCHAR(200),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (device_id) REFERENCES devices(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

INSERT INTO operation_records (module_name, owner_name, status, metric)
VALUES ('设备档案与分类管理', '运营组', 'ready', '100%');

INSERT INTO devices (name, model, device_code, category, location, status, description) VALUES
('扫描电子显微镜', 'SEM-5000', 'DEV-001', '光学仪器', 'A栋301室', 'available', '高分辨率扫描电子显微镜，用于材料表面形貌分析'),
('液相色谱仪', 'HPLC-2024', 'DEV-002', '生化设备', 'B栋102室', 'available', '高效液相色谱仪，用于化合物分离与定量分析'),
('示波器', 'Tektronix-MSO64', 'DEV-003', '电子仪器', 'C栋205室', 'available', '混合信号示波器，带宽4GHz'),
('紫外可见分光光度计', 'UV-3600', 'DEV-004', '光学仪器', 'A栋302室', 'available', '紫外可见近红外分光光度计'),
('原子吸收光谱仪', 'AA-7000', 'DEV-005', '生化设备', 'B栋103室', 'maintenance', '原子吸收分光光度计，用于金属元素分析'),
('万用表', 'Fluke-87V', 'DEV-006', '电子仪器', 'C栋201室', 'available', '高精度数字万用表'),
('傅里叶变换红外光谱仪', 'FTIR-4000', 'DEV-007', '光学仪器', 'A栋303室', 'available', '傅里叶变换红外光谱仪'),
('离心机', 'Sigma-3K15', 'DEV-008', '生化设备', 'B栋105室', 'available', '高速冷冻离心机，最大转速15000rpm'),
('函数发生器', 'Agilent-33522A', 'DEV-009', '电子仪器', 'C栋203室', 'available', '双通道任意波形发生器'),
('激光共聚焦显微镜', 'LSM-900', 'DEV-010', '光学仪器', 'A栋305室', 'available', '激光共聚焦扫描显微镜');

INSERT INTO users (username, real_name, email, department, role) VALUES
('zhangsan', '张三', 'zhangsan@lab.edu.cn', '材料科学与工程学院', 'user'),
('lisi', '李四', 'lisi@lab.edu.cn', '化学与化工学院', 'user'),
('wangwu', '王五', 'wangwu@lab.edu.cn', '物理学院', 'user'),
('zhaoliu', '赵六', 'zhaoliu@lab.edu.cn', '生命科学学院', 'user'),
('chenqi', '陈七', 'chenqi@lab.edu.cn', '电子信息学院', 'user'),
('zhouba', '周八', 'zhouba@lab.edu.cn', '材料科学与工程学院', 'user'),
('admin', '管理员', 'admin@lab.edu.cn', '实验室管理中心', 'admin');

INSERT INTO reservations (device_id, user_id, start_time, end_time, status, checkin_time, checkout_time, is_breach, breach_reason) VALUES
(1, 1, '2026-06-01 09:00:00', '2026-06-01 12:00:00', 'completed', '2026-06-01 09:05:00', '2026-06-01 11:55:00', 0, NULL),
(1, 2, '2026-06-02 14:00:00', '2026-06-02 17:00:00', 'completed', '2026-06-02 14:10:00', '2026-06-02 16:50:00', 0, NULL),
(2, 1, '2026-06-02 09:00:00', '2026-06-02 12:00:00', 'completed', '2026-06-02 09:00:00', '2026-06-02 11:30:00', 0, NULL),
(3, 3, '2026-06-03 08:00:00', '2026-06-03 11:00:00', 'completed', NULL, NULL, 1, '超时未签到'),
(1, 3, '2026-06-03 13:00:00', '2026-06-03 16:00:00', 'completed', '2026-06-03 13:30:00', '2026-06-03 15:45:00', 1, '迟到30分钟'),
(4, 2, '2026-06-03 09:00:00', '2026-06-03 12:00:00', 'completed', '2026-06-03 09:02:00', '2026-06-03 11:58:00', 0, NULL),
(5, 4, '2026-06-04 10:00:00', '2026-06-04 13:00:00', 'completed', '2026-06-04 10:00:00', '2026-06-04 12:45:00', 0, NULL),
(2, 5, '2026-06-04 14:00:00', '2026-06-04 17:00:00', 'completed', NULL, NULL, 1, '未签到未取消'),
(6, 3, '2026-06-05 08:30:00', '2026-06-05 10:30:00', 'completed', '2026-06-05 08:35:00', '2026-06-05 10:20:00', 0, NULL),
(7, 1, '2026-06-05 09:00:00', '2026-06-05 12:00:00', 'completed', '2026-06-05 09:00:00', '2026-06-05 11:50:00', 0, NULL),
(1, 4, '2026-06-06 08:00:00', '2026-06-06 11:00:00', 'completed', '2026-06-06 08:15:00', '2026-06-06 10:50:00', 0, NULL),
(3, 5, '2026-06-06 13:00:00', '2026-06-06 16:00:00', 'completed', '2026-06-06 13:00:00', '2026-06-06 15:55:00', 0, NULL),
(8, 2, '2026-06-06 09:00:00', '2026-06-06 11:00:00', 'completed', NULL, NULL, 1, '超时未签到'),
(9, 3, '2026-06-07 08:00:00', '2026-06-07 10:00:00', 'reserved', NULL, NULL, 0, NULL),
(10, 1, '2026-06-07 10:00:00', '2026-06-07 13:00:00', 'reserved', NULL, NULL, 0, NULL),
(2, 6, '2026-05-25 09:00:00', '2026-05-25 12:00:00', 'completed', '2026-05-25 09:00:00', '2026-05-25 11:45:00', 0, NULL),
(1, 6, '2026-05-26 14:00:00', '2026-05-26 17:00:00', 'completed', NULL, NULL, 1, '未签到未取消'),
(3, 6, '2026-05-27 08:00:00', '2026-05-27 11:00:00', 'completed', '2026-05-27 08:05:00', '2026-05-27 10:50:00', 0, NULL),
(7, 6, '2026-05-28 09:00:00', '2026-05-28 12:00:00', 'completed', '2026-05-28 09:00:00', '2026-05-28 11:55:00', 0, NULL),
(4, 5, '2026-05-29 10:00:00', '2026-05-29 13:00:00', 'completed', NULL, NULL, 1, '迟到45分钟');
