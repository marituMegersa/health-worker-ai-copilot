'use client';

import { useState, useEffect } from 'react';
import { Package, AlertTriangle, CheckCircle2, RefreshCw, Building2 } from 'lucide-react';
import { SupplyItem } from '@/lib/db';

export default function SuppliesPage() {
  const [supplies, setSupplies] = useState<SupplyItem[]>([]);

  useEffect(() => {
    fetch('/api/analytics')
      .then(res => res.json())
      .then(data => {
        if (data.success) setSupplies(data.supplyStatus);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <Package className="w-7 h-7 text-amber-600" />
            Essential Medicine & Clinic Supply Chain Monitor
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            Real-time stock tracking for rural health posts, mRDT diagnostic kits, RUTF therapeutic food, and emergency pharmaceuticals.
          </p>
        </div>
      </div>

      {/* Supply Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {supplies.map(item => (
          <div
            key={item.id}
            className={`bg-white p-5 rounded-xl border shadow-sm space-y-4 ${
              item.status === 'Critical Stockout'
                ? 'border-rose-300 bg-rose-50/20'
                : item.status === 'Low Stock'
                ? 'border-amber-300 bg-amber-50/20'
                : 'border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                {item.category}
              </span>
              <span
                className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                  item.status === 'Critical Stockout'
                    ? 'bg-rose-100 text-rose-700'
                    : item.status === 'Low Stock'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-emerald-100 text-emerald-700'
                }`}
              >
                {item.status}
              </span>
            </div>

            <div>
              <h3 className="font-extrabold text-slate-900 text-base">{item.name}</h3>
              <p className="text-xs text-slate-500">{item.clinicLocation}</p>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-600 font-medium">Current Stock:</span>
              <span className="font-extrabold text-sm text-slate-900">
                {item.stockCount} {item.unit}
              </span>
            </div>

            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div
                className={`h-full ${
                  item.status === 'Critical Stockout'
                    ? 'bg-rose-600'
                    : item.status === 'Low Stock'
                    ? 'bg-amber-500'
                    : 'bg-teal-500'
                }`}
                style={{ width: `${Math.min(100, (item.stockCount / item.minThreshold) * 100)}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
