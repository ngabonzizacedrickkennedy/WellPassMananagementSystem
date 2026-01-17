'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Clock } from 'lucide-react';

interface Activity {
  id: number;
  type: 'employee' | 'admission' | 'attendance' | 'billing';
  user: string;
  action: string;
  timestamp: string;
  details?: string;
}

interface RecentActivityProps {
  activities: Activity[];
  maxItems?: number;
}

const activityColors = {
  employee: 'bg-blue-100 text-blue-700',
  admission: 'bg-green-100 text-green-700',
  attendance: 'bg-purple-100 text-purple-700',
  billing: 'bg-amber-100 text-amber-700',
};

const activityLabels = {
  employee: 'Employee',
  admission: 'Admission',
  attendance: 'Attendance',
  billing: 'Billing',
};

export default function RecentActivity({
  activities,
  maxItems = 5,
}: RecentActivityProps) {
  const displayedActivities = activities.slice(0, maxItems);

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <Card className="border-none shadow-lg bg-white/80 backdrop-blur">
      <CardHeader className="border-b bg-gradient-to-r from-slate-50 to-blue-50">
        <CardTitle className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-blue-600" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {displayedActivities.length === 0 ? (
          <div className="text-center py-8 text-slate-500">
            <p>No recent activity</p>
          </div>
        ) : (
          <div className="space-y-4">
            {displayedActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start gap-4 p-3 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <Avatar className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold">
                  {activity.user.charAt(0)}
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium text-slate-900 text-sm">
                      {activity.user}
                    </p>
                    <Badge
                      variant="secondary"
                      className={`text-xs ${activityColors[activity.type]}`}
                    >
                      {activityLabels[activity.type]}
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-600">{activity.action}</p>
                  {activity.details && (
                    <p className="text-xs text-slate-500 mt-1">
                      {activity.details}
                    </p>
                  )}
                  <p className="text-xs text-slate-400 mt-1">
                    {formatTimestamp(activity.timestamp)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}