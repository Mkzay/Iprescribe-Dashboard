import type { Patient, StatCard, ChartData } from '../types';

export const statsData: StatCard[] = [
  { title: 'Total Patients', value: 10, change: -0.1, icon: 'people-green', color: '#F9F4FF' },
  { title: 'Total Doctors', value: 5, change: -0.1, icon: 'people-green', color: '#F6FAFD' },
  { title: 'Pending Reviews', value: 3, change: -0.1, icon: 'people-green', color: '#FFF8ED' },
  { title: 'Total Consultations', value: 0, change: -0.1, icon: 'people-blue', color: '#F9F4FF' },
  { title: 'Prescriptions Issued', value: 0, change: -0.1, icon: 'prescription', color: '#F2FFFC' },
];

export const consultationChartData: ChartData[] = [
  { month: 'Jan', consultations: 45 },
  { month: 'Feb', consultations: 60 },
  { month: 'Mar', consultations: 55 },
  { month: 'Apr', consultations: 70 },
  { month: 'May', consultations: 85 },
  { month: 'Jun', consultations: 75 },
  { month: 'Jul', consultations: 60 },
  { month: 'Aug', consultations: 80 },
  { month: 'Sep', consultations: 70 },
  { month: 'Oct', consultations: 90 },
  { month: 'Nov', consultations: 75 },
  { month: 'Dec', consultations: 65 },
];

export const prescriptionChartData: ChartData[] = [
  { month: 'Jan', prescriptions: 40 },
  { month: 'Feb', prescriptions: 55 },
  { month: 'Mar', prescriptions: 50 },
  { month: 'Apr', prescriptions: 65 },
  { month: 'May', prescriptions: 80 },
  { month: 'Jun', prescriptions: 70 },
  { month: 'Jul', prescriptions: 60 },
  { month: 'Aug', prescriptions: 75 },
  { month: 'Sep', prescriptions: 65 },
  { month: 'Oct', prescriptions: 85 },
  { month: 'Nov', prescriptions: 70 },
  { month: 'Dec', prescriptions: 60 },
];

export const doctorsVsPatientsData: ChartData[] = [
  { month: 'Jan', doctors: 55, patients: 100 },
  { month: 'Feb', doctors: 65, patients: 90 },
  { month: 'Mar', doctors: 45, patients: 50 },
  { month: 'Apr', doctors: 70, patients: 85 },
  { month: 'May', doctors: 35, patients: 60 },
  { month: 'Jun', doctors: 65, patients: 80 },
  { month: 'Jul', doctors: 40, patients: 95 },
  { month: 'Aug', doctors: 65, patients: 100 },
  { month: 'Sep', doctors: 35, patients: 45 },
  { month: 'Oct', doctors: 45, patients: 60 },
  { month: 'Nov', doctors: 25, patients: 50 },
  { month: 'Dec', doctors: 70, patients: 100 },
];

export const specialtiesData = [
  { name: 'Pediatrics', value: 45, color: '#43B4BC' },
  { name: 'Surgery', value: 15, color: '#FF9900' },
  { name: 'Cardiology', value: 30, color: '#43B4BC' },
  { name: 'Others', value: 10, color: '#FF9900' },
];

export const patientsData: Patient[] = [
  {
    id: 1,
    signUpDate: '2024-09-05',
    name: 'Isagi Yoichi',
    email: 'Isagi.yoichi@example.com',
    phone: '(704) 555-0127',
    lastSeen: '2024-09-05 15:30:37',
    location: 'Lagos',
    device: 'iOS',
    status: 'Verified',
  },
  {
    id: 2,
    signUpDate: '2025-08-19',
    name: 'Esther Howard',
    email: 'sara.cruz@example.com',
    phone: '(208) 555-0112',
    lastSeen: '2024-09-05 15:30:37',
    location: 'Abuja',
    device: 'Android',
    status: 'Verified',
  },
  {
    id: 3,
    signUpDate: '2023-06-09',
    name: 'Jenny Wilson',
    email: 'felicia.reid@example.com',
    phone: '(205) 555-0100',
    lastSeen: '2024-09-05 15:30:37',
    location: 'Sokoto',
    device: 'Android',
    status: 'Verified',
  },
  {
    id: 4,
    signUpDate: '2024-07-12',
    name: 'Guy Hawkins',
    email: 'tanya.hill@example.com',
    phone: '(205) 555-0100',
    lastSeen: '2024-09-05 15:30:37',
    location: 'Kaduna',
    device: 'Android',
    status: 'Verified',
  },
  {
    id: 5,
    signUpDate: '2025-04-15',
    name: 'Jacob Jones',
    email: 'Jacob@example.com',
    phone: '(205) 555-0100',
    lastSeen: '2024-09-05 15:30:37',
    location: 'Ogun',
    device: 'iOS',
    status: 'Verified',
  },
];