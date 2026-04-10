USE [OCP_KPI_Dashboard_DB]
GO

CREATE OR ALTER PROCEDURE dbo.UpdateProductFiltrationData
AS
BEGIN
    SET NOCOUNT ON;

    -- Create a temporary table to hold the base values and types for simulation
    CREATE TABLE #TagSimulationConfig (
        TagName VARCHAR(255) PRIMARY KEY,
        InitialValue DECIMAL(18, 5),
        IsInteger BIT
    );

    -- Populate the temp table with base values for calculation
    INSERT INTO #TagSimulationConfig (TagName, InitialValue, IsInteger) VALUES
        ('240_VP_01_02_ID_Sumpf_LVL1', 5, 0),
        ('240_VP_01_02_ID_Sumpf_LVL2', 5, 0),
        ('240_VP_01_02_OUT_Sumpf_Pump1_Status', 0, 1),
        ('240_VP_01_02_OUT_Sumpf_Pump2_Status', 0, 1),
        ('240_VP_01_02_ID_Sumpf_LVL3', 5, 0),
        ('CS1_ID_Status', 0, 1),
        ('CS1_ID_Moist', 5, 0),
        ('CS1_ID_Turb', 5, 0),
        ('CS2_ID_Status', 0, 1),
        ('CS2_ID_Moist', 5, 0),
        ('CS2_ID_Turb', 5, 0),
        ('CS3_ID_Status', 0, 1),
        ('CS3_ID_Moist', 5, 0),
        ('CS3_ID_Turb', 5, 0),
        ('CS4_ID_Status', 0, 1),
        ('CS4_ID_Moist', 5, 0),
        ('CS4_ID_Turb', 5, 0),
        ('SL3_OUT_Out_Dry_W', 5, 0),
        ('Product_Filtration_Area_ID_Out_M_FinalProduct_Conce_BPL', 5, 0),
        ('Product_Filtration_Area_ID_Out_M_FinalProduct_Conce_CaO', 5, 0),
        ('Product_Filtration_Area_ID_Out_M_FinalProduct_Conce_Cd', 5, 0),
        ('Product_Filtration_Area_ID_Out_M_FinalProduct_Conce_CO2', 5, 0),
        ('Product_Filtration_Area_ID_Out_M_FinalProduct_Conce_H2O', 5, 0),
        ('Product_Filtration_Area_ID_Out_M_FinalProduct_Conce_MgO', 5, 0),
        ('Product_Filtration_Area_ID_Out_M_FinalProduct_Conce_SiO2', 5, 0),
        ('Product_Filtration_Area_ID_Out_M_FinalProduct_160', 5, 0),
        ('Product_Filtration_Area_ID_Out_M_FinalProduct_200', 5, 0),
        ('Product_Filtration_Area_ID_Out_M_FinalProduct_3150', 5, 0),
        ('Product_Filtration_Area_ID_Out_M_FinalProduct_40', 5, 0),
        ('Product_Filtration_Area_ID_Out_M_FinalProduct_less40', 5, 0);

    -- Insert new records with updated values
    INSERT INTO dbo.Record (PHDTagId, value, timestamp)
    SELECT
        p.id,
        CASE
            WHEN conf.IsInteger = 1 THEN FLOOR(RAND() * 2) -- New random 0 or 1
            ELSE conf.InitialValue * (1 + (RAND() * 0.4 - 0.2)) -- Variance of +/- 20% from initial value
        END,
        SYSDATETIMEOFFSET()
    FROM dbo.PHDTag p
    JOIN #TagSimulationConfig conf ON p.tagname = conf.TagName;

    -- Clean up the temporary table
    DROP TABLE #TagSimulationConfig;

    PRINT 'Data simulation for Product Filtration Area complete.';
END
GO
