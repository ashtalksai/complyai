"use client";

import { useState } from "react";
import { User, CreditCard, Plug, Github, MessageSquare, Trello, Check, Crown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockUser } from "@/lib/mock-data";

const invoices = [
  { id: "INV-001", date: "2024-03-01", amount: "$299.00", status: "Paid" },
  { id: "INV-002", date: "2024-02-01", amount: "$299.00", status: "Paid" },
  { id: "INV-003", date: "2024-01-01", amount: "$299.00", status: "Paid" },
  { id: "INV-004", date: "2023-12-01", amount: "$99.00", status: "Paid" },
];

const integrations = [
  { name: "GitHub", icon: Github, status: "connected", description: "Repository scanning and analysis" },
  { name: "Slack", icon: MessageSquare, status: "coming_soon", description: "Compliance notifications and alerts" },
  { name: "Jira", icon: Trello, status: "coming_soon", description: "Risk tracking and task management" },
];

export default function SettingsPage() {
  const [profile, setProfile] = useState({
    name: mockUser.name,
    email: mockUser.email,
    company: mockUser.company,
    role: "CTO",
  });

  const updateProfile = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setProfile((prev) => ({ ...prev, [field]: e.target.value }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-slate-400 text-sm mt-1">Manage your account, billing, and integrations</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="bg-slate-900/50 border border-slate-800">
          <TabsTrigger value="profile" className="data-[state=active]:bg-electric data-[state=active]:text-white">
            <User className="h-4 w-4 mr-1.5" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="billing" className="data-[state=active]:bg-electric data-[state=active]:text-white">
            <CreditCard className="h-4 w-4 mr-1.5" />
            Billing
          </TabsTrigger>
          <TabsTrigger value="integrations" className="data-[state=active]:bg-electric data-[state=active]:text-white">
            <Plug className="h-4 w-4 mr-1.5" />
            Integrations
          </TabsTrigger>
        </TabsList>

        {/* Profile */}
        <TabsContent value="profile">
          <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white text-base">Profile Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 max-w-lg">
              <div className="space-y-2">
                <Label className="text-slate-300">Full Name</Label>
                <Input
                  value={profile.name}
                  onChange={updateProfile("name")}
                  className="bg-slate-800/50 border-slate-700 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-300">Email</Label>
                <Input
                  value={profile.email}
                  onChange={updateProfile("email")}
                  className="bg-slate-800/50 border-slate-700 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-300">Company Name</Label>
                <Input
                  value={profile.company}
                  onChange={updateProfile("company")}
                  className="bg-slate-800/50 border-slate-700 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-300">Role</Label>
                <Select value={profile.role} onValueChange={(v) => setProfile((prev) => ({ ...prev, role: v }))}>
                  <SelectTrigger className="bg-slate-800/50 border-slate-700 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-900 border-slate-700">
                    <SelectItem value="CTO">CTO</SelectItem>
                    <SelectItem value="VP Engineering">VP Engineering</SelectItem>
                    <SelectItem value="Engineering Lead">Engineering Lead</SelectItem>
                    <SelectItem value="Security Engineer">Security Engineer</SelectItem>
                    <SelectItem value="Compliance Officer">Compliance Officer</SelectItem>
                    <SelectItem value="Developer">Developer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="bg-electric hover:bg-electric/90 text-white mt-2">Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Billing */}
        <TabsContent value="billing" className="space-y-6">
          <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white text-base">Current Plan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 bg-slate-800/30 rounded-lg border border-slate-700">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-electric/10 flex items-center justify-center">
                    <Crown className="h-5 w-5 text-electric" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-white font-medium">Pro Plan</span>
                      <Badge variant="secondary" className="bg-electric/10 text-electric border-electric/20">Active</Badge>
                    </div>
                    <p className="text-sm text-slate-400 mt-0.5">25 repositories, all frameworks, risk matrix</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold text-white font-mono">$299</span>
                  <span className="text-slate-400">/mo</span>
                </div>
              </div>
              <div className="mt-4 flex gap-3">
                <Button variant="outline" className="border-slate-700 text-slate-300 hover:text-white">
                  Change Plan
                </Button>
                <Button variant="outline" className="border-slate-700 text-slate-300 hover:text-white">
                  Update Payment
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white text-base">Invoice History</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-800 hover:bg-transparent">
                    <TableHead className="text-slate-400">Invoice</TableHead>
                    <TableHead className="text-slate-400">Date</TableHead>
                    <TableHead className="text-slate-400">Amount</TableHead>
                    <TableHead className="text-slate-400">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.map((inv) => (
                    <TableRow key={inv.id} className="border-slate-800">
                      <TableCell className="text-white font-mono text-sm">{inv.id}</TableCell>
                      <TableCell className="text-slate-300">{inv.date}</TableCell>
                      <TableCell className="text-white font-mono">{inv.amount}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="bg-green-500/10 text-green-400 border-green-500/20">
                          <Check className="h-3 w-3 mr-1" />
                          {inv.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Integrations */}
        <TabsContent value="integrations">
          <div className="space-y-4">
            {integrations.map((integration) => (
              <Card key={integration.name} className="bg-slate-900/50 border-slate-800">
                <CardContent className="py-5 px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center">
                        <integration.icon className="h-5 w-5 text-slate-300" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-white font-medium">{integration.name}</span>
                          {integration.status === "connected" ? (
                            <Badge variant="secondary" className="bg-green-500/10 text-green-400 border-green-500/20">
                              Connected
                            </Badge>
                          ) : (
                            <Badge variant="secondary" className="bg-slate-500/10 text-slate-400 border-slate-500/20">
                              Coming Soon
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-slate-400 mt-0.5">{integration.description}</p>
                      </div>
                    </div>
                    {integration.status === "connected" ? (
                      <Button variant="outline" size="sm" className="border-slate-700 text-slate-300">
                        Configure
                      </Button>
                    ) : (
                      <Button variant="outline" size="sm" className="border-slate-700 text-slate-500" disabled>
                        Coming Soon
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
