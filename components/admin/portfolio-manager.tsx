"use client";

import { useActionState, useEffect, useState, useTransition } from "react";
import { IMAGE_ACCEPT } from "@/lib/validation/media";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Pencil, Plus, Trash2 } from "lucide-react";
import {
  savePortfolioProject,
  deletePortfolioProject,
  setPortfolioPublished,
  setPortfolioFeatured,
  type PortfolioActionState,
} from "@/lib/actions/portfolio";
import { PORTFOLIO_CATEGORIES } from "@/lib/validation/portfolio";
import { PORTFOLIO_CATEGORY_LABELS } from "@/lib/content/site-content";
import type { Database } from "@/types/database";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export type AdminPortfolioProject = Database["public"]["Tables"]["portfolio_projects"]["Row"] & {
  coverImageUrl: string | null;
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const initialState: PortfolioActionState = { status: "idle" };

function PortfolioFormDialog({
  project,
  open,
  onOpenChange,
}: {
  project: AdminPortfolioProject | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [state, formAction, isPending] = useActionState(savePortfolioProject, initialState);
  const [slug, setSlug] = useState(project?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(project));
  const router = useRouter();

  useEffect(() => {
    if (state.status === "success") {
      toast.success(state.message ?? "Saved.");
      onOpenChange(false);
      router.refresh();
    } else if (state.status === "error") {
      toast.error(state.message ?? "Something went wrong.");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] max-w-lg overflow-y-auto sm:max-w-lg">
        <form action={formAction} className="flex flex-col gap-4">
          <DialogHeader>
            <DialogTitle>{project ? "Edit project" : "New project"}</DialogTitle>
          </DialogHeader>

          {project && <input type="hidden" name="id" value={project.id} />}

          <div className="flex flex-col gap-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              name="title"
              required
              defaultValue={project?.title}
              onChange={(event) => {
                if (!slugTouched) setSlug(slugify(event.target.value));
              }}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="slug">Slug *</Label>
            <Input
              id="slug"
              name="slug"
              required
              value={slug}
              onChange={(event) => {
                setSlugTouched(true);
                setSlug(event.target.value);
              }}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="category">Category *</Label>
            <Select name="category" defaultValue={project?.category ?? PORTFOLIO_CATEGORIES[0]} required>
              <SelectTrigger id="category" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {PORTFOLIO_CATEGORIES.map((category) => (
                  <SelectItem key={category} value={category}>
                    {PORTFOLIO_CATEGORY_LABELS[category]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {/* Radix Select doesn't submit a native form field on its own trigger; mirror the value. */}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="clientName">Client name</Label>
            <Input id="clientName" name="clientName" defaultValue={project?.client_name ?? ""} />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" name="description" rows={3} defaultValue={project?.description ?? ""} />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="projectUrl">Project URL</Label>
            <Input
              id="projectUrl"
              name="projectUrl"
              type="text"
              inputMode="url"
              placeholder="https://example.com"
              defaultValue={project?.project_url ?? ""}
            />
            <p className="text-xs text-muted-foreground">
              Optional. The portfolio card links to this page when set.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="tags">Tags (comma separated)</Label>
            <Input id="tags" name="tags" defaultValue={project?.tags.join(", ") ?? ""} />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="coverImage">Cover image {project ? "" : "*"}</Label>
            {project?.coverImageUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={project.coverImageUrl}
                alt=""
                className="h-24 w-full rounded-md object-cover"
              />
            )}
            <Input id="coverImage" name="coverImage" type="file" accept={IMAGE_ACCEPT} required={!project} />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="displayOrder">Display order</Label>
            <Input
              id="displayOrder"
              name="displayOrder"
              type="number"
              min={0}
              defaultValue={project?.display_order ?? 0}
            />
          </div>

          <div className="flex items-center justify-between rounded-lg border border-border p-3">
            <Label htmlFor="isFeatured">Featured</Label>
            <Switch id="isFeatured" name="isFeatured" defaultChecked={project?.is_featured ?? false} />
          </div>

          <div className="flex items-center justify-between rounded-lg border border-border p-3">
            <Label htmlFor="published">Published</Label>
            <Switch id="published" name="published" defaultChecked={project?.published ?? true} />
          </div>

          <DialogFooter>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function PortfolioManager({ projects }: { projects: AdminPortfolioProject[] }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<AdminPortfolioProject | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function openCreate() {
    setEditing(null);
    setDialogOpen(true);
  }

  function openEdit(project: AdminPortfolioProject) {
    setEditing(project);
    setDialogOpen(true);
  }

  function handleDelete(id: string) {
    startTransition(async () => {
      try {
        await deletePortfolioProject(id);
        router.refresh();
        toast.success("Project deleted.");
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Failed to delete project.");
      }
    });
  }

  function handleTogglePublished(id: string, published: boolean) {
    startTransition(async () => {
      try {
        await setPortfolioPublished(id, published);
        router.refresh();
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Failed to update.");
      }
    });
  }

  function handleToggleFeatured(id: string, featured: boolean) {
    startTransition(async () => {
      try {
        await setPortfolioFeatured(id, featured);
        router.refresh();
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Failed to update.");
      }
    });
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end">
        <Button onClick={openCreate} className="gap-1.5">
          <Plus className="size-4" />
          New project
        </Button>
      </div>

      {projects.length === 0 ? (
        <p className="rounded-lg border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
          No portfolio projects yet.
        </p>
      ) : (
        <div className="rounded-lg border border-border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead />
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Featured</TableHead>
                <TableHead>Published</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell>
                    {project.coverImageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={project.coverImageUrl}
                        alt=""
                        className="size-12 rounded-md object-cover"
                      />
                    ) : (
                      <div className="size-12 rounded-md bg-muted" />
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium">{project.title}</span>
                      <span className="text-xs text-muted-foreground">/{project.slug}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{PORTFOLIO_CATEGORY_LABELS[project.category]}</Badge>
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked={project.is_featured}
                      disabled={isPending}
                      onCheckedChange={(checked) => handleToggleFeatured(project.id, checked)}
                    />
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked={project.published}
                      disabled={isPending}
                      onCheckedChange={(checked) => handleTogglePublished(project.id, checked)}
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon-sm" onClick={() => openEdit(project)}>
                        <Pencil className="size-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon-sm" disabled={isPending}>
                            <Trash2 className="size-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete this project?</AlertDialogTitle>
                            <AlertDialogDescription>
                              &quot;{project.title}&quot; will be removed from the site permanently.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              variant="destructive"
                              onClick={() => handleDelete(project.id)}
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <PortfolioFormDialog
        key={editing?.id ?? "new"}
        project={editing}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </div>
  );
}
