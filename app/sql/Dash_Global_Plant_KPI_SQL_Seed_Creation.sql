USE [OCP_KPI_Dashboard_DB]
GO

PRINT 'Seeding initial record data for Global Plant KPI tags...';

CREATE TABLE #InitialValues (
    TagName VARCHAR(255) PRIMARY KEY
);

-- All tags for this dashboard are decimal values
INSERT INTO #InitialValues (TagName) VALUES
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
    ('PlantA_ID_FeedRawOre_Conce_SiO2');

INSERT INTO dbo.Record (PHDTagId, value, timestamp)
SELECT
    p.id,
    RAND() * 50 + 10 AS value, -- Random value between 10 and 60
    SYSDATETIMEOFFSET()
FROM dbo.PHDTag p
JOIN #InitialValues iv ON p.tagname = iv.TagName
WHERE NOT EXISTS (SELECT 1 FROM dbo.Record r WHERE r.PHDTagId = p.id);

DROP TABLE #InitialValues;

PRINT 'Initial data seeding for Global Plant KPI complete.';
GO
