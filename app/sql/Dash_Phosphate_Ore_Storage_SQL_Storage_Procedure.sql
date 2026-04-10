USE [OCP_KPI_Dashboard_DB]
GO

IF OBJECT_ID('dbo.UpdatePhosphateOreStorageTagValues', 'P') IS NOT NULL
    DROP PROCEDURE dbo.UpdatePhosphateOreStorageTagValues;
GO

CREATE PROCEDURE [dbo].[UpdatePhosphateOreStorageTagValues]
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @PhosphateOreTags TABLE (TagName VARCHAR(255) PRIMARY KEY);

    INSERT INTO @PhosphateOreTags (TagName) VALUES
    ('110G_ST_01_ID_EmergStop_CollapsTripper'), ('110G_ST_01_ID_FireAlarm'), ('110G_ST_01_ID_MisalignmentAlarm'),
    ('110G_ST_01_ID_MisalignmentWarning'), ('110G_ST_01_ID_HardInterlock_MVpanel'), ('110G_ST_01_ID_BoomConv_LuffingPosition'),
    ('110G_ST_01_ID_SafetyRelaisOk'), ('110G_ST_01_ID_InBypassMode'), ('110G_ST_01_ID_InRemote'),
    ('110G_ST_01_ID_Ready'), ('110G_ST_01_ID_RunFeedback'), ('110G_ST_01_ID_State'),
    ('110G_ST_01_ID_TravelPosition'), ('RB1_OUT_Status'), ('RB2_OUT_Status'), ('RB2_prime_OUT_Status'),
    ('120G_RC_01_ID_MisalignmentAlarm_Left'), ('120G_RC_01_ID_MisalignmentAlarm_Right'), ('120G_RC_01_ID_FireAlarm'),
    ('120G_RC_01_ID_BucketWheel_HHBuring1_T'), ('120G_RC_01_ID_BucketWheel_HHBuring2_T'), ('120G_RC_01_ID_BucketWheel_UHH_T'),
    ('120G_RC_01_ID_BucketWheel_VHH_T'), ('120G_RC_01_ID_BucketWheel_WHH_T'), ('120G_RC_01_ID_DriveReady'),
    ('120G_RC_01_ID_InRemote'), ('120G_RC_01_ID_Ready'), ('120G_RC_01_ID_RunFeedback'),
    ('120G_RC_01_ID_TraverseGear_Ready'), ('120G_RC_01_ID_State'), ('120G_RC_01_OUT_AvailablityPercentage'),
    ('120G_RC_01_OD_DowntimePercentage'), ('120G_RC_01_OD_MaxFeedRate'), ('120G_RC_01_OUT_Out_Dry_W'),
    ('CB1_OUT_Status'), ('CB2_OUT_Status'), ('CB5_OUT_Status'), ('SB1_OUT_Status'),
    ('110G_ST_01_OUT_AvailablityPercentage'), ('110G_ST_01_OUT_DowntimePercentage'), ('Ore_Storage_Area_OUT_SpecificEnergyConsumption'),
    ('InloadStockyard_OD_InloadStockyardAvailableT'), ('InloadStockyard_OD_InloadStockyardAvailablePct'), ('OutStockyard_OD_OutloadStockyardAvailableT'),
    ('OutStockyard_OD_OutloadStockyardAvailablePct');

    DECLARE @CurrentExecutionTime DATETIMEOFFSET = SYSDATETIMEOFFSET();
    DECLARE @TagName VARCHAR(255), @TagId INT, @LatestValue DECIMAL(18,5), @NewValue DECIMAL(18,5);

    DECLARE tag_cursor CURSOR FOR
    SELECT p.id, p.tagname FROM dbo.PHDTag p WHERE p.tagname IN (SELECT TagName FROM @PhosphateOreTags);

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
            IF @TagName LIKE '%_Status' OR @TagName LIKE '%State' OR @TagName LIKE '%Ready' OR @TagName LIKE '%Ok' OR @TagName LIKE '%Remote'
            BEGIN
                SET @NewValue = 1 - @LatestValue; -- Toggle between 0 and 1
            END
            ELSE
            BEGIN
                SET @NewValue = @LatestValue * (1 + (RAND() * 0.2 - 0.1)); -- +/- 10%
            END

            INSERT INTO dbo.Record (PHDTagId, value, timestamp)
            VALUES (@TagId, @NewValue, @CurrentExecutionTime);
        END

        FETCH NEXT FROM tag_cursor INTO @TagId, @TagName;
    END

    CLOSE tag_cursor;
    DEALLOCATE tag_cursor;

    PRINT 'Stored procedure UpdatePhosphateOreStorageTagValues executed successfully.';
END
GO
