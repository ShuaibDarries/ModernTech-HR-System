<script setup>
import { ref, computed } from 'vue'
import { timeOffTypes } from '../data/dummyData.js'

const props = defineProps({ employees: Array, timeOffRequests: Array, attendance: Array })
const emit = defineEmits(['update-timeoff', 'update-attendance'])

const activeTab = ref('requests')
const selectedEmployeeId = ref('')
const timeOffType = ref('')
const startDate = ref('')
const endDate = ref('')
const formErrors = ref({})

const filteredRequests = computed(() => {
  return [...props.timeOffRequests].sort((a, b) => new Date(b.requestDate) - new Date(a.requestDate))
})

const filteredAttendance = computed(() => {
  return [...props.attendance].sort((a, b) => new Date(b.date) - new Date(a.date))
})

const employeeAttendance = computed(() => {
  if (!selectedEmployeeId.value) return filteredAttendance.value
  return filteredAttendance.value.filter(a => a.employeeId === Number(selectedEmployeeId.value))
})

function validateRequest() {
  formErrors.value = {}
  if (!selectedEmployeeId.value) formErrors.value.employee = 'Please select an employee'
  if (!timeOffType.value) formErrors.value.type = 'Please select a leave type'
  if (!startDate.value) formErrors.value.startDate = 'Start date is required'
  if (!endDate.value) formErrors.value.endDate = 'End date is required'
  if (startDate.value && endDate.value && startDate.value > endDate.value) {
    formErrors.value.endDate = 'End date must be after start date'
  }
  return Object.keys(formErrors.value).length === 0
}

function submitRequest() {
  if (!validateRequest()) return

  const newRequest = {
    id: props.timeOffRequests.length + 1,
    employeeId: Number(selectedEmployeeId.value),
    type: timeOffType.value,
    startDate: startDate.value,
    endDate: endDate.value,
    status: 'Pending',
    requestDate: new Date().toISOString().split('T')[0]
  }

  emit('update-timeoff', [...props.timeOffRequests, newRequest])
  selectedEmployeeId.value = ''
  timeOffType.value = ''
  startDate.value = ''
  endDate.value = ''
  alert('Time off request submitted successfully!')
}

function approveRequest(id) {
  const list = props.timeOffRequests.map(r => r.id === id ? { ...r, status: 'Approved' } : r)
  emit('update-timeoff', list)
}

function denyRequest(id) {
  const list = props.timeOffRequests.map(r => r.id === id ? { ...r, status: 'Denied' } : r)
  emit('update-timeoff', list)
}

function getEmployeeName(id) {
  const emp = props.employees.find(e => e.id === id)
  return emp ? `${emp.firstName} ${emp.lastName}` : 'Unknown'
}

function getStatusBadge(status) {
  return {
    'Approved': 'bg-success',
    'Pending': 'bg-warning text-dark',
    'Denied': 'bg-danger'
  }[status] || 'bg-secondary'
}

function getDaysCount(start, end) {
  const s = new Date(start)
  const e = new Date(end)
  return Math.ceil((e - s) / (1000 * 60 * 60 * 24)) + 1
}
</script>

<template>
  <div>
    <h2 class="mb-4">Time Off & Attendance</h2>

    <ul class="nav nav-tabs mb-4">
      <li class="nav-item">
        <a class="nav-link" :class="{ active: activeTab === 'requests' }" href="#" @click.prevent="activeTab = 'requests'">
          Leave Requests
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link" :class="{ active: activeTab === 'attendance' }" href="#" @click.prevent="activeTab = 'attendance'">
          Attendance Records
        </a>
      </li>
    </ul>

    <!-- Leave Requests Tab -->
    <div v-if="activeTab === 'requests'">
      <div class="card mb-4">
        <div class="card-header bg-success text-white">
          Submit New Time Off Request
        </div>
        <div class="card-body">
          <div class="row g-3">
            <div class="col-md-3">
              <label class="form-label">Employee *</label>
              <select v-model="selectedEmployeeId" class="form-select" :class="{ 'is-invalid': formErrors.employee }">
                <option value="">Select...</option>
                <option v-for="emp in employees" :key="emp.id" :value="emp.id">{{ emp.firstName }} {{ emp.lastName }}</option>
              </select>
              <div class="invalid-feedback">{{ formErrors.employee }}</div>
            </div>
            <div class="col-md-3">
              <label class="form-label">Leave Type *</label>
              <select v-model="timeOffType" class="form-select" :class="{ 'is-invalid': formErrors.type }">
                <option value="">Select...</option>
                <option v-for="type in timeOffTypes" :key="type">{{ type }}</option>
              </select>
              <div class="invalid-feedback">{{ formErrors.type }}</div>
            </div>
            <div class="col-md-3">
              <label class="form-label">Start Date *</label>
              <input v-model="startDate" type="date" class="form-control" :class="{ 'is-invalid': formErrors.startDate }" />
              <div class="invalid-feedback">{{ formErrors.startDate }}</div>
            </div>
            <div class="col-md-3">
              <label class="form-label">End Date *</label>
              <input v-model="endDate" type="date" class="form-control" :class="{ 'is-invalid': formErrors.endDate }" />
              <div class="invalid-feedback">{{ formErrors.endDate }}</div>
            </div>
          </div>
          <button class="btn btn-success mt-3" @click="submitRequest">Submit Request</button>
        </div>
      </div>

      <div class="table-responsive">
        <table class="table table-hover bg-white">
          <thead class="table-dark">
            <tr>
              <th>ID</th>
              <th>Employee</th>
              <th>Type</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Days</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="req in filteredRequests" :key="req.id">
              <td>{{ req.id }}</td>
              <td>{{ getEmployeeName(req.employeeId) }}</td>
              <td>{{ req.type }}</td>
              <td>{{ req.startDate }}</td>
              <td>{{ req.endDate }}</td>
              <td>{{ getDaysCount(req.startDate, req.endDate) }}</td>
              <td><span class="badge" :class="getStatusBadge(req.status)">{{ req.status }}</span></td>
              <td>
                <button v-if="req.status === 'Pending'" class="btn btn-sm btn-success me-1" @click="approveRequest(req.id)">Approve</button>
                <button v-if="req.status === 'Pending'" class="btn btn-sm btn-danger" @click="denyRequest(req.id)">Deny</button>
                <span v-else class="text-muted">—</span>
              </td>
            </tr>
            <tr v-if="filteredRequests.length === 0">
              <td colspan="8" class="text-center text-muted py-4">No leave requests found.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Attendance Tab -->
    <div v-if="activeTab === 'attendance'">
      <div class="row mb-3">
        <div class="col-md-4">
          <select v-model="selectedEmployeeId" class="form-select">
            <option value="">All Employees</option>
            <option v-for="emp in employees" :key="emp.id" :value="emp.id">{{ emp.firstName }} {{ emp.lastName }}</option>
          </select>
        </div>
      </div>

      <div class="table-responsive">
        <table class="table table-hover bg-white">
          <thead class="table-dark">
            <tr>
              <th>Date</th>
              <th>Employee</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="record in employeeAttendance" :key="record.id">
              <td>{{ record.date }}</td>
              <td>{{ getEmployeeName(record.employeeId) }}</td>
              <td>
                <span class="badge" :class="{
                  'bg-success': record.status === 'Present',
                  'bg-danger': record.status === 'Absent',
                  'bg-warning text-dark': record.status === 'Late'
                }">{{ record.status }}</span>
              </td>
            </tr>
            <tr v-if="employeeAttendance.length === 0">
              <td colspan="3" class="text-center text-muted py-4">No attendance records found.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
