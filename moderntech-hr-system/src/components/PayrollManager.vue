<script setup>
import { ref, computed } from 'vue'

const props = defineProps({ employees: Array, payrollRecords: Array })
const emit = defineEmits(['update-payroll'])

const selectedEmployeeId = ref('')
const selectedMonth = ref(new Date().toISOString().slice(0, 7))
const hoursWorked = ref(160)
const overtimeHours = ref(0)
const bonus = ref(0)
const deductions = ref(0)
const showPayslip = ref(false)
const payslipData = ref(null)

const selectedEmployee = computed(() => {
  return props.employees.find(e => e.id === Number(selectedEmployeeId.value))
})

const existingPayroll = computed(() => {
  return props.payrollRecords.find(
    p => p.employeeId === Number(selectedEmployeeId.value) && p.month === selectedMonth.value
  )
})

function loadExistingPayroll() {
  if (existingPayroll.value) {
    hoursWorked.value = existingPayroll.value.hoursWorked
    overtimeHours.value = existingPayroll.value.overtimeHours
    bonus.value = existingPayroll.value.bonus
    deductions.value = existingPayroll.value.deductions
  } else {
    hoursWorked.value = 160
    overtimeHours.value = 0
    bonus.value = 0
    deductions.value = 0
  }
}

function calculatePayroll() {
  if (!selectedEmployee.value) return null

  const annualSalary = selectedEmployee.value.salary
  const monthlyBase = annualSalary / 12
  const hourlyRate = annualSalary / (12 * 160)
  const overtimeRate = hourlyRate * 1.5

  const basePay = monthlyBase
  const overtimePay = overtimeHours.value * overtimeRate
  const grossPay = basePay + overtimePay + Number(bonus.value)
  const totalDeductions = Number(deductions.value)
  const netPay = grossPay - totalDeductions

  return {
    basePay,
    overtimePay,
    bonus: Number(bonus.value),
    grossPay,
    totalDeductions,
    netPay,
    hourlyRate,
    overtimeRate
  }
}

const payrollResult = computed(() => calculatePayroll())

function savePayroll() {
  if (!selectedEmployee.value) return

  const list = [...props.payrollRecords]
  const idx = list.findIndex(p => p.employeeId === Number(selectedEmployeeId.value) && p.month === selectedMonth.value)

  const record = {
    id: idx !== -1 ? list[idx].id : list.length + 1,
    employeeId: Number(selectedEmployeeId.value),
    month: selectedMonth.value,
    hoursWorked: Number(hoursWorked.value),
    overtimeHours: Number(overtimeHours.value),
    bonus: Number(bonus.value),
    deductions: Number(deductions.value)
  }

  if (idx !== -1) {
    list[idx] = record
  } else {
    list.push(record)
  }

  emit('update-payroll', list)
  alert('Payroll record saved successfully!')
}

function generatePayslip() {
  if (!payrollResult.value || !selectedEmployee.value) return

  payslipData.value = {
    employee: selectedEmployee.value,
    month: selectedMonth.value,
    ...payrollResult.value
  }
  showPayslip.value = true
}

function formatCurrency(amount) {
  return 'R ' + amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

function printPayslip() {
  window.print()
}
</script>

<template>
  <div>
    <h2 class="mb-4">Payroll Management</h2>

    <div class="row g-3 mb-4">
      <div class="col-md-6">
        <label class="form-label">Select Employee</label>
        <select v-model="selectedEmployeeId" class="form-select" @change="loadExistingPayroll">
          <option value="">Choose employee...</option>
          <option v-for="emp in employees" :key="emp.id" :value="emp.id">
            {{ emp.firstName }} {{ emp.lastName }} - {{ emp.position }}
          </option>
        </select>
      </div>
      <div class="col-md-6">
        <label class="form-label">Month</label>
        <input v-model="selectedMonth" type="month" class="form-control" />
      </div>
    </div>

    <div v-if="selectedEmployee">
      <div class="card mb-4">
        <div class="card-header bg-primary text-white">
          Payroll Input for {{ selectedEmployee.firstName }} {{ selectedEmployee.lastName }}
        </div>
        <div class="card-body">
          <div class="row g-3">
            <div class="col-md-3">
              <label class="form-label">Hours Worked</label>
              <input v-model.number="hoursWorked" type="number" class="form-control" min="0" />
            </div>
            <div class="col-md-3">
              <label class="form-label">Overtime Hours</label>
              <input v-model.number="overtimeHours" type="number" class="form-control" min="0" />
            </div>
            <div class="col-md-3">
              <label class="form-label">Bonus (ZAR)</label>
              <input v-model.number="bonus" type="number" class="form-control" min="0" />
            </div>
            <div class="col-md-3">
              <label class="form-label">Deductions (ZAR)</label>
              <input v-model.number="deductions" type="number" class="form-control" min="0" />
            </div>
          </div>
          <div class="mt-3 d-flex gap-2">
            <button class="btn btn-success" @click="savePayroll">Save Payroll Record</button>
            <button class="btn btn-info" @click="generatePayslip">Generate Payslip</button>
          </div>
        </div>
      </div>

      <div class="card mb-4" v-if="payrollResult">
        <div class="card-header bg-secondary text-white">
          Payroll Calculation Summary
        </div>
        <div class="card-body">
          <div class="row">
            <div class="col-md-6">
              <table class="table table-borderless">
                <tr><td><strong>Base Monthly Pay:</strong></td><td class="text-end">{{ formatCurrency(payrollResult.basePay) }}</td></tr>
                <tr><td><strong>Overtime Pay:</strong></td><td class="text-end">{{ formatCurrency(payrollResult.overtimePay) }}</td></tr>
                <tr><td><strong>Bonus:</strong></td><td class="text-end">{{ formatCurrency(payrollResult.bonus) }}</td></tr>
                <tr class="table-success"><td><strong>Gross Pay:</strong></td><td class="text-end"><strong>{{ formatCurrency(payrollResult.grossPay) }}</strong></td></tr>
                <tr><td><strong>Deductions:</strong></td><td class="text-end text-danger">-{{ formatCurrency(payrollResult.totalDeductions) }}</td></tr>
                <tr class="table-primary"><td><strong>Net Pay:</strong></td><td class="text-end"><strong>{{ formatCurrency(payrollResult.netPay) }}</strong></td></tr>
              </table>
            </div>
            <div class="col-md-6">
              <div class="alert alert-light">
                <p class="mb-1"><strong>Hourly Rate:</strong> {{ formatCurrency(payrollResult.hourlyRate) }}</p>
                <p class="mb-1"><strong>Overtime Rate:</strong> {{ formatCurrency(payrollResult.overtimeRate) }}</p>
                <p class="mb-0"><strong>Annual Salary:</strong> {{ formatCurrency(selectedEmployee.salary) }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="alert alert-info">
      Please select an employee to calculate payroll.
    </div>

    <!-- Payslip Modal -->
    <div v-if="showPayslip" class="modal fade show d-block" tabindex="-1" style="background: rgba(0,0,0,0.5);">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Digital Payslip</h5>
            <button class="btn-close" @click="showPayslip = false"></button>
          </div>
          <div class="modal-body" id="payslip-body">
            <div class="text-center border-bottom pb-3 mb-3">
              <h4>ModernTech Solutions</h4>
              <p class="mb-0 text-muted">123 Innovation Drive, Johannesburg, South Africa</p>
              <p class="mb-0 text-muted">Tel: 011 123 4567 | www.moderntech.co.za</p>
            </div>
            <div class="row mb-3">
              <div class="col-6">
                <p class="mb-1"><strong>Employee:</strong> {{ payslipData.employee.firstName }} {{ payslipData.employee.lastName }}</p>
                <p class="mb-1"><strong>ID:</strong> {{ payslipData.employee.id }}</p>
                <p class="mb-0"><strong>Department:</strong> {{ payslipData.employee.department }}</p>
              </div>
              <div class="col-6 text-end">
                <p class="mb-1"><strong>Month:</strong> {{ payslipData.month }}</p>
                <p class="mb-1"><strong>Position:</strong> {{ payslipData.employee.position }}</p>
                <p class="mb-0"><strong>Date:</strong> {{ new Date().toLocaleDateString('en-ZA') }}</p>
              </div>
            </div>
            <table class="table table-bordered">
              <thead class="table-light">
                <tr><th>Earnings</th><th class="text-end">Amount</th></tr>
              </thead>
              <tbody>
                <tr><td>Base Pay</td><td class="text-end">{{ formatCurrency(payslipData.basePay) }}</td></tr>
                <tr><td>Overtime Pay</td><td class="text-end">{{ formatCurrency(payslipData.overtimePay) }}</td></tr>
                <tr><td>Bonus</td><td class="text-end">{{ formatCurrency(payslipData.bonus) }}</td></tr>
                <tr class="table-success"><td><strong>Gross Pay</strong></td><td class="text-end"><strong>{{ formatCurrency(payslipData.grossPay) }}</strong></td></tr>
              </tbody>
            </table>
            <table class="table table-bordered">
              <thead class="table-light">
                <tr><th>Deductions</th><th class="text-end">Amount</th></tr>
              </thead>
              <tbody>
                <tr><td>Total Deductions</td><td class="text-end">{{ formatCurrency(payslipData.totalDeductions) }}</td></tr>
              </tbody>
            </table>
            <div class="alert alert-primary text-center">
              <h5 class="m-0">Net Pay: {{ formatCurrency(payslipData.netPay) }}</h5>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" @click="showPayslip = false">Close</button>
            <button class="btn btn-primary" @click="printPayslip">Print</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
