/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type RiskLevel = '重大风险' | '较大风险' | '一般风险' | '低风险';
export type HazardStatus = '待确认' | '进行中' | '待验证' | '结案';

export interface Hazard {
  id: string;
  checkType: string;
  hazardType: string;
  riskLevel: RiskLevel;
  location: string;
  department: string;
  status: HazardStatus;
  discoverer: string;
  discoverTime: string;
  title: string;
  description: string;
}

export type Page = 'dashboard' | 'list' | 'form' | 'detail';
