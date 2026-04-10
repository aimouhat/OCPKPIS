USE [OCP_KPI_Dashboard_DB]
GO

PRINT 'Seeding initial record data for Flotation Area tags...';

CREATE TABLE #InitialValues (
    TagName VARCHAR(255) PRIMARY KEY,
    IsInteger BIT
);

INSERT INTO #InitialValues (TagName, IsInteger) VALUES
('320A_PB_01_ID_LVLA', 0), ('320A_CY_01_ID_In_P', 0), ('320A_CY_01_ID_In_SolidConcentration', 0),
('320A_CY_01_ID_OutHeavy_SolidConcentration', 0), ('320A_CY_01_OUT_Out_W', 0), ('320A_CY_01_ID_OutLight_SolidConcentration', 0),
('320A_FC_01_05_OUT_Agitator_Status1', 1), ('320A_FC_01_05_OUT_Agitator_Status2', 1), ('320A_FC_01_05_OUT_Agitator_Status3', 1),
('320A_FC_01_05_OUT_Agitator_Status4', 1), ('320A_FC_01_05_OUT_Agitator_Status5', 1), ('320A_FC_01_05_ID_In_SolidConcentration', 0),
('320A_FC_01_05_OUT_Residence_Time', 0), ('320A_FC_01_05_OUT_Out_Q', 0), ('320A_FC_01_05_ID_AirConsumption', 0),
('320A_FC_01_05_ID_P', 0), ('320A_FC_01_05_OUT_BPL_Recovery', 0), ('320A_FC_01_05_ID_Grade', 0),
('320A_PB_01_OUT_PumpD_Status', 1), ('320A_PB_01_OUT_PumpS_Status', 1), ('320A_PB_02_OUT_PumpD_Status', 1),
('320A_PB_02_OUT_PumpS_Status', 1), ('320A_PB_02_ID_LVLA', 0), ('320A_TK_01_05_OUT_Residence_Time', 0),
('320A_TK_01_05_OUT_PowerConsumption', 0), ('320A_TK_01_05_ID_In_PhoAcid_Flow', 0), ('320A_TK_01_05_ID_In_PhoEaster_Flow', 0),
('320A_TK_01_05_ID_In_Amine_Flow', 0), ('320A_FC_01_05_ID_LVL1', 0), ('320A_FC_01_05_ID_LVL3', 0),
('320A_FC_01_05_ID_LVL5', 0),    ('320A_TK_01_05_OUT_Agitator_Status1', 0),    ('320A_TK_01_05_OUT_Agitator_Status2', 0),    ('320A_TK_01_05_OUT_Agitator_Status3', 0),    ('320A_TK_01_05_OUT_Agitator_Status4', 0),    ('320A_TK_01_05_OUT_Agitator_Status5', 0);


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

PRINT 'Initial records for Flotation Area have been seeded.';
GO
