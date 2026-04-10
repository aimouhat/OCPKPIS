USE [OCP_KPI_Dashboard_DB]
GO

PRINT 'Seeding initial record data for Classification Area tags...';

CREATE TABLE #InitialValues (
    TagName VARCHAR(255) PRIMARY KEY,
    InitialValue DECIMAL(18, 5),
    IsInteger BIT
);

INSERT INTO #InitialValues (TagName, InitialValue, IsInteger) VALUES
('220A_CY_01_ID_In_P', 5.0 + RAND() * 5, 0),
('220A_CY_01_ID_In_SolidConcentration', 5.0 + RAND() * 5, 0),
('220A_CY_01_ID_OutLight_SolidConcentration', 5.0 + RAND() * 5, 0),
('220A_CY_01_ID_OutHeavy_SolidConcentration', 5.0 + RAND() * 5, 0),
('Classification_Area_ID_Out_M_HS_Heavy50', 5.0 + RAND() * 5, 0),
('Classification_Area_ID_Out_M_HS_Heavy50', 5.0 + RAND() * 5, 0),
('230A_CY_01_ID_In_P', 5.0 + RAND() * 5, 0),
('230A_CY_01_OUT_Out_W', 5.0 + RAND() * 5, 0),
('230A_CY_01_ID_In_SolidConcentration', 5.0 + RAND() * 5, 0),
('230A_CY_01_ID_OutLight_SolidConcentration', 5.0 + RAND() * 5, 0),
('230A_CY_01_ID_OutHeavy_SolidConcentration', 5.0 + RAND() * 5, 0),
('230A_CY_01_ID_OutHeavy_GoodProduct', 5.0 + RAND() * 5, 0),
('230A_CY_02_ID_In_P', 5.0 + RAND() * 5, 0),
('230A_CY_02_OUT_Out_W', 5.0 + RAND() * 5, 0),
('230A_CY_02_ID_In_SolidConcentration', 5.0 + RAND() * 5, 0),
('230A_CY_02_ID_OutLight_GoodProduct', 5.0 + RAND() * 5, 0),
('230A_CY_02_ID_OutHeavy_WasteProduct', 5.0 + RAND() * 5, 0),
('Classification_Area_OUT_ClassificationMassYield', 5.0 + RAND() * 5, 0),
('220A_PB_01_ID_LVLA', 5.0 + RAND() * 5, 0),
('220A_PB_02_ID_LVLA', 5.0 + RAND() * 5, 0),
('230A_PB_01_ID_LVLA', 5.0 + RAND() * 5, 0),
('230A_PB_02_ID_LVLA', 5.0 + RAND() * 5, 0),
('220A_PB_02_OUT_Agitator_Status', FLOOR(RAND() * 2), 1),
('230A_PB_04_ID_LVLA', 5.0 + RAND() * 5, 0),
('Classification_Area_OUT_SpecificEnergyConsumption', 5.0 + RAND() * 5, 0),
('220A_TK_01_ID_LVLA', 5.0 + RAND() * 5, 0),
('220A_PB_02_OUT_PumpD_Status', FLOOR(RAND() * 2), 1),
('220A_PB_02_OUT_PumpS_Status', FLOOR(RAND() * 2), 1),
('220A_TK_01_OUT_PumpD_Status', FLOOR(RAND() * 2), 1),
('220A_TK_01_OUT_PumpS_Status', FLOOR(RAND() * 2), 1),
('220A_TK_01_OUT_Pump3_Status', FLOOR(RAND() * 2), 1),
('230A_PB_01_OUT_PumpD_Status', FLOOR(RAND() * 2), 1),
('230A_PB_01_OUT_PumpS_Status', FLOOR(RAND() * 2), 1),
('230A_PB_02_OUT_PumpD_Status', FLOOR(RAND() * 2), 1),
('230A_PB_02_OUT_PumpS_Status', FLOOR(RAND() * 2), 1),
('230A_PB_04_OUT_PumpD_Status', FLOOR(RAND() * 2), 1),
('230A_PB_04_OUT_PumpS_Status', FLOOR(RAND() * 2), 1),
('220A_PB_01_OUT_PumpD_Status', FLOOR(RAND() * 2), 1),
('220A_PB_01_OUT_PumpS_Status', FLOOR(RAND() * 2), 1);

INSERT INTO [dbo].[Record] (PHDTagId, value, timestamp)
SELECT
    p.id AS PHDTagId,
    iv.InitialValue,
    SYSDATETIMEOFFSET()
FROM #InitialValues iv
JOIN [dbo].[PHDTag] p ON iv.TagName = p.tagname
WHERE NOT EXISTS (SELECT 1 FROM [dbo].[Record] r WHERE r.PHDTagId = p.id);

DROP TABLE #InitialValues;
GO

PRINT 'Initial records for Classification Area have been seeded.';
GO
