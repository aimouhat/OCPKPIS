-- File: c:/ocp-dashboard-kpi-app/sql/execute_manual_update.sql

USE OCP_KPI_Dashboard_DB;
GO

SET NOCOUNT ON;

-- Declare variables needed for the loop
DECLARE @TagId INT;
DECLARE @TagName VARCHAR(255);
DECLARE @LatestValue DECIMAL(18,5);
DECLARE @NewValue DECIMAL(18,5);
DECLARE @AttributeTypeName VARCHAR(255);
DECLARE @CurrentExecutionTime DATETIMEOFFSET = SYSDATETIMEOFFSET(); -- Capture the exact time this script started

-- Tags to be updated randomly between 0 and 1
DECLARE @StateTags TABLE (TagName VARCHAR(255) PRIMARY KEY);
INSERT INTO @StateTags (TagName) VALUES
('InStackingLine_State'),
('InReclaimingLine_State'),
('MainPlantLine_State'),
('OutReclaimingLine_State'),
('OutDeliveryLine_State');

-- Cursor to iterate over all PHD Tags
DECLARE tag_cursor CURSOR FOR
SELECT p.id, p.tagname
FROM "PHDTag" p;

OPEN tag_cursor;
FETCH NEXT FROM tag_cursor INTO @TagId, @TagName;

WHILE @@FETCH_STATUS = 0
BEGIN
    -- Get the latest record for the current tag
    SELECT TOP 1 @LatestValue = r.value
    FROM "Record" r
    WHERE r."PHDTagId" = @TagId
    ORDER BY r.timestamp DESC;

    -- Initialize @NewValue to NULL for this iteration
    SET @NewValue = NULL;

    IF @LatestValue IS NOT NULL -- Only update if there's an existing record
    BEGIN
        IF EXISTS (SELECT 1 FROM @StateTags st WHERE st.TagName = @TagName)
        BEGIN
            -- Update state tags randomly to 0 or 1
            SET @NewValue = FLOOR(RAND() * 2);
        END
        ELSE
        BEGIN
            -- For other tags, apply +/- 20% of the latest value
            -- A random percentage between -20% and +20%
            DECLARE @PercentageChange DECIMAL(18,5) = (RAND() * 0.4) - 0.2; -- Generates a value between -0.2 and 0.2
            SET @NewValue = @LatestValue * (1 + @PercentageChange);

            -- Optional: Add constraints if values should stay within a certain range (e.g., non-negative)
            -- IF @NewValue < 0 SET @NewValue = 0;
        END

        -- Insert a new record with the calculated new value and the script's execution timestamp
        -- Only insert if a new value was determined
        IF @NewValue IS NOT NULL
        BEGIN
            INSERT INTO "Record" ("PHDTagId", value, timestamp)
            VALUES (@TagId, @NewValue, @CurrentExecutionTime); -- Use the captured time
        END
    END

    FETCH NEXT FROM tag_cursor INTO @TagId, @TagName;
END

CLOSE tag_cursor;
DEALLOCATE tag_cursor;

PRINT 'Manual tag values update script executed.';
GO
