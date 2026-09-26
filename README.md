# SAARTHI — Scholarship & Fellowship Management System
**Centralized Digital Platform for Scheduled Tribe Students**
*Prototype Environment — Smart India Hackathon (SIH) Reference Architecture*

---

## 1. Overview & Vision
**SAARTHI** is an intelligent, auditable, and configurable scholarship and fellowship lifecycle management system designed specifically for Scheduled Tribe (ST) students. 

The platform simplifies, streamlines, and brings end-to-end transparency to the entire scholarship administration journey:
**Discover → Apply → Verify → Select → Sanction → Direct Benefit Transfer (DBT) → Fellowship Milestone Monitoring → Audit & Governance**.

---

## 2. Key Architectural Innovations

### 1. Configurable Generic Scheme & Rule Engine
Rather than hardcoding qualification logic per scholarship, SAARTHI provides a reusable dynamic rule evaluation engine. Rules evaluate operators (`EQUALS`, `NOT_EQUALS`, `GREATER_THAN_EQUAL`, `LESS_THAN_EQUAL`, `IN`) against candidate profile attributes (e.g. ST category, PhD degree, marks threshold >= 55%, annual parental income ceiling <= ₹6,00,000) in real-time.

### 2. AI-Assisted Document Verification & Human-in-the-Loop Scrutiny
Integrates automated optical character recognition (OCR) and anomaly cross-matching:
- Name and identity matching across certificates and databases
- Income value extraction and comparison against declared application amounts
- Legibility, digital seal, and duplicate submission checks
- **Principle: "AI ASSISTS → OFFICER DECIDES"**. Automated checks highlight discrepancies for human decision-making; final statutory determinations are executed solely by authorized scrutiny officers.

### 3. Transparent Merit Allocation & Selection Board
Configurable prototype multi-criteria evaluation model:
- Academic Performance (e.g., PG Marks: 40 pts)
- Research Proposal Rigor & Feasibility (35 pts)
- Socio-Economic Need, Remoteness & Priority Groups (25 pts)

### 4. Direct Benefit Transfer (DBT) Simulation
Simulates direct Aadhaar Payment Bridge / PFMS disbursements with batch validation, transaction reference (UTR) generation, and exception reconciliation (e.g., account closed, NPCI mapper timeouts, credit limits).

### 5. Multi-Year Fellowship Lifecycle Tracking
Post-selection module supporting research scholars across Year 1, Year 2, and Year 3 milestones, progress report submissions, supervisor evaluations, and installment credit confirmations.

### 6. Tamper-Evident Audit Trail
Append-only log documenting every state change, document upload, officer verification, board decision, and payment batch execution.

---

## 3. Demo Role Credentials

Use the **Demo Role Switcher** in the top navigation bar or log in with the following seeded accounts (all passwords: `Demo@123`):

| Role | Name & Designation | Email | Key Responsibility |
|---|---|---|---|
| **APPLICANT** | Rahul Oraon (PhD Scholar, Ranchi) | `student@demo.com` | Apply, upload documents, resolve deficiencies, track DBT |
| **OFFICER** | Dr. Arvind Mahato (Scrutiny Officer) | `officer@demo.com` | Document scrutiny, review AI anomalies, raise deficiencies, verify |
| **SELECTION_COMMITTEE** | Prof. S. Soren (Board Secretary) | `committee@demo.com` | Transparent merit ranking and award allocation |
| **FINANCE_OFFICER** | K. Murmu (Senior Accounts Officer) | `finance@demo.com` | Issue official Sanction Orders, execute DBT Payment Batches |
| **SUPER_ADMIN** | System Administrator | `admin@demo.com` | Scheme & Rules builder, system analytics, audit logs |

---

## 4. End-to-End Demo Workflow Guide (Rahul Oraon — `TS-2026-00421`)

Follow this step-by-step walkthrough to experience the complete lifecycle:

1. **Step 1 — Scrutiny Officer Reviews Anomaly**:
   - Switch role to **Scrutiny Officer**.
   - Open Scrutiny Queue and select Application **`TS-2026-00421`** (Rahul Oraon).
   - Inspect the **AI Assistance Panel**: See the Income Mismatch warning (Declared: ₹1,80,000 / Extracted: ₹2,60,000).
   - Click **Raise Deficiency** → Submit the correction request.
2. **Step 2 — Applicant Resolves Deficiency**:
   - Switch role back to **Applicant**.
   - Notice the prominent **Action Required** banner on the Dashboard and Documents tab.
   - Click **Resolve & Re-upload** (uploads updated certificate `Income_Cert_Ranchi_Verified.pdf`).
   - The AI engine automatically re-extracts: Income matches 100%, and status advances to **Resubmitted**.
3. **Step 3 — Officer Verifies Application**:
   - Switch to **Scrutiny Officer**.
   - Notice all checks are now green. Click **Verify Application**. Status becomes **Eligibility Verified**.
4. **Step 4 — Selection Board Awards Candidate**:
   - Switch to **Selection Committee**.
   - View the transparent ranking table. Click **Select for Award** on Rahul Oraon (Rank #3, Score: 89/100).
5. **Step 5 — Finance Issues Sanction Order**:
   - Switch to **Finance Officer**.
   - Under Sanctions, click **Issue Sanction Order** for Rahul Oraon.
   - Click **View Order** to inspect the official printable/downloadable Government Sanction Order (`SAN/ST/2026/0421`).
6. **Step 6 — Execute Simulated DBT Payment Batch**:
   - Under DBT Payment Batches, click **Process Batch** on `DBT-DEMO-2026-001`.
   - Observe 243 successful credits and 7 handled exceptions with instant retry support.
   - Status updates to **Disbursed**.
7. **Step 7 — Applicant Confirms Credit & Fellowship Tracking**:
   - Switch to **Applicant** → Go to **Fellowship** tab.
   - Verify Year 1 milestone marked as completed, Installment 1 ₹90,000 credited via DBT with bank UTR.
8. **Step 8 — Audit Trail & Platform Analytics**:
   - Switch to **Super Admin** → Inspect the **Audit Trail** to see every step timestamped and logged with actors and IP addresses.
   - Inspect **Analytics** to view the live conversion funnel.

---

## 5. Technology Stack
- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS
- **Design System**: Restrained Government & Public-Service Palette:
  - Primary Navy: `#123B5D`
  - Primary Blue: `#176B87`
  - Forest Green: `#247A5A`
  - Deep Green: `#185C46`
  - Bridge Teal: `#2A8C82`
  - Warm White: `#F8FAF9`, Pale Mint: `#E8F4EF`, Pale Blue: `#EAF3F8`
- **Iconography**: Lucide React
- **State & Storage**: Unified context architecture with persistent local storage and initial seeds.
