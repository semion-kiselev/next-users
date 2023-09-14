CREATE TABLE IF NOT EXISTS permission (
    permission_id                     char(2) PRIMARY KEY,
    permission_name                   text NOT NULL
);

CREATE TABLE IF NOT EXISTS employee (
    employee_id                       uuid PRIMARY KEY,
    employee_name                     text NOT NULL,
    employee_email                    text NOT NULL,
    employee_created_at               timestamptz NOT NULL DEFAULT now(),
    employee_updated_at               timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS employee_permission (
    employee_id                       uuid NOT NULL REFERENCES employee ON UPDATE CASCADE ON DELETE CASCADE,
    permission_id                     char(2) NOT NULL REFERENCES permission ON UPDATE CASCADE ON DELETE CASCADE,
    PRIMARY KEY (employee_id, permission_id)
);
