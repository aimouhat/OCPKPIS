USE [OCP_KPI_Dashboard_DB]
GO

PRINT 'Adding new PHD Tags for Coarse Reject Area...';

-- Use a MERGE statement to insert new tags only if they do not already exist.
MERGE INTO dbo.PHDTag AS Target
USING (VALUES
    ('Coarse_Reject_Handling_Area_ID_M_Sterile_160'),
    ('Coarse_Reject_Handling_Area_ID_M_Sterile_200'),
    ('Coarse_Reject_Handling_Area_ID_M_Sterile_3150'),
    ('Coarse_Reject_Handling_Area_ID_M_Sterile_40'),
    ('Coarse_Reject_Handling_Area_ID_M_Sterile_less40'),
    ('Coarse_Reject_Handling_Area_ID_M_Sterile_Conce_BPL'),
    ('Coarse_Reject_Handling_Area_ID_M_Sterile_Conce_Cd'),
    ('Coarse_Reject_Handling_Area_ID_M_Sterile_Conce_H2O'),
    ('CT1_ID_Status'),
    ('CT1_prime_ID_Status'),
    ('CT2_ID_Status'),
    ('CT2_prime_ID_Status'),
    ('T1_ID_Status'),
    ('T1_prime_ID_Status'),
    ('CT2_OUT_Out_Dry_W'),
    ('CT2_prime_OUT_Out_Dry_W')
) AS Source (tagname)
ON Target.tagname = Source.tagname
WHEN NOT MATCHED BY TARGET THEN
    INSERT (tagname) VALUES (Source.tagname);

PRINT 'PHD Tag creation for Coarse Reject Area complete.';
GO
