
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SettingsPanel = () => {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card className="p-6 glass-panel">
        <h3 className="text-lg font-semibold mb-4">Application Preferences</h3>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Automatic Applications</Label>
              <p className="text-sm text-muted-foreground">
                Automatically apply to highly matched jobs
              </p>
            </div>
            <Switch />
          </div>

          <div className="space-y-2">
            <Label>Minimum Match Score</Label>
            <Select defaultValue="85">
              <SelectTrigger>
                <SelectValue placeholder="Select minimum match score" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="75">75%</SelectItem>
                <SelectItem value="80">80%</SelectItem>
                <SelectItem value="85">85%</SelectItem>
                <SelectItem value="90">90%</SelectItem>
                <SelectItem value="95">95%</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Job Types</Label>
            <div className="flex flex-wrap gap-2">
              <Button variant="secondary" size="sm">
                Full-time
              </Button>
              <Button variant="outline" size="sm">
                Part-time
              </Button>
              <Button variant="outline" size="sm">
                Contract
              </Button>
              <Button variant="outline" size="sm">
                Freelance
              </Button>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6 glass-panel">
        <h3 className="text-lg font-semibold mb-4">Notifications</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Email Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive updates about your applications
              </p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>SMS Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Get text messages for important updates
              </p>
            </div>
            <Switch />
          </div>
        </div>
      </Card>

      <Card className="p-6 glass-panel">
        <h3 className="text-lg font-semibold mb-4">AI Settings</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Cover Letter Style</Label>
            <Select defaultValue="professional">
              <SelectTrigger>
                <SelectValue placeholder="Select style" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="professional">Professional</SelectItem>
                <SelectItem value="casual">Casual</SelectItem>
                <SelectItem value="creative">Creative</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>AI Job Matching</Label>
              <p className="text-sm text-muted-foreground">
                Use AI to match jobs with your profile
              </p>
            </div>
            <Switch defaultChecked />
          </div>
        </div>
      </Card>

      <Card className="p-6 glass-panel">
        <h3 className="text-lg font-semibold mb-4">Export Data</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Export Format</Label>
            <Select defaultValue="csv">
              <SelectTrigger>
                <SelectValue placeholder="Select format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="csv">CSV</SelectItem>
                <SelectItem value="json">JSON</SelectItem>
                <SelectItem value="pdf">PDF</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button variant="outline">Export Application History</Button>
        </div>
      </Card>
    </div>
  );
};

export default SettingsPanel;
