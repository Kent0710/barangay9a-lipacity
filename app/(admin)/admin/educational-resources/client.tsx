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
import { deleteEducationalResource } from "@/actions/educational-resource/delete-resource"

type EducationalResource = Database["public"]["Tables"]["educational_resource"]["Row"]

interface ResourcesDataTableProps {
  data: EducationalResource[]
}

export function ResourcesDataTable({ data }: ResourcesDataTableProps) {
  const [globalFilter, setGlobalFilter] = useState("")

  const handleDelete = async (id: string) => {
    const confirmDelete = confirm("Are you sure you want to delete this educational resource?");
    if (!confirmDelete) return;

    const promise = deleteEducationalResource(id);
    
    toast.promise(promise, {
      loading: "Deleting resource...",
      success: (result) => {
        if (result?.error) throw new Error(result.error);
        return "Educational resource deleted successfully";
      },
      error: (err) => err.message || "Failed to delete resource",
    });
  }

  const columns: ColumnDef<EducationalResource>[] = [
    {
      accessorFn: (row) => row.icon ? `${row.icon} ${row.title}` : row.title,
      id: "title",
      header: "Title",
    },
    {
      accessorKey: "slug",
      header: "Slug URL",
    },
    {
      accessorKey: "created_at",
      header: "Created At",
      cell: ({ row }) => {
        const date = row.getValue("created_at") as string;
        if (!date) return "N/A";
        return new Date(date).toLocaleDateString();
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const resource = row.original
        return (
          <div className="flex gap-2">
            <Link href={`/admin/educational-resources/view?id=${resource.id}`}>
              <Button variant="secondary" size="sm">
                View
              </Button>
            </Link>
            <Link href={`/admin/educational-resources/edit?id=${resource.id}`}>
              <Button variant="outline" size="sm">
                Edit
              </Button>
            </Link>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => handleDelete(resource.id)}
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
                  No resources found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}