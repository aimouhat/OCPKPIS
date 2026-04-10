USE [OCP_KPI_Dashboard_DB]
GO

PRINT 'Seeding initial record data for Coarse Reject Area tags...';

-- Temp table to hold tags and their types (0 for Double, 1 for Integer)
CREATE TABLE #InitialValues (
    TagName VARCHAR(255) PRIMARY KEY,
    IsInteger BIT
);

-- Populate temp table with all tags from the spec
INSERT INTO #InitialValues (TagName, IsInteger) VALUES
    ('Coarse_Reject_Handling_Area_ID_M_Sterile_160', 10),
    ('Coarse_Reject_Handling_Area_ID_M_Sterile_200', 30),
    ('Coarse_Reject_Handling_Area_ID_M_Sterile_3150', 10),
    ('Coarse_Reject_Handling_Area_ID_M_Sterile_40', 5),
    ('Coarse_Reject_Handling_Area_ID_M_Sterile_less40', 45),
    ('Coarse_Reject_Handling_Area_ID_M_Sterile_Conce_BPL', 33),
    ('Coarse_Reject_Handling_Area_ID_M_Sterile_Conce_Cd', 22),
    ('Coarse_Reject_Handling_Area_ID_M_Sterile_Conce_H2O', 45),
    ('CT1_ID_Status', 1),
    ('CT1_prime_ID_Status', 1),
    ('CT2_ID_Status', 1),
    ('CT2_prime_ID_Status', 1),
    ('T1_ID_Status', 1),
    ('T1_prime_ID_Status', 1),
    ('CT2_OUT_Out_Dry_W', 0),
    ('CT2_prime_OUT_Out_Dry_W', 0);

-- Insert a record for each tag, generating a random value based on its type
-- This only runs if a tag has no records, to prevent duplicate initial values.
INSERT INTO dbo.Record (PHDTagId, value, timestamp)
SELECT
    p.id,
    CASE 
        WHEN iv.IsInteger = 1 THEN FLOOR(RAND() * 2) -- Random 0 or 1 for integers
        ELSE RAND() * 10 -- Random 0.0 to 10.0 for doubles
    END as value,
    SYSDATETIMEOFFSET()
FROM dbo.PHDTag p
JOIN #InitialValues iv ON p.tagname = iv.TagName
WHERE NOT EXISTS (SELECT 1 FROM dbo.Record r WHERE r.PHDTagId = p.id);

-- Clean up the temporary table
DROP TABLE #InitialValues;

PRINT 'Initial data seeding for Coarse Reject Area complete.';
GO
