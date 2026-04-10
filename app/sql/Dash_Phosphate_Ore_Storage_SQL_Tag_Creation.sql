USE [OCP_KPI_Dashboard_DB]
GO

PRINT 'Adding new PHD Tags for Phosphate Ore Storage and Reclaiming Area...';

-- Use a MERGE statement to insert new tags only if they do not already exist.
MERGE INTO dbo.PHDTag AS Target
USING (VALUES
    ('110G_ST_01_ID_EmergStop_CollapsTripper'), ('110G_ST_01_ID_FireAlarm'), ('110G_ST_01_ID_MisalignmentAlarm'),
    ('110G_ST_01_ID_MisalignmentWarning'), ('110G_ST_01_ID_HardInterlock_MVpanel'), ('110G_ST_01_ID_BoomConv_LuffingPosition'),
    ('110G_ST_01_ID_SafetyRelaisOk'), ('110G_ST_01_ID_InBypassMode'), ('110G_ST_01_ID_InRemote'),
    ('110G_ST_01_ID_Ready'), ('110G_ST_01_ID_RunFeedback'), ('110G_ST_01_ID_State'),
    ('110G_ST_01_ID_TravelPosition'), ('RB1_OUT_Status'), ('RB2_OUT_Status'), ('RB2_prime_OUT_Status'),
    ('120G_RC_01_ID_MisalignmentAlarm_Left'), ('120G_RC_01_ID_MisalignmentAlarm_Right'), ('120G_RC_01_ID_FireAlarm'),
    ('120G_RC_01_ID_BucketWheel_HHBuring1_T'), ('120G_RC_01_ID_BucketWheel_HHBuring2_T'), ('120G_RC_01_ID_BucketWheel_UHH_T'),
    ('120G_RC_01_ID_BucketWheel_VHH_T'), ('120G_RC_01_ID_BucketWheel_WHH_T'), ('120G_RC_01_ID_DriveReady'),
    ('120G_RC_01_ID_InRemote'), ('120G_RC_01_ID_Ready'), ('120G_RC_01_ID_RunFeedback'),
    ('120G_RC_01_ID_TraverseGear_Ready'), ('120G_RC_01_ID_State'), ('120G_RC_01_OUT_AvailablityPercentage'),
    ('120G_RC_01_OD_DowntimePercentage'), ('120G_RC_01_OD_MaxFeedRate'), ('120G_RC_01_OUT_Out_Dry_W'),
    ('CB1_OUT_Status'), ('CB2_OUT_Status'), ('CB5_OUT_Status'), ('SB1_OUT_Status'),
    ('110G_ST_01_OUT_AvailablityPercentage'), ('110G_ST_01_OUT_DowntimePercentage'), ('Ore_Storage_Area_OUT_SpecificEnergyConsumption'),
    ('InloadStockyard_OD_InloadStockyardAvailableT'), ('InloadStockyard_OD_InloadStockyardAvailablePct'), ('OutStockyard_OD_OutloadStockyardAvailableT'),
    ('OutStockyard_OD_OutloadStockyardAvailablePct'),

    ('120G_RC_01_OUT_SY_CurrentCapacity'),
    ('120G_RC_01_OUT_SY_CurrentCapacityPercentage'),

('120G_RC_01_ID_SafetyRelaisOk'),
('120G_RC_01_ID_MisalignmentWarning_Right'),
('120G_RC_01_ID_MisalignmentWarning_Left'),
('120G_RC_01_ID_TravelPosition'),
('120G_RC_01_ID_RakePos1'),
('120G_RC_01_ID_RakePos2'),
('120G_RC_01_ID_RakeChain1Angle'),
('120G_RC_01_ID_RakeChain2Angle'),
('120G_RC_01_ID_RakeChain3Angle'),
('120G_RC_01_ID_RakeChain4Angle'),
('120G_RC_01_ID_BucketWheel_UHH_T'),
('120G_RC_01_ID_BucketWheel_VHH_T'),
('120G_RC_01_ID_BucketWheel_WHH_T'),
('120G_RC_01_ID_BucketWheel_HHBuring1_T'),
('120G_RC_01_ID_BucketWheel_HHBuring2_T'), 




) AS Source (tagname)
ON Target.tagname = Source.tagname
WHEN NOT MATCHED BY TARGET THEN
    INSERT (tagname) VALUES (Source.tagname);

PRINT 'PHD Tag creation for Phosphate Ore Storage and Reclaiming Area complete.';
GO
