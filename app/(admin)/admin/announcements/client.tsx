'use client'

import { useState } from "react"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { toast } from "sonner"
import { Database } from "@/database.types"
import { deleteAnnouncement } from "@/actions/announcement/delete-announcement"

type Announcement = Database["public"]["Tables"]["announcement"]["Row"]

interface AnnouncementsDataTableProps {
  data: Announcement[]
}

export function AnnouncementsDataTable({ data }: AnnouncementsDataTableProps) {
  const [globalFilter, setGlobalFilter] = useState("")

  const handleDelete = async (id: string) => {
    const confirmDelete = confirm("Are you sure you want to delete this announcement?");
    if (!confirmDelete) return;

    const promise = deleteAnnouncement(id);
    
    toast.promise(promise, {
      loading: "Deleting announcement...",
      success: (result) => {
        if (result.error) throw new Error(result.error);
        return "Announcement deleted successfully";
      },
      error: (err) => err.message || "Failed to delete announcement",
    });
  }

  const columns: ColumnDef<Announcement>[] = [
    {
      accessorKey: "title",
      header: "Title",
    },
    {
      accessorKey: "category",
      header: "Category",
    },
    {
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => {
        const date = row.getValue("date") as string;
        if (!date) return "N/A";
        return new Date(date).toLocaleDateString();
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const announcement = row.original
        return (
          <div className="flex gap-2">
            <Link href={`/admin/announcements/view?id=${announcement.id}`}>
              <Button variant="secondary" size="sm">
                View
              </Button>
            </Link>
            <Link href={`/admin/announcements/edit?id=${announcement.id}`}>
              <Button variant="outline" size="sm">
                Edit
              </Button>
            </Link>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => handleDelete(announcement.id)}
            >
              Delete
            </Button>
          </div>
        )
      },
    },
  ]

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: (row, columnId, filterValue) => {
      const title = row.getValue("title") as string
      return title?.toLowerCase().includes(filterValue.toLowerCase())
    },
  })

  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <Input
          placeholder="Filter by title..."
          value={globalFilter ?? ""}
          onChange={(event) => setGlobalFilter(event.target.value)}
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}