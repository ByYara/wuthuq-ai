# Wuthuq AI (AI وثوق)

AI-powered credit risk assessment platform for individuals and SMEs in Saudi Arabia.

## Overview

Wuthuq AI helps banks and fintech providers assess creditworthiness within seconds. It replaces manual, document-heavy credit review with a machine learning model built around the ITU-T Y.3172 pipeline (Source, Pre-Processing, Model, Policy, Distribution), aligned with PDPL, SDAIA's AI Ethics Principles, and SAMA's regulatory requirements. Wuthuq AI was developed as a working prototype demonstrating how explainable, compliant AI can support credit risk assessment in Saudi Arabia.

## Key Features

- Real-time credit scoring (300–850) using a K-Nearest Neighbors (KNN) model
- Explainable results: every score comes with the nearest comparable cases
- Automatic bias auditing, with high-risk cases routed to human review
- Full compliance audit logging (PDPL, SDAIA, SAMA)
- Bilingual interface (Arabic and English)

## Tech Stack

- Frontend: React, Tailwind CSS
- Database: Supabase (PostgreSQL, Row-Level Security)
- Machine Learning: K-Nearest Neighbors (KNN)

## Database Tables

- `users`: applicant identity and consent
- `financial_records`: income and existing debt
- `credit_assessments`: score, risk tier, model version
- `compliance_audit_logs`: compliance and bias flags per assessment

## Regulatory Alignment

Mapped to the Personal Data Protection Law (PDPL), SDAIA's AI Ethics Principles, and SAMA's Open Banking and Responsible Lending frameworks. Full mapping is available in the accompanying Technical Report.
