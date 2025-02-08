
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Mon", applications: 4 },
  { name: "Tue", applications: 3 },
  { name: "Wed", applications: 5 },
  { name: "Thu", applications: 2 },
  { name: "Fri", applications: 6 },
  { name: "Sat", applications: 1 },
  { name: "Sun", applications: 3 },
];

const JobDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6 glass-panel">
          <h3 className="font-semibold mb-2">Total Applications</h3>
          <p className="text-3xl font-bold">24</p>
          <p className="text-sm text-muted-foreground">+12% from last week</p>
        </Card>
        <Card className="p-6 glass-panel">
          <h3 className="font-semibold mb-2">Interview Requests</h3>
          <p className="text-3xl font-bold">3</p>
          <p className="text-sm text-muted-foreground">2 pending responses</p>
        </Card>
        <Card className="p-6 glass-panel">
          <h3 className="font-semibold mb-2">Match Score</h3>
          <p className="text-3xl font-bold">85%</p>
          <p className="text-sm text-muted-foreground">Average job fit</p>
        </Card>
      </div>

      <Card className="p-6 glass-panel">
        <h3 className="font-semibold mb-4">Application Activity</h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="applications"
                stroke="#10B981"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="p-6 glass-panel">
        <h3 className="font-semibold mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {[1, 2, 3].map((_, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-4 rounded-lg bg-background"
            >
              <div>
                <h4 className="font-medium">Senior Frontend Developer</h4>
                <p className="text-sm text-muted-foreground">
                  Applied 2 hours ago • Match Score: 92%
                </p>
              </div>
              <Button variant="outline" size="sm">
                View Details
              </Button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default JobDashboard;
