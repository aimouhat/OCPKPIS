USE [OCP_KPI_Dashboard_DB]
GO

CREATE OR ALTER PROCEDURE dbo.UpdateApcPerformanceData
AS
BEGIN
    SET NOCOUNT ON;

    CREATE TABLE #TagSimulationConfig (
        TagName VARCHAR(255) PRIMARY KEY,
        InitialValue DECIMAL(18, 5)
    );

    INSERT INTO #TagSimulationConfig (TagName, InitialValue) VALUES
        ('PlantA_ID_APC_Aveva_OnlineTime', 85),
        ('PlantA_ID_APC_Aveva_Utilization', 75),
        ('PlantA_ID_APC_ABB_OnlineTime', 90),
        ('PlantA_ID_APC_ABB_Utilization', 80),
        ('PlantA_ID_APC_FLS_OnlineTime', 88),
        ('PlantA_ID_APC_FLS_Utilization', 78),
        ('PlantA_ID_APC_HWLProfiloop_OnlineTime', 92),
        ('PlantA_ID_APC_HWLProfiloop_Utilization', 82),
        ('PlantA_ID_APC_HWLPWO_ModelAccuracy', 5),
        ('PlantA_ID_APC_HWLPWO_OnlineTime', 5),
        ('PlantA_ID_APC_HWLPWO_TimeConstrained', 5),
        ('PlantA_ID_APC_HWLPWO_Utilization', 5),
        ('PlantA_ID_APC_ABB_ModelAccuracy', 5),
        ('PlantA_ID_APC_ABB_TimeConstrained', 5),
        ('PlantA_ID_APC_FLS_ModelAccuracy', 5),
        ('PlantA_ID_APC_FLS_TimeConstrained', 5),
        ('PlantA_ID_APC_HWLProfiloop_ModelAccuracy', 5),
        ('PlantA_ID_APC_HWLProfiloop_TimeConstrained', 5),
        ('PlantA_ID_APC_Aveva_ModelAccuracy', 5),
        ('PlantA_ID_APC_Aveva_TimeConstrained', 5);

    INSERT INTO dbo.Record (PHDTagId, value, timestamp)
    SELECT
        p.id,
        conf.InitialValue * (1 + (RAND() * 0.2 - 0.1)), -- Variance of +/- 10% from initial value
        SYSDATETIMEOFFSET()
    FROM dbo.PHDTag p
    JOIN #TagSimulationConfig conf ON p.tagname = conf.TagName;

    DROP TABLE #TagSimulationConfig;

    PRINT 'Data simulation for APC Performance Assessment KPI complete.';
END
GO
