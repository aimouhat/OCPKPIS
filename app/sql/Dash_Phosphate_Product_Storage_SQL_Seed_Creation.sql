USE [OCP_KPI_Dashboard_DB]
GO

PRINT 'Seeding initial record data for Phosphate Product Storage and Reclaiming Area tags...';

CREATE TABLE #InitialValues (
    TagName VARCHAR(255) PRIMARY KEY,
    IsInteger BIT
);

-- Infer type from tag name, assuming tags with 'Status', 'State', 'Ready', 'Ok', 'Remote' are integers.
INSERT INTO #InitialValues (TagName, IsInteger) VALUES
('SL1_OUT_Status', 1), ('SL2_OUT_Status', 1), ('SL3_OUT_Status', 1), ('SL4_OUT_Status', 1),
('RL1_OUT_Status', 1), ('EL1_OUT_Status', 1), ('EL2_OUT_Status', 1), ('RL4_OUT_Status', 1),
('RL5_OUT_Status', 1), ('RL6_OUT_Status', 1), ('150G_HP_01_ID_LVLA', 0), ('150G_HP_01_ID_LVLB', 0),
('140G_RC_01_OUT_Status', 1), ('140G_RC_01_OUT_Out_W', 0), ('140G_RC_01_ID_AirDigTimePercentage', 0),
('140G_RC_01_OD_AvailablityPercentage', 0), ('140G_RC_01_OD_DowntimePercentage', 0),
('140G_RC_01_OD_MaxFeedRate', 0), ('140G_RC_01_ID_MisalignmentAlarm_Left', 1),
('140G_RC_01_ID_MisalignmentAlarm_Right', 1), ('140G_RC_01_ID_FireAlarm', 1),
('140G_RC_01_ID_BucketWheel_HHBuring1_T', 0), ('140G_RC_01_ID_BucketWheel_HHBuring2_T', 0),
('140G_RC_01_ID_BucketWheel_UHH_T', 0), ('140G_RC_01_ID_BucketWheel_VHH_T', 0),
('140G_RC_01_ID_BucketWheel_WHH_T', 0), ('140G_RC_01_ID_RakePos1', 0), ('140G_RC_01_ID_RakePos2', 0),
('140G_RC_01_ID_RakeChain1Angle', 0), ('140G_RC_01_ID_RakeChain2Angle', 0), ('140G_RC_01_ID_RakeChain3Angle', 0),
('140G_RC_01_ID_DriveReady', 1), ('140G_RC_01_ID_InRemote', 1), ('140G_RC_01_ID_Ready', 1),
('140G_RC_01_ID_RunFeedback', 1), ('140G_RC_01_ID_TraverseGear_Ready', 1),
('Product_Storage_Area_OUT_SpecificEnergyConsumption', 0), ('130G_ST_01_OUT_AvailablityPercentage', 0),
('130G_ST_01_OUT_DowntimePercentage', 0), ('130G_ST_01_ID_EmergStop_CollapsTripper', 1),
('130G_ST_01_ID_FireAlarm', 1), ('130G_ST_01_ID_MisalignmentAlarm', 1), ('130G_ST_01_ID_MisalignmentWarning', 1),
('130G_ST_01_ID_HardInterlock_MVpanel', 1), ('130G_ST_01_ID_BoomConv_LuffingPosition', 1),
('130G_ST_01_ID_SafetyRelaisOk', 1), ('130G_ST_01_ID_InBypassMode', 1), ('130G_ST_01_ID_InRemote', 1),
('130G_ST_01_ID_Ready', 1), ('130G_ST_01_ID_RunFeedback', 1), ('130G_ST_01_ID_State', 1),
('130G_ST_01_ID_TravelPosition', 1);


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

PRINT 'Initial records for Phosphate Product Storage and Reclaiming Area have been seeded.';
GO
