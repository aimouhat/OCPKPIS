USE [OCP_KPI_Dashboard_DB]
GO

CREATE OR ALTER PROCEDURE dbo.UpdateCoarseRejectData
AS
BEGIN
    SET NOCOUNT ON;

    -- Create a temporary table to hold the initial values and types
    CREATE TABLE #TagSimulationConfig (
        TagName VARCHAR(255) PRIMARY KEY,
        InitialValue DECIMAL(18, 5),
        IsInteger BIT
    );

    -- Populate the temp table with the base values for calculation
    INSERT INTO #TagSimulationConfig (TagName, InitialValue, IsInteger) VALUES
        ('Coarse_Reject_Handling_Area_ID_M_Sterile_160', 5, 0),
        ('Coarse_Reject_Handling_Area_ID_M_Sterile_200', 5, 0),
        ('Coarse_Reject_Handling_Area_ID_M_Sterile_3150', 5, 0),
        ('Coarse_Reject_Handling_Area_ID_M_Sterile_40', 5, 0),
        ('Coarse_Reject_Handling_Area_ID_M_Sterile_less40', 5, 0),
        ('Coarse_Reject_Handling_Area_ID_M_Sterile_Conce_BPL', 5, 0),
        ('Coarse_Reject_Handling_Area_ID_M_Sterile_Conce_Cd', 5, 0),
        ('Coarse_Reject_Handling_Area_ID_M_Sterile_Conce_H2O', 5, 0),
        ('CT1_ID_Status', 1, 1),
        ('CT1_prime_ID_Status', 1, 1),
        ('CT2_ID_Status', 1, 1),
        ('CT2_prime_ID_Status', 1, 1),
        ('T1_ID_Status', 1, 1),
        ('T1_prime_ID_Status', 1, 1),
        ('CT2_OUT_Out_Dry_W', 5, 0),
        ('CT2_prime_OUT_Out_Dry_W', 5, 0);

    -- Insert new records with updated values
    INSERT INTO dbo.Record (PHDTagId, value, timestamp)
    SELECT
        p.id,
        CASE
            WHEN config.IsInteger = 1 THEN FLOOR(RAND() * 2) -- Random 0 or 1
            ELSE config.InitialValue * (1 + (RAND() * 0.2 - 0.1)) -- +/- 10% random variance
        END as value,
        SYSDATETIMEOFFSET()
    FROM dbo.PHDTag p
    JOIN #TagSimulationConfig config ON p.tagname = config.TagName;

    -- Clean up
    DROP TABLE #TagSimulationConfig;
    
    PRINT 'Stored procedure UpdateCoarseRejectData executed successfully.';
END
GO
