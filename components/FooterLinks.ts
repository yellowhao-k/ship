export interface FooterLink {
  label: string;
  href: string;
}

export const hotline = '135-5379-6071';
export const address = '深圳市宝安区福永街道怀德社区路干头二巷11号楼';

export const industryInfoLinks: FooterLink[] = [
  { label: '行业新闻', href: '/industry-information/category/industry-updates' },
  { label: '公司新闻', href: '/industry-information/category/company-news' },
  { label: '知识百科', href: '/industry-information/category/knowledge-base' },
];

export const caseLinks: FooterLink[] = [
  { label: '空运案例', href: '/cases/category/air' },
  { label: '海运案例', href: '/cases/category/sea' },
  { label: '快递案例', href: '/cases/category/express' },
  { label: '海外仓案例', href: '/cases/category/overseas-warehouse' },
];

export const serviceLinks: FooterLink[] = [
  { label: '亚马逊FBA头程运输', href: '/services/air-freight-double-customs-clearance-bonded-door-delivery' },
  { label: '散货双清包税到门', href: '/services/sea-freight-double-customs-clearance-including-tax' },
  { label: '海外仓一件代发', href: '/services/overseas-warehouse-drop-shipping' },
  { label: '快递专线', href: '/services/express-parcel-dedicated-line' },
  { label: '私人物品门到门', href: '/services/door-to-door-service' },
  { label: '上门取件', href: '/inquiry' },
];

