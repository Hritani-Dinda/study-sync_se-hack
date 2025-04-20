"use client";

import { useState } from "react";
import { students, attendanceRecords } from "@/lib/sample-data";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function DeviceManagement() {
  const [selectedDevice, setSelectedDevice] = useState<string>("");
  const [newDeviceId, setNewDeviceId] = useState<string>("");

  // Get unique device IDs from students
  const deviceIds = Array.from(
    new Set(students.map((s) => s.deviceId).filter(Boolean))
  );

  // Get device usage records
  const deviceRecords = attendanceRecords.filter(
    (record) => record.deviceId === selectedDevice
  );

  // Calculate device statistics
  const totalUses = deviceRecords.length;
  const successfulUses = deviceRecords.filter(
    (r) => r.status === "present" || r.status === "late"
  ).length;
  const failedUses = deviceRecords.filter((r) => r.status === "absent").length;

  const handleAddDevice = () => {
    if (newDeviceId && !deviceIds.includes(newDeviceId)) {
      // In a real application, you would make an API call here
      console.log("Adding new device:", newDeviceId);
      setNewDeviceId("");
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Device Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <Select value={selectedDevice} onValueChange={setSelectedDevice}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Select device" />
                </SelectTrigger>
                <SelectContent>
                  {deviceIds.map((deviceId) => (
                    <SelectItem key={deviceId} value={deviceId}>
                      Device {deviceId}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-4">
              <Input
                placeholder="Enter new device ID"
                value={newDeviceId}
                onChange={(e) => setNewDeviceId(e.target.value)}
                className="w-[200px]"
              />
              <Button onClick={handleAddDevice}>Add Device</Button>
            </div>

            {selectedDevice && (
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{totalUses}</div>
                    <div className="text-sm text-muted-foreground">
                      Total Uses
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {successfulUses}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Successful Uses
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">
                      {failedUses}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Failed Uses
                    </div>
                  </div>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Student</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Location</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {deviceRecords.map((record) => {
                      const student = students.find(
                        (s) => s.id === record.studentId
                      );
                      return (
                        <TableRow key={record.id}>
                          <TableCell>
                            {new Date(record.date).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            {student?.name} ({student?.rollNumber})
                          </TableCell>
                          <TableCell>
                            <span
                              className={`px-2 py-1 rounded-full text-xs ${
                                record.status === "present"
                                  ? "bg-green-100 text-green-800"
                                  : record.status === "late"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {record.status}
                            </span>
                          </TableCell>
                          <TableCell>
                            {new Date(record.timestamp).toLocaleTimeString()}
                          </TableCell>
                          <TableCell>Class Room</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Device Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {deviceIds.map((deviceId) => {
              const lastUse = attendanceRecords
                .filter((r) => r.deviceId === deviceId)
                .sort(
                  (a, b) =>
                    new Date(b.timestamp).getTime() -
                    new Date(a.timestamp).getTime()
                )[0];

              return (
                <div key={deviceId} className="p-4 border rounded-lg space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Device {deviceId}</span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        lastUse
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {lastUse ? "Active" : "Inactive"}
                    </span>
                  </div>
                  {lastUse && (
                    <div className="text-sm text-muted-foreground">
                      Last used: {new Date(lastUse.timestamp).toLocaleString()}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
