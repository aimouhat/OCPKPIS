USE [OCP_KPI_Dashboard_DB]
GO

PRINT 'Seeding initial record data for Flotation Reagent Preparation tags...';

CREATE TABLE #InitialValues (
    TagName VARCHAR(255) PRIMARY KEY,
    IsInteger BIT
);

INSERT INTO #InitialValues (TagName, IsInteger) VALUES
    ('330G_TK_01_ID_LVLA', 0), ('330G_TK_01_ID_LVLB', 0), ('330G_TK_01_OUT_Agitator_Status', 1),
    ('330G_TK_01_OUT_PumpD_Status', 1), ('330G_TK_01_OUT_PumpS_Status', 1), ('330G_TK_01_OUT_Pump1_Status', 1),
    ('330G_TK_02_ID_LVLA', 0), ('330G_TK_02_OUT_PumpD_Status', 1), ('330G_TK_02_OUT_PumpS_Status', 1),
    ('330G_TK_02_OUT_Agitator_Status', 1), ('330G_TK_02_OUT_Pump1_Status', 1), ('330G_TK_03_ID_LVLA', 0),
    ('330G_TK_03_OUT_Agitator_Status', 1), ('330G_TK_03_OUT_PumpD_Status', 1), ('330G_TK_03_OUT_PumpS_Status', 1),
    ('330G_TK_03_OUT_Pump1_Status', 1), ('330G_TK_04_ID_LVLA', 0), ('330G_TK_04_OUT_PumpD_Status', 1),
    ('330G_TK_04_OUT_PumpS_Status', 1), ('330G_TK_04_OUT_Agitator_Status', 1), ('330G_TK_04_OUT_Pump1_Status', 1),
    ('330G_TK_05_ID_LVLA', 0), ('330G_TK_05_OUT_Agitator_Status', 1), ('330G_TK_05_OUT_PumpD_Status', 1),
    ('330G_TK_05_OUT_PumpS_Status', 1), ('330G_TK_06_OUT_PumpD_Status', 1), ('330G_TK_06_OUT_PumpS_Status', 1),
    ('330G_TK_06_OUT_Agitator_Status', 1), ('330G_TK_07_ID_LVLA', 0), ('330G_TK_07_OUT_PumpD_Status', 1),
    ('330G_TK_07_OUT_PumpS_Status', 1), ('330G_TK_07_OUT_Pump1_Status', 1), ('330G_TK_08_ID_LVLA', 0),
    ('330G_TK_08_OUT_PumpD_Status', 1), ('330G_TK_08_OUT_PumpS_Status', 1), ('330G_TK_08_OUT_Pump1_Status', 1),
    ('330G_TK_09_ID_LVLA', 0), ('330G_TK_09_OUT_PumpD_Status', 1), ('330G_TK_09_OUT_PumpS_Status', 1),
    ('330G_TK_09_OUT_Pump1_Status', 1), ('340G_TK_10_ID_LVLA', 0), ('340G_TK_10_OUT_PumpD_Status', 1),
    ('340G_TK_10_OUT_PumpS_Status', 1), ('340G_TK_10_OUT_Pump2_Status', 1), ('420A_TK_01_ID_LVLA', 0),
    ('420A_TK_01_ID_LVLB', 0), ('420A_TK_01_OUT_Agitator_Status', 1), ('420A_TK_01_OUT_PumpD_Status', 1),
    ('420A_TK_01_OUT_PumpS_Status', 1), ('420A_TK_02_ID_LVLA', 0), ('420A_TK_02_ID_LVLB', 0),
    ('420A_TK_02_OUT_Agitator_Status', 1), ('420A_TK_02_OUT_PumpD_Status', 1), ('420A_TK_02_OUT_PumpS_Status', 1);

INSERT INTO dbo.Record (PHDTagId, value, timestamp)
SELECT
    p.id,
    CASE 
        WHEN iv.IsInteger = 1 THEN FLOOR(RAND() * 2)
        ELSE RAND() * 10
    END as value,
    SYSDATETIMEOFFSET()
FROM dbo.PHDTag p
JOIN #InitialValues iv ON p.tagname = iv.TagName
WHERE NOT EXISTS (SELECT 1 FROM dbo.Record r WHERE r.PHDTagId = p.id);

DROP TABLE #InitialValues;

PRINT 'Initial data seeding for Flotation Reagent Preparation complete.';
GO
