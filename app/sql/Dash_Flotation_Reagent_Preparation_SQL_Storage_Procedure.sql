USE [OCP_KPI_Dashboard_DB]
GO

CREATE OR ALTER PROCEDURE dbo.UpdateFlotationReagentData
AS
BEGIN
    SET NOCOUNT ON;

    CREATE TABLE #TagSimulationConfig (
        TagName VARCHAR(255) PRIMARY KEY,
        InitialValue DECIMAL(18, 5),
        IsInteger BIT
    );

    INSERT INTO #TagSimulationConfig (TagName, InitialValue, IsInteger) VALUES
        ('330G_TK_01_ID_LVLA', 5, 0), ('330G_TK_01_ID_LVLB', 5, 0), ('330G_TK_01_OUT_Agitator_Status', 0, 1),
        ('330G_TK_01_OUT_PumpD_Status', 0, 1), ('330G_TK_01_OUT_PumpS_Status', 0, 1), ('330G_TK_01_OUT_Pump1_Status', 0, 1),
        ('330G_TK_02_ID_LVLA', 5, 0), ('330G_TK_02_OUT_PumpD_Status', 0, 1), ('330G_TK_02_OUT_PumpS_Status', 0, 1),
        ('330G_TK_02_OUT_Agitator_Status', 0, 1), ('330G_TK_02_OUT_Pump1_Status', 0, 1), ('330G_TK_03_ID_LVLA', 5, 0),
        ('330G_TK_03_OUT_Agitator_Status', 0, 1), ('330G_TK_03_OUT_PumpD_Status', 0, 1), ('330G_TK_03_OUT_PumpS_Status', 0, 1),
        ('330G_TK_03_OUT_Pump1_Status', 0, 1), ('330G_TK_04_ID_LVLA', 5, 0), ('330G_TK_04_OUT_PumpD_Status', 0, 1),
        ('330G_TK_04_OUT_PumpS_Status', 0, 1), ('330G_TK_04_OUT_Agitator_Status', 0, 1), ('330G_TK_04_OUT_Pump1_Status', 0, 1),
        ('330G_TK_05_ID_LVLA', 5, 0), ('330G_TK_05_OUT_Agitator_Status', 0, 1), ('330G_TK_05_OUT_PumpD_Status', 0, 1),
        ('330G_TK_05_OUT_PumpS_Status', 0, 1), ('330G_TK_06_OUT_PumpD_Status', 0, 1), ('330G_TK_06_OUT_PumpS_Status', 0, 1),
        ('330G_TK_06_OUT_Agitator_Status', 0, 1), ('330G_TK_07_ID_LVLA', 5, 0), ('330G_TK_07_OUT_PumpD_Status', 0, 1),
        ('330G_TK_07_OUT_PumpS_Status', 0, 1), ('330G_TK_07_OUT_Pump1_Status', 0, 1), ('330G_TK_08_ID_LVLA', 5, 0),
        ('330G_TK_08_OUT_PumpD_Status', 0, 1), ('330G_TK_08_OUT_PumpS_Status', 0, 1), ('330G_TK_08_OUT_Pump1_Status', 0, 1),
        ('330G_TK_09_ID_LVLA', 5, 0), ('330G_TK_09_OUT_PumpD_Status', 0, 1), ('330G_TK_09_OUT_PumpS_Status', 0, 1),
        ('330G_TK_09_OUT_Pump1_Status', 0, 1), ('340G_TK_10_ID_LVLA', 5, 0), ('340G_TK_10_OUT_PumpD_Status', 0, 1),
        ('340G_TK_10_OUT_PumpS_Status', 0, 1), ('340G_TK_10_OUT_Pump2_Status', 0, 1), ('420A_TK_01_ID_LVLA', 5, 0),
        ('420A_TK_01_ID_LVLB', 5, 0), ('420A_TK_01_OUT_Agitator_Status', 0, 1), ('420A_TK_01_OUT_PumpD_Status', 0, 1),
        ('420A_TK_01_OUT_PumpS_Status', 0, 1), ('420A_TK_02_ID_LVLA', 5, 0), ('420A_TK_02_ID_LVLB', 5, 0),
        ('420A_TK_02_OUT_Agitator_Status', 0, 1), ('420A_TK_02_OUT_PumpD_Status', 0, 1), ('420A_TK_02_OUT_PumpS_Status', 0, 1);

    INSERT INTO dbo.Record (PHDTagId, value, timestamp)
    SELECT
        p.id,
        CASE
            WHEN conf.IsInteger = 1 THEN FLOOR(RAND() * 2)
            ELSE conf.InitialValue * (1 + (RAND() * 0.4 - 0.2))
        END,
        SYSDATETIMEOFFSET()
    FROM dbo.PHDTag p
    JOIN #TagSimulationConfig conf ON p.tagname = conf.TagName;

    DROP TABLE #TagSimulationConfig;

    PRINT 'Data simulation for Flotation Reagent Preparation complete.';
END
GO
