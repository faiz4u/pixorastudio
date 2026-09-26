"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";
import { updateAppointmentStatus, deleteAppointment } from "@/lib/actions/appointments";
import { TIME_SLOT_LABELS } from "@/lib/validation/appointment";
import type { AppointmentStatus, Database } from "@/types/database";
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

type Appointment = Database["public"]["Tables"]["appointments"]["Row"];

const STATUS_LABELS: Record<AppointmentStatus, string> = {
  pending: "Pending",
  confirmed: "Confirmed",
  cancelled: "Cancelled",
};

const STATUS_BADGE_VARIANT: Record<AppointmentStatus, "default" | "secondary" | "outline"> = {
  pending: "default",
  confirmed: "secondary",
  cancelled: "outline",
};

// preferred_date is a plain "yyyy-MM-dd" date; parse it as a local date so
// it doesn't shift a day in timezones behind UTC.
function formatPreferredDate(value: string) {
  const [year, month, day] = value.split("-").map(Number);
  return format(new Date(year, month - 1, day), "EEE, d MMM yyyy");
}

export function AppointmentsTable({ appointments }: { appointments: Appointment[] }) {
  const [filter, setFilter] = useState<"all" | AppointmentStatus>("all");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const filtered =
    filter === "all" ? appointments : appointments.filter((appointment) => appointment.status === filter);
  const countOf = (status: AppointmentStatus) => appointments.filter((a) => a.status === status).length;

  function handleStatusChange(id: string, status: AppointmentStatus) {
    startTransition(async () => {
      try {
        await updateAppointmentStatus(id, status);
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
        await deleteAppointment(id);
        router.refresh();
        toast.success("Appointment deleted.");
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Failed to delete appointment.");
      }
    });
  }

  return (
    <div className="flex flex-col gap-4">
      <Tabs value={filter} onValueChange={(value) => setFilter(value as typeof filter)}>
        <TabsList>
          <TabsTrigger value="all">All ({appointments.length})</TabsTrigger>
          <TabsTrigger value="pending">Pending ({countOf("pending")})</TabsTrigger>
          <TabsTrigger value="confirmed">Confirmed ({countOf("confirmed")})</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled ({countOf("cancelled")})</TabsTrigger>
        </TabsList>
      </Tabs>

      {filtered.length === 0 ? (
        <p className="rounded-lg border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
          No appointments here yet.
        </p>
      ) : (
        <div className="rounded-lg border border-border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Preferred date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Notes</TableHead>
                <TableHead>Requested</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((appointment) => (
                <TableRow key={appointment.id}>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium">{appointment.name}</span>
                      <a href={`mailto:${appointment.email}`} className="text-xs text-brand hover:underline">
                        {appointment.email}
                      </a>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">{formatPreferredDate(appointment.preferred_date)}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {TIME_SLOT_LABELS[appointment.time_slot]}
                  </TableCell>
                  <TableCell
                    className="max-w-64 truncate text-sm text-muted-foreground"
                    title={appointment.notes ?? undefined}
                  >
                    {appointment.notes || "—"}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(appointment.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Select
                      value={appointment.status}
                      onValueChange={(value) => handleStatusChange(appointment.id, value as AppointmentStatus)}
                      disabled={isPending}
                    >
                      <SelectTrigger size="sm">
                        <Badge variant={STATUS_BADGE_VARIANT[appointment.status]}>
                          <SelectValue />
                        </Badge>
                      </SelectTrigger>
                      <SelectContent>
                        {(Object.keys(STATUS_LABELS) as AppointmentStatus[]).map((status) => (
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
                          <span className="sr-only">Delete appointment</span>
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete this appointment?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This removes {appointment.name}&apos;s request permanently. This can&apos;t be
                            undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction variant="destructive" onClick={() => handleDelete(appointment.id)}>
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
