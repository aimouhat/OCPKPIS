USE [OCP_KPI_Dashboard_DB]
GO

PRINT 'Seeding initial record data for Tailing Thickener Area tags...';

CREATE TABLE #InitialValues (
    TagName VARCHAR(255) PRIMARY KEY,
    IsInteger BIT
);

INSERT INTO #InitialValues (TagName, IsInteger) VALUES
('400A_TH_01_ID_DB_LVL', 0), ('400A_TH_01_OD_Mud_LVL', 0), ('400A_TH_01_OUT_Frequency', 0),
('410A_DB_01_OUT_Sumpf_Pump1_Status', 0), ('410A_DB_01_OUT_Sumpf_Pump2_Status', 0), ('410A_DB_01_OUT_Sumpf2_Pump1_Status', 0),

('400A_TH_01_ID_OutHeavy_SolidConcentration', 0), ('400A_TH_01_ID_OutLight_Clarity', 0), ('400A_TH_01_OUT_FlocculantConsumption', 0),
('400A_TH_01_ID_GB1_Torque', 0), ('400A_TH_01_ID_GB2_Torque', 0), ('400A_TH_01_ID_GB3_Torque', 0),
('400A_TH_01_OUT_PumpD_Status', 1), ('410G_TK_02_OUT_Sumpf_Pump1_Status', 1), ('410G_TK_02_OUT_Sumpf_Pump2_Status', 1),
('400A_TH_01_OUT_Sumpf_Pump1_Status', 1), ('400A_TH_01_OUT_GB1_Status', 1), ('400A_TH_01_OUT_GB2_Status', 1),
('400A_TH_01_OUT_GB3_Status', 1), ('400A_TH_01_OUT_Status', 1), ('410G_TK_02_ID_LVLA', 0),
('410G_TK_02_ID_LVLB', 0), ('410A_DB_01_ID_Sumpf_LVL1', 0), ('410G_TK_02_ID_Sumpf_LVL1', 0),
('420A_TK_01_ID_LVLA', 0), ('420A_TK_01_ID_LVLB', 0), ('420A_TK_02_ID_LVLA', 0),
('420A_TK_02_ID_LVLB', 0), ('420A_TK_01_OUT_FlocculantConsumption', 0), ('400A_TH_01_OUT_PumpS_Status', 1),
('410G_TK_02_OUT_Pump1_Status', 1), ('410G_TK_02_OUT_Pump2_Status', 1), ('410G_TK_02_OUT_Pump3_Status', 1),
('410G_TK_02_OUT_Pump4_Status', 1), ('410G_TK_02_OUT_Pump5_Status', 1), ('410G_TK_02_OUT_Pump6_Status', 1),
('410GU15010_OUT_Agitator_Status', 1), ('420A_TK_01_OUT_Agitator_Status', 1), ('420A_TK_01_OUT_PumpD_Status', 1),
('420A_TK_01_OUT_PumpS_Status', 1), ('420A_TK_02_OUT_PumpD_Status', 1), ('420A_TK_02_OUT_PumpS_Status', 1),
('Tailing_Thickener_Area_OUT_SpecificEnergyConsumption', 0);

INSERT INTO [dbo].[Record] (PHDTagId, value, timestamp)
SELECT
    p.id AS PHDTagId,
    CASE WHEN iv.IsInteger = 1 THEN FLOOR(RAND() * 2) ELSE 5.0 + RAND() * 5 END AS InitialValue,
    SYSDATETIMEOFFSET()
FROM #InitialValues iv
JOIN [dbo].[PHDTag] p ON iv.TagName = p.tagname
WHERE NOT EXISTS (SELECT 1 FROM [dbo].[Record] r WHERE r.PHDTagId = p.id);

DROP TABLE #InitialValues;
GO

PRINT 'Initial records for Tailing Thickener Area have been seeded.';
GO
