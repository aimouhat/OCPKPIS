USE [OCP_KPI_Dashboard_DB]
GO

PRINT 'Adding new PHD Tags for Attrition Area...';

-- Use a MERGE statement to insert new tags only if they do not already exist.
MERGE INTO dbo.PHDTag AS Target
USING (VALUES
    ('PlantA_ID_Out_M_FinalProduct_Conce_BPL'), 
    ('PlantA_ID_Out_M_FinalProduct_Conce_CaO'),
    ('PlantA_ID_Out_M_FinalProduct_Conce_Cd'),
    ('PlantA_ID_Out_M_FinalProduct_Conce_CO2'),
    ('PlantA_ID_Out_M_FinalProduct_Conce_H2O'),
    ('PlantA_ID_Out_M_FinalProduct_Conce_MgO'),
    ('PlantA_ID_Out_M_FinalProduct_Conce_SiO2')



) AS Source (tagname)
ON Target.tagname = Source.tagname
WHEN NOT MATCHED BY TARGET THEN
    INSERT (tagname) VALUES (Source.tagname);

PRINT 'PHD Tag creation for Attrition Area complete.';
GO
