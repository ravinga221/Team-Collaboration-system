import { Card, CardContent } from "./ui/card";
import { CheckCircle2, Clock, AlertCircle, TrendingUp } from "lucide-react";
import { motion } from "motion/react";

interface Stat {
  label: string;
  value: number;
  change: number;
  icon: typeof CheckCircle2;
  color: string;
}

interface QuickStatsProps {
  stats: Stat[];
}

export function QuickStats({ stats }: QuickStatsProps) {
  return (
    <div className="grid grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm text-slate-600 mb-1">{stat.label}</p>
                    <p className="text-3xl font-semibold text-slate-900 mb-2">
                      {stat.value}
                    </p>
                    <div className="flex items-center gap-1">
                      <TrendingUp
                        className={`w-4 h-4 ${
                          stat.change >= 0 ? "text-green-600" : "text-red-600"
                        }`}
                      />
                      <span
                        className={`text-sm ${
                          stat.change >= 0 ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {stat.change >= 0 ? "+" : ""}
                        {stat.change}%
                      </span>
                      <span className="text-sm text-slate-500">vs last week</span>
                    </div>
                  </div>
                  <div
                    className={`w-12 h-12 rounded-lg ${stat.color} bg-opacity-10 flex items-center justify-center`}
                  >
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}
