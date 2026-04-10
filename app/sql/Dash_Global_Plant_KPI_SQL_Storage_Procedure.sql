USE [OCP_KPI_Dashboard_DB]
GO

CREATE OR ALTER PROCEDURE dbo.UpdateGlobalPlantKpiData
AS
BEGIN
    SET NOCOUNT ON;

    CREATE TABLE #TagSimulationConfig (
        TagName VARCHAR(255) PRIMARY KEY,
        BaseValue DECIMAL(18, 5)
    );

    -- Populate the temp table with base values for calculation
    INSERT INTO #TagSimulationConfig (TagName, BaseValue) VALUES
        ('PlantA_OUT_FinalPrOUT_Phosphate', 30),
        ('PlantA_ID_Out_FinalProduct_Conce_BPL', 65),
        ('PlantA_ID_Out_FinalProduct_Conce_CaO', 45),
        ('PlantA_ID_Out_FinalProduct_Conce_Cd', 10),
        ('PlantA_ID_Out_FinalProduct_Conce_CO2', 5),
        ('PlantA_ID_Out_FinalProduct_Conce_H2O', 2),
        ('PlantA_ID_Out_FinalProduct_Conce_MgO', 1),
        ('PlantA_ID_Out_FinalProduct_Conce_SiO2', 3),
        ('PlantA_OUT_In_TotalPrOUT_W', 1500),
        ('PlantA_OUT_Out_TotalPrOUT_W', 1450),
        ('PlantA_OUT_Export_W', 1200),
        ('PlantA_ID_Target_Export_W', 1250),
        ('PlantA_OUT_Import_W', 300),
        ('PlantA_ID_Target_Import_W', 300),
        ('PlantA_OUT_SpecificAmineConsumption', 0.5),
        ('PlantA_OUT_SpecificFlocullantConsumption', 0.2),
        ('PlantA_OUT_SpecificPhoAcidConsumption', 1.5),
        ('PlantA_OUT_SpecificPhoEsterConsumption', 0.8),
        ('PlantA_OUT_SpecificEnergyConsumption', 25),
        ('PlantA_OUT_SpecificWaterConsumption', 10),
        ('PlantA_OUT_In_W', 1600),
        ('PlantA_ID_Target_In_W', 1650),
        ('PlantA_OUT_Out_W', 1550),
        ('PlantA_ID_Target_Out_W', 1550),
        ('PlantA_ID_FeedRawOre_Conce_BPL', 60),
        ('PlantA_ID_FeedRawOre_Conce_CaO', 40),
        ('PlantA_ID_FeedRawOre_Conce_Cd', 12),
        ('PlantA_ID_FeedRawOre_Conce_CO2', 6),
        ('PlantA_ID_FeedRawOre_Conce_H2O', 3),
        ('PlantA_ID_FeedRawOre_Conce_MgO', 1.2),
        ('PlantA_ID_FeedRawOre_Conce_SiO2', 4);

    INSERT INTO dbo.Record (PHDTagId, value, timestamp)
    SELECT
        p.id,
        conf.BaseValue * (1 + (RAND() * 0.2 - 0.1)), -- Variance of +/- 10%
        SYSDATETIMEOFFSET()
    FROM dbo.PHDTag p
    JOIN #TagSimulationConfig conf ON p.tagname = conf.TagName;

    DROP TABLE #TagSimulationConfig;

    PRINT 'Data simulation for Global Plant KPI complete.';
END
GO
