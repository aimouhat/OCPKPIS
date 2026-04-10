USE [OCP_KPI_Dashboard_DB]
GO

PRINT 'Seeding initial record data for APC Performance Assessment KPI tags...';

CREATE TABLE #InitialValues (
    TagName VARCHAR(255) PRIMARY KEY
);

INSERT INTO #InitialValues (TagName) VALUES
    ('PlantA_ID_APC_Aveva_OnlineTime'),
    ('PlantA_ID_APC_Aveva_Utilization'),
    ('PlantA_ID_APC_ABB_OnlineTime'),
    ('PlantA_ID_APC_ABB_Utilization'),
    ('PlantA_ID_APC_FLS_OnlineTime'),
    ('PlantA_ID_APC_FLS_Utilization'),
    ('PlantA_ID_APC_HWLProfiloop_OnlineTime'),
    ('PlantA_ID_APC_HWLProfiloop_Utilization'),
    ('PlantA_ID_APC_HWLPWO_ModelAccuracy'),
    ('PlantA_ID_APC_HWLPWO_OnlineTime'),
    ('PlantA_ID_APC_HWLPWO_TimeConstrained'),
    ('PlantA_ID_APC_HWLPWO_Utilization'),
    ('PlantA_ID_APC_ABB_ModelAccuracy'),
    ('PlantA_ID_APC_ABB_TimeConstrained'),
    ('PlantA_ID_APC_FLS_ModelAccuracy'),
    ('PlantA_ID_APC_FLS_TimeConstrained'),
    ('PlantA_ID_APC_HWLProfiloop_ModelAccuracy'),
    ('PlantA_ID_APC_HWLProfiloop_TimeConstrained'),
    ('PlantA_ID_APC_Aveva_ModelAccuracy'),
    ('PlantA_ID_APC_Aveva_TimeConstrained');

INSERT INTO dbo.Record (PHDTagId, value, timestamp)
SELECT
    p.id,
    RAND() * 10 AS value, -- All tags are decimal, so generate a random value between 0 and 10
    SYSDATETIMEOFFSET()
FROM dbo.PHDTag p
JOIN #InitialValues iv ON p.tagname = iv.TagName
WHERE NOT EXISTS (SELECT 1 FROM dbo.Record r WHERE r.PHDTagId = p.id);

DROP TABLE #InitialValues;

PRINT 'Initial data seeding for APC Performance Assessment KPI complete.';
GO
