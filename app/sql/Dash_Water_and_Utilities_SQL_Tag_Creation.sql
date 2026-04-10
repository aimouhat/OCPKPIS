USE [OCP_KPI_Dashboard_DB]
GO

PRINT 'Adding new PHD Tags for Water and Utilities Area...';

-- Use a MERGE statement to insert new tags only if they do not already exist.
MERGE INTO dbo.PHDTag AS Target
USING (VALUES
    ('510G_BS_01_ID_LVLA'),
    ('510G_BS_01_ID_LVLB'),
    ('510G_BS_01_OUT_PumpD_Status'),
    ('510G_BS_01_OUT_PumpS_Status'),
    ('510G_BS_01_OUT_Pump1_Status'),
    ('520G_BS_01_ID_LVLA'),
    ('520G_BS_01_ID_LVLB'),
    ('520G_BS_01_ID_In2_Water_Q'),
    ('520G_BS_01_ID_Out2_Q'),
    ('520G_BS_01_OUT_PumpD_Status'),
    ('520G_BS_01_OUT_PumpS_Status')
) AS Source (tagname)
ON Target.tagname = Source.tagname
WHEN NOT MATCHED BY TARGET THEN
    INSERT (tagname) VALUES (Source.tagname);

PRINT 'PHD Tag creation for Water and Utilities Area complete.';
GO
