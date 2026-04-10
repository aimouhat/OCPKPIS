USE [OCP_KPI_Dashboard_DB]
GO

IF OBJECT_ID('dbo.UpdateTailingThickenerTagValues', 'P') IS NOT NULL
    DROP PROCEDURE dbo.UpdateTailingThickenerTagValues;
GO

CREATE PROCEDURE [dbo].[UpdateTailingThickenerTagValues]
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @TailingTags TABLE (TagName VARCHAR(255) PRIMARY KEY);

    INSERT INTO @TailingTags (TagName)
    SELECT tagname FROM dbo.PHDTag WHERE 
    tagname LIKE '400A_%' OR 
    tagname LIKE '410G_%' OR
    tagname LIKE '410A_%' OR
    tagname LIKE '420A_%' OR
    tagname LIKE '410GU_%' OR
    tagname LIKE 'Tailing_Thickener_%';

    DECLARE @CurrentExecutionTime DATETIMEOFFSET = SYSDATETIMEOFFSET();
    DECLARE @TagName VARCHAR(255), @TagId INT, @LatestValue DECIMAL(18,5), @NewValue DECIMAL(18,5);

    DECLARE tag_cursor CURSOR FOR
    SELECT p.id, p.tagname FROM dbo.PHDTag p WHERE p.tagname IN (SELECT TagName FROM @TailingTags);

    OPEN tag_cursor;
    FETCH NEXT FROM tag_cursor INTO @TagId, @TagName;

    WHILE @@FETCH_STATUS = 0
    BEGIN
        SELECT TOP 1 @LatestValue = r.value
        FROM dbo.Record r
        WHERE r.PHDTagId = @TagId
        ORDER BY r.timestamp DESC;

        IF @LatestValue IS NOT NULL
        BEGIN
            IF @TagName LIKE '%_Status'
            BEGIN
                SET @NewValue = 1 - @LatestValue;
            END
            ELSE
            BEGIN
                SET @NewValue = @LatestValue * (1 + (RAND() * 0.2 - 0.1));
            END

            INSERT INTO dbo.Record (PHDTagId, value, timestamp)
            VALUES (@TagId, @NewValue, @CurrentExecutionTime);
        END

        FETCH NEXT FROM tag_cursor INTO @TagId, @TagName;
    END

    CLOSE tag_cursor;
    DEALLOCATE tag_cursor;

    PRINT 'Stored procedure UpdateTailingThickenerTagValues executed successfully.';
END
GO
