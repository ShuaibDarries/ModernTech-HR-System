<script setup>
import { ref, onMounted } from 'vue'
import LoginPage from './components/LoginPage.vue'
import NavBar from './components/NavBar.vue'
import EmployeeManager from './components/EmployeeManager.vue'
import PayrollManager from './components/PayrollManager.vue'
import TimeOffManager from './components/TimeOffManager.vue'
import Dashboard from './components/Dashboard.vue'
import { dummyEmployees, getInitialTimeOffRequests, getInitialAttendance, getInitialPayroll } from './data/dummyData.js'

const isLoggedIn = ref(false)
const currentView = ref('employees')
const employees = ref([])
const timeOffRequests = ref([])
const attendance = ref([])
const payrollRecords = ref([])

const views = {
  employees: EmployeeManager,
  payroll: PayrollManager,
  timeoff: TimeOffManager,
  dashboard: Dashboard
}

function loadData() {
  const savedEmployees = localStorage.getItem('hr_employees')
  const savedTimeOff = localStorage.getItem('hr_timeoff')
  const savedAttendance = localStorage.getItem('hr_attendance')
  const savedPayroll = localStorage.getItem('hr_payroll')

  employees.value = savedEmployees ? JSON.parse(savedEmployees) : [...dummyEmployees]
  timeOffRequests.value = savedTimeOff ? JSON.parse(savedTimeOff) : getInitialTimeOffRequests()
  attendance.value = savedAttendance ? JSON.parse(savedAttendance) : getInitialAttendance()
  payrollRecords.value = savedPayroll ? JSON.parse(savedPayroll) : getInitialPayroll()
}

function saveData() {
  localStorage.setItem('hr_employees', JSON.stringify(employees.value))
  localStorage.setItem('hr_timeoff', JSON.stringify(timeOffRequests.value))
  localStorage.setItem('hr_attendance', JSON.stringify(attendance.value))
  localStorage.setItem('hr_payroll', JSON.stringify(payrollRecords.value))
}

onMounted(() => {
  const auth = localStorage.getItem('hr_auth')
  if (auth === 'true') {
    isLoggedIn.value = true
    loadData()
  }
})

function handleLogin() {
  isLoggedIn.value = true
  localStorage.setItem('hr_auth', 'true')
  loadData()
}

function handleLogout() {
  isLoggedIn.value = false
  localStorage.removeItem('hr_auth')
  currentView.value = 'employees'
}

function handleUpdate() {
  saveData()
}
</script>

<template>
  <div>
    <LoginPage v-if="!isLoggedIn" @login-success="handleLogin" />
    <div v-else>
      <NavBar :current-view="currentView" @change-view="currentView = $event" @logout="handleLogout" />
      <div class="container-fluid py-4">
        <component
          :is="views[currentView]"
          :employees="employees"
          :time-off-requests="timeOffRequests"
          :attendance="attendance"
          :payroll-records="payrollRecords"
          @update-employees="employees = $event; handleUpdate()"
          @update-timeoff="timeOffRequests = $event; handleUpdate()"
          @update-attendance="attendance = $event; handleUpdate()"
          @update-payroll="payrollRecords = $event; handleUpdate()"
        />
      </div>
    </div>
  </div>
</template>

<style>
body {
  background-color: #f8f9fa;
}
</style>
