<script setup>
import { computed } from 'vue'

const props = defineProps({ employees: Array, timeOffRequests: Array, attendance: Array, payrollRecords: Array })

const totalEmployees = computed(() => props.employees.length)

const pendingRequests = computed(() =>
  props.timeOffRequests.filter(r => r.status === 'Pending').length
)

const totalMonthlyPayroll = computed(() => {
  return props.payrollRecords.reduce((sum, r) => {
    const emp = props.employees.find(e => e.id === r.employeeId)
    if (!emp) return sum
    const base = emp.salary / 12
    const hourlyRate = emp.salary / (12 * 160)
    const overtimePay = r.overtimeHours * (hourlyRate * 1.5)
    return sum + base + overtimePay + r.bonus - r.deductions
  }, 0)
})

const deptCounts = computed(() => {
  const counts = {}
  props.employees.forEach(e => {
    counts[e.department] = (counts[e.department] || 0) + 1
  })
  return counts
})

const attendanceSummary = computed(() => {
  const counts = { Present: 0, Absent: 0, Late: 0 }
  props.attendance.forEach(a => {
    if (counts[a.status] !== undefined) counts[a.status]++
  })
  return counts
})

const maxDeptCount = computed(() => {
  const values = Object.values(deptCounts.value)
  return values.length > 0 ? Math.max(...values) : 1
})

function formatCurrency(amount) {
  return 'R ' + amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
</script>

<template>
  <div>
    <h2 class="mb-4">HR Dashboard</h2>

    <div class="row g-4 mb-4">
      <div class="col-md-3">
        <div class="card text-white bg-primary">
          <div class="card-body">
            <h5 class="card-title">Total Employees</h5>
            <h2>{{ totalEmployees }}</h2>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card text-white bg-success">
          <div class="card-body">
            <h5 class="card-title">Pending Leave Requests</h5>
            <h2>{{ pendingRequests }}</h2>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card text-white bg-info">
          <div class="card-body">
            <h5 class="card-title">Monthly Payroll (Net)</h5>
            <h5>{{ formatCurrency(totalMonthlyPayroll) }}</h5>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card text-white bg-warning">
          <div class="card-body">
            <h5 class="card-title">Attendance Today</h5>
            <p class="mb-0">Present: {{ attendanceSummary.Present }}</p>
            <p class="mb-0">Absent: {{ attendanceSummary.Absent }}</p>
            <p class="mb-0">Late: {{ attendanceSummary.Late }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="row g-4">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">Employees by Department</div>
          <div class="card-body">
            <div v-for="(count, dept) in deptCounts" :key="dept" class="mb-3">
              <div class="d-flex justify-content-between">
                <span>{{ dept }}</span>
                <span class="fw-bold">{{ count }}</span>
              </div>
              <div class="progress">
                <div
                  class="progress-bar bg-primary"
                  :style="{ width: (count / maxDeptCount * 100) + '%' }"
                >
                  {{ count }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-6">
        <div class="card">
          <div class="card-header">Recent Leave Requests</div>
          <div class="card-body p-0">
            <table class="table table-sm mb-0">
              <thead>
                <tr><th>Employee</th><th>Type</th><th>Status</th></tr>
              </thead>
              <tbody>
                <tr v-for="req in timeOffRequests.slice(0, 6)" :key="req.id">
                  <td>
                    {{ employees.find(e => e.id === req.employeeId)?.firstName }}
                    {{ employees.find(e => e.id === req.employeeId)?.lastName }}
                  </td>
                  <td>{{ req.type }}</td>
                  <td>
                    <span class="badge" :class="{
                      'bg-success': req.status === 'Approved',
                      'bg-warning text-dark': req.status === 'Pending',
                      'bg-danger': req.status === 'Denied'
                    }">{{ req.status }}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
