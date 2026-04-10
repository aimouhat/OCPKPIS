USE [OCP_KPI_Dashboard_DB]
GO

PRINT 'Adding new PHD Tags for Global Plant KPI...';

-- Use a MERGE statement to insert new tags only if they do not already exist.
MERGE INTO dbo.PHDTag AS Target
USING (VALUES
    ('PlantA_OUT_FinalPrOUT_Phosphate'),
    ('PlantA_ID_Out_FinalProduct_Conce_BPL'),
    ('PlantA_ID_Out_FinalProduct_Conce_CaO'),
    ('PlantA_ID_Out_FinalProduct_Conce_Cd'),
    ('PlantA_ID_Out_FinalProduct_Conce_CO2'),
    ('PlantA_ID_Out_FinalProduct_Conce_H2O'),
    ('PlantA_ID_Out_FinalProduct_Conce_MgO'),
    ('PlantA_ID_Out_FinalProduct_Conce_SiO2'),
    ('PlantA_OUT_In_TotalPrOUT_W'),
    ('PlantA_OUT_Out_TotalPrOUT_W'),
    ('PlantA_OUT_Export_W'),
    ('PlantA_ID_Target_Export_W'),
    ('PlantA_OUT_Import_W'),
    ('PlantA_ID_Target_Import_W'),
    ('PlantA_OUT_SpecificAmineConsumption'),
    ('PlantA_OUT_SpecificFlocullantConsumption'),
    ('PlantA_OUT_SpecificPhoAcidConsumption'),
    ('PlantA_OUT_SpecificPhoEsterConsumption'),
    ('PlantA_OUT_SpecificEnergyConsumption'),
    ('PlantA_OUT_SpecificWaterConsumption'),
    ('PlantA_OUT_In_W'),
    ('PlantA_ID_Target_In_W'),
    ('PlantA_OUT_Out_W'),
    ('PlantA_ID_Target_Out_W'),
    ('PlantA_ID_FeedRawOre_Conce_BPL'),
    ('PlantA_ID_FeedRawOre_Conce_CaO'),
    ('PlantA_ID_FeedRawOre_Conce_Cd'),
    ('PlantA_ID_FeedRawOre_Conce_CO2'),
    ('PlantA_ID_FeedRawOre_Conce_H2O'),
    ('PlantA_ID_FeedRawOre_Conce_MgO'),
    ('PlantA_ID_FeedRawOre_Conce_SiO2'),

    ('PlantA_ID_Target_Import_W'),
    ('PlantA_OUT_Import_W'),
    ('PlantA_ID_Target_Export_W'),
    ('PlantA_OUT_Export_W')
) AS Source (tagname)
ON Target.tagname = Source.tagname
WHEN NOT MATCHED BY TARGET THEN
    INSERT (tagname)
    VALUES (Source.tagname);

PRINT 'PHD Tag creation for Global Plant KPI complete.';
GO
