import React, { useState, useEffect } from "react";
import DashboardLayout from "../dashboard/layout/DashboardLayout";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Bold, Italic, Link, List, ListOrdered, Save, X } from "lucide-react";

interface Post {
  id: string;
  title: string;
  content: string;
  hasChart: boolean;
  chartType?: "line" | "bar" | "pie";
  chartImage?: string;
  resolution?: string;
  createdAt: string;
  updatedAt: string;
}

const AdminAdvisorPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    hasChart: false,
    chartType: "line" as "line" | "bar" | "pie",
    chartImage: "",
    resolution: "",
  });
  const [chartFile, setChartFile] = useState<File | null>(null);
  const [chartPreview, setChartPreview] = useState("");

  useEffect(() => {
    // Load posts from API or database
    // This is a placeholder for demonstration
    const mockPosts: Post[] = [
      {
        id: "1",
        title: "Market Analysis: Tech Sector",
        content: "The tech sector is showing strong growth potential...",
        hasChart: true,
        chartType: "line",
        chartImage:
          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
        resolution: "Consider increasing allocation to tech stocks.",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "2",
        title: "Real Estate Market Update",
        content: "Housing prices continue to rise in metropolitan areas...",
        hasChart: true,
        chartType: "bar",
        chartImage:
          "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80",
        resolution: "Consider diversifying real estate investments.",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];
    setPosts(mockPosts);
  }, []);

  const handleEditPost = () => {
    // Update post in database
    if (selectedPost) {
      const updatedPosts = posts.map((post) =>
        post.id === selectedPost.id
          ? {
              ...post,
              ...formData,
              updatedAt: new Date().toISOString(),
            }
          : post,
      );
      setPosts(updatedPosts);
      setIsEditDialogOpen(false);
      setSelectedPost(null);
      resetForm();
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      content: "",
      hasChart: false,
      chartType: "line",
      chartImage: "",
      resolution: "",
    });
    setChartFile(null);
    setChartPreview("");
  };

  const handleChartFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 2 * 1024 * 1024) {
        alert("File size exceeds 2MB limit");
        return;
      }
      setChartFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && typeof event.target.result === "string") {
          setChartPreview(event.target.result);
          setFormData({
            ...formData,
            chartImage: event.target.result,
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container mx-auto py-6">
      <DashboardLayout activeItem="Pro Advisor Admin">
        <main className="flex-1 overflow-auto p-4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Pro Advisor Admin</h1>
            <Button
              onClick={() => {
                resetForm();
                setSelectedPost(null);
                setIsEditDialogOpen(true);
              }}
            >
              Create New Post
            </Button>
          </div>

          {/* Post management UI would go here */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <div
                key={post.id}
                className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                  {post.content}
                </p>
                {post.hasChart && post.chartImage && (
                  <img
                    src={post.chartImage}
                    alt="Chart"
                    className="w-full h-40 object-cover rounded-md mb-4"
                  />
                )}
                <div className="flex justify-end">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedPost(post);
                      setFormData({
                        title: post.title,
                        content: post.content,
                        hasChart: post.hasChart,
                        chartType: post.chartType || "line",
                        chartImage: post.chartImage || "",
                        resolution: post.resolution || "",
                      });
                      setChartPreview(post.chartImage || "");
                      setIsEditDialogOpen(true);
                    }}
                  >
                    Edit
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </DashboardLayout>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>Edit Advisory Post</DialogTitle>
            <DialogDescription>
              Update the content and settings for this advisory post.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-title">Title</Label>
              <Input
                id="edit-title"
                placeholder="Enter post title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between mb-2">
                <Label htmlFor="edit-content">Content</Label>
                <div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-800 rounded-md p-1">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => {
                            const textarea = document.getElementById(
                              "edit-content",
                            ) as HTMLTextAreaElement;
                            if (!textarea) return;

                            const start = textarea.selectionStart;
                            const end = textarea.selectionEnd;
                            const selectedText = formData.content.substring(
                              start,
                              end,
                            );
                            const newText =
                              formData.content.substring(0, start) +
                              `**${selectedText}**` +
                              formData.content.substring(end);

                            setFormData({ ...formData, content: newText });
                          }}
                        >
                          <Bold className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Bold</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => {
                            const textarea = document.getElementById(
                              "edit-content",
                            ) as HTMLTextAreaElement;
                            if (!textarea) return;

                            const start = textarea.selectionStart;
                            const end = textarea.selectionEnd;
                            const selectedText = formData.content.substring(
                              start,
                              end,
                            );
                            const newText =
                              formData.content.substring(0, start) +
                              `*${selectedText}*` +
                              formData.content.substring(end);

                            setFormData({ ...formData, content: newText });
                          }}
                        >
                          <Italic className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Italic</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <Separator orientation="vertical" className="h-6" />

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => {
                            const textarea = document.getElementById(
                              "edit-content",
                            ) as HTMLTextAreaElement;
                            if (!textarea) return;

                            const start = textarea.selectionStart;
                            const cursorPos = textarea.selectionStart;
                            const textBefore = formData.content.substring(
                              0,
                              cursorPos,
                            );
                            const textAfter =
                              formData.content.substring(cursorPos);

                            // Add bullet point at cursor position
                            const newText = textBefore + "\n- " + textAfter;

                            setFormData({ ...formData, content: newText });

                            // Set cursor position after the bullet point
                            setTimeout(() => {
                              textarea.focus();
                              textarea.selectionStart = textarea.selectionEnd =
                                cursorPos + 3;
                            }, 0);
                          }}
                        >
                          <List className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Bullet List</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => {
                            const textarea = document.getElementById(
                              "edit-content",
                            ) as HTMLTextAreaElement;
                            if (!textarea) return;

                            const cursorPos = textarea.selectionStart;
                            const textBefore = formData.content.substring(
                              0,
                              cursorPos,
                            );
                            const textAfter =
                              formData.content.substring(cursorPos);

                            // Add numbered list at cursor position
                            const newText = textBefore + "\n1. " + textAfter;

                            setFormData({ ...formData, content: newText });

                            // Set cursor position after the number
                            setTimeout(() => {
                              textarea.focus();
                              textarea.selectionStart = textarea.selectionEnd =
                                cursorPos + 4;
                            }, 0);
                          }}
                        >
                          <ListOrdered className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Numbered List</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <Separator orientation="vertical" className="h-6" />

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => {
                            const textarea = document.getElementById(
                              "edit-content",
                            ) as HTMLTextAreaElement;
                            if (!textarea) return;

                            const start = textarea.selectionStart;
                            const end = textarea.selectionEnd;
                            const selectedText = formData.content.substring(
                              start,
                              end,
                            );

                            // Open a prompt for the URL
                            const url = prompt("Enter URL:", "https://");
                            if (!url) return;

                            const newText =
                              formData.content.substring(0, start) +
                              `[${selectedText}](${url})` +
                              formData.content.substring(end);

                            setFormData({ ...formData, content: newText });
                          }}
                        >
                          <Link className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Add Link</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
              <Textarea
                id="edit-content"
                placeholder="Write your post content here..."
                className="min-h-[200px] font-mono"
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
              />
              <div className="text-xs text-gray-500 dark:text-gray-400">
                <p>
                  Formatting: <strong>**bold**</strong>, <em>*italic*</em>,
                  [link text](url), - for bullets, 1. for numbered lists
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="edit-hasChart"
                checked={formData.hasChart}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, hasChart: checked })
                }
              />
              <Label htmlFor="edit-hasChart">Include Chart</Label>
            </div>
            {formData.hasChart && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-chartType">Chart Type</Label>
                  <Select
                    value={formData.chartType}
                    onValueChange={(value) =>
                      setFormData({
                        ...formData,
                        chartType: value as "line" | "bar" | "pie",
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select chart type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="line">Line Chart</SelectItem>
                      <SelectItem value="bar">Bar Chart</SelectItem>
                      <SelectItem value="pie">Pie Chart</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-chartImage">Chart Image (Max 2MB)</Label>
                  <Input
                    id="edit-chartImage"
                    type="file"
                    accept="image/*"
                    onChange={handleChartFileChange}
                  />
                  {chartPreview && (
                    <div className="mt-2 relative">
                      <img
                        src={chartPreview}
                        alt="Chart preview"
                        className="max-h-[200px] rounded-md border border-gray-200 dark:border-gray-700"
                      />
                      <Button
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={() => {
                          setChartPreview("");
                          setChartFile(null);
                          setFormData({
                            ...formData,
                            chartImage: "",
                          });
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="edit-resolution">
                Resolution/Recommendation (Optional)
              </Label>
              <Textarea
                id="edit-resolution"
                placeholder="Add a recommendation or resolution for your analysis..."
                className="min-h-[100px]"
                value={formData.resolution}
                onChange={(e) =>
                  setFormData({ ...formData, resolution: e.target.value })
                }
              />
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={() => {
                resetForm();
                setIsEditDialogOpen(false);
                setSelectedPost(null);
              }}
            >
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button
              onClick={handleEditPost}
              disabled={!formData.title.trim() || !formData.content.trim()}
            >
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminAdvisorPage;
