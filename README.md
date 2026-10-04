# SAARTHI — Scholarship & Fellowship Management System

### Centralized Digital Platform for Scheduled Tribe Students

> An intelligent, configurable and auditable scholarship & fellowship management platform designed to streamline the complete lifecycle of applications — from discovery and application to verification, selection, sanction, disbursement and fellowship tracking.

**Smart India Hackathon 2026 · Problem Statement 26239 · Smart Education · Software**

[![SIH 2026](https://img.shields.io/badge/Smart%20India%20Hackathon-2026-blue)](#-smart-india-hackathon-2026)
[![Problem Statement](https://img.shields.io/badge/PS-26239-informational)](#-smart-india-hackathon-2026)
[![Live Demo](https://img.shields.io/badge/Live-Demo-success)](https://saarthi-sih.nisatsama7547.workers.dev/)

**[Live Demo](https://saarthi-sih.nisatsama7547.workers.dev/)** · **[SIH Presentation](./docs/SIH-Presentation.pdf)** · **[Demo Guide](./docs/demo-guide.md)**

---

## Smart India Hackathon 2026

|                             | Details                                                                      |
| --------------------------- | ---------------------------------------------------------------------------- |
| **Problem Statement**       | 26239                                                                        |
| **Problem Statement Title** | AI-Enabled Scholarship and Fellowship Management System for Scheduled Tribes |
| **Theme**                   | Smart Education                                                              |
| **Category**                | Software                                                                     |
| **Team ID**                 | 154583                                                                       |
| **Team Name**               | SMRITII                                                                      |
| **Prototype**               | SAARTHI                                                                      |

SAARTHI was developed for the **Smart India Hackathon 2026** problem statement concerning scholarship and fellowship management for Scheduled Tribe students.

The solution proposes a centralized digital infrastructure capable of supporting multiple scholarship and fellowship schemes while making eligibility, verification, deficiencies, selection, disbursement and subsequent fellowship tracking more transparent and traceable.

---

## The Problem

Scholarship and fellowship administration involves multiple stages:

```text
Scheme Discovery
      ↓
Application
      ↓
Document Submission
      ↓
Eligibility Verification
      ↓
Deficiency / Correction
      ↓
Selection
      ↓
Sanction
      ↓
Disbursement
      ↓
Fellowship Monitoring
      ↓
Audit & Governance
```

Fragmented workflows can lead to:

* Repeated manual verification
* Difficulty tracking application status
* Avoidable rejections caused by document deficiencies
* Delays in communication between applicants and authorities
* Difficulty adapting eligibility criteria for different schemes
* Limited visibility into administrative bottlenecks
* Lack of a unified audit trail

SAARTHI approaches the problem as a **reusable scholarship administration platform rather than a single-purpose application portal**.

---

# What SAARTHI Provides

## 1. Configurable Scheme & Rule Engine

Eligibility requirements are represented as configurable rules rather than being hardcoded into individual scholarship workflows.

The prototype supports rule operators such as:

* `EQUALS`
* `NOT_EQUALS`
* `GREATER_THAN_EQUAL`
* `LESS_THAN_EQUAL`
* `IN`

Example eligibility attributes include:

* ST category
* Degree / qualification
* Academic marks
* Annual parental income
* Scheme-specific requirements

This allows the same platform architecture to support multiple scholarship and fellowship schemes.

---

## 2. AI-Assisted Document Verification

SAARTHI introduces automated assistance for document verification.

The proposed verification workflow can identify:

* Identity/name mismatches
* Income inconsistencies
* Duplicate submissions
* Document legibility issues
* Missing or inconsistent information

### Human-in-the-loop principle

> **AI ASSISTS → OFFICER DECIDES**

Automated checks are intended to highlight potential discrepancies. Final verification and statutory decisions remain with authorized officers.

---

## 3. Deficiency & Correction Workflow

Instead of simply rejecting an application because of a document problem, the platform provides a structured deficiency workflow.

```text
Officer identifies issue
        ↓
Deficiency raised
        ↓
Applicant notified
        ↓
Applicant corrects / re-uploads document
        ↓
Verification repeated
        ↓
Application proceeds
```

This creates a clearer correction path and can reduce avoidable application rejection.

---

## 4. Transparent Merit Selection

The prototype includes a configurable multi-criteria selection model.

Example scoring structure:

| Criterion                      |  Weight |
| ------------------------------ | ------: |
| Academic Performance           |      40 |
| Research Proposal              |      35 |
| Socio-Economic Need / Priority |      25 |
| **Total**                      | **100** |

The selection interface provides a transparent ranking view for the selection committee.

---

## 5. Sanction Order Generation

After selection, the finance workflow allows authorized officials to issue a formal sanction order.

The prototype demonstrates:

* Candidate selection
* Sanction generation
* Sanction reference number
* Printable/downloadable sanction document

---

## 6. DBT Simulation

SAARTHI demonstrates the downstream disbursement workflow through a simulated DBT environment.

The prototype models:

* Payment batches
* Successful credits
* Failed transactions
* Exception handling
* Retry support
* Transaction/UTR references
* Batch status transitions

> **Important:** Payment, Aadhaar/PFMS and government-system interactions shown in this project are prototype/simulation workflows and do not represent production integration with government infrastructure.

---

## 7. Fellowship Lifecycle Tracking

The system extends beyond initial scholarship approval.

For fellowship candidates, SAARTHI supports a multi-year lifecycle:

```text
Year 1
  ↓
Progress Report
  ↓
Supervisor Evaluation
  ↓
Installment
  ↓
Year 2
  ↓
Progress Report
  ↓
Installment
  ↓
Year 3
```

The objective is to connect scholarship/fellowship administration with post-selection monitoring.

---

## 8. Audit Trail

Important actions are recorded in an append-oriented audit history.

Examples include:

* Application state changes
* Document submissions
* Officer verification
* Deficiency requests
* Selection decisions
* Sanction generation
* Payment batch execution

This provides greater traceability for administrative actions.

---

# End-to-End Prototype Demo

The following walkthrough demonstrates the complete lifecycle using the seeded demo application.

### Demo Application

**Applicant:** Rahul Oraon
**Application ID:** `TS-2026-00421`

### Step 1 — Officer Identifies a Document Anomaly

Switch to **Scrutiny Officer**.

Open:

`Scrutiny Queue → TS-2026-00421`

The AI Assistance Panel displays an income mismatch:

```text
Declared Income : ₹1,80,000
Extracted Income: ₹2,60,000
```

The officer raises a deficiency.

---

### Step 2 — Applicant Resolves the Deficiency

Switch to **Applicant**.

The dashboard displays an **Action Required** notification.

The applicant uploads:

`Income_Cert_Ranchi_Verified.pdf`

The verification result is updated and the application moves to **Resubmitted**.

---

### Step 3 — Officer Verifies

Return to **Scrutiny Officer**.

The verification checks are now satisfied.

The officer selects:

**Verify Application**

Application status:

`Eligibility Verified`

---

### Step 4 — Selection Committee

Switch to **Selection Committee**.

The ranking table displays:

```text
Rahul Oraon
Rank: 3
Score: 89 / 100
```

The committee selects the candidate for the award.

---

### Step 5 — Finance Officer

Switch to **Finance Officer**.

Generate the sanction order:

```text
SAN/ST/2026/0421
```

The generated order can be viewed through the prototype interface.

---

### Step 6 — DBT Batch

Open:

`DBT Payment Batches`

Process:

```text
DBT-DEMO-2026-001
```

The demonstration batch contains:

```text
Successful Credits : 243
Handled Exceptions : 7
```

The batch then moves to:

`Disbursed`

---

### Step 7 — Fellowship Tracking

Switch back to **Applicant**.

Open:

`Fellowship`

The demonstration shows:

```text
Year 1 Milestone      → Completed
Installment 1         → ₹90,000
Payment Status        → Credited
Transaction           → UTR generated
```

---

### Step 8 — Audit & Analytics

Switch to **Super Admin**.

The administrator can inspect:

* Audit Trail
* Application activity
* Platform analytics
* Workflow progression
* Administrative actions

---

# Demo Credentials

All seeded demonstration accounts use:

```text
Password: Demo@123
```

| Role                | Demo User            | Email                | Responsibility                                           |
| ------------------- | -------------------- | -------------------- | -------------------------------------------------------- |
| Applicant           | Rahul Oraon          | `student@demo.com`   | Apply, upload documents, resolve deficiencies, track DBT |
| Officer             | Dr. Arvind Mahato    | `officer@demo.com`   | Scrutiny, verification and deficiency management         |
| Selection Committee | Prof. S. Soren       | `committee@demo.com` | Merit ranking and award selection                        |
| Finance Officer     | K. Murmu             | `finance@demo.com`   | Sanction orders and DBT batches                          |
| Super Admin         | System Administrator | `admin@demo.com`     | Schemes, rules, analytics and audit                      |

> These credentials are for the public demonstration environment only. Do not use real personal information or production credentials.

---

# Architecture

The SIH proposal describes the following target architecture:

```text
                         ┌──────────────────────┐
                         │      React Web       │
                         │  TypeScript + Vite   │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │   Spring Boot API    │
                         │ Security + JWT + JPA │
                         └──────────┬───────────┘
                                    │
              ┌─────────────────────┼─────────────────────┐
              │                     │                     │
              ▼                     ▼                     ▼
       ┌────────────┐        ┌────────────┐       ┌────────────┐
       │ PostgreSQL │        │   Redis    │       │  Object    │
       │   System   │        │Cache/Session│      │  Storage   │
       │ of Record  │        └────────────┘       └────────────┘
       └────────────┘
              │
              ▼
       ┌─────────────────┐
       │ AI Verification │
       │ FastAPI + OCR   │
       │ Tika / PDFBox   │
       └─────────────────┘
              │
              ▼
       ┌─────────────────┐
       │ Kafka / Events   │
       └─────────────────┘
```

The proposed SIH technical architecture uses React 18/TypeScript, Spring Boot/Java 21, FastAPI/Python, PostgreSQL, Redis, S3-compatible storage, Kafka, Docker, GitHub Actions and GCP services.

**Repository implementation note:** the architecture above represents the SIH solution architecture. Individual services should only be considered implemented when they are present and functional in this repository.

---

# Technology Stack

### Frontend

* React
* TypeScript
* Vite
* Tailwind CSS
* React Router
* Axios
* Recharts

### Backend

* Java
* Spring Boot
* Spring Security
* JWT
* Spring Data JPA / Hibernate
* Bean Validation
* REST APIs

### AI / Verification

* Python
* FastAPI
* OCR
* Tesseract
* Apache Tika / PDFBox
* NLP-based field extraction
* Consistency and anomaly checks

### Data

* PostgreSQL
* Redis
* Object storage

### Infrastructure

* Docker
* GitHub Actions
* Cloud deployment

The above stack is based on the technical approach documented in the SIH presentation.

---

# Key Design Principles

### Configurable over hardcoded

Scholarship rules should be changeable without rebuilding the entire platform.

### Human-in-the-loop AI

AI identifies potential problems; authorized officials make the final decision.

### Explainability

Applicants and administrators should be able to understand why an application requires correction or why an eligibility condition was triggered.

### Auditability

Important workflow transitions should remain traceable.

### Reusability

The platform should support multiple scholarship and fellowship schemes instead of being tied to a single scheme.

---

# Impact

SAARTHI is designed around four major areas of impact.

### Applicants

* Easier scholarship discovery
* Application tracking
* Clear deficiency notifications
* Faster communication
* Support for users with different levels of digital literacy

### Administration

* Reduced manual verification
* Reduced repetitive follow-ups
* Centralized workflow
* Scheme-level analytics
* Bottleneck identification

### Governance

* Explainable eligibility decisions
* Traceable administrative actions
* Audit trail
* Real-time workflow visibility

### Scalability

The proposed architecture is intended to support multiple scholarship and fellowship schemes without rebuilding the entire system for every new program.

The SIH presentation specifically frames SAARTHI as reusable digital infrastructure for multiple schemes rather than a one-time portal.

---

# Project Documentation

| Resource         | Link                                                           |
| ---------------- | -------------------------------------------------------------- |
| Live Prototype   | [Open SAARTHI](https://saarthi-sih.nisatsama7547.workers.dev/) |
| SIH Presentation | [`docs/SIH-Presentation.pdf`](./docs/SIH-Presentation.pdf)     |
| Demo Walkthrough | [`docs/demo-guide.md`](./docs/demo-guide.md)                   |
| Architecture     | [`docs/architecture.md`](./docs/architecture.md)               |

---

# Research & References

The SIH proposal used official government resources as architectural and data-model references, including:

* Ministry of Tribal Affairs scholarship schemes
* DBT Tribal scheme catalogue
* Ministry of Tribal Affairs Knowledge Hub

These references were used for scholarship/fellowship eligibility and scheme-related grounding.

---

# Project Status

**Status: Functional Prototype**

SAARTHI demonstrates the core scholarship/fellowship lifecycle through a role-based prototype environment.

The system is intended as a **prototype/reference architecture**, not a production government deployment.

---

# Future Scope

Potential production extensions include:

* Integration with official government identity and scholarship systems
* Production-grade document verification
* Real DBT/payment integrations
* Advanced fraud/anomaly detection
* Multilingual interfaces
* Accessibility improvements
* Mobile-first applicant experience
* Advanced SLA monitoring
* Scheme configuration through administrative workflows
* Production observability and security controls
* Large-scale event-driven processing

---

# Team

## Team SMRITII

**Smart India Hackathon 2026**

**Team ID:** `154583`

**Problem Statement:** `26239`

**Theme:** Smart Education

**Category:** Software

---

## Disclaimer

SAARTHI is an academic/hackathon prototype developed for demonstration and evaluation.

The live environment contains demonstration data and simulated workflows. It should not be treated as an official Ministry of Tribal Affairs platform or as a production system connected to government databases, Aadhaar, PFMS, DBT infrastructure or other government services.

---

## Built for Smart India Hackathon 2026

**SAARTHI — Making scholarship administration more configurable, transparent, explainable and auditable.**
