USE [OCP_KPI_Dashboard_DB]
GO

-- Drop the procedure if it already exists to ensure a clean update
IF OBJECT_ID('dbo.UpdateWaterAndUtilitiesTagValues', 'P') IS NOT NULL
    DROP PROCEDURE dbo.UpdateWaterAndUtilitiesTagValues;
GO

CREATE PROCEDURE [dbo].[UpdateWaterAndUtilitiesTagValues]
AS
BEGIN
    SET NOCOUNT ON;

    -- A table to hold the specific tags for this dashboard
    DECLARE @WaterTags TABLE (TagName VARCHAR(255) PRIMARY KEY);

    INSERT INTO @WaterTags (TagName) VALUES
    ('510G_BS_01_ID_LVLA'), ('510G_BS_01_ID_LVLB'), ('510G_BS_01_OUT_PumpD_Status'),
    ('510G_BS_01_OUT_PumpS_Status'), ('510G_BS_01_OUT_Pump1_Status'), ('520G_BS_01_ID_LVLA'),
    ('520G_BS_01_ID_LVLB'), ('520G_BS_01_ID_In2_Water_Q'), ('520G_BS_01_ID_Out2_Q'),
    ('520G_BS_01_OUT_PumpD_Status'), ('520G_BS_01_OUT_PumpS_Status');

    DECLARE @CurrentExecutionTime DATETIMEOFFSET = SYSDATETIMEOFFSET();
    DECLARE @TagName VARCHAR(255), @TagId INT, @LatestValue DECIMAL(18,5), @NewValue DECIMAL(18,5);

    -- Use a cursor to loop through only the tags relevant to this dashboard
    DECLARE tag_cursor CURSOR FOR
    SELECT p.id, p.tagname FROM dbo.PHDTag p WHERE p.tagname IN (SELECT TagName FROM @WaterTags);

    OPEN tag_cursor;
    FETCH NEXT FROM tag_cursor INTO @TagId, @TagName;

    WHILE @@FETCH_STATUS = 0
    BEGIN
        -- Find the most recent value for the current tag
        SELECT TOP 1 @LatestValue = r.value
        FROM dbo.Record r
        WHERE r.PHDTagId = @TagId
        ORDER BY r.timestamp DESC;

        IF @LatestValue IS NOT NULL
        BEGIN
            -- Logic for integer/status tags (0 or 1)
            IF @TagName LIKE '%_Status'
            BEGIN
                SET @NewValue = 1 - @LatestValue; -- Toggle between 0 and 1
            END
            -- Logic for double/analog tags
            ELSE
            BEGIN
                SET @NewValue = @LatestValue * (1 + (RAND() * 0.2 - 0.1)); -- +/- 10% change
                 -- Clamp values between 0 and 10 to keep them realistic
                IF @NewValue < 0 SET @NewValue = 0;
                IF @NewValue > 10 SET @NewValue = 10;
            END

            -- Insert the new record with a consistent timestamp for this run
            INSERT INTO dbo.Record (PHDTagId, value, timestamp)
            VALUES (@TagId, @NewValue, @CurrentExecutionTime);
        END

        FETCH NEXT FROM tag_cursor INTO @TagId, @TagName;
    END

    CLOSE tag_cursor;
    DEALLOCATE tag_cursor;

    PRINT 'Stored procedure UpdateWaterAndUtilitiesTagValues executed successfully.';
END
GO
