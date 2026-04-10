USE [OCP_KPI_Dashboard_DB]
GO

PRINT 'Adding new PHD Tags for Tailing Thickener & Flocculent Preparation Area...';

-- Use a MERGE statement to insert new tags only if they do not already exist.
MERGE INTO dbo.PHDTag AS Target
USING (VALUES
    ('400A_TH_01_ID_DB_LVL'),
    ('400A_TH_01_OD_Mud_LVL'),
    ('400A_TH_01_OUT_Frequency'),
    ('400A_TH_01_ID_OutHeavy_SolidConcentration'),
    ('400A_TH_01_ID_OutLight_Clarity'),
    ('400A_TH_01_OUT_FlocculantConsumption'),
    ('400A_TH_01_ID_GB1_Torque'),
    ('400A_TH_01_ID_GB2_Torque'),
    ('400A_TH_01_ID_GB3_Torque'),

    ('400A_TH_01_OUT_PumpD_Status'),
    ('410G_TK_02_OUT_Sumpf_Pump1_Status'),
    ('410G_TK_02_OUT_Sumpf_Pump2_Status'),
    ('400A_TH_01_OUT_Sumpf_Pump1_Status'),

    ('400A_TH_01_OUT_GB1_Status'),
    ('400A_TH_01_OUT_GB2_Status'),
    ('400A_TH_01_OUT_GB3_Status'),
    ('400A_TH_01_OUT_Status'),
    ('410G_TK_02_ID_LVLA'),
    ('410G_TK_02_ID_LVLB'),
    
    ('410A_DB_01_ID_Sumpf_LVL1'),
    ('410G_TK_02_ID_Sumpf_LVL1'),
    ('400A_TH_01_ID_Sumpf_LVL1'),
    ('410A_DB_01_ID_Sumpf_LVL2'),

    ('420A_TK_01_ID_LVLA'),
    ('420A_TK_01_ID_LVLB'),
    ('420A_TK_02_ID_LVLA'),
    ('420A_TK_02_ID_LVLB'),
    ('420A_TK_01_OUT_FlocculantConsumption'),
    ('400A_TH_01_OUT_PumpS_Status'),
    ('410G_TK_02_OUT_Pump1_Status'),
    ('410G_TK_02_OUT_Pump2_Status'),
    ('410G_TK_02_OUT_Pump3_Status'),
    ('410G_TK_02_OUT_Pump4_Status'),
    ('410G_TK_02_OUT_Pump5_Status'),
    ('410G_TK_02_OUT_Pump6_Status'),
    ('410GU15010_OUT_Agitator_Status'),
    ('420A_TK_01_OUT_Agitator_Status'),
    ('420A_TK_01_OUT_PumpD_Status'),
    ('420A_TK_01_OUT_PumpS_Status'),
    ('420A_TK_02_OUT_PumpD_Status'),
    
    ('410A_DB_01_OUT_Sumpf_Pump1_Status'),
    ('410A_DB_01_OUT_Sumpf_Pump2_Status'),
    ('410A_DB_01_OUT_Sumpf2_Pump1_Status'),

    ('420A_SC_01_OUT_Status'),

    
    ('420A_TK_02_OUT_PumpS_Status'),
    ('Tailing_Thickener_Area_OUT_SpecificEnergyConsumption') 


) AS Source (tagname)
ON Target.tagname = Source.tagname
WHEN NOT MATCHED BY TARGET THEN
    INSERT (tagname) VALUES (Source.tagname);

PRINT 'PHD Tag creation for Tailing Thickener Area complete.';
GO
