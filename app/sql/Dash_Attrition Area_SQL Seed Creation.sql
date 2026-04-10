USE [OCP_KPI_Dashboard_DB]
GO

PRINT 'Seeding initial record data for Attrition Area tags...';

CREATE TABLE #InitialValues (
    TagName VARCHAR(255) PRIMARY KEY,
    IsInteger BIT
);

INSERT INTO #InitialValues (TagName, IsInteger) VALUES
('310A_AC_OUT_Out_Dry_W', 0), ('310A_AC_ID_In_SolidConcentration', 0), ('310A_AC_ID_Out_SlimesGeneration', 0),
('310A_AC_ID_In_Size', 0), ('310A_AC_OUT_Residence_Time', 0), ('310A_AC_OUT_SpecificEnergyConsumption', 0),
('310A_CY_01_ID_In_P', 0), ('310A_CY_01_OUT_Out_Dry_W', 0), ('310A_CY_01_ID_In_SolidConcentration', 0),
('310A_CY_01_ID_OutHeavy_SolidConcentration', 0), ('310A_CY_01_ID_OutLight_Size2', 0), ('310A_CY_02_ID_In_P', 0),
('310A_CY_02_OUT_Out_Dry_W', 0), ('310A_CY_02_ID_In_SolidConcentration', 0), ('310A_CY_02_ID_OutLight_Size2', 0),
('310A_CY_03_ID_In_P', 0), ('310A_CY_03_OUT_Out_Dry_W', 0), ('310A_CY_03_ID_In_SolidConcentration', 0),
('310A_CY_03_ID_OutLight_Size2', 0), ('310A_PB_02_OUT_PumpD_Status', 1), ('310A_PB_02_OUT_PumpS_Status', 1),
('310A_PB_03_OUT_PumpD_Status', 1), ('310A_PB_03_OUT_PumpS_Status', 1), ('310A_PB_04_OUT_PumpD_Status', 1),
('310A_PB_04_OUT_PumpS_Status', 1), ('310A_TK_01_OUT_PumpD_Status', 1), ('310A_TK_01_OUT_PumpS_Status', 1),
('310A_AC_01_04_OUT_Agitator_Status1', 1), ('310A_AC_01_04_OUT_Agitator_Status2', 1), ('310A_AC_01_04_OUT_Agitator_Status3', 1),
('310A_AC_01_04_OUT_Agitator_Status4', 1), ('310A_AC_05_08_OUT_Agitator_Status5', 1), ('310A_AC_05_08_OUT_Agitator_Status6', 1),
('310A_AC_05_08_OUT_Agitator_Status7', 1), ('310A_AC_05_08_OUT_Agitator_Status8', 1), ('310A_AC_09_12_OUT_Agitator_Status9', 1),
('310A_AC_09_12_OUT_Agitator_Status10', 1), ('310A_AC_09_12_OUT_Agitator_Status11', 1), ('310A_AC_09_12_OUT_Agitator_Status12', 1),
('310A_TK_01_ID_LVLA', 0), ('310A_PB_02_ID_LVLA', 0), ('310A_PB_03_ID_LVLA', 0),
('310A_PB_04_ID_LVLA', 0), ('310A_VP_01_ID_LVLA', 0), ('Attrition_Area_OUT_SpecificEnergyConsumption', 0),
('310A_VP_01_OUT_PumpD_Status', 1), ('310A_VP_01_OUT_PumpS_Status', 1);

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

PRINT 'Initial records for Attrition Area have been seeded.';
GO
