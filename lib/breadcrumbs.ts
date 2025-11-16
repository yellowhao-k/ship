// Derive breadcrumb segments from a pathname
export function getBreadcrumbSegments(pathname: string) {
  if (!pathname || pathname === '/') return ['Home'];
  return ['Home', ...pathname.split('/').filter(Boolean).map(decodeURIComponent)];
}

