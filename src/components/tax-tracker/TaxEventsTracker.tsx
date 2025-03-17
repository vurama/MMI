import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Calendar,
  Clock,
  Filter,
  Search,
  AlertCircle,
  FileText,
  Download,
  Plus,
} from "lucide-react";

interface TaxEventsTrackerProps {
  year: string;
  country: string;
}

interface TaxEvent {
  id: string;
  date: string;
  type: string;
  description: string;
  impact: "high" | "medium" | "low";
  status: "upcoming" | "active" | "completed";
  assetClasses: string[];
  notes?: string;
}

const TaxEventsTracker: React.FC<TaxEventsTrackerProps> = ({
  year,
  country,
}) => {
  // Mock tax events data
  const taxEvents: TaxEvent[] = [
    {
      id: "1",
      date: "2023-04-15",
      type: "deadline",
      description: "Q1 Estimated Tax Payment Due",
      impact: "high",
      status: "completed",
      assetClasses: ["all"],
      notes: "Federal estimated tax payment for Q1",
    },
    {
      id: "2",
      date: "2023-06-15",
      type: "deadline",
      description: "Q2 Estimated Tax Payment Due",
      impact: "high",
      status: "upcoming",
      assetClasses: ["all"],
      notes: "Federal estimated tax payment for Q2",
    },
    {
      id: "3",
      date: "2023-09-15",
      type: "deadline",
      description: "Q3 Estimated Tax Payment Due",
      impact: "high",
      status: "upcoming",
      assetClasses: ["all"],
    },
    {
      id: "4",
      date: "2023-12-31",
      type: "deadline",
      description: "Last Day for Tax Loss Harvesting",
      impact: "high",
      status: "upcoming",
      assetClasses: ["stocks", "crypto", "etfs"],
    },
    {
      id: "5",
      date: "2023-05-17",
      type: "policy",
      description: "New Crypto Reporting Requirements",
      impact: "medium",
      status: "active",
      assetClasses: ["crypto"],
      notes:
        "New regulations requiring enhanced reporting for crypto transactions over $10,000",
    },
    {
      id: "6",
      date: "2023-07-01",
      type: "policy",
      description: "Capital Gains Tax Rate Change",
      impact: "high",
      status: "upcoming",
      assetClasses: ["stocks", "etfs", "real-estate"],
      notes:
        "Proposed increase in long-term capital gains tax rate for high-income individuals",
    },
    {
      id: "7",
      date: "2023-03-15",
      type: "deadline",
      description: "Business Tax Return Due",
      impact: "medium",
      status: "completed",
      assetClasses: ["business"],
    },
    {
      id: "8",
      date: "2023-10-15",
      type: "deadline",
      description: "Extended Individual Tax Return Due",
      impact: "high",
      status: "upcoming",
      assetClasses: ["all"],
    },
    {
      id: "9",
      date: "2023-08-15",
      type: "policy",
      description: "New Tax Treaty with Singapore",
      impact: "low",
      status: "upcoming",
      assetClasses: ["international"],
      notes:
        "New tax treaty affecting withholding rates on dividends and interest",
    },
    {
      id: "10",
      date: "2023-11-01",
      type: "policy",
      description: "NFT Tax Classification Update",
      impact: "medium",
      status: "upcoming",
      assetClasses: ["crypto", "nft"],
      notes: "IRS guidance on tax treatment of NFTs as collectibles",
    },
  ];

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
      case "medium":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300";
      case "low":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      case "completed":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "deadline":
        return <Clock className="h-4 w-4 mr-2" />;
      case "policy":
        return <FileText className="h-4 w-4 mr-2" />;
      default:
        return <AlertCircle className="h-4 w-4 mr-2" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h2 className="text-2xl font-bold flex items-center">
                <Calendar className="h-6 w-6 mr-2 text-indigo-500" />
                Tax Events Tracker
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mt-1">
                Stay updated on important tax deadlines and policy changes
              </p>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                <span>Add Custom Event</span>
              </Button>

              <Button variant="outline" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                <span>Export Calendar</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input placeholder="Search tax events..." className="pl-10" />
        </div>

        <div className="flex gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </Button>

          <Button variant="outline" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>Calendar View</span>
          </Button>
        </div>
      </div>

      {/* Events Tabs */}
      <Tabs defaultValue="all">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All Events</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="deadlines">Deadlines</TabsTrigger>
          <TabsTrigger value="policies">Policy Changes</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">
                All Tax Events
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Event</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Impact</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Asset Classes</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {taxEvents.map((event) => (
                    <TableRow key={event.id}>
                      <TableCell className="font-medium">
                        {new Date(event.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{event.description}</div>
                          {event.notes && (
                            <div className="text-xs text-gray-500 mt-1">
                              {event.notes}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className="flex items-center w-fit"
                        >
                          {getTypeIcon(event.type)}
                          <span>
                            {event.type.charAt(0).toUpperCase() +
                              event.type.slice(1)}
                          </span>
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={getImpactColor(event.impact)}
                        >
                          {event.impact.charAt(0).toUpperCase() +
                            event.impact.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={getStatusColor(event.status)}
                        >
                          {event.status.charAt(0).toUpperCase() +
                            event.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {event.assetClasses.map((assetClass) => (
                            <Badge
                              key={assetClass}
                              variant="outline"
                              className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                            >
                              {assetClass === "all"
                                ? "All"
                                : assetClass.charAt(0).toUpperCase() +
                                  assetClass.slice(1)}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="upcoming" className="mt-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">
                Upcoming Tax Events
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Event</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Impact</TableHead>
                    <TableHead>Asset Classes</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {taxEvents
                    .filter((event) => event.status === "upcoming")
                    .map((event) => (
                      <TableRow key={event.id}>
                        <TableCell className="font-medium">
                          {new Date(event.date).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">
                              {event.description}
                            </div>
                            {event.notes && (
                              <div className="text-xs text-gray-500 mt-1">
                                {event.notes}
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className="flex items-center w-fit"
                          >
                            {getTypeIcon(event.type)}
                            <span>
                              {event.type.charAt(0).toUpperCase() +
                                event.type.slice(1)}
                            </span>
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={getImpactColor(event.impact)}
                          >
                            {event.impact.charAt(0).toUpperCase() +
                              event.impact.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {event.assetClasses.map((assetClass) => (
                              <Badge
                                key={assetClass}
                                variant="outline"
                                className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                              >
                                {assetClass === "all"
                                  ? "All"
                                  : assetClass.charAt(0).toUpperCase() +
                                    assetClass.slice(1)}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="deadlines" className="mt-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">
                Tax Deadlines
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Event</TableHead>
                    <TableHead>Impact</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Asset Classes</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {taxEvents
                    .filter((event) => event.type === "deadline")
                    .map((event) => (
                      <TableRow key={event.id}>
                        <TableCell className="font-medium">
                          {new Date(event.date).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">
                              {event.description}
                            </div>
                            {event.notes && (
                              <div className="text-xs text-gray-500 mt-1">
                                {event.notes}
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={getImpactColor(event.impact)}
                          >
                            {event.impact.charAt(0).toUpperCase() +
                              event.impact.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={getStatusColor(event.status)}
                          >
                            {event.status.charAt(0).toUpperCase() +
                              event.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {event.assetClasses.map((assetClass) => (
                              <Badge
                                key={assetClass}
                                variant="outline"
                                className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                              >
                                {assetClass === "all"
                                  ? "All"
                                  : assetClass.charAt(0).toUpperCase() +
                                    assetClass.slice(1)}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="policies" className="mt-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">
                Tax Policy Changes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Event</TableHead>
                    <TableHead>Impact</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Asset Classes</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {taxEvents
                    .filter((event) => event.type === "policy")
                    .map((event) => (
                      <TableRow key={event.id}>
                        <TableCell className="font-medium">
                          {new Date(event.date).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">
                              {event.description}
                            </div>
                            {event.notes && (
                              <div className="text-xs text-gray-500 mt-1">
                                {event.notes}
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={getImpactColor(event.impact)}
                          >
                            {event.impact.charAt(0).toUpperCase() +
                              event.impact.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={getStatusColor(event.status)}
                          >
                            {event.status.charAt(0).toUpperCase() +
                              event.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {event.assetClasses.map((assetClass) => (
                              <Badge
                                key={assetClass}
                                variant="outline"
                                className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                              >
                                {assetClass === "all"
                                  ? "All"
                                  : assetClass.charAt(0).toUpperCase() +
                                    assetClass.slice(1)}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TaxEventsTracker;
