import { Stack, Typography, Button } from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";
import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart } from "@mui/x-charts/PieChart";
import StatCard from "../components/StatCard";
import PatientsTable from "../components/PatientsTable";
import { useQuery } from "@tanstack/react-query";
import { fetchDashboardStats, fetchPatients } from "../lib/api";
import type { Patient } from "../types";
import CalendarIcon from "../assets/icons/calendar.svg?react";

export default function Dashboard() {
  const { data: statsResp, isLoading: statsLoading } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: fetchDashboardStats,
  });

  const { data: patientsResp, isLoading: patientsLoading } = useQuery({
    queryKey: ["patients", 1],
    queryFn: () => fetchPatients(1),
  });

  const handleExport = () => {
    if (!statsResp?.data || !patientsResp?.data) return;

    // Prepare CSV content
    const csvRows = [];

    // Add header
    csvRows.push("Dashboard Export - iPrescribe");
    csvRows.push(`Generated on: ${new Date().toLocaleString()}`);
    csvRows.push("");

    // Add statistics section
    csvRows.push("DASHBOARD STATISTICS");
    csvRows.push("Metric,Value,Change Since Last Week");

    const stats = statsResp.data;
    csvRows.push(
      `Total Patients,${stats.patients.total_patients},${stats.patients.patients_percentage_since_last_week}%`
    );
    csvRows.push(
      `Total Doctors,${stats.doctors.total_doctors},${stats.doctors.doctors_percentage_since_last_week}%`
    );
    csvRows.push(
      `Pending Reviews,${stats.pending_reviews.total_pending_reviews},${stats.pending_reviews.pending_reviews_percentage_since_last_week}%`
    );
    csvRows.push(
      `Total Consultations,${stats.consultations.total_consultations},${stats.consultations.consultations_percentage_since_last_week}%`
    );
    csvRows.push(
      `Prescriptions Issued,${stats.prescriptions.total_prescriptions},${stats.prescriptions.prescriptions_percentage_since_last_week}%`
    );

    csvRows.push("");

    // Add patients section
    csvRows.push("RECENT PATIENTS");
    csvRows.push("Name,Email,Phone,Status,Created Date");

    patientsData.forEach((patient) => {
      csvRows.push(
        `${patient.name},${patient.email},${patient.phone},${patient.status},${patient.signUpDate}`
      );
    });

    // Create CSV blob and download
    const csvContent = csvRows.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);

    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `iprescribe_dashboard_${new Date().toISOString().split("T")[0]}.csv`
    );
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const statsData = (() => {
    const d = statsResp?.data;
    if (!d)
      return [] as Array<{
        title: string;
        value: number;
        change: number;
        icon: string;
        color: string;
      }>;
    return [
      {
        title: "Total Patients",
        value: d.patients.total_patients,
        change:
          ((d.patients.patients_percentage_since_last_week || 0) / 100) *
          (d.patients.positive ? 1 : -1),
        icon: "people-green",
        color: "#F9F4FF",
      },
      {
        title: "Total Doctors",
        value: d.doctors.total_doctors,
        change:
          ((d.doctors.doctors_percentage_since_last_week || 0) / 100) *
          (d.doctors.positive ? 1 : -1),
        icon: "people-green",
        color: "#F6FAFD",
      },
      {
        title: "Pending Reviews",
        value: d.pending_reviews.total_pending_reviews,
        change:
          ((d.pending_reviews.pending_reviews_percentage_since_last_week || 0) /
            100) *
          (d.pending_reviews.positive ? 1 : -1),
        icon: "people-green",
        color: "#FFF8ED",
      },
      {
        title: "Total Consultations",
        value: d.consultations.total_consultations,
        change:
          ((d.consultations.consultations_percentage_since_last_week || 0) /
            100) *
          (d.consultations.positive ? 1 : -1),
        icon: "people-blue",
        color: "#F9F4FF",
      },
      {
        title: "Prescriptions Issued",
        value: d.prescriptions.total_prescriptions,
        change:
          ((d.prescriptions.prescriptions_percentage_since_last_week || 0) /
            100) *
          (d.prescriptions.positive ? 1 : -1),
        icon: "prescription",
        color: "#F2FFFC",
      },
    ];
  })();

  const consultationChartData = (
    statsResp?.data.consultationOverTime || []
  ).map((x) => ({
    month: x.month,
    consultations: x.count,
  }));

  const prescriptionChartData = (
    statsResp?.data.prescriptionVolumeTrend || []
  ).map((x) => ({
    month: x.month,
    prescriptions: x.count,
  }));

  const doctorsVsPatientsData = (() => {
    const cats = statsResp?.data.active_doctors_vs_patients.categories || [];
    const series = statsResp?.data.active_doctors_vs_patients.series || [];
    const doctors =
      series.find((s) => s.name.toLowerCase().includes("doctor"))?.data || [];
    const patients =
      series.find((s) => s.name.toLowerCase().includes("patient"))?.data || [];
    return cats.map((month, i) => ({
      month,
      doctors: doctors[i] || 0,
      patients: patients[i] || 0,
    }));
  })();

  const specialtiesData = (
    statsResp?.data.top_specialities_in_demand || []
  ).map((s, idx) => ({
    name: s.speciality,
    value: s.count,
    color: idx % 2 === 0 ? "#43B4BC" : "#FF9900",
  }));

  const patientsData: Patient[] = (patientsResp?.data.data || []).map((p) => ({
    id: p.id,
    signUpDate: p.created_at?.slice(0, 10) || "-",
    name:
      (p.first_name || p.user?.first_name || "") +
        (p.last_name || p.user?.last_name
          ? ` ${p.last_name || p.user?.last_name}`
          : "") ||
      p.user?.email ||
      p.email ||
      "—",
    email: p.user?.email || p.email || "—",
    phone: p.user?.phone || p.phone || "—",
    lastSeen: p.last_seen ? p.last_seen.replace("T", " ").slice(0, 19) : "—",
    location: p.user?.state || p.state || "—",
    device:
      Array.isArray(p.user?.devices) &&
      (p.user!.devices as any)[0]?.platform?.toLowerCase() === "android"
        ? "Android"
        : "iOS",
    status: p.status?.toLowerCase() === "verified" ? "Verified" : "Pending",
  }));
  return (
    <div className="flex-1 overflow-y-auto overflow-x-hidden">
      <Stack spacing={2.125} sx={{ padding: "24px 40px", minHeight: "100%" }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <Stack spacing={0.25}>
            <Typography
              sx={{
                fontSize: "18px",
                fontWeight: 600,
                letterSpacing: "0.2px",
                color: "text.primary",
              }}
            >
              Dashboard
            </Typography>
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: 500,
                color: "text.secondary",
              }}
            >
              Latest update for the last 7 days. check now
            </Typography>
          </Stack>

          <Stack direction="row" spacing={1.125}>
            <Stack
              direction="row"
              spacing={1}
              sx={{
                alignItems: "center",
                border: "0.83px solid #DCE4E8",
                borderRadius: "8px",
                padding: "10px 16px",
                cursor: "pointer",
              }}
            >
              <CalendarIcon
                width={15}
                height={17}
                style={{ color: "#6C7278" }}
              />
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "text.primary",
                }}
              >
                12th Sept - 15th Sept, 2025
              </Typography>
            </Stack>
            <Button
              variant="contained"
              onClick={handleExport}
              disabled={statsLoading || patientsLoading}
              sx={{
                backgroundColor: "primary.main",
                color: "white",
                fontSize: "14px",
                fontWeight: 600,
                letterSpacing: "0.17px",
                textTransform: "none",
                borderRadius: "8px",
                padding: "10px 24px",
              }}
            >
              Export
            </Button>
          </Stack>
        </Stack>

        <div className="flex flex-wrap gap-[9px]">
          {(statsLoading ? [] : statsData).map((stat, index) => (
            <StatCard key={stat.title} {...stat} delay={index * 0.1} />
          ))}
        </div>

        <Stack direction="row" spacing={2.125}>
          <Stack
            sx={{
              flex: 1,
              backgroundColor: "background.paper",
              border: "1px solid #EBEBEB",
              borderRadius: "6px",
              padding: "20px",
              gap: 2.5,
            }}
          >
            <Stack direction="row" justifyContent="space-between">
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "text.secondary",
                }}
              >
                Consultation Over Time
              </Typography>
              <span className="text-gray-400">•••</span>
            </Stack>
            <LineChart
              xAxis={[
                {
                  scaleType: "point",
                  data: consultationChartData.map((d) => d.month),
                },
              ]}
              series={[
                {
                  data: consultationChartData.map((d) => d.consultations!),
                  color: "#1A96F0",
                  curve: "natural",
                },
              ]}
              height={250}
            />
          </Stack>

          <Stack
            sx={{
              flex: 1,
              backgroundColor: "background.paper",
              border: "1px solid #EBEBEB",
              borderRadius: "6px",
              padding: "20px",
              gap: 2.5,
            }}
          >
            <Stack direction="row" justifyContent="space-between">
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "text.secondary",
                }}
              >
                Prescription Volume Trend
              </Typography>
              <span className="text-gray-400">•••</span>
            </Stack>
            <LineChart
              xAxis={[
                {
                  scaleType: "point",
                  data: prescriptionChartData.map((d) => d.month),
                },
              ]}
              series={[
                {
                  data: prescriptionChartData.map((d) => d.prescriptions!),
                  color: "#4CAF50",
                  curve: "natural",
                },
              ]}
              height={250}
            />
          </Stack>
        </Stack>

        <Stack direction="row" spacing={2.125}>
          <Stack
            sx={{
              flex: 1,
              backgroundColor: "background.paper",
              border: "1px solid #EBEBEB",
              borderRadius: "6px",
              padding: "20px",
              gap: 2.5,
            }}
          >
            <Stack direction="row" justifyContent="space-between">
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "text.secondary",
                }}
              >
                Active Doctors vs Active Patients
              </Typography>
              <Stack direction="row" spacing={2.25}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <div className="w-[5px] h-[5px] rounded-full bg-[#FF981F]" />
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: 500,
                      color: "text.secondary",
                    }}
                  >
                    Doctors
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                  <div className="w-[5px] h-[5px] rounded-full bg-[#1A96F0]" />
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: 500,
                      color: "text.secondary",
                    }}
                  >
                    Patients
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
            <BarChart
              xAxis={[
                {
                  scaleType: "band",
                  data: doctorsVsPatientsData.map((d) => d.month),
                },
              ]}
              series={[
                {
                  data: doctorsVsPatientsData.map((d) => d.doctors!),
                  color: "#FF981F",
                  label: "Doctors",
                },
                {
                  data: doctorsVsPatientsData.map((d) => d.patients!),
                  color: "#1A96F0",
                  label: "Patients",
                },
              ]}
              height={250}
            />
          </Stack>

          <Stack
            sx={{
              width: "598px",
              backgroundColor: "background.paper",
              border: "1px solid #EBEBEB",
              borderRadius: "6px",
              padding: "20px",
              gap: 2.875,
            }}
          >
            <Stack direction="row" justifyContent="space-between">
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "text.secondary",
                }}
              >
                Top Specialties in Demand
              </Typography>
              <span className="text-gray-400">•••</span>
            </Stack>
            <Stack direction="row" spacing={13.25} alignItems="center">
              <PieChart
                series={[
                  {
                    data: specialtiesData,
                    innerRadius: 60,
                    outerRadius: 100,
                  },
                ]}
                width={240}
                height={240}
                slotProps={{
                  legend: { hidden: true },
                }}
                margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
              />
              <Stack spacing={3}>
                <Stack direction="row" spacing={13.75}>
                  <Stack spacing={1.75}>
                    <Typography
                      sx={{
                        fontSize: "14px",
                        fontWeight: 600,
                        color: "rgba(25, 32, 49, 0.4)",
                      }}
                    >
                      Pediatrics
                    </Typography>
                    <Stack direction="row" spacing={1.375} alignItems="center">
                      <div className="w-[13px] h-[13px] rounded-full bg-[#43B4BC]" />
                      <Typography
                        sx={{
                          fontSize: "24px",
                          fontWeight: 700,
                          color: "text.primary",
                        }}
                      >
                        45
                      </Typography>
                    </Stack>
                  </Stack>
                  <Stack spacing={1.75}>
                    <Typography
                      sx={{
                        fontSize: "14px",
                        fontWeight: 600,
                        color: "rgba(25, 32, 49, 0.4)",
                      }}
                    >
                      Cardiology
                    </Typography>
                    <Stack direction="row" spacing={1.375} alignItems="center">
                      <div className="w-[13px] h-[13px] rounded-full bg-[#43B4BC]" />
                      <Typography
                        sx={{
                          fontSize: "24px",
                          fontWeight: 700,
                          color: "text.primary",
                        }}
                      >
                        30
                      </Typography>
                    </Stack>
                  </Stack>
                </Stack>
                <Stack direction="row" spacing={13.75}>
                  <Stack spacing={1.75}>
                    <Typography
                      sx={{
                        fontSize: "14px",
                        fontWeight: 600,
                        color: "rgba(25, 32, 49, 0.4)",
                      }}
                    >
                      Surgery
                    </Typography>
                    <Stack direction="row" spacing={1.375} alignItems="center">
                      <div
                        className="w-[13px] h-[13px] rounded-full"
                        style={{
                          background:
                            "linear-gradient(286.17deg, #FF9900 0%, #FFD480 100%)",
                        }}
                      />
                      <Typography
                        sx={{
                          fontSize: "24px",
                          fontWeight: 700,
                          color: "text.primary",
                        }}
                      >
                        15
                      </Typography>
                    </Stack>
                  </Stack>
                  <Stack spacing={1.75}>
                    <Typography
                      sx={{
                        fontSize: "14px",
                        fontWeight: 600,
                        color: "rgba(25, 32, 49, 0.4)",
                      }}
                    >
                      Others
                    </Typography>
                    <Stack direction="row" spacing={1.375} alignItems="center">
                      <div
                        className="w-[13px] h-[13px] rounded-full"
                        style={{
                          background:
                            "linear-gradient(286.17deg, #FF9900 0%, #FFD480 100%)",
                        }}
                      />
                      <Typography
                        sx={{
                          fontSize: "24px",
                          fontWeight: 700,
                          color: "text.primary",
                        }}
                      >
                        10
                      </Typography>
                    </Stack>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Stack>

        <PatientsTable patients={patientsLoading ? [] : patientsData} />
      </Stack>
    </div>
  );
}
