USE [OCP_KPI_Dashboard_DB]
GO

PRINT 'Adding new PHD Tags for Flotation Reagent Preparation...';

-- Use a MERGE statement to insert new tags only if they do not already exist.
MERGE INTO dbo.PHDTag AS Target
USING (VALUES
    ('330G_TK_01_ID_LVLA'), ('330G_TK_01_ID_LVLB'), ('330G_TK_01_OUT_Agitator_Status'),
    ('330G_TK_01_OUT_PumpD_Status'), ('330G_TK_01_OUT_PumpS_Status'), ('330G_TK_01_OUT_Pump1_Status'),
    ('330G_TK_02_ID_LVLA'), ('330G_TK_02_OUT_PumpD_Status'), ('330G_TK_02_OUT_PumpS_Status'),
    ('330G_TK_02_OUT_Agitator_Status'), ('330G_TK_02_OUT_Pump1_Status'), ('330G_TK_03_ID_LVLA'),
    ('330G_TK_03_OUT_Agitator_Status'), ('330G_TK_03_OUT_PumpD_Status'), ('330G_TK_03_OUT_PumpS_Status'),
    ('330G_TK_03_OUT_Pump1_Status'), ('330G_TK_04_ID_LVLA'), ('330G_TK_04_OUT_PumpD_Status'),
    ('330G_TK_04_OUT_PumpS_Status'), ('330G_TK_04_OUT_Agitator_Status'), ('330G_TK_04_OUT_Pump1_Status'),
    ('330G_TK_05_ID_LVLA'), ('330G_TK_05_OUT_Agitator_Status'), ('330G_TK_05_OUT_PumpD_Status'),
    ('330G_TK_05_OUT_PumpS_Status'), ('330G_TK_06_OUT_PumpD_Status'), ('330G_TK_06_OUT_PumpS_Status'),
    ('330G_TK_06_OUT_Agitator_Status'), ('330G_TK_07_ID_LVLA'), ('330G_TK_07_OUT_PumpD_Status'),
    ('330G_TK_07_OUT_PumpS_Status'), ('330G_TK_07_OUT_Pump1_Status'), ('330G_TK_08_ID_LVLA'),
    ('330G_TK_08_OUT_PumpD_Status'), ('330G_TK_08_OUT_PumpS_Status'), ('330G_TK_08_OUT_Pump1_Status'),
    ('330G_TK_09_ID_LVLA'), ('330G_TK_09_OUT_PumpD_Status'), ('330G_TK_09_OUT_PumpS_Status'),
    ('330G_TK_09_OUT_Pump1_Status'), ('340G_TK_10_ID_LVLA'), ('340G_TK_10_OUT_PumpD_Status'),
    ('340G_TK_10_OUT_PumpS_Status'), ('340G_TK_10_OUT_Pump2_Status'), ('420A_TK_01_ID_LVLA'),
    ('420A_TK_01_ID_LVLB'), ('420A_TK_01_OUT_Agitator_Status'), ('420A_TK_01_OUT_PumpD_Status'),
    ('420A_TK_01_OUT_PumpS_Status'), ('420A_TK_02_ID_LVLA'), ('420A_TK_02_ID_LVLB'),
    ('420A_TK_02_OUT_Agitator_Status'), ('420A_TK_02_OUT_PumpD_Status'), ('420A_TK_02_OUT_PumpS_Status'),('330G_TK_02_OUT_Sumpf_Pump1_Status'),('330G_TK_02_ID_Sumpf_LVL1'),('330G_TK_03_OUT_Sumpf_Pump1_Status'),
('330G_TK_04_OUT_Pump1_Status'),('330G_TK_03_ID_Sumpf_LVL1'),('330G_TK_04_ID_Sumpf_LVL1'),
('330G_TK_05_OUT_Sumpf_Pump1_Status'),('330G_TK_06_OUT_Sumpf_Pump1_Status'),('330G_TK_05_ID_Sumpf_LVL1'),
('330G_TK_06_ID_Sumpf_LVL1'),('Flotation_Reagent_Preparation_Area_ID_Out_Amine_Q'),('Flotation_Reagent_Preparation_Area_ID_Out_PhoEster_Q'),
('Flotation_Reagent_Preparation_Area_ID_Out_PhoAcid_Q')







) AS Source (tagname)
ON Target.tagname = Source.tagname
WHEN NOT MATCHED BY TARGET THEN
    INSERT (tagname)
    VALUES (Source.tagname);

PRINT 'PHD Tag creation for Flotation Reagent Preparation complete.';
GO
