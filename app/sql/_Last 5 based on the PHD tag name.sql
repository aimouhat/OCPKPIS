SELECT TOP 5
    T.tagname,
    R.Value,
    R.TimeStamp
FROM
    [OCP_KPI_Dashboard_DB].[dbo].[Record] AS R
JOIN
    [OCP_KPI_Dashboard_DB].[dbo].[PHDTag] AS T ON R.PHDTagId = T.Id
WHERE
    T.tagname = '320A_FC_01_05_OUT_Agitator_Status1'
ORDER BY
    R.TimeStamp DESC;