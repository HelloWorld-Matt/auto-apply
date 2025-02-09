
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Upload, Briefcase, Award } from "lucide-react";
import { useAuth } from "@/components/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

const ProfileSetup = () => {
  const { user, profile } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: profile?.first_name || "",
    lastName: profile?.last_name || "",
    email: profile?.email || user?.email || "",
    phone: profile?.phone || "",
    portfolioUrl: profile?.portfolio_url || "",
    summary: profile?.summary || "",
    desiredJobTitles: profile?.desired_job_titles?.join(", ") || "",
    desiredLocations: profile?.desired_locations?.join(", ") || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleCVUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;
    const file = e.target.files[0];

    try {
      const fileExt = file.name.split('.').pop();
      const filePath = `${user?.id}/${crypto.randomUUID()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('cvs')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('cvs')
        .getPublicUrl(filePath);

      // Update profile with CV URL
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ cv_url: publicUrl })
        .eq('id', user?.id);

      if (updateError) throw updateError;

      toast({
        title: "CV Uploaded",
        description: "Your CV has been successfully uploaded",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Upload Failed",
        description: error.message,
      });
    }
  };

  const handleSave = async () => {
    if (!user) return;
    setIsLoading(true);

    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          portfolio_url: formData.portfolioUrl,
          summary: formData.summary,
          desired_job_titles: formData.desiredJobTitles.split(',').map(s => s.trim()),
          desired_locations: formData.desiredLocations.split(',').map(s => s.trim()),
        });

      if (error) throw error;

      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold">Basic Information</h3>
            <p className="text-sm text-muted-foreground">
              This information will be used in your applications
            </p>
          </div>
          <Button 
            variant="outline" 
            onClick={handleSave}
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input 
                id="firstName" 
                placeholder="John" 
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input 
                id="lastName" 
                placeholder="Doe" 
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="john@example.com" 
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input 
              id="phone" 
              type="tel" 
              placeholder="+1 (555) 000-0000" 
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Resume Upload</h3>
        <div className="space-y-4">
          <div className="border-2 border-dashed rounded-lg p-6 text-center">
            <Upload className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              Upload your CV for automated job matching
            </p>
            <Input
              type="file"
              accept=".pdf,.doc,.docx"
              className="hidden"
              id="cv-upload"
              onChange={handleCVUpload}
            />
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => document.getElementById('cv-upload')?.click()}
            >
              Upload CV
            </Button>
          </div>

          <div className="space-y-2">
            <Label htmlFor="portfolioUrl">Portfolio URL</Label>
            <Input 
              id="portfolioUrl" 
              placeholder="https://your-portfolio.com" 
              value={formData.portfolioUrl}
              onChange={handleChange}
            />
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Job Preferences</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="desiredJobTitles">Desired Job Titles</Label>
            <Input
              id="desiredJobTitles"
              placeholder="Software Engineer, Frontend Developer, etc."
              value={formData.desiredJobTitles}
              onChange={handleChange}
            />
            <p className="text-sm text-muted-foreground">
              Separate multiple job titles with commas
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="desiredLocations">Desired Locations</Label>
            <Input
              id="desiredLocations"
              placeholder="London, Remote, etc."
              value={formData.desiredLocations}
              onChange={handleChange}
            />
            <p className="text-sm text-muted-foreground">
              Separate multiple locations with commas
            </p>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Professional Summary</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="summary">Summary</Label>
            <Textarea
              id="summary"
              placeholder="Write a brief professional summary..."
              className="min-h-[100px]"
              value={formData.summary}
              onChange={handleChange}
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
