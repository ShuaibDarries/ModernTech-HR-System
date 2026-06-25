export const departments = [
  'Software Development',
  'Quality Assurance',
  'Customer Support',
  'Sales',
  'Marketing',
  'Human Resources'
]

export const positionsByDept = {
  'Software Development': ['Junior Developer', 'Developer', 'Senior Developer', 'Tech Lead'],
  'Quality Assurance': ['QA Tester', 'QA Analyst', 'QA Lead'],
  'Customer Support': ['Support Agent', 'Senior Support Agent', 'Support Manager'],
  'Sales': ['Sales Representative', 'Account Executive', 'Sales Manager'],
  'Marketing': ['Marketing Coordinator', 'Marketing Specialist', 'Marketing Manager'],
  'Human Resources': ['HR Assistant', 'HR Officer', 'HR Manager']
}

export const timeOffTypes = ['Annual Leave', 'Sick Leave', 'Family Responsibility', 'Unpaid Leave', 'Study Leave']

export const dummyEmployees = [
  {
    id: 1, firstName: 'Thabo', lastName: 'Mokoena',
    email: 'thabo.mokoena@moderntech.co.za', phone: '082 123 4567',
    department: 'Software Development', position: 'Senior Developer',
    salary: 850000, joinDate: '2018-03-15', idNumber: '8803151234087',
    address: '123 Main Road, Johannesburg'
  },
  {
    id: 2, firstName: 'Sarah', lastName: 'Van der Merwe',
    email: 'sarah.vdm@moderntech.co.za', phone: '083 234 5678',
    department: 'Human Resources', position: 'HR Manager',
    salary: 720000, joinDate: '2019-01-10', idNumber: '9001105678083',
    address: '45 Church Street, Cape Town'
  },
  {
    id: 3, firstName: 'Johannes', lastName: 'Khumalo',
    email: 'johannes.k@moderntech.co.za', phone: '073 345 6789',
    department: 'Sales', position: 'Sales Manager',
    salary: 680000, joinDate: '2017-06-22', idNumber: '8506229012081',
    address: '88 Market Street, Durban'
  },
  {
    id: 4, firstName: 'Priya', lastName: 'Naidoo',
    email: 'priya.naidoo@moderntech.co.za', phone: '072 456 7890',
    department: 'Marketing', position: 'Marketing Specialist',
    salary: 520000, joinDate: '2020-11-05', idNumber: '9511052345082',
    address: '12 Beach Road, Durban'
  },
  {
    id: 5, firstName: 'Liam', lastName: "O'Connor",
    email: 'liam.oc@moderntech.co.za', phone: '081 567 8901',
    department: 'Software Development', position: 'Developer',
    salary: 650000, joinDate: '2019-08-14', idNumber: '9008144567084',
    address: '34 Tech Park, Pretoria'
  },
  {
    id: 6, firstName: 'Nompumelelo', lastName: 'Dlamini',
    email: 'nompumelelo.d@moderntech.co.za', phone: '084 678 9012',
    department: 'Quality Assurance', position: 'QA Lead',
    salary: 600000, joinDate: '2018-02-20', idNumber: '8802207890085',
    address: '56 QA Street, Johannesburg'
  },
  {
    id: 7, firstName: 'David', lastName: 'Smith',
    email: 'david.smith@moderntech.co.za', phone: '076 789 0123',
    department: 'Customer Support', position: 'Support Manager',
    salary: 580000, joinDate: '2017-09-12', idNumber: '8709123456086',
    address: '78 Support Ave, Cape Town'
  },
  {
    id: 8, firstName: 'Fatima', lastName: 'Patel',
    email: 'fatima.patel@moderntech.co.za', phone: '065 890 1234',
    department: 'Software Development', position: 'Junior Developer',
    salary: 420000, joinDate: '2022-03-01', idNumber: '0203015672087',
    address: '90 Code Lane, Johannesburg'
  },
  {
    id: 9, firstName: 'Sipho', lastName: 'Zulu',
    email: 'sipho.zulu@moderntech.co.za', phone: '071 901 2345',
    department: 'Sales', position: 'Account Executive',
    salary: 550000, joinDate: '2020-05-18', idNumber: '0005189012088',
    address: '11 Sales Blvd, Durban'
  },
  {
    id: 10, firstName: 'Emma', lastName: 'Brown',
    email: 'emma.brown@moderntech.co.za', phone: '079 012 3456',
    department: 'Marketing', position: 'Marketing Coordinator',
    salary: 380000, joinDate: '2021-07-30', idNumber: '0107302345089',
    address: '22 Brand Road, Cape Town'
  },
  {
    id: 11, firstName: 'Andile', lastName: 'Nkosi',
    email: 'andile.nkosi@moderntech.co.za', phone: '061 123 4567',
    department: 'Software Development', position: 'Tech Lead',
    salary: 950000, joinDate: '2016-04-10', idNumber: '8604106789090',
    address: '33 Lead Street, Pretoria'
  },
  {
    id: 12, firstName: 'Grace', lastName: 'Muller',
    email: 'grace.muller@moderntech.co.za', phone: '062 234 5678',
    department: 'Quality Assurance', position: 'QA Analyst',
    salary: 480000, joinDate: '2021-01-25', idNumber: '0101253456091',
    address: '44 Test Lane, Cape Town'
  },
  {
    id: 13, firstName: 'Bongani', lastName: 'Mthembu',
    email: 'bongani.m@moderntech.co.za', phone: '074 345 6789',
    department: 'Customer Support', position: 'Senior Support Agent',
    salary: 400000, joinDate: '2020-09-15', idNumber: '0009157890092',
    address: '55 Help Desk Way, Durban'
  },
  {
    id: 14, firstName: 'Olivia', lastName: 'Johnson',
    email: 'olivia.j@moderntech.co.za', phone: '067 456 7890',
    department: 'Human Resources', position: 'HR Officer',
    salary: 450000, joinDate: '2019-12-01', idNumber: '8912014567093',
    address: '66 HR Plaza, Johannesburg'
  },
  {
    id: 15, firstName: 'Micheal', lastName: 'Coetzee',
    email: 'micheal.c@moderntech.co.za', phone: '068 567 8901',
    department: 'Sales', position: 'Sales Representative',
    salary: 350000, joinDate: '2022-06-10', idNumber: '0206109012094',
    address: '77 Deal Close, Pretoria'
  },
  {
    id: 16, firstName: 'Zanele', lastName: 'Sithole',
    email: 'zanele.sithole@moderntech.co.za', phone: '069 678 9012',
    department: 'Software Development', position: 'Developer',
    salary: 620000, joinDate: '2020-02-28', idNumber: '0002282345095',
    address: '88 Dev Street, Durban'
  },
  {
    id: 17, firstName: 'Peter', lastName: 'Williams',
    email: 'peter.w@moderntech.co.za', phone: '070 789 0123',
    department: 'Customer Support', position: 'Support Agent',
    salary: 320000, joinDate: '2023-01-15', idNumber: '0301156789096',
    address: '99 Agent Road, Cape Town'
  }
]

export function getInitialTimeOffRequests() {
  return [
    { id: 1, employeeId: 1, type: 'Annual Leave', startDate: '2026-06-15', endDate: '2026-06-19', status: 'Approved', requestDate: '2026-05-20' },
    { id: 2, employeeId: 3, type: 'Sick Leave', startDate: '2026-06-10', endDate: '2026-06-11', status: 'Approved', requestDate: '2026-06-09' },
    { id: 3, employeeId: 5, type: 'Family Responsibility', startDate: '2026-06-20', endDate: '2026-06-22', status: 'Pending', requestDate: '2026-06-15' },
    { id: 4, employeeId: 8, type: 'Annual Leave', startDate: '2026-07-01', endDate: '2026-07-10', status: 'Pending', requestDate: '2026-06-10' },
    { id: 5, employeeId: 11, type: 'Sick Leave', startDate: '2026-06-25', endDate: '2026-06-26', status: 'Pending', requestDate: '2026-06-20' }
  ]
}

export function getInitialAttendance() {
  const attendance = []
  const today = new Date()
  const statuses = ['Present', 'Present', 'Present', 'Present', 'Absent', 'Late']
  dummyEmployees.forEach((emp) => {
    for (let i = 0; i < 5; i++) {
      const d = new Date(today)
      d.setDate(d.getDate() - i)
      const dateStr = d.toISOString().split('T')[0]
      const dayOfWeek = d.getDay()
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        attendance.push({
          id: attendance.length + 1,
          employeeId: emp.id,
          date: dateStr,
          status: statuses[Math.floor(Math.random() * statuses.length)]
        })
      }
    }
  })
  return attendance
}

export function getInitialPayroll() {
  return [
    { id: 1, employeeId: 1, month: '2026-05', hoursWorked: 168, overtimeHours: 8, bonus: 5000, deductions: 15000 },
    { id: 2, employeeId: 2, month: '2026-05', hoursWorked: 160, overtimeHours: 0, bonus: 3000, deductions: 12000 },
    { id: 3, employeeId: 3, month: '2026-05', hoursWorked: 172, overtimeHours: 4, bonus: 4000, deductions: 13000 },
    { id: 4, employeeId: 4, month: '2026-05', hoursWorked: 160, overtimeHours: 0, bonus: 2000, deductions: 9000 },
    { id: 5, employeeId: 5, month: '2026-05', hoursWorked: 168, overtimeHours: 6, bonus: 2500, deductions: 11000 }
  ]
}
