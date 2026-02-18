# WFH Job Platform Backend

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/wfh-platform
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

3. Start MongoDB server

4. Run the application:
```bash
npm start
# or for development
npm run dev
```

## API Endpoints

### User Endpoints
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - User login
- `GET /api/users/profile` - Get user profile (Auth required)
- `PUT /api/users/profile` - Update profile (Auth required, supports file upload)
- `PUT /api/users/bank-details` - Update bank details (Auth required)
- `PUT /api/users/government-doc` - Update government document (Auth required, supports file upload)
- `POST /api/users/submit-work` - Submit work for a task (Auth required, supports multiple files)
- `GET /api/users/work-history` - Get work history (Auth required)
- `POST /api/users/withdrawal` - Request withdrawal (Auth required)
- `GET /api/users/withdrawals` - Get withdrawal history (Auth required)

### Admin Endpoints
- `POST /api/admin/register` - Register new admin
- `POST /api/admin/login` - Admin login
- `PUT /api/admin/profile` - Update admin profile (Auth required)
- `PUT /api/admin/company-details` - Update company details (Auth required)
- `POST /api/admin/franchise-request` - Request franchise registration (Auth required)
- `POST /api/admin/job` - Create new job (Auth required)
- `POST /api/admin/task` - Create new task (Auth required)
- `GET /api/admin/pending-work` - Get pending work submissions (Auth required)
- `POST /api/admin/review-work` - Approve/reject work (Auth required)
- `GET /api/admin/users` - Get all users (Auth required)
- `GET /api/admin/pending-withdrawals` - Get pending withdrawals (Auth required)
- `POST /api/admin/process-withdrawal` - Process withdrawal request (Auth required)
- `GET /api/admin/work-history` - Get all work history (Auth required)

### Super Admin Endpoints
- `GET /api/superadmin/pending-franchises` - Get pending franchise requests (Auth required)
- `POST /api/superadmin/approve-franchise` - Approve/reject franchise (Auth required)
- `GET /api/superadmin/franchises` - Get all franchises (Auth required)

### Task Endpoints (User Access)
- `GET /api/jobs` - Get all active jobs (Auth required)
- `GET /api/tasks` - Get all active tasks (Auth required)
- `GET /api/task/:id` - Get task details (Auth required)

## Request Examples

### User Registration
```json
POST /api/users/register
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe",
  "phone": "1234567890"
}
```

### Update Bank Details
```json
PUT /api/users/bank-details
Headers: { "Authorization": "Bearer <token>" }
{
  "accountNumber": "1234567890",
  "ifscCode": "ABCD0123456",
  "accountHolderName": "John Doe",
  "bankName": "Example Bank"
}
```

### Submit Work
```json
POST /api/users/submit-work
Headers: { "Authorization": "Bearer <token>" }
Content-Type: multipart/form-data
{
  "taskId": "task_id_here",
  "submissionData": "Work description",
  "files": [file1, file2]
}
```

### Create Task (Admin)
```json
POST /api/admin/task
Headers: { "Authorization": "Bearer <token>" }
{
  "jobId": "job_id_here",
  "title": "Data Entry Task",
  "description": "Enter 100 records",
  "payoutAmount": 500,
  "maxSubmissions": 10,
  "deadline": "2024-12-31"
}
```

### Review Work (Admin)
```json
POST /api/admin/review-work
Headers: { "Authorization": "Bearer <token>" }
{
  "submissionId": "submission_id_here",
  "status": "approved",
  "adminNotes": "Good work"
}
```

### Process Withdrawal (Admin)
```json
POST /api/admin/process-withdrawal
Headers: { "Authorization": "Bearer <token>" }
{
  "withdrawalId": "withdrawal_id_here",
  "status": "approved",
  "transactionId": "TXN123456",
  "adminNotes": "Payment sent"
}
```

## Models

### User
- email, password, name, phone
- profilePic, profileScore
- bankDetails (accountNumber, ifscCode, accountHolderName, bankName)
- governmentDoc (docType, docNumber, docFile)
- wallet

### Admin
- email, password, name, phone, profilePic
- companyDetails (companyName, registrationNumber, address, gstNumber)
- franchiseId, isApproved, role

### Franchise
- name, email, phone, address, registrationNumber
- isApproved, adminId

### Job
- title, description, category
- adminId, franchiseId, isActive

### Task
- jobId, title, description
- payoutAmount, maxSubmissions, deadline
- adminId, isActive

### WorkSubmission
- taskId, userId
- submissionData, submissionFiles
- status (pending/approved/rejected)
- adminNotes, reviewedBy, reviewedAt

### Withdrawal
- userId, amount
- status (pending/approved/rejected)
- adminId, transactionId, adminNotes, processedAt
