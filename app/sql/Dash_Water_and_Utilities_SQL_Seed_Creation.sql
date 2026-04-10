USE [OCP_KPI_Dashboard_DB]
GO

PRINT 'Seeding initial record data for Water and Utilities Area tags...';

-- Create a temporary table to hold the tags and their types
CREATE TABLE #InitialValues (
    TagName VARCHAR(255) PRIMARY KEY,
    IsInteger BIT
);

-- Infer type from tag name, assuming tags with 'Status' are integers.
INSERT INTO #InitialValues (TagName, IsInteger) VALUES
    ('510G_BS_01_ID_LVLA', 0),
    ('510G_BS_01_ID_LVLB', 0),
    ('510G_BS_01_OUT_PumpD_Status', 1),
    ('510G_BS_01_OUT_PumpS_Status', 1),
    ('510G_BS_01_OUT_Pump1_Status', 1),
    ('520G_BS_01_ID_LVLA', 0),
    ('520G_BS_01_ID_LVLB', 0),
    ('520G_BS_01_ID_In2_Water_Q', 0),
    ('520G_BS_01_ID_Out2_Q', 0),
    ('520G_BS_01_OUT_PumpD_Status', 1),
    ('520G_BS_01_OUT_PumpS_Status', 1);


-- Insert initial records for the new tags if they don't already have any data.
INSERT INTO [dbo].[Record] (PHDTagId, value, timestamp)
SELECT
    p.id AS PHDTagId,
    -- Generate 0 or 1 for integers, and a value between 0-10 for doubles
    CASE 
        WHEN iv.IsInteger = 1 THEN FLOOR(RAND() * 2) 
        ELSE RAND() * 10 
    END AS InitialValue,
    SYSDATETIMEOFFSET()
FROM #InitialValues iv
JOIN [dbo].[PHDTag] p ON iv.TagName = p.tagname
WHERE NOT EXISTS (SELECT 1 FROM [dbo].[Record] r WHERE r.PHDTagId = p.id);

-- Clean up the temporary table
DROP TABLE #InitialValues;
GO

PRINT 'Initial records for Water and Utilities Area have been seeded.';
GO
