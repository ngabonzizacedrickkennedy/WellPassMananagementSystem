'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LucideIcon, Zap } from 'lucide-react';
import Link from 'next/link';

interface QuickAction {
  label: string;
  icon: LucideIcon;
  href: string;
  color: string;
  bgColor: string;
}

interface QuickActionsProps {
  actions: QuickAction[];
}

export default function QuickActions({ actions }: QuickActionsProps) {
  return (
    <Card className="border-none shadow-lg bg-white/80 backdrop-blur">
      <CardHeader className="border-b bg-gradient-to-r from-slate-50 to-blue-50">
        <CardTitle className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-blue-600" />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-2 gap-3">
          {actions.map((action, index) => (
            <Link key={index} href={action.href}>
              <Button
                variant="outline"
                className={`w-full h-auto py-4 flex flex-col items-center gap-2 border-2 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 ${action.bgColor}`}
              >
                <div className={`p-3 rounded-xl ${action.bgColor}`}>
                  <action.icon className={`w-6 h-6 ${action.color}`} />
                </div>
                <span className="text-sm font-medium text-slate-700">
                  {action.label}
                </span>
              </Button>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}