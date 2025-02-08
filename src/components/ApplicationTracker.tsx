
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";

const applications = [
  {
    id: 1,
    role: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    status: "Applied",
    date: "2024-02-20",
    matchScore: 92,
  },
  {
    id: 2,
    role: "Full Stack Engineer",
    company: "StartupXYZ",
    status: "Interview",
    date: "2024-02-19",
    matchScore: 88,
  },
  {
    id: 3,
    role: "React Developer",
    company: "BigTech Co.",
    status: "Rejected",
    date: "2024-02-18",
    matchScore: 75,
  },
];

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "applied":
      return "default";
    case "interview":
      return "success";
    case "rejected":
      return "destructive";
    default:
      return "secondary";
  }
};

const ApplicationTracker = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search applications..."
              className="pl-9 w-[300px]"
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
        <Button>
          New Application
        </Button>
      </div>

      <Card className="glass-panel">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Role</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Match Score</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applications.map((app) => (
              <TableRow key={app.id}>
                <TableCell className="font-medium">{app.role}</TableCell>
                <TableCell>{app.company}</TableCell>
                <TableCell>
                  <Badge variant={getStatusColor(app.status)}>{app.status}</Badge>
                </TableCell>
                <TableCell>{new Date(app.date).toLocaleDateString()}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <span
                      className={`font-medium ${
                        app.matchScore >= 85
                          ? "text-green-600"
                          : app.matchScore >= 70
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}
                    >
                      {app.matchScore}%
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default ApplicationTracker;
