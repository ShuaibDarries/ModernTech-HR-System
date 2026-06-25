<script setup>
import { ref, computed } from 'vue'
import { departments, positionsByDept } from '../data/dummyData.js'

const props = defineProps({ employees: Array })
const emit = defineEmits(['update-employees'])

const searchQuery = ref('')
const selectedDept = ref('')
const showModal = ref(false)
const isEditing = ref(false)
const currentEmployee = ref({})

const filteredEmployees = computed(() => {
  let result = [...props.employees]
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase()
    result = result.filter(e =>
      e.firstName.toLowerCase().includes(q) ||
      e.lastName.toLowerCase().includes(q) ||
      e.email.toLowerCase().includes(q) ||
      e.position.toLowerCase().includes(q)
    )
  }
  if (selectedDept.value) {
    result = result.filter(e => e.department === selectedDept.value)
  }
  return result
})

const availablePositions = computed(() => {
  return currentEmployee.value.department ? positionsByDept[currentEmployee.value.department] || [] : []
})

function openAddModal() {
  isEditing.value = false
  currentEmployee.value = {
    firstName: '', lastName: '', email: '', phone: '',
    department: '', position: '', salary: '', joinDate: '',
    idNumber: '', address: ''
  }
  showModal.value = true
}

function openEditModal(emp) {
  isEditing.value = true
  currentEmployee.value = { ...emp }
  showModal.value = true
}

function closeModal() {
  showModal.value = false
}

function validateEmployee() {
  const e = currentEmployee.value
  if (!e.firstName || !e.lastName || !e.email || !e.department || !e.position || !e.salary || !e.joinDate) {
    alert('Please fill in all required fields.')
    return false
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(e.email)) {
    alert('Please enter a valid email address.')
    return false
  }
  if (Number(e.salary) <= 0) {
    alert('Salary must be greater than 0.')
    return false
  }
  return true
}

function saveEmployee() {
  if (!validateEmployee()) return

  const list = [...props.employees]
  if (isEditing.value) {
    const idx = list.findIndex(e => e.id === currentEmployee.value.id)
    if (idx !== -1) list[idx] = { ...currentEmployee.value, salary: Number(currentEmployee.value.salary) }
  } else {
    const newId = list.length > 0 ? Math.max(...list.map(e => e.id)) + 1 : 1
    list.push({
      ...currentEmployee.value,
      id: newId,
      salary: Number(currentEmployee.value.salary)
    })
  }
  emit('update-employees', list)
  closeModal()
}

function deleteEmployee(id) {
  if (!confirm('Are you sure you want to delete this employee?')) return
  emit('update-employees', props.employees.filter(e => e.id !== id))
}

function formatCurrency(amount) {
  return 'R ' + amount.toLocaleString('en-ZA')
}

function onDepartmentChange() {
  currentEmployee.value.position = ''
}
</script>

<template>
  <div>
    <div class="d-flex flex-wrap gap-3 mb-4 align-items-center">
      <h2 class="m-0">Employee Management</h2>
      <button class="btn btn-success" @click="openAddModal">
        <span class="me-1">+</span> Add Employee
      </button>
    </div>

    <div class="row g-3 mb-4">
      <div class="col-md-6">
        <input v-model="searchQuery" class="form-control" placeholder="Search by name, email or position..." />
      </div>
      <div class="col-md-4">
        <select v-model="selectedDept" class="form-select">
          <option value="">All Departments</option>
          <option v-for="dept in departments" :key="dept">{{ dept }}</option>
        </select>
      </div>
      <div class="col-md-2">
        <div class="badge bg-secondary w-100 py-2">{{ filteredEmployees.length }} employees</div>
      </div>
    </div>

    <div class="table-responsive">
      <table class="table table-hover table-striped bg-white">
        <thead class="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Department</th>
            <th>Position</th>
            <th>Email</th>
            <th class="text-end">Salary (Annual)</th>
            <th>Join Date</th>
            <th class="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="emp in filteredEmployees" :key="emp.id">
            <td>{{ emp.id }}</td>
            <td>{{ emp.firstName }} {{ emp.lastName }}</td>
            <td>{{ emp.department }}</td>
            <td>{{ emp.position }}</td>
            <td>{{ emp.email }}</td>
            <td class="text-end">{{ formatCurrency(emp.salary) }}</td>
            <td>{{ emp.joinDate }}</td>
            <td class="text-center">
              <button class="btn btn-sm btn-primary me-1" @click="openEditModal(emp)">Edit</button>
              <button class="btn btn-sm btn-danger" @click="deleteEmployee(emp.id)">Delete</button>
            </td>
          </tr>
          <tr v-if="filteredEmployees.length === 0">
            <td colspan="8" class="text-center text-muted py-4">No employees found.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal -->
    <div v-if="showModal" class="modal fade show d-block" tabindex="-1" style="background: rgba(0,0,0,0.5);">
      <div class="modal-dialog modal-lg modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ isEditing ? 'Edit Employee' : 'Add New Employee' }}</h5>
            <button type="button" class="btn-close" @click="closeModal"></button>
          </div>
          <div class="modal-body">
            <div class="row g-3">
              <div class="col-md-6">
                <label class="form-label">First Name *</label>
                <input v-model="currentEmployee.firstName" class="form-control" required />
              </div>
              <div class="col-md-6">
                <label class="form-label">Last Name *</label>
                <input v-model="currentEmployee.lastName" class="form-control" required />
              </div>
              <div class="col-md-6">
                <label class="form-label">Email *</label>
                <input v-model="currentEmployee.email" type="email" class="form-control" required />
              </div>
              <div class="col-md-6">
                <label class="form-label">Phone</label>
                <input v-model="currentEmployee.phone" class="form-control" />
              </div>
              <div class="col-md-6">
                <label class="form-label">Department *</label>
                <select v-model="currentEmployee.department" class="form-select" @change="onDepartmentChange" required>
                  <option value="">Select...</option>
                  <option v-for="dept in departments" :key="dept">{{ dept }}</option>
                </select>
              </div>
              <div class="col-md-6">
                <label class="form-label">Position *</label>
                <select v-model="currentEmployee.position" class="form-select" required>
                  <option value="">Select...</option>
                  <option v-for="pos in availablePositions" :key="pos">{{ pos }}</option>
                </select>
              </div>
              <div class="col-md-6">
                <label class="form-label">Annual Salary (ZAR) *</label>
                <input v-model="currentEmployee.salary" type="number" class="form-control" required />
              </div>
              <div class="col-md-6">
                <label class="form-label">Join Date *</label>
                <input v-model="currentEmployee.joinDate" type="date" class="form-control" required />
              </div>
              <div class="col-md-6">
                <label class="form-label">ID Number</label>
                <input v-model="currentEmployee.idNumber" class="form-control" />
              </div>
              <div class="col-md-6">
                <label class="form-label">Address</label>
                <input v-model="currentEmployee.address" class="form-control" />
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" @click="closeModal">Cancel</button>
            <button class="btn btn-primary" @click="saveEmployee">{{ isEditing ? 'Update' : 'Save' }}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
