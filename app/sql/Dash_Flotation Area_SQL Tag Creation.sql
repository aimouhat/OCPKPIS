USE [OCP_KPI_Dashboard_DB]
GO

PRINT 'Adding new PHD Tags for Flotation Area...';

-- Use a MERGE statement to insert new tags only if they do not already exist.
MERGE INTO dbo.PHDTag AS Target
USING (VALUES
    ('320A_PB_01_ID_LVLA'),
    ('320A_CY_01_ID_In_P'),
    ('320A_CY_01_ID_In_SolidConcentration'),
    ('320A_CY_01_ID_OutHeavy_SolidConcentration'),
    ('320A_CY_01_OUT_Out_W'),
    ('320A_CY_01_ID_OutLight_SolidConcentration'),
    ('320A_FC_01_05_OUT_Agitator_Status1'),
    ('320A_FC_01_05_OUT_Agitator_Status2'),
    ('320A_FC_01_05_OUT_Agitator_Status3'),
    ('320A_FC_01_05_OUT_Agitator_Status4'),
    ('320A_FC_01_05_OUT_Agitator_Status5'),
    ('320A_FC_01_05_ID_In_SolidConcentration'),
    ('320A_FC_01_05_OUT_Residence_Time'),
    ('320A_FC_01_05_OUT_Out_Q'),
    ('320A_FC_01_05_ID_AirConsumption'),
    ('320A_FC_01_05_ID_P'),
    ('320A_FC_01_05_OUT_BPL_Recovery'),
    ('320A_FC_01_05_ID_Grade'),
    ('320A_PB_01_OUT_PumpD_Status'),
    ('320A_PB_01_OUT_PumpS_Status'),
    ('320A_PB_02_OUT_PumpD_Status'),
    ('320A_PB_02_OUT_PumpS_Status'),
    ('320A_PB_02_ID_LVLA'),
    ('320A_TK_01_05_OUT_Residence_Time'),
    ('320A_TK_01_05_OUT_PowerConsumption'),
    ('320A_TK_01_05_ID_In_PhoAcid_Flow'),
    ('320A_TK_01_05_ID_In_PhoEaster_Flow'),
    ('320A_TK_01_05_ID_In_Amine_Flow'),
    ('320A_FC_01_05_ID_LVL1'),
    ('320A_FC_01_05_ID_LVL3'),
    ('320A_FC_01_05_ID_LVL5'), 
    ('320A_TK_01_05_OUT_Agitator_Status1'),
    ('320A_TK_01_05_OUT_Agitator_Status2'),
    ('320A_TK_01_05_OUT_Agitator_Status3'),
    ('320A_TK_01_05_OUT_Agitator_Status4'),
    ('320A_TK_01_05_OUT_Agitator_Status5')



) AS Source (tagname)
ON Target.tagname = Source.tagname
WHEN NOT MATCHED BY TARGET THEN
    INSERT (tagname) VALUES (Source.tagname);

PRINT 'PHD Tag creation for Flotation Area complete.';
GO
