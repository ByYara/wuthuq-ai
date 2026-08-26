/*
# Create Wuthuq AI credit scoring tables

1. New Tables
- `users`: Stores applicant identity. Email is optional for anonymous demo submissions.
  - id (uuid, primary key)
  - email (text, nullable, unique)
  - created_at (timestamptz)
- `financial_records`: Stores the raw financial data submitted in the demo dashboard form.
  - id (uuid, primary key)
  - user_id (uuid, foreign key to users)
  - monthly_income (numeric, not null)
  - existing_debts (numeric, not null)
  - debt_to_income_ratio (numeric, not null)
  - loan_amount (numeric, nullable)
  - age (integer, nullable)
  - employment_status (text, nullable)
  - created_at (timestamptz)
- `credit_assessments`: Stores the KNN model output for each financial record.
  - id (uuid, primary key)
  - financial_record_id (uuid, foreign key to financial_records)
  - credit_score (integer, not null, range 300-850)
  - risk_level (text, not null, values: low/medium/high)
  - explanation (text, nullable)
  - created_at (timestamptz)
- `compliance_audit_logs`: Stores compliance metadata for each assessment.
  - id (uuid, primary key)
  - assessment_id (uuid, foreign key to credit_assessments)
  - pdpl_compliant (boolean, default true)
  - bias_detected (boolean, default false)
  - created_at (timestamptz)

2. Security
- RLS enabled on all four tables.
- This is a no-auth demo app, so policies allow anon + authenticated CRUD access
  on all tables (data is intentionally public/shared for the demo).

3. Important Notes
- No auth/sign-in screen in this app; anon key is used for all operations.
- Foreign keys use ON DELETE CASCADE to maintain referential integrity.
- debt_to_income_ratio is stored as a decimal (e.g., 0.35 for 35%).
*/

CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_users" ON users;
CREATE POLICY "anon_select_users" ON users FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_users" ON users;
CREATE POLICY "anon_insert_users" ON users FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_users" ON users;
CREATE POLICY "anon_update_users" ON users FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_users" ON users;
CREATE POLICY "anon_delete_users" ON users FOR DELETE
  TO anon, authenticated USING (true);

CREATE TABLE IF NOT EXISTS financial_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  monthly_income numeric NOT NULL,
  existing_debts numeric NOT NULL,
  debt_to_income_ratio numeric NOT NULL,
  loan_amount numeric,
  age integer,
  employment_status text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE financial_records ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_financial_records" ON financial_records;
CREATE POLICY "anon_select_financial_records" ON financial_records FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_financial_records" ON financial_records;
CREATE POLICY "anon_insert_financial_records" ON financial_records FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_financial_records" ON financial_records;
CREATE POLICY "anon_update_financial_records" ON financial_records FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_financial_records" ON financial_records;
CREATE POLICY "anon_delete_financial_records" ON financial_records FOR DELETE
  TO anon, authenticated USING (true);

CREATE TABLE IF NOT EXISTS credit_assessments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  financial_record_id uuid REFERENCES financial_records(id) ON DELETE CASCADE,
  credit_score integer NOT NULL,
  risk_level text NOT NULL,
  explanation text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE credit_assessments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_credit_assessments" ON credit_assessments;
CREATE POLICY "anon_select_credit_assessments" ON credit_assessments FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_credit_assessments" ON credit_assessments;
CREATE POLICY "anon_insert_credit_assessments" ON credit_assessments FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_credit_assessments" ON credit_assessments;
CREATE POLICY "anon_update_credit_assessments" ON credit_assessments FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_credit_assessments" ON credit_assessments;
CREATE POLICY "anon_delete_credit_assessments" ON credit_assessments FOR DELETE
  TO anon, authenticated USING (true);

CREATE TABLE IF NOT EXISTS compliance_audit_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  assessment_id uuid REFERENCES credit_assessments(id) ON DELETE CASCADE,
  pdpl_compliant boolean NOT NULL DEFAULT true,
  bias_detected boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE compliance_audit_logs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_compliance_audit_logs" ON compliance_audit_logs;
CREATE POLICY "anon_select_compliance_audit_logs" ON compliance_audit_logs FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_compliance_audit_logs" ON compliance_audit_logs;
CREATE POLICY "anon_insert_compliance_audit_logs" ON compliance_audit_logs FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_compliance_audit_logs" ON compliance_audit_logs;
CREATE POLICY "anon_update_compliance_audit_logs" ON compliance_audit_logs FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_compliance_audit_logs" ON compliance_audit_logs;
CREATE POLICY "anon_delete_compliance_audit_logs" ON compliance_audit_logs FOR DELETE
  TO anon, authenticated USING (true);
