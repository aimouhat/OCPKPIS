USE [OCP_KPI_Dashboard_DB]
GO

PRINT 'Adding new PHD Tags for APC Performance Assessment KPI...';

-- Use a MERGE statement to insert new tags only if they do not already exist.
MERGE INTO dbo.PHDTag AS Target
USING (VALUES
    ('320A_FC_01_05_ID_LVL5')
	
  
  
) AS Source (tagname)
ON Target.tagname = Source.tagname
WHEN NOT MATCHED BY TARGET THEN
    INSERT (tagname)
    VALUES (Source.tagname);

PRINT 'PHD Tag creation for APC Performance Assessment KPI complete.';
GO
