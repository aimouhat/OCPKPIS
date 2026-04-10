USE [OCP_KPI_Dashboard_DB]
GO

PRINT 'Adding new PHD Tags for Phosphate Product Storage and Reclaiming Area...';

-- Use a MERGE statement to insert new tags only if they do not already exist.
MERGE INTO dbo.PHDTag AS Target
USING (VALUES
    ('SL1_OUT_Status'), ('SL2_OUT_Status'), ('SL3_OUT_Status'), ('SL4_OUT_Status'),
    ('RL1_OUT_Status'), ('EL1_OUT_Status'), ('EL2_OUT_Status'), ('RL4_OUT_Status'),
    ('RL5_OUT_Status'), ('RL6_OUT_Status'), ('150G_HP_01_ID_LVLA'), ('150G_HP_01_ID_LVLB'),
    ('140G_RC_01_OUT_Status'), ('140G_RC_01_OUT_Out_W'), ('140G_RC_01_ID_AirDigTimePercentage'),
    ('140G_RC_01_OD_AvailablityPercentage'), ('140G_RC_01_OD_DowntimePercentage'),
    ('140G_RC_01_OD_MaxFeedRate'), ('140G_RC_01_ID_MisalignmentAlarm_Left'),
    ('140G_RC_01_ID_MisalignmentAlarm_Right'), ('140G_RC_01_ID_FireAlarm'),
    ('140G_RC_01_ID_BucketWheel_HHBuring1_T'), ('140G_RC_01_ID_BucketWheel_HHBuring2_T'),
    ('140G_RC_01_ID_BucketWheel_UHH_T'), ('140G_RC_01_ID_BucketWheel_VHH_T'),
    ('140G_RC_01_ID_BucketWheel_WHH_T'), ('140G_RC_01_ID_RakePos1'), ('140G_RC_01_ID_RakePos2'),
    ('140G_RC_01_ID_RakeChain1Angle'), ('140G_RC_01_ID_RakeChain2Angle'), ('140G_RC_01_ID_RakeChain3Angle'),
    ('140G_RC_01_ID_DriveReady'), ('140G_RC_01_ID_InRemote'), ('140G_RC_01_ID_Ready'),
    ('140G_RC_01_ID_RunFeedback'), ('140G_RC_01_ID_TraverseGear_Ready'),
    ('Product_Storage_Area_OUT_SpecificEnergyConsumption'), ('130G_ST_01_OUT_AvailablityPercentage'),
    ('130G_ST_01_OUT_DowntimePercentage'), ('130G_ST_01_ID_EmergStop_CollapsTripper'),
    ('130G_ST_01_ID_FireAlarm'), ('130G_ST_01_ID_MisalignmentAlarm'), ('130G_ST_01_ID_MisalignmentWarning'),
    ('130G_ST_01_ID_HardInterlock_MVpanel'), ('130G_ST_01_ID_BoomConv_LuffingPosition'),
    ('130G_ST_01_ID_SafetyRelaisOk'), ('130G_ST_01_ID_InBypassMode'), ('130G_ST_01_ID_InRemote'),
    ('130G_ST_01_ID_Ready'), ('130G_ST_01_ID_RunFeedback'), ('130G_ST_01_ID_State'),
    ('130G_ST_01_ID_TravelPosition'), ('140G_RC_01_OUT_SpecificEnergyConsumption'),  ('130G_ST_01_OUT_SpecificEnergyConsumption'), 
 ('140G_RC_01_ID_SafetyRelaisOk'),   ('140G_RC_01_ID_MisalignmentWarning_Right'),   ('140G_RC_01_ID_MisalignmentWarning_Left'),  
 ('140G_RC_01_ID_TravelPosition'),   ('140G_RC_01_ID_RakeChain4Angle'),   ('140G_RC_01_ID_State'),  
 ('140G_RC_01_OUT_SY_CurrentCapacity'),   ('140G_RC_01_OUT_SY_CurrentCapacityPercentage'),   

) AS Source (tagname)
ON Target.tagname = Source.tagname
WHEN NOT MATCHED BY TARGET THEN
    INSERT (tagname) VALUES (Source.tagname);

PRINT 'PHD Tag creation for Phosphate Product Storage and Reclaiming Area complete.';
GO
