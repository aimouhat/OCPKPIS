USE [OCP_KPI_Dashboard_DB]
GO

PRINT 'Seeding initial record data for Phosphate Ore Storage and Reclaiming Area tags...';

CREATE TABLE #InitialValues (
    TagName VARCHAR(255) PRIMARY KEY,
    IsInteger BIT
);

INSERT INTO #InitialValues (TagName, IsInteger) VALUES
('110G_ST_01_ID_EmergStop_CollapsTripper', 1), ('110G_ST_01_ID_FireAlarm', 1), ('110G_ST_01_ID_MisalignmentAlarm', 1),
('110G_ST_01_ID_MisalignmentWarning', 1), ('110G_ST_01_ID_HardInterlock_MVpanel', 1), ('110G_ST_01_ID_BoomConv_LuffingPosition', 1),
('110G_ST_01_ID_SafetyRelaisOk', 1), ('110G_ST_01_ID_InBypassMode', 1), ('110G_ST_01_ID_InRemote', 1),
('110G_ST_01_ID_Ready', 1), ('110G_ST_01_ID_RunFeedback', 1), ('110G_ST_01_ID_State', 1),
('110G_ST_01_ID_TravelPosition', 1), ('RB1_OUT_Status', 1), ('RB2_OUT_Status', 1), ('RB2_prime_OUT_Status', 1),
('120G_RC_01_ID_MisalignmentAlarm_Left', 1), ('120G_RC_01_ID_MisalignmentAlarm_Right', 1), ('120G_RC_01_ID_FireAlarm', 1),
('120G_RC_01_ID_BucketWheel_HHBuring1_T', 0), ('120G_RC_01_ID_BucketWheel_HHBuring2_T', 0), ('120G_RC_01_ID_BucketWheel_UHH_T', 0),
('120G_RC_01_ID_BucketWheel_VHH_T', 0), ('120G_RC_01_ID_BucketWheel_WHH_T', 0), ('120G_RC_01_ID_DriveReady', 1),
('120G_RC_01_ID_InRemote', 1), ('120G_RC_01_ID_Ready', 1), ('120G_RC_01_ID_RunFeedback', 1),
('120G_RC_01_ID_TraverseGear_Ready', 1), ('120G_RC_01_ID_State', 1), ('120G_RC_01_OUT_AvailablityPercentage', 0),
('120G_RC_01_OD_DowntimePercentage', 0), ('120G_RC_01_OD_MaxFeedRate', 0), ('120G_RC_01_OUT_Out_Dry_W', 0),
('CB1_OUT_Status', 1), ('CB2_OUT_Status', 1), ('CB5_OUT_Status', 1), ('SB1_OUT_Status', 1),
('110G_ST_01_OUT_AvailablityPercentage', 0), ('110G_ST_01_OUT_DowntimePercentage', 0), ('Ore_Storage_Area_OUT_SpecificEnergyConsumption', 0),
('InloadStockyard_OD_InloadStockyardAvailableT', 0), ('InloadStockyard_OD_InloadStockyardAvailablePct', 0), ('OutStockyard_OD_OutloadStockyardAvailableT', 0),
('OutStockyard_OD_OutloadStockyardAvailablePct', 0);

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

PRINT 'Initial records for Phosphate Ore Storage and Reclaiming Area have been seeded.';
GO
