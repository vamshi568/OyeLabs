SELECT customerId,
    name,
    (
        SELECT GROUP_CONCAT(subjects.subjectName, ',')
        FROM subjects
            JOIN subject_student_mapping ON subjects.subjectId = subject_student_mapping.subjectId
        WHERE subject_student_mapping.customerId = customers.customerId
        ORDER BY subjects.subjectName
    ) AS subjects
FROM customers;
-- query to finding the subjects for each student, the subjects are in order by alphabetically.