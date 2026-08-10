
# Patient Management Platform

A modern, open-source patient management platform designed to help clinics and healthcare organizations manage patients, doctors, appointments, medical records, prescriptions, billing, reporting, and other clinical workflows.

The project is being built as a scalable full-stack healthcare management system using modern Java, Spring Boot, React, TypeScript, cloud-native technologies, and microservices architecture.

##  Project Status

This project is actively under development.

The current focus is building the core frontend experience and backend microservices incrementally, with a strong emphasis on clean architecture, scalability, maintainability, security, and developer experience.

##  Goals

The primary goals of this project are to:

- Build a production-oriented healthcare management platform
- Provide a clean and intuitive user interface for clinic staff
- Manage patients and their medical information
- Manage doctors and healthcare providers
- Schedule and manage appointments
- Maintain medical records
- Manage prescriptions
- Support billing and payments
- Provide reporting and analytics
- Implement secure authentication and authorization
- Build a scalable microservices architecture
- Support event-driven communication using Apache Kafka
- Provide cloud-ready deployment capabilities
- Maintain an open-source codebase that developers can contribute to

## 🏗️ Architecture

The backend follows a microservices architecture.

```text
                         ┌─────────────────────┐
                         │      Frontend       │
                         │ React + TypeScript  │
                         │   Vite + Tailwind   │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │     API Gateway     │
                         └──────────┬──────────┘
                                    │
             ┌──────────────────────┼──────────────────────┐
             │                      │                      │
             ▼                      ▼                      ▼
      ┌─────────────┐       ┌─────────────┐       ┌─────────────┐
      │   Patient   │       │   Doctor    │       │ Appointment │
      │   Service   │       │   Service   │       │   Service   │
      └─────────────┘       └─────────────┘       └─────────────┘
             │                      │                      │
             └──────────────────────┼──────────────────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │   Common Services   │
                         │ Security / Audit /  │
                         │ Cache / Validation  │
                         └─────────────────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │   Event Streaming   │
                         │       Kafka         │
                         └─────────────────────┘
