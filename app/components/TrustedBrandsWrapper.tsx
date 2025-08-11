'use client';

import dynamic from 'next/dynamic';

const TrustedBrands = dynamic(
  () => import('./TrustedBrands'),
  { 
    ssr: false,
    loading: () => <div className="h-24 bg-gray-50 w-full" />
  }
);

export default function TrustedBrandsWrapper() {
  return <TrustedBrands />;
}
