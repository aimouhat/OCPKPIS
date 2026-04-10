USE [OCP_KPI_Dashboard_DB]
GO

PRINT 'Adding new PHD Tags for Product Filtration Area...';

-- Use a MERGE statement to insert new tags only if they do not already exist.
MERGE INTO dbo.PHDTag AS Target
USING (VALUES
    ('240_VP_01_02_ID_Sumpf_LVL1'),
    ('240_VP_01_02_ID_Sumpf_LVL2'),
    ('240_VP_01_02_OUT_Sumpf_Pump1_Status'),
    ('240_VP_01_02_OUT_Sumpf_Pump2_Status'),
    ('240_VP_01_02_ID_Sumpf_LVL3'),
    ('CS1_ID_Status'),
    ('CS1_ID_Moist'),
    ('CS1_ID_Turb'),
    ('CS2_ID_Status'),
    ('CS2_ID_Moist'),
    ('CS2_ID_Turb'),
    ('CS3_ID_Status'),
    ('CS3_ID_Moist'),
    ('CS3_ID_Turb'),
    ('CS4_ID_Status'),
    ('CS4_ID_Moist'),
    ('CS4_ID_Turb'),
    ('SL3_OUT_Out_Dry_W'),
    ('Product_Filtration_Area_ID_Out_M_FinalProduct_Conce_BPL'),
    ('Product_Filtration_Area_ID_Out_M_FinalProduct_Conce_CaO'),
    ('Product_Filtration_Area_ID_Out_M_FinalProduct_Conce_Cd'),
    ('Product_Filtration_Area_ID_Out_M_FinalProduct_Conce_CO2'),
    ('Product_Filtration_Area_ID_Out_M_FinalProduct_Conce_H2O'),
    ('Product_Filtration_Area_ID_Out_M_FinalProduct_Conce_MgO'),
    ('Product_Filtration_Area_ID_Out_M_FinalProduct_Conce_SiO2'),
    ('Product_Filtration_Area_ID_Out_M_FinalProduct_160'),
    ('Product_Filtration_Area_ID_Out_M_FinalProduct_200'),
    ('Product_Filtration_Area_ID_Out_M_FinalProduct_3150'),
    ('Product_Filtration_Area_ID_Out_M_FinalProduct_40'),
    ('Product_Filtration_Area_ID_Out_M_FinalProduct_less40'),
    
    ('CS4_ID_Moist'),
    ('CS4_ID_Turb'),
    
    ('CS1_ID_Status'),
    ('CS2_ID_Status'),
    ('CS3_ID_Status'),
    ('CS4_ID_Status')
    
) AS Source (tagname)
ON Target.tagname = Source.tagname
WHEN NOT MATCHED BY TARGET THEN
    INSERT (tagname)
    VALUES (Source.tagname);

PRINT 'PHD Tag creation for Product Filtration Area complete.';
GO
