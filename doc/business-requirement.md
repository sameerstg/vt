# VeriTask Platform - Business Requirements Document

**Project:** VeriTask Platform Phase 01  
**Document Version:** 1.0  
**Date:** January 27, 2026  
**Status:** Approved  

---

## 1. Executive Summary

VeriTask is a project marketplace platform for physical and virtual tasks, featuring escrow-based payments, scheduling, and accountability. Phase 01 delivers the core marketplace functionality for validation before advanced features.

**Key Value Proposition:** On-demand access to verified workers for both physical and virtual tasks with secure payment handling.

---

## 2. Objectives

- Enable users to post projects and apply for work
- Facilitate secure payments through escrow
- Support offer-based project assignment
- Enforce project scheduling and completion workflows
- Establish trust through identity verification and platform governance

---

## 3. User Roles & Actors

### 3.1 Client (Project Poster)

| Role | Responsibilities |
|------|------------------|
| Create and manage projects | Post new projects with details, edit before acceptance |
| Review applications | View worker profiles, compare offers |
| Fund escrow | Deposit payment before work begins |
| Approve payments | Release funds upon milestone/project completion |
| Manage disputes | Raise disputes, communicate with admin |

### 3.2 Worker (Individual Performer)

| Role | Responsibilities |
|------|------------------|
| Create profile | Build service profile with skills and availability |
| Apply for projects | Accept posted price or submit custom offers |
| Complete projects | Execute assigned work per agreement |
| Receive payment | Get paid through platform escrow release |

### 3.3 Contractor (Team Lead)

| Role | Responsibilities |
|------|------------------|
| Manage complex projects | Apply for multi-person or larger scope work |
| Build teams | Create and manage subcontractor roster |
| Assign work | Distribute projects to registered team members |
| Handle payroll | Distribute payments to subcontractors |
| Ensure delivery | Hold accountability for overall project completion |

### 3.4 Platform Admin

| Role | Responsibilities |
|------|------------------|
| Verify users | Review and approve identity documents |
| Resolve disputes | Manually review and adjudicate conflicts |
| Manage users | Suspend or ban accounts as needed |
| Financial oversight | Override controls, manage platform fees |

---

## 4. Functional Requirements

### 4.1 Authentication & User Verification

| ID | Requirement | Priority |
|----|-------------|----------|
| AUTH-01 | User registration via email address or phone number | Must Have |
| AUTH-02 | OTP-based verification (email or SMS) | Must Have |
| AUTH-03 | Secure login and session management | Must Have |
| AUTH-04 | Profile creation: full name, phone, location, photo, government ID | Must Have |
| AUTH-05 | Role selection during onboarding (Client, Worker, Contractor) | Must Have |

### 4.2 Project Creation & Management

| ID | Requirement | Priority |
|----|-------------|----------|
| PROJ-01 | Create project with title and detailed description | Must Have |
| PROJ-02 | Specify project type: Physical or Virtual | Must Have |
| PROJ-03 | For Physical projects: GPS location capture and display | Must Have |
| PROJ-04 | For Virtual projects: No location requirement | Must Have |
| PROJ-05 | Budget model selection: Fixed-price or Milestone-based | Must Have |
| PROJ-06 | Set urgency level and preferred date/time window | Must Have |
| PROJ-07 | Project bundling: Parent project with subprojects, each with own scope/amount | Should Have |
| PROJ-08 | Edit project prior to acceptance | Must Have |
| PROJ-09 | Project visibility priority: nearby radius > city > state | Must Have |

### 4.3 Project Application, Offers & Assignment

| ID | Requirement | Priority |
|----|-------------|----------|
| OFFER-01 | Workers can accept posted project price | Must Have |
| OFFER-02 | Workers can submit custom offer with pricing and terms | Must Have |
| OFFER-03 | Clients can view all applications and offers | Must Have |
| OFFER-04 | Clients can review worker profiles | Must Have |
| OFFER-05 | Clients can select and assign one candidate | Must Have |

**Project Lifecycle States:**
1. Posted
2. Applications Received
3. Offer Accepted
4. In Progress
5. Completed
6. Disputed

### 4.4 Scheduling & Project Execution

| ID | Requirement | Priority |
|----|-------------|----------|
| SCHED-01 | Scheduling rules based on project type | Must Have |
| SCHED-02 | Worker confirmation required before project start | Must Have |
| SCHED-03 | Time-window based scheduling support | Must Have |
| SCHED-04 | In-app notifications for assignment, confirmation, project completion | Must Have |
| SCHED-05 | Email notifications for key events | Must Have |

### 4.5 Payments, Escrow & Milestones

| ID | Requirement | Priority |
|----|-------------|----------|
| PAY-01 | All payments processed exclusively through platform | Must Have |
| PAY-02 | Escrow funding required before work begins | Must Have |
| PAY-03 | Fixed-price escrow model | Must Have |
| PAY-04 | Milestone-based escrow model | Must Have |
| PAY-05 | Define milestones during offer acceptance | Must Have |
| PAY-06 | Each milestone requires client approval for release | Must Have |
| PAY-07 | Manual client approval for payment release | Must Have |
| PAY-08 | Auto-release after predefined approval window | Should Have |

### 4.6 Contractor Teams & Payroll

| ID | Requirement | Priority |
|----|-------------|----------|
| TEAM-01 | Contractors can create and manage teams | Must Have |
| TEAM-02 | Assign registered subcontractors to projects | Must Have |
| TEAM-03 | Contractor receives escrow funds | Must Have |
| TEAM-04 | Contractor distributes payments to team members | Must Have |
| TEAM-05 | Log all internal distributions for recordkeeping | Must Have |
| TEAM-06 | Contractor retains full accountability for delivery | Must Have |

### 4.7 Financial Management & Admin Controls

| ID | Requirement | Priority |
|----|-------------|----------|
| ADMIN-01 | User management dashboard | Must Have |
| ADMIN-02 | Project monitoring tools | Must Have |
| ADMIN-03 | Dispute resolution tools | Must Have |
| ADMIN-04 | Manual suspension and ban controls | Must Have |
| ADMIN-05 | Transaction history view | Must Have |
| ADMIN-06 | Escrow balance tracking | Must Have |
| ADMIN-07 | Payout records | Must Have |
| ADMIN-08 | Platform fee tracking | Must Have |

### 4.8 Disputes & Enforcement

| ID | Requirement | Priority |
|----|-------------|----------|
| DISP-01 | Client-initiated dispute submission | Must Have |
| DISP-02 | Manual review by Admin | Must Have |
| DISP-03 | Resolution: Approval of project completion | Must Have |
| DISP-04 | Resolution: Refund of labor amount | Must Have |
| DISP-05 | Resolution: User suspension or removal | Must Have |

---

## 5. Non-Functional Requirements

### 5.1 Early Adopter Strategy (Phase 01)

- No tier subscription fees for first 1,000 registered workers
- All workers have equal project access within location/eligibility
- Early adopter count and free period configurable by Admin

### 5.2 Phase 02 Deferred Features

The following are explicitly **NOT** in Phase 01 scope:

- Paid tier-based subscription system
- Priority project visibility (tier-based)
- Faster payout windows (tier-based)
- Premium positioning
- Advanced automation
- AI-driven optimization

---

## 6. User Flows

### 6.1 Client Project Posting Flow

```
[Register/Login] → [Create Project] → [Set Details] → [Fund Escrow] → [Post Project]
                                                                          ↓
[Review Offers] ← [Receive Applications] ← [Project Posted] → [Workers Notified]
        ↓
[Select Worker] → [Assign Project] → [Schedule] → [Monitor Progress]
        ↓
[Review Completion] → [Approve/Dispute] → [Release Payment]
```

### 6.2 Worker Application Flow

```
[Register/Login] → [Create Profile] → [Verify Identity] → [Browse Projects]
                                                                     ↓
[Filter by Location] → [View Project Details] → [Apply/Offer] → [Wait for Response]
                                                                            ↓
[Receive Assignment] → [Confirm Schedule] → [Complete Project] → [Submit for Review]
                                                                            ↓
[Payment Released] ← [Client Approves]
```

### 6.3 Dispute Resolution Flow

```
[Client Raises Dispute] → [Admin Notified] → [Review Evidence]
                                                          ↓
[Resolution Decision] → [Complete Project] | [Refund Client] | [Suspend User]
```

---

## 7. Acceptance Criteria

Phase 01 will be considered complete when:

| # | Criteria |
|---|----------|
| 1 | A client can post a project and fund escrow |
| 2 | A worker can apply, be assigned, and complete the project |
| 3 | Payments are successfully released through escrow |
| 4 | Admin can intervene in disputes and manage users |

---

## 8. Deliverables

- Web-based platform with Client, Worker, and Contractor workflows
- Escrow-enabled project lifecycle
- Offer-based task assignment system
- Basic admin control panel
- Deployment to agreed environment (staging or production)

---

## 9. Out of Scope (Phase 01)

Any feature not explicitly documented requires:

- Inclusion in Phase 02 planning, or
- A formally approved Change Request (CR)

---

**Document Owner:** App Vertices  
**Stakeholder Approval:** Bernie Dorse (Client)  
**Project Manager:** Mike Bowen  
