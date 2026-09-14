"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";
import { updateLeadStatus, deleteLead } from "@/lib/actions/leads";
import type { Database, LeadStatus } from "@/types/database";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

type Lead = Database["public"]["Tables"]["leads"]["Row"];

const STATUS_LABELS: Record<LeadStatus, string> = {
  new: "New",
  contacted: "Contacted",
  archived: "Archived",
};

const STATUS_BADGE_VARIANT: Record<LeadStatus, "default" | "secondary" | "outline"> = {
  new: "default",
  contacted: "secondary",
  archived: "outline",
};

function whatsappHref(number: string) {
  return `https://wa.me/${number.replace(/[^0-9]/g, "")}`;
}

export function LeadsTable({ leads }: { leads: Lead[] }) {
  const [filter, setFilter] = useState<"all" | LeadStatus>("all");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const filtered = filter === "all" ? leads : leads.filter((lead) => lead.status === filter);

  function handleStatusChange(id: string, status: LeadStatus) {
    startTransition(async () => {
      try {
        await updateLeadStatus(id, status);
        router.refresh();
        toast.success("Status updated.");
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Failed to update status.");
      }
    });
  }

  function handleDelete(id: string) {
    startTransition(async () => {
      try {
        await deleteLead(id);
        router.refresh();
        toast.success("Lead deleted.");
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Failed to delete lead.");
      }
    });
  }

  return (
    <div className="flex flex-col gap-4">
      <Tabs value={filter} onValueChange={(value) => setFilter(value as typeof filter)}>
        <TabsList>
          <TabsTrigger value="all">All ({leads.length})</TabsTrigger>
          <TabsTrigger value="new">New ({leads.filter((l) => l.status === "new").length})</TabsTrigger>
          <TabsTrigger value="contacted">
            Contacted ({leads.filter((l) => l.status === "contacted").length})
          </TabsTrigger>
          <TabsTrigger value="archived">
            Archived ({leads.filter((l) => l.status === "archived").length})
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {filtered.length === 0 ? (
        <p className="rounded-lg border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
          No leads here yet.
        </p>
      ) : (
        <div className="rounded-lg border border-border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Needs</TableHead>
                <TableHead>Budget</TableHead>
                <TableHead>Message</TableHead>
                <TableHead>Received</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium">{lead.name}</span>
                      <a
                        href={whatsappHref(lead.whatsapp_number)}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-brand hover:underline"
                      >
                        {lead.whatsapp_number}
                      </a>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex max-w-48 flex-wrap gap-1">
                      {lead.project_types.map((type) => (
                        <Badge key={type} variant="outline">
                          {type}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {lead.budget_range || "—"}
                  </TableCell>
                  <TableCell className="max-w-64 truncate text-sm text-muted-foreground" title={lead.message ?? undefined}>
                    {lead.message || "—"}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(lead.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Select
                      value={lead.status}
                      onValueChange={(value) => handleStatusChange(lead.id, value as LeadStatus)}
                      disabled={isPending}
                    >
                      <SelectTrigger size="sm">
                        <Badge variant={STATUS_BADGE_VARIANT[lead.status]}>
                          <SelectValue />
                        </Badge>
                      </SelectTrigger>
                      <SelectContent>
                        {(Object.keys(STATUS_LABELS) as LeadStatus[]).map((status) => (
                          <SelectItem key={status} value={status}>
                            {STATUS_LABELS[status]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="text-right">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon-sm" disabled={isPending}>
                          <Trash2 className="size-4" />
                          <span className="sr-only">Delete lead</span>
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete this lead?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This removes {lead.name}&apos;s submission permanently. This can&apos;t be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction variant="destructive" onClick={() => handleDelete(lead.id)}>
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
