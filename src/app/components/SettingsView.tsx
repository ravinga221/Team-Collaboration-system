import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import { Textarea } from "./ui/textarea";
import { Avatar } from "./ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  User,
  Bell,
  Palette,
  Shield,
  Users,
  Zap,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Lock,
  Eye,
  Globe,
  Moon,
  Sun,
  Monitor,
  Slack,
  Github,
  Webhook,
  Key,
  Download,
  Trash2,
  AlertTriangle,
  Check,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "./ui/utils";

interface SettingsViewProps {
  currentUser: {
    name: string;
    email: string;
    avatar: string;
    role: string;
    phone?: string;
    location?: string;
    bio?: string;
  };
}

export function SettingsView({ currentUser }: SettingsViewProps) {
  const [profile, setProfile] = useState(currentUser);
  const [emailNotifications, setEmailNotifications] = useState({
    taskAssigned: true,
    taskCompleted: true,
    comments: true,
    mentions: true,
    dailyDigest: false,
    weeklyReport: true,
  });
  const [pushNotifications, setPushNotifications] = useState({
    enabled: true,
    messages: true,
    tasks: true,
    mentions: true,
  });
  const [theme, setTheme] = useState<"light" | "dark" | "system">("light");
  const [language, setLanguage] = useState("en");
  const [timezone, setTimezone] = useState("America/New_York");
  const [privacy, setPrivacy] = useState({
    showOnlineStatus: true,
    showActivity: true,
    allowMessages: "everyone",
    profileVisibility: "team",
  });
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const handleSaveProfile = () => {
    toast.success("Profile updated successfully");
  };

  const handleExportData = () => {
    toast.success("Your data export has been initiated. You'll receive an email when it's ready.");
  };

  const handleDeleteAccount = () => {
    toast.error("Account deletion requires admin confirmation");
  };

  return (
    <div className="max-w-5xl">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900">Settings</h2>
        <p className="text-slate-600 mt-1">
          Manage your account settings and preferences
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="w-4 h-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="w-4 h-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center gap-2">
            <Palette className="w-4 h-4" />
            Appearance
          </TabsTrigger>
          <TabsTrigger value="privacy" className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Privacy
          </TabsTrigger>
          <TabsTrigger value="team" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Team
          </TabsTrigger>
          <TabsTrigger value="integrations" className="flex items-center gap-2">
            <Zap className="w-4 h-4" />
            Integrations
          </TabsTrigger>
        </TabsList>

        {/* Profile Settings */}
        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Update your personal information and profile details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <div
                  className={`w-20 h-20 rounded-full flex items-center justify-center text-white text-2xl ${profile.avatar}`}
                >
                  {profile.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div className="space-y-2">
                  <Button variant="outline">Change Photo</Button>
                  <p className="text-xs text-slate-500">
                    JPG, GIF or PNG. Max size of 2MB
                  </p>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    value={profile.name}
                    onChange={(e) =>
                      setProfile({ ...profile, name: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Input id="role" value={profile.role} readOnly disabled />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">
                    <Mail className="w-4 h-4 inline mr-2" />
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) =>
                      setProfile({ ...profile, email: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">
                    <Phone className="w-4 h-4 inline mr-2" />
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={profile.phone || ""}
                    onChange={(e) =>
                      setProfile({ ...profile, phone: e.target.value })
                    }
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">
                  <MapPin className="w-4 h-4 inline mr-2" />
                  Location
                </Label>
                <Input
                  id="location"
                  value={profile.location || ""}
                  onChange={(e) =>
                    setProfile({ ...profile, location: e.target.value })
                  }
                  placeholder="City, Country"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={profile.bio || ""}
                  onChange={(e) =>
                    setProfile({ ...profile, bio: e.target.value })
                  }
                  placeholder="Tell us about yourself..."
                  rows={4}
                />
              </div>

              <div className="flex justify-end gap-3">
                <Button variant="outline">Cancel</Button>
                <Button onClick={handleSaveProfile}>Save Changes</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Security</CardTitle>
              <CardDescription>Manage your password and security settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input id="currentPassword" type="password" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input id="newPassword" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input id="confirmPassword" type="password" />
                </div>
              </div>
              <Button variant="outline">Update Password</Button>

              <Separator className="my-6" />

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-green-600" />
                    <h4 className="font-medium">Two-Factor Authentication</h4>
                  </div>
                  <p className="text-sm text-slate-600">
                    Add an extra layer of security to your account
                  </p>
                </div>
                <Switch
                  checked={twoFactorEnabled}
                  onCheckedChange={setTwoFactorEnabled}
                />
              </div>
              {twoFactorEnabled && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-green-900">
                        Two-factor authentication is enabled
                      </p>
                      <p className="text-xs text-green-700 mt-1">
                        Your account is protected with 2FA
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Settings */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Email Notifications</CardTitle>
              <CardDescription>
                Choose what updates you want to receive via email
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(emailNotifications).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">
                      {key
                        .replace(/([A-Z])/g, " $1")
                        .replace(/^./, (str) => str.toUpperCase())}
                    </p>
                    <p className="text-xs text-slate-600">
                      {getNotificationDescription(key)}
                    </p>
                  </div>
                  <Switch
                    checked={value}
                    onCheckedChange={(checked) =>
                      setEmailNotifications({ ...emailNotifications, [key]: checked })
                    }
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Push Notifications</CardTitle>
              <CardDescription>
                Manage browser push notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">Enable Push Notifications</p>
                  <p className="text-xs text-slate-600">
                    Receive real-time notifications in your browser
                  </p>
                </div>
                <Switch
                  checked={pushNotifications.enabled}
                  onCheckedChange={(checked) =>
                    setPushNotifications({ ...pushNotifications, enabled: checked })
                  }
                />
              </div>

              {pushNotifications.enabled && (
                <>
                  <Separator />
                  {Object.entries(pushNotifications)
                    .filter(([key]) => key !== "enabled")
                    .map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between">
                        <p className="text-sm">
                          {key
                            .replace(/([A-Z])/g, " $1")
                            .replace(/^./, (str) => str.toUpperCase())}
                        </p>
                        <Switch
                          checked={value}
                          onCheckedChange={(checked) =>
                            setPushNotifications({
                              ...pushNotifications,
                              [key]: checked,
                            })
                          }
                        />
                      </div>
                    ))}
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appearance Settings */}
        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Theme</CardTitle>
              <CardDescription>
                Customize how TeamSync looks for you
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                {[
                  { value: "light", icon: Sun, label: "Light" },
                  { value: "dark", icon: Moon, label: "Dark" },
                  { value: "system", icon: Monitor, label: "System" },
                ].map((option) => {
                  const Icon = option.icon;
                  return (
                    <button
                      key={option.value}
                      onClick={() => setTheme(option.value as any)}
                      className={cn(
                        "p-4 border-2 rounded-lg flex flex-col items-center gap-2 transition-all",
                        theme === option.value
                          ? "border-blue-600 bg-blue-50"
                          : "border-slate-200 hover:border-slate-300"
                      )}
                    >
                      <Icon
                        className={cn(
                          "w-6 h-6",
                          theme === option.value ? "text-blue-600" : "text-slate-600"
                        )}
                      />
                      <span
                        className={cn(
                          "text-sm font-medium",
                          theme === option.value ? "text-blue-600" : "text-slate-900"
                        )}
                      >
                        {option.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Language & Region</CardTitle>
              <CardDescription>
                Set your preferred language and timezone
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="language">
                  <Globe className="w-4 h-4 inline mr-2" />
                  Language
                </Label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Español</SelectItem>
                    <SelectItem value="fr">Français</SelectItem>
                    <SelectItem value="de">Deutsch</SelectItem>
                    <SelectItem value="ja">日本語</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="timezone">
                  <Calendar className="w-4 h-4 inline mr-2" />
                  Timezone
                </Label>
                <Select value={timezone} onValueChange={setTimezone}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="America/New_York">
                      Eastern Time (ET)
                    </SelectItem>
                    <SelectItem value="America/Chicago">
                      Central Time (CT)
                    </SelectItem>
                    <SelectItem value="America/Denver">
                      Mountain Time (MT)
                    </SelectItem>
                    <SelectItem value="America/Los_Angeles">
                      Pacific Time (PT)
                    </SelectItem>
                    <SelectItem value="Europe/London">
                      London (GMT)
                    </SelectItem>
                    <SelectItem value="Europe/Paris">
                      Paris (CET)
                    </SelectItem>
                    <SelectItem value="Asia/Tokyo">
                      Tokyo (JST)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Privacy Settings */}
        <TabsContent value="privacy" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Privacy Controls</CardTitle>
              <CardDescription>
                Manage your privacy and data sharing preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">Show Online Status</p>
                  <p className="text-xs text-slate-600">
                    Let others see when you're online
                  </p>
                </div>
                <Switch
                  checked={privacy.showOnlineStatus}
                  onCheckedChange={(checked) =>
                    setPrivacy({ ...privacy, showOnlineStatus: checked })
                  }
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">Show Activity Status</p>
                  <p className="text-xs text-slate-600">
                    Display what you're working on
                  </p>
                </div>
                <Switch
                  checked={privacy.showActivity}
                  onCheckedChange={(checked) =>
                    setPrivacy({ ...privacy, showActivity: checked })
                  }
                />
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="allowMessages">Who can message you</Label>
                <Select
                  value={privacy.allowMessages}
                  onValueChange={(value) =>
                    setPrivacy({ ...privacy, allowMessages: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="everyone">Everyone</SelectItem>
                    <SelectItem value="team">Team members only</SelectItem>
                    <SelectItem value="none">No one</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="profileVisibility">Profile Visibility</Label>
                <Select
                  value={privacy.profileVisibility}
                  onValueChange={(value) =>
                    setPrivacy({ ...privacy, profileVisibility: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">Public</SelectItem>
                    <SelectItem value="team">Team only</SelectItem>
                    <SelectItem value="private">Private</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Data & Privacy</CardTitle>
              <CardDescription>
                Download or delete your data
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <Download className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-sm text-blue-900">
                      Export Your Data
                    </p>
                    <p className="text-xs text-blue-700 mt-1">
                      Download a copy of your personal data
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={handleExportData}>
                  Export
                </Button>
              </div>

              <div className="flex items-center justify-between p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <Trash2 className="w-5 h-5 text-red-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-sm text-red-900">
                      Delete Account
                    </p>
                    <p className="text-xs text-red-700 mt-1">
                      Permanently delete your account and all data
                    </p>
                  </div>
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleDeleteAccount}
                >
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Team Settings */}
        <TabsContent value="team" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Team Settings</CardTitle>
              <CardDescription>
                Manage team-wide preferences and permissions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-medium">Team Name</h4>
                    <p className="text-sm text-slate-600">TeamSync</p>
                  </div>
                  <Badge>Pro Plan</Badge>
                </div>
                <Separator className="my-4" />
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-semibold text-slate-900">6</p>
                    <p className="text-xs text-slate-600">Members</p>
                  </div>
                  <div>
                    <p className="text-2xl font-semibold text-slate-900">12</p>
                    <p className="text-xs text-slate-600">Projects</p>
                  </div>
                  <div>
                    <p className="text-2xl font-semibold text-slate-900">48</p>
                    <p className="text-xs text-slate-600">Tasks</p>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <h4 className="font-medium text-sm">Team Permissions</h4>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-slate-600">
                    Allow members to invite others
                  </p>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-slate-600">
                    Allow members to create projects
                  </p>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-slate-600">
                    Require admin approval for tasks
                  </p>
                  <Switch />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Integrations Settings */}
        <TabsContent value="integrations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Connected Apps</CardTitle>
              <CardDescription>
                Integrate TeamSync with your favorite tools
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  name: "Slack",
                  icon: Slack,
                  description: "Send notifications to Slack channels",
                  connected: true,
                  color: "text-purple-600",
                },
                {
                  name: "GitHub",
                  icon: Github,
                  description: "Link commits and pull requests to tasks",
                  connected: true,
                  color: "text-slate-900",
                },
                {
                  name: "Webhooks",
                  icon: Webhook,
                  description: "Send custom webhooks for events",
                  connected: false,
                  color: "text-blue-600",
                },
              ].map((integration) => {
                const Icon = integration.icon;
                return (
                  <div
                    key={integration.name}
                    className="flex items-center justify-between p-4 border border-slate-200 rounded-lg"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                        <Icon className={cn("w-5 h-5", integration.color)} />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm flex items-center gap-2">
                          {integration.name}
                          {integration.connected && (
                            <Badge variant="secondary" className="bg-green-100 text-green-700">
                              Connected
                            </Badge>
                          )}
                        </h4>
                        <p className="text-xs text-slate-600">
                          {integration.description}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant={integration.connected ? "outline" : "default"}
                      size="sm"
                    >
                      {integration.connected ? "Configure" : "Connect"}
                    </Button>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>API Access</CardTitle>
              <CardDescription>
                Manage API keys for custom integrations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <Key className="w-4 h-4 text-slate-600" />
                  <h4 className="font-medium text-sm">Your API Key</h4>
                </div>
                <div className="flex gap-2">
                  <Input
                    value="sk_live_••••••••••••••••••••••••"
                    readOnly
                    className="font-mono text-sm"
                  />
                  <Button variant="outline" size="sm">
                    Copy
                  </Button>
                </div>
              </div>
              <Button variant="outline">
                <Key className="w-4 h-4 mr-2" />
                Generate New API Key
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function getNotificationDescription(key: string): string {
  const descriptions: Record<string, string> = {
    taskAssigned: "When a task is assigned to you",
    taskCompleted: "When someone completes a task",
    comments: "When someone comments on your tasks",
    mentions: "When someone mentions you",
    dailyDigest: "Daily summary of team activity",
    weeklyReport: "Weekly team performance report",
  };
  return descriptions[key] || "";
}
