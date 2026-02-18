---
title: "TF220064 - Team Foundation Server 2008 - Reporting Service Permissions"
date: 2007-11-19T17:34:15-05:00
slug: "tf220064-team-foundation-server-2008-reporting-service-permissions"
draft: false
tags:
  - "Microsoft"
  - "reporting service"
  - "Team Foundation Server"
  - "TF220064"
  - "Visual Studio"
description: "I decided to be one of those early installers that brave the RTM and hope everything has been programed correctly, so my current system doesn't get blown..."
---

I decided to be one of those early installers that brave the RTM and hope everything has been programed correctly, so my current system doesn't get blown away in the upgrade process. I have a small in home Team Foundation Server that I use for my home based business and personal coding. So an upgrade is pretty risky, in that I risk loosing everything. Knowing all the risks I decided to move forward and everything was going smoothly with installing Visual Studio 2008 Team Foundation Server, until I ran in to the follow problem.

> ---------------------------
> Microsoft Visual Studio 2008 Team Foundation Server Setup
> ---------------------------
> TF220064: An error occurred while the Setup program was querying the settings from the server that is running SQL Server Reporting Services. This error is most likely caused by your account not having the required administrative permissions on the server that is running Reporting Services. Click Next to try again. For more information about this error, see the installation logs. For more information about the installation logs, see "Troubleshooting Installation for Team Foundation" in the Team Foundation Installation Guide.
> ---------------------------
> OK
> ---------------------------

The document above told me to reference this file *Drive:\Documents and Settings\SetupAccount\Local Settings\Temp \dd*install*vstf*tfc*90.txt*. I found the following reference at the bottom of the log file.

> [11/19/07,21:01:32] TFSUI: getcurrenttfsproperties.exe: --- STATUS: TfsIntegration..tbl\_service\_interface has at least one row in it
> [11/19/07,21:01:32] TFSUI: getcurrenttfsproperties.exe: --- STATUS: Found Reports.ReportsService=<http://team.coderjournal.com/ReportServer/ReportService.asmx>
> [11/19/07,21:01:32] TFSUI: getcurrenttfsproperties.exe: --- STATUS: Writing VSTF\_RS\_SERVER=team.coderjournal.com into C:\Documents and Settings\nick\Local Settings\Temp\SIT41264.tmp\TfsCurrConfig.ini section Config
> [11/19/07,21:01:32] Setup.exe: AddGlobalCustomProperty
> [11/19/07,21:01:32] TFSUI: \*\*\*ERRORLOG EVENT\*\*\* : getcurrenttfsproperties.exe: \*\*\* ERROR: Failed to call WMI on the RS server. The most likely cause is that the setup user does not have the required permissions: System.UnauthorizedAccessException: Access is denied. (Exception from HRESULT: 0x80070005 (E\_ACCESSDENIED))
> [11/19/07,21:01:32] Setup.exe: AddGlobalCustomProperty
> [11/19/07,21:01:32] TFSUI: \*\*\*ERRORLOG EVENT\*\*\* : getcurrenttfsproperties.exe: at System.Runtime.InteropServices.Marshal.ThrowExceptionForHRInternal(Int32 errorCode, IntPtr errorInfo)
> [11/19/07,21:01:32] Setup.exe: AddGlobalCustomProperty
> [11/19/07,21:01:32] TFSUI: \*\*\*ERRORLOG EVENT\*\*\* : getcurrenttfsproperties.exe: at System.Management.ManagementScope.InitializeGuts(Object o)
> [11/19/07,21:01:32] Setup.exe: AddGlobalCustomProperty
> [11/19/07,21:01:32] TFSUI: \*\*\*ERRORLOG EVENT\*\*\* : getcurrenttfsproperties.exe: at System.Management.ManagementScope.Initialize()
> [11/19/07,21:01:32] Setup.exe: AddGlobalCustomProperty
> [11/19/07,21:01:32] TFSUI: \*\*\*ERRORLOG EVENT\*\*\* : getcurrenttfsproperties.exe: at System.Management.ManagementScope.Connect()
> [11/19/07,21:01:32] Setup.exe: AddGlobalCustomProperty
> [11/19/07,21:01:32] TFSUI: \*\*\*ERRORLOG EVENT\*\*\* : getcurrenttfsproperties.exe: at GetCurrentTfsProperties.WmiHelper.FindAllInstancesOfClass(String wmiNamespace, String wmiClass)
> [11/19/07,21:01:32] Setup.exe: AddGlobalCustomProperty
> [11/19/07,21:01:32] TFSUI: \*\*\*ERRORLOG EVENT\*\*\* : getcurrenttfsproperties.exe: at GetCurrentTfsProperties.WmiHelper.FindSqlRsInstance(String reportServerHostname, String databaseInstanceName, String dataSourceString)
> [11/19/07,21:01:32] TFSUI: getcurrenttfsproperties.exe: Process exited with exit code: 15[11/19/07,21:01:32] TFSUI: Done calling CheckExistingTfsInstallation in GetTfsPropertiesFromDt
> [11/19/07,21:01:32] vs70uimgr: Entering DisplayMessage() method.
> [11/19/07,21:01:32] vs70uimgr: DisplayMessage\_START:TF220064: An error occurred while the Setup program was querying the settings from the server that is running SQL Server Reporting Services. This error is most likely caused by your account not having the required administrative permissions on the server that is running Reporting Services. Click Next to try again. For more information about this error, see the installation logs. For more information about the installation logs, see "Troubleshooting Installation for Team Foundation" in the Team Foundation Installation Guide.
> [11/19/07,21:01:33] vs70uimgr: DisplayMessage\_END:TF220064: An error occurred while the Setup program was querying the settings from the server that is running SQL Server Reporting Services. This error is most likely caused by your account not having the required administrative permissions on the server that is running Reporting Services. Click Next to try again. For more information about this error, see the installation logs. For more information about the installation logs, see "Troubleshooting Installation for Team Foundation" in the Team Foundation Installation Guide.

From what I could tell the problem was in the database TfsIntegration..tbl*service*interface and had something to do with the follow record.

> 3 ReportsService <http://team.coderjournal.com/ReportServer/ReportService.asmx>

So on a hunch I just changed the above to. (TEAM-SERVER is the name of my server)

> 3 ReportsService <http://TEAM-SERVER/ReportServer/ReportService.asmx>

Then I continued with the installation and everything proceeded as Microsoft envisioned.