-- Step 1: Define a temporary table variable to hold your list of new data.
DECLARE @InputData TABLE (
    TagName NVARCHAR(255),
    TagValue FLOAT
);
-- Step 2: Populate the temporary table with the tags and values you want to insert
INSERT INTO @InputData (TagName, TagValue) VALUES
('PlantA_ID_APC_Aveva_OnlineTime', 70),
('PlantA_ID_APC_Aveva_Utilization', 60),

('PlantA_ID_APC_ABB_OnlineTime', 60),
('PlantA_ID_APC_ABB_Utilization', 34),

('PlantA_ID_APC_Aveva_OnlineTime', 50),
('PlantA_ID_APC_Aveva_Utilization', 35),

('PlantA_ID_APC_FLS_OnlineTime', 80),
('PlantA_ID_APC_FLS_Utilization', 36),

('PlantA_ID_APC_HWLProfiloop_OnlineTime', 30),
('PlantA_ID_APC_HWLProfiloop_Utilization', 77);

-- Step 3: Insert the data into the main [Record] table.
INSERT INTO [OCP_KPI_Dashboard_DB].[dbo].[Record] (PHDTagId, Value, TimeStamp)
SELECT
    T.Id,I.TagValue,    -- The value you provided from the list above
    GETDATE()      -- The current date and time
FROM
    @InputData AS I
JOIN
    [OCP_KPI_Dashboard_DB].[dbo].[PHDTag] AS T ON I.TagName = T.tagname;

SELECT 'Successfully inserted rows:', @@ROWCOUNT;