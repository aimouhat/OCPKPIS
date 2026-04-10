USE [OCP_KPI_Dashboard_DB]
GO

PRINT 'Seeding initial record data for Scrubbing and Screening Area tags...';

CREATE TABLE #InitialValues (
    TagName VARCHAR(255) PRIMARY KEY,
    IsInteger BIT
);

INSERT INTO #InitialValues (TagName, IsInteger) VALUES
('210A_VP_01_ID_Sumpf_LVL1', 0), ('210A_VP_01_OUT_Sumpf_Pump1_Status', 1), ('210A_HP_01_ID_LVLA', 0),
('210A_HP_01_ID_LVLB', 0), ('210A_SB_01_ID_Driver1_Bearing1_T', 0), ('210A_SB_01_ID_Out_SolidConcentration', 0),
('210A_SB_01_ID_Out_HopperPercentage', 0), ('210A_SB_01_OUT_Out_Dry_W', 0), ('210A_SB_01_ID_LO_P', 0),
('210A_SB_01_ID_Driver1_Windings1_T', 0), ('210A_SB_01_OUT_RunningHours', 0), ('210A_SB_01_OUT_SpecificEnergyConsumption', 0),
('210A_SB_01_ID_Out_WashEff', 0), ('210A_SC_01_ID_Out1_Size', 0), ('210A_SC_01_OUT_Out1_W', 0),
('220A_PB_01_ID_Sumpf_LVL1', 0), ('220A_PB_01_OUT_Sumpf_Pump1_Status', 1), ('220A_PB_01_ID_Sumpf_LVL2', 0),
('230A_PB_01_OUT_Sumpf_Pump1_Status', 1), ('210A_SB_01_OUT_Driver1_Status', 1), ('210A_SB_01_OUT_Driver2_Status', 1),
('210A_SC_01_OUT_Driver1_Status', 1);

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

PRINT 'Initial records for Scrubbing and Screening Area have been seeded.';
GO
