"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { saveFaqItem, deleteFaqItem } from "@/lib/actions/content";
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
import { Textarea } from "@/components/ui/textarea";
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

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export function FaqItemsManager({ items }: { items: FaqItem[] }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<FaqItem | null>(null);
  const [isPending, startTransition] = useTransition();
  const [isSaving, startSaving] = useTransition();
  const router = useRouter();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startSaving(async () => {
      const result = await saveFaqItem({ status: "idle" }, formData);
      if (result.status === "success") {
        toast.success(result.message ?? "Saved.");
        setDialogOpen(false);
        router.refresh();
      } else if (result.status === "error") {
        toast.error(result.message ?? "Something went wrong.");
      }
    });
  }

  function handleDelete(id: string) {
    startTransition(async () => {
      try {
        await deleteFaqItem(id);
        router.refresh();
        toast.success("FAQ item deleted.");
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Failed to delete.");
      }
    });
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end">
        <Button
          className="gap-1.5"
          onClick={() => {
            setEditing(null);
            setDialogOpen(true);
          }}
        >
          <Plus className="size-4" />
          Add FAQ item
        </Button>
      </div>

      {items.length === 0 ? (
        <p className="rounded-lg border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
          No FAQ items yet.
        </p>
      ) : (
        <div className="flex flex-col gap-2">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-start justify-between gap-4 rounded-lg border border-border p-4"
            >
              <div className="flex flex-col gap-1">
                <p className="font-medium">{item.question}</p>
                <p className="text-sm text-muted-foreground">{item.answer}</p>
              </div>
              <div className="flex shrink-0 gap-1">
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => {
                    setEditing(item);
                    setDialogOpen(true);
                  }}
                >
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
                      <AlertDialogTitle>Delete this FAQ item?</AlertDialogTitle>
                      <AlertDialogDescription>
                        &quot;{item.question}&quot; will be removed permanently.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction variant="destructive" onClick={() => handleDelete(item.id)}>
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4" key={editing?.id ?? "new"}>
            <DialogHeader>
              <DialogTitle>{editing ? "Edit FAQ item" : "Add FAQ item"}</DialogTitle>
            </DialogHeader>

            {editing && <input type="hidden" name="id" value={editing.id} />}

            <div className="flex flex-col gap-2">
              <Label htmlFor="question">Question *</Label>
              <Input id="question" name="question" required defaultValue={editing?.question} />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="answer">Answer *</Label>
              <Textarea id="answer" name="answer" required rows={4} defaultValue={editing?.answer} />
            </div>

            <DialogFooter>
              <Button type="submit" disabled={isSaving}>
                {isSaving ? "Saving..." : "Save"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
