<script setup>
const props = defineProps({ currentView: String })
const emit = defineEmits(['change-view', 'logout'])

const navItems = [
  { key: 'employees', label: 'Employees', icon: '👥' },
  { key: 'payroll', label: 'Payroll', icon: '💰' },
  { key: 'timeoff', label: 'Time Off & Attendance', icon: '📅' },
  { key: 'dashboard', label: 'Dashboard', icon: '📊' }
]
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#" @click.prevent="emit('change-view', 'employees')">
        ModernTech HR
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto">
          <li class="nav-item" v-for="item in navItems" :key="item.key">
            <a
              class="nav-link"
              :class="{ active: currentView === item.key }"
              href="#"
              @click.prevent="emit('change-view', item.key)"
            >
              {{ item.icon }} {{ item.label }}
            </a>
          </li>
        </ul>
        <div class="d-flex">
          <button class="btn btn-outline-light btn-sm" @click="emit('logout')">Logout</button>
        </div>
      </div>
    </div>
  </nav>
</template>
