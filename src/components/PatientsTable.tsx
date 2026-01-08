import { useState, useMemo } from "react";
import {
  Stack,
  Typography,
  TextField,
  InputAdornment,
  Chip,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef, GridSortModel } from "@mui/x-data-grid";
import type { Patient } from "../types";
import ArrowRightIcon from "../assets/icons/arrow-right.svg?react";

interface PatientsTableProps {
  patients: Patient[];
}

export default function PatientsTable({ patients }: PatientsTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortModel, setSortModel] = useState<GridSortModel>([]);

  const filteredPatients = useMemo(() => {
    return patients.filter(
      (patient) =>
        patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [patients, searchTerm]);

  const columns: GridColDef<Patient>[] = [
    {
      field: "id",
      headerName: "#",
      width: 60,
      sortable: false,
    },
    {
      field: "signUpDate",
      headerName: "Sign Up Date",
      width: 130,
      sortable: true,
    },
    {
      field: "name",
      headerName: "Patient Name",
      width: 150,
      sortable: true,
    },
    {
      field: "email",
      headerName: "Email Address",
      width: 220,
      sortable: true,
    },
    {
      field: "phone",
      headerName: "Phone Number",
      width: 140,
      sortable: false,
    },
    {
      field: "lastSeen",
      headerName: "Last Seen Date & T",
      width: 180,
      sortable: true,
    },
    {
      field: "location",
      headerName: "Location",
      width: 100,
      sortable: true,
    },
    {
      field: "device",
      headerName: "Device",
      width: 100,
      sortable: true,
    },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      sortable: true,
      renderCell: (params) => (
        <Chip
          label={params.value}
          size="small"
          sx={{
            backgroundColor:
              params.value === "Verified" ? "#E8F5F1" : "#FFF3E0",
            color: params.value === "Verified" ? "#1C8C6E" : "#FF9900",
            fontWeight: 500,
            fontSize: "14px",
          }}
        />
      ),
    },
  ];

  return (
    <Stack
      sx={{
        backgroundColor: "background.paper",
        borderRadius: "10px",
        border: "1px solid rgba(235, 235, 235, 0.8)",
        padding: "18px",
        gap: 2.25,
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography
          sx={{
            fontSize: "16px",
            fontWeight: 700,
            letterSpacing: "0.2px",
            color: "text.primary",
          }}
        >
          Recent Patients Sign Up
        </Typography>
        <Stack
          direction="row"
          spacing={1.125}
          alignItems="center"
          sx={{ cursor: "pointer" }}
        >
          <Typography
            sx={{ fontSize: "14px", fontWeight: 500, color: "text.primary" }}
          >
            See All
          </Typography>
          <ArrowRightIcon width={7} height={13} style={{ color: "#283C85" }} />
        </Stack>
      </Stack>

      <TextField
        placeholder="Search by name, email, or location..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        size="small"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <span className="text-gray-400">🔍</span>
            </InputAdornment>
          ),
        }}
        sx={{
          maxWidth: "400px",
          "& .MuiOutlinedInput-root": {
            fontSize: "14px",
          },
        }}
      />

      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={filteredPatients}
          columns={columns}
          sortModel={sortModel}
          onSortModelChange={setSortModel}
          disableRowSelectionOnClick
          disableColumnMenu
          sx={{
            border: "none",
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#EEF2FF",
              borderRadius: 0,
              fontSize: "14px",
              fontWeight: 600,
              color: "#212121",
            },
            "& .MuiDataGrid-cell": {
              fontSize: "14px",
              fontWeight: 500,
              color: "text.primary",
            },
            "& .MuiDataGrid-row:hover": {
              backgroundColor: "rgba(90, 120, 231, 0.05)",
            },
          }}
        />
      </div>
    </Stack>
  );
}
