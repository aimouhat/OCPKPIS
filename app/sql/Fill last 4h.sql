USE [OCP_KPI_Dashboard_DB]
GO

-- This script generates sample data for the last 24 hours for trend widgets.
-- You can run this script anytime your trend charts appear empty.

-- First, clear out any very old data to keep the table clean (optional)
DELETE FROM Record WHERE timestamp < DATEADD(day, -30, GETDATE());

-- Declare variables for the loop
DECLARE @counter INT = 0;
DECLARE @totalHours INT = 24; -- Generate data for the last 24 hours
DECLARE @samplesPerHour INT = 4; -- Generate 4 samples per hour (every 15 minutes)

WHILE @counter < (@totalHours * @samplesPerHour)
BEGIN
    -- Calculate a timestamp in the past
    DECLARE @timestamp DATETIMEOFFSET = DATEADD(minute, -(@counter * 60 / @samplesPerHour), SYSDATETIMEOFFSET());

    -- Generate data for Plant Input Feed Rate
    INSERT INTO Record (PHDTagId, value, timestamp) VALUES
    ((SELECT id FROM PHDTag WHERE tagname = '210CV01_OD_ScrubberDryFeedRate'), 40 + (RAND() * 10 - 5), @timestamp),
    ((SELECT id FROM PHDTag WHERE tagname = '210CV01_OD_ScrubberDryFeedRate_Target'), 45, @timestamp);

    -- Generate data for Plant Output Feed Rate
    INSERT INTO Record (PHDTagId, value, timestamp) VALUES
    ((SELECT id FROM PHDTag WHERE tagname = '130GST01_OD_ProductStackerDryFeedRate'), 30 + (RAND() * 8 - 4), @timestamp),
    ((SELECT id FROM PHDTag WHERE tagname = '130GST01_OD_ProductStackerDryFeedRate_Target'), 35, @timestamp);

    -- Generate data for Export Feed Rate
    INSERT INTO Record (PHDTagId, value, timestamp) VALUES
    ((SELECT id FROM PHDTag WHERE tagname = '140GRC01_OD_PhosphReclaimerDryFeedRate'), 40 + (RAND() * 10 - 5), @timestamp),
    ((SELECT id FROM PHDTag WHERE tagname = '140GRC01_OD_PhosphReclaimerDryFeedRate_Target'), 45, @timestamp);

    -- Generate data for Import Feed Rate
    INSERT INTO Record (PHDTagId, value, timestamp) VALUES
    ((SELECT id FROM PHDTag WHERE tagname = '110GST01_OD_OreStackerDryFeedRate'), 30 + (RAND() * 8 - 4), @timestamp),
    ((SELECT id FROM PHDTag WHERE tagname = '110GST01_OD_OreStackerDryFeedRate_Target'), 35, @timestamp);
    
    -- Generate data for Phosphate Product Delivery
    INSERT INTO Record (PHDTagId, value, timestamp) VALUES
    ((SELECT id FROM PHDTag WHERE tagname = 'RL4_OD_PhosphDeliveryFeedRate'), 20 + (RAND() * 6 - 3), @timestamp),
    ((SELECT id FROM PHDTag WHERE tagname = 'RL4_OD_PhosphDeliveryFeedRate_Target'), 25, @timestamp);

    -- Generate data for Hoppers level
    INSERT INTO Record (PHDTagId, value, timestamp) VALUES
    ((SELECT id FROM PHDTag WHERE tagname = '210ABF01_ID_Level'), 50 + (RAND() * 30 - 15), @timestamp),
    ((SELECT id FROM PHDTag WHERE tagname = '150GHP01_ID_Level'), 50 + (RAND() * 20 - 10), @timestamp);

    SET @counter = @counter + 1;
END

PRINT 'Successfully inserted historical data for trend widgets.';
GO
