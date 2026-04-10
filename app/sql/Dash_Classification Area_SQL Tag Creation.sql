USE [OCP_KPI_Dashboard_DB]
GO

PRINT 'Adding new PHD Tags for Classification Area...';

-- Use a MERGE statement to insert new tags only if they do not already exist.
MERGE INTO dbo.PHDTag AS Target
USING (VALUES
    ('220A_CY_01_ID_In_P'),
    ('220A_CY_01_ID_In_SolidConcentration'),
    ('220A_CY_01_ID_OutLight_SolidConcentration'),
    ('220A_CY_01_ID_OutHeavy_SolidConcentration'),
    ('Classification_Area_ID_Out_M_HS_Heavy50'),
    ('Classification_Area_ID_Out_M_HS_Light_160_200'),
    ('230A_CY_01_ID_In_P'),
    ('230A_CY_01_OUT_Out_W'),
    ('230A_CY_01_ID_In_SolidConcentration'),
    ('230A_CY_01_ID_OutLight_SolidConcentration'),
    ('230A_CY_01_ID_OutHeavy_SolidConcentration'),
    ('230A_CY_01_ID_OutHeavy_GoodProduct'),
    ('230A_CY_02_ID_In_P'),
    ('230A_CY_02_OUT_Out_W'),
    ('230A_CY_02_ID_In_SolidConcentration'),
    ('230A_CY_02_ID_OutLight_GoodProduct'),
    ('230A_CY_02_ID_OutHeavy_WasteProduct'),
    ('Classification_Area_OUT_ClassificationMassYield'),
    ('220A_PB_01_ID_LVLA'),
    ('220A_PB_02_ID_LVLA'),
    ('230A_PB_01_ID_LVLA'),
    ('230A_PB_02_ID_LVLA'),
    ('220A_PB_02_OUT_Agitator_Status'),
    ('230A_PB_04_ID_LVLA'),
    ('Classification_Area_OUT_SpecificEnergyConsumption'),
    ('220A_TK_01_ID_LVLA'),
    ('220A_PB_02_OUT_PumpD_Status'),
    ('220A_PB_02_OUT_PumpS_Status'),
    ('220A_TK_01_OUT_PumpD_Status'),
    ('220A_TK_01_OUT_PumpS_Status'),
    ('220A_TK_01_OUT_Pump3_Status'),
    ('230A_PB_01_OUT_PumpD_Status'),
    ('230A_PB_01_OUT_PumpS_Status'),
    ('230A_PB_02_OUT_PumpD_Status'),
    ('230A_PB_02_OUT_PumpS_Status'),
    ('230A_PB_04_OUT_PumpD_Status'),
    ('230A_PB_04_OUT_PumpS_Status'),
    ('220A_PB_01_OUT_PumpD_Status'),
    ('220A_PB_01_OUT_PumpS_Status')


) AS Source (tagname)
ON Target.tagname = Source.tagname
WHEN NOT MATCHED BY TARGET THEN
    INSERT (tagname) VALUES (Source.tagname);

PRINT 'PHD Tag creation for Classification Area complete.';
GO
