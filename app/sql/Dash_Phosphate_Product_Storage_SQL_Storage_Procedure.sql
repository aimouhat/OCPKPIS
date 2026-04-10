USE [OCP_KPI_Dashboard_DB]
GO

IF OBJECT_ID('dbo.UpdatePhosphateProductStorageTagValues', 'P') IS NOT NULL
    DROP PROCEDURE dbo.UpdatePhosphateProductStorageTagValues;
GO

CREATE PROCEDURE [dbo].[UpdatePhosphateProductStorageTagValues]
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @ProductStorageTags TABLE (TagName VARCHAR(255) PRIMARY KEY);

    INSERT INTO @ProductStorageTags (TagName) VALUES
    ('SL1_OUT_Status'), ('SL2_OUT_Status'), ('SL3_OUT_Status'), ('SL4_OUT_Status'),
    ('RL1_OUT_Status'), ('EL1_OUT_Status'), ('EL2_OUT_Status'), ('RL4_OUT_Status'),
    ('RL5_OUT_Status'), ('RL6_OUT_Status'), ('150G_HP_01_ID_LVLA'), ('150G_HP_01_ID_LVLB'),
    ('140G_RC_01_OUT_Status'), ('140G_RC_01_OUT_Out_W'), ('140G_RC_01_ID_AirDigTimePercentage'),
    ('140G_RC_01_OD_AvailablityPercentage'), ('140G_RC_01_OD_DowntimePercentage'),
    ('140G_RC_01_OD_MaxFeedRate'), ('140G_RC_01_ID_MisalignmentAlarm_Left'),
    ('140G_RC_01_ID_MisalignmentAlarm_Right'), ('140G_RC_01_ID_FireAlarm'),
    ('140G_RC_01_ID_BucketWheel_HHBuring1_T'), ('140G_RC_01_ID_BucketWheel_HHBuring2_T'),
    ('140G_RC_01_ID_BucketWheel_UHH_T'), ('140G_RC_01_ID_BucketWheel_VHH_T'),
    ('140G_RC_01_ID_BucketWheel_WHH_T'), ('140G_RC_01_ID_RakePos1'), ('140G_RC_01_ID_RakePos2'),
    ('140G_RC_01_ID_RakeChain1Angle'), ('140G_RC_01_ID_RakeChain2Angle'), ('140G_RC_01_ID_RakeChain3Angle'),
    ('140G_RC_01_ID_DriveReady'), ('140G_RC_01_ID_InRemote'), ('140G_RC_01_ID_Ready'),
    ('140G_RC_01_ID_RunFeedback'), ('140G_RC_01_ID_TraverseGear_Ready'),
    ('Product_Storage_Area_OUT_SpecificEnergyConsumption'), ('130G_ST_01_OUT_AvailablityPercentage'),
    ('130G_ST_01_OUT_DowntimePercentage'), ('130G_ST_01_ID_EmergStop_CollapsTripper'),
    ('130G_ST_01_ID_FireAlarm'), ('130G_ST_01_ID_MisalignmentAlarm'), ('130G_ST_01_ID_MisalignmentWarning'),
    ('130G_ST_01_ID_HardInterlock_MVpanel'), ('130G_ST_01_ID_BoomConv_LuffingPosition'),
    ('130G_ST_01_ID_SafetyRelaisOk'), ('130G_ST_01_ID_InBypassMode'), ('130G_ST_01_ID_InRemote'),
    ('130G_ST_01_ID_Ready'), ('130G_ST_01_ID_RunFeedback'), ('130G_ST_01_ID_State'),
    ('130G_ST_01_ID_TravelPosition');

    DECLARE @CurrentExecutionTime DATETIMEOFFSET = SYSDATETIMEOFFSET();
    DECLARE @TagName VARCHAR(255), @TagId INT, @LatestValue DECIMAL(18,5), @NewValue DECIMAL(18,5);

    DECLARE tag_cursor CURSOR FOR
    SELECT p.id, p.tagname FROM dbo.PHDTag p WHERE p.tagname IN (SELECT TagName FROM @ProductStorageTags);

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
             -- Logic for integer/status tags
            IF @TagName LIKE '%_Status' OR @TagName LIKE '%State' OR @TagName LIKE '%Ready' OR @TagName LIKE '%Ok' OR @TagName LIKE '%Remote'
            BEGIN
                SET @NewValue = 1 - @LatestValue; -- Toggle between 0 and 1
            END
            ELSE -- Logic for double/analog tags
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

    PRINT 'Stored procedure UpdatePhosphateProductStorageTagValues executed successfully.';
END
GO
