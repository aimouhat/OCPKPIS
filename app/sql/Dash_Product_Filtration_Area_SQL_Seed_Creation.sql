USE [OCP_KPI_Dashboard_DB]
GO

PRINT 'Seeding initial record data for Product Filtration Area tags...';

-- Temp table to hold tags and their types (0 for Double, 1 for Integer)
CREATE TABLE #InitialValues (
    TagName VARCHAR(255) PRIMARY KEY,
    IsInteger BIT
);

-- Populate temp table with all tags from the spec
INSERT INTO #InitialValues (TagName, IsInteger) VALUES
    ('240_VP_01_02_ID_Sumpf_LVL1', 0),
    ('240_VP_01_02_ID_Sumpf_LVL2', 0),
    ('240_VP_01_02_OUT_Sumpf_Pump1_Status', 1),
    ('240_VP_01_02_OUT_Sumpf_Pump2_Status', 1),
    ('240_VP_01_02_ID_Sumpf_LVL3', 0),
    ('CS1_ID_Status', 1),
    ('CS1_ID_Moist', 0),
    ('CS1_ID_Turb', 0),
    ('CS2_ID_Status', 1),
    ('CS2_ID_Moist', 0),
    ('CS2_ID_Turb', 0),
    ('CS3_ID_Status', 1),
    ('CS3_ID_Moist', 0),
    ('CS3_ID_Turb', 0),
    ('CS4_ID_Status', 1),
    ('CS4_ID_Moist', 0),
    ('CS4_ID_Turb', 0),
    ('SL3_OUT_Out_Dry_W', 0),
    ('Product_Filtration_Area_ID_Out_M_FinalProduct_Conce_BPL', 0),
    ('Product_Filtration_Area_ID_Out_M_FinalProduct_Conce_CaO', 0),
    ('Product_Filtration_Area_ID_Out_M_FinalProduct_Conce_Cd', 0),
    ('Product_Filtration_Area_ID_Out_M_FinalProduct_Conce_CO2', 0),
    ('Product_Filtration_Area_ID_Out_M_FinalProduct_Conce_H2O', 0),
    ('Product_Filtration_Area_ID_Out_M_FinalProduct_Conce_MgO', 0),
    ('Product_Filtration_Area_ID_Out_M_FinalProduct_Conce_SiO2', 0),
    ('Product_Filtration_Area_ID_Out_M_FinalProduct_160', 0),
    ('Product_Filtration_Area_ID_Out_M_FinalProduct_200', 0),
    ('Product_Filtration_Area_ID_Out_M_FinalProduct_3150', 0),
    ('Product_Filtration_Area_ID_Out_M_FinalProduct_40', 0),
    ('Product_Filtration_Area_ID_Out_M_FinalProduct_less40', 0);

-- Insert a record for each tag, generating a random value based on its type
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

PRINT 'Initial data seeding for Product Filtration Area complete.';
GO
