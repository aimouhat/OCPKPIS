USE [OCP_KPI_Dashboard_DB]
GO

IF OBJECT_ID('dbo.UpdateScrubbingAndScreeningTagValues', 'P') IS NOT NULL
    DROP PROCEDURE dbo.UpdateScrubbingAndScreeningTagValues;
GO

CREATE PROCEDURE [dbo].[UpdateScrubbingAndScreeningTagValues]
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @ScrubbingTags TABLE (TagName VARCHAR(255) PRIMARY KEY);

    INSERT INTO @ScrubbingTags (TagName)
    SELECT tagname FROM dbo.PHDTag WHERE 
    tagname LIKE '210A_%' OR 
    tagname LIKE '220A_%' OR 
    tagname LIKE '230A_%';

    DECLARE @CurrentExecutionTime DATETIMEOFFSET = SYSDATETIMEOFFSET();
    DECLARE @TagName VARCHAR(255), @TagId INT, @LatestValue DECIMAL(18,5), @NewValue DECIMAL(18,5);

    DECLARE tag_cursor CURSOR FOR
    SELECT p.id, p.tagname FROM dbo.PHDTag p WHERE p.tagname IN (SELECT TagName FROM @ScrubbingTags);

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

    PRINT 'Stored procedure UpdateScrubbingAndScreeningTagValues executed successfully.';
END
GO
