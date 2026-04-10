USE [OCP_KPI_Dashboard_DB]
GO

PRINT 'Adding new PHD Tags for Scrubbing and Screening Area...';

-- Use a MERGE statement to insert new tags only if they do not already exist.
MERGE INTO dbo.PHDTag AS Target
USING (VALUES
    ('210A_VP_01_ID_Sumpf_LVL1'),
    ('210A_VP_01_OUT_Sumpf_Pump1_Status'),
    ('210A_HP_01_ID_LVLA'),
    ('210A_HP_01_ID_LVLB'),
    ('210A_SB_01_ID_Driver1_Bearing1_T'),
    ('210A_SB_01_ID_Out_SolidConcentration'),
    ('210A_SB_01_ID_Out_HopperPercentage'),
    ('210A_SB_01_OUT_Out_Dry_W'),
    ('210A_SB_01_ID_LO_P'),
    ('210A_SB_01_ID_Driver1_Windings1_T'),
    ('210A_SB_01_OUT_RunningHours'),
    ('210A_SB_01_OUT_SpecificEnergyConsumption'),
    ('210A_SB_01_ID_Out_WashEff'),
    ('210A_SC_01_ID_Out1_Size'),
    ('210A_SC_01_OUT_Out1_W'),
    ('220A_PB_01_ID_Sumpf_LVL1'),
    ('220A_PB_01_OUT_Sumpf_Pump1_Status'),
    ('220A_PB_01_ID_Sumpf_LVL2'),
    ('230A_PB_01_OUT_Sumpf_Pump1_Status'),

    ('210A_SB_01_OUT_Driver1_Status'),
    ('210A_SB_01_OUT_Driver2_Status'),
    ('210A_SB_01_OUT_Driver3_Status'),
    ('210A_SB_01_OUT_Driver4_Status'),
    ('210A_SB_01_OUT_Driver5_Status') 
    
) AS Source (tagname)
ON Target.tagname = Source.tagname
WHEN NOT MATCHED BY TARGET THEN
    INSERT (tagname) VALUES (Source.tagname);

PRINT 'PHD Tag creation for Scrubbing and Screening Area complete.';
GO
