
import { Card } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import AutomatedApplications from "./AutomatedApplications";

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
        <Card className="p-6">
          <h3 className="font-semibold mb-2">Total Applications</h3>
          <p className="text-3xl font-bold text-foreground">24</p>
          <p className="text-sm text-muted-foreground">+12% from last week</p>
        </Card>
        <Card className="p-6">
          <h3 className="font-semibold mb-2">Interview Requests</h3>
          <p className="text-3xl font-bold text-foreground">3</p>
          <p className="text-sm text-muted-foreground">2 pending responses</p>
        </Card>
        <Card className="p-6">
          <h3 className="font-semibold mb-2">Match Score</h3>
          <p className="text-3xl font-bold text-foreground">85%</p>
          <p className="text-sm text-muted-foreground">Average job fit</p>
        </Card>
      </div>

      <AutomatedApplications />

      <Card className="p-6">
        <h3 className="font-semibold mb-4">Application Activity</h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-50" />
              <XAxis dataKey="name" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e2e8f0",
                }}
              />
              <Line
                type="monotone"
                dataKey="applications"
                stroke="#2563eb"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};

export default JobDashboard;
