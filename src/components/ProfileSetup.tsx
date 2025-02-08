
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Upload, Briefcase, Award } from "lucide-react";

const ProfileSetup = () => {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card className="p-6 glass-panel">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold">Basic Information</h3>
            <p className="text-sm text-muted-foreground">
              This information will be used in your applications
            </p>
          </div>
          <Button variant="outline">Save Changes</Button>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" placeholder="John" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" placeholder="Doe" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="john@example.com" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" />
          </div>
        </div>
      </Card>

      <Card className="p-6 glass-panel">
        <h3 className="text-lg font-semibold mb-4">Resume & Portfolio</h3>
        <div className="space-y-4">
          <div className="border-2 border-dashed rounded-lg p-6 text-center">
            <Upload className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              Drag and drop your resume here, or click to browse
            </p>
            <Button variant="outline" className="mt-4">
              Upload Resume
            </Button>
          </div>

          <div className="space-y-2">
            <Label htmlFor="portfolio">Portfolio URL</Label>
            <Input id="portfolio" placeholder="https://your-portfolio.com" />
          </div>
        </div>
      </Card>

      <Card className="p-6 glass-panel">
        <h3 className="text-lg font-semibold mb-4">Professional Summary</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="summary">Summary</Label>
            <Textarea
              id="summary"
              placeholder="Write a brief professional summary..."
              className="min-h-[100px]"
            />
          </div>

          <div className="space-y-2">
            <Label>Key Skills</Label>
            <div className="flex flex-wrap gap-2">
              {["React", "TypeScript", "Node.js"].map((skill) => (
                <Button key={skill} variant="secondary" size="sm">
                  {skill} ×
                </Button>
              ))}
              <Button variant="outline" size="sm">
                Add Skill
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProfileSetup;
