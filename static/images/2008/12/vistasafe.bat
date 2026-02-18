REM  SpeedyVista.com SAFE Vista Ultimate Services - last updated: 10/07/2007
sc boot ok

REM Application Experience
sc config AeLookupSvc start= auto

REM Application Information
sc config Appinfo start= demand

REM Application Layer Gateway Service
sc config ALG start= demand

REM Application Management
sc config AppMgmt start= demand

REM Background Intelligent Transfer Service
sc config BITS start= delayed-auto

REM Base Filtering System
sc config BFE start= auto

REM Block Level Backup Engine Service
sc config wbengine start= demand

REM Certificate Propagation
sc config CertPropSvc start= demand

REM CNG Key Isolation
sc config KeyIso start= demand

REM COM+ Event System
sc config EventSystem start= demand

REM COM+ System Application
sc config COMSysApp start= demand

REM Computer Browser
sc config Browser start= demand

REM Cryptographic Services
sc config CryptSvc start= demand

REM Desktop Window Manager Session Manager
sc config UxSms start= auto

REM DFS Replication
sc config DFSR start= demand

REM DHCP Client
sc config Dhcp start= auto

REM Diagnostic Policy Service
sc config DPS start= demand

REM Diagnostic Service Host
sc config WdiServiceHost start= demand

REM Diagnostic System Host
sc config WdiSystemHost start= demand

REM Distributed Link Tracking Client
sc config TrkWks start= demand

REM Distributed Transaction Coordinator
sc config MSDTC start= demand

REM DNS Client
sc config Dnscache start= auto

REM Extensible Authentication Protocol
sc config EapHost start= demand

REM Fax 
sc config Fax start= disabled

REM Function Discovery Provider Host
sc config fdPHost start= demand

REM Function Discovery Resource Publication
sc config FDResPub start= demand

REM Health Key and Certificate Management
sc config hkmsvc start= demand

REM Human Interface Device Access
sc config hidserv start= demand

REM IKE and AuthIP Ipsec Keying Modules
sc config IKEEXT start= demand

REM Interactive Services Detection
sc config UI0Detect start= demand

REM Internet Connection Sharing (ICS)
sc config SharedAccess start= demand

REM IP Helper
sc config iphlpsvc start= demand

REM IPsec Policy Agent
sc config PolicyAgent start= demand

REM KtmRm for Distributed Transaction Coordinator
sc config KtmRm start= delayed-auto

REM Link-Layer Topology Discovery Mapper
sc config lltdsvc start= demand

REM Microsoft .NET Framework NGEN
sc config clr_optimization_v2.0.50727_32 start= demand

REM Microsoft iSCSI Initiator Service
sc config MSiSCSI start= demand

REM Microsoft Software Shadow Copy Provider
sc config swprv start= demand

REM Multimedia Class Scheduler
sc config MMCSS start= auto

REM Net.Tcp Port Sharing Service
sc config NetTcpPortSharing start= disabled

REM Netlogon
sc config NetLogon start= demand

REM Network Access Protection Agent
sc config napagent start= demand

REM Network Connections
sc config Netman start= demand

REM Network List Service
sc config netprofm start= demand

REM Network Location Awareness
sc config NlaSvc start= demand

REM Network Store Interface Service
sc config nsi start= auto

REM Offline Files
sc config CscService start= disabled

REM Parental Controls
sc config WPCSvc start= disabled

REM Peer Name Resolution Protocol
sc config PNRPsvc start= demand

REM Peer Networking Grouping
sc config p2psvc start= demand

REM Peer Networking Identity Manager
sc config p2pimsvc start= demand

REM Performance Logs & Alerts
sc config pla start= demand

REM PnP-X IP Bus Enumerator
sc config IPBusEnum start= demand

REM PNRP Machine Name Publication Service
sc config PNRPAutoReg start= demand

REM Portable Device Enumerator Service
sc config WPDBusEnum start= demand

REM Print Spooler
sc config Spooler start= auto

REM Problem Reports and Solutions Control Panel Support
sc config wercplsupport start= demand

REM Program Compatibility Assistant Service
sc config PcaSvc start= auto

REM Protected Storage
sc config ProtectedStorage start= demand

REM Quality Windows Audio Video Experience
sc config QWAVE start= demand

REM ReadyBoost
sc config EMDMgmt start= auto

REM Remote Access Auto Connection Manager
sc config RasAuto start= demand

REM Remote Access Connection Manager
sc config RasMan start= demand

REM Remote Procedure Call (RPC) Locator
sc config RpcLocator start= demand

REM Remote Registry
sc config RemoteRegistry start= demand

REM Routing and Remote Access
sc config RemoteAccess start= disabled

REM Secondary Logon
sc config seclogon start= demand

REM Security Accounts Manager
sc config SamSs start= auto

REM Security Center
sc config wscsvc start= delayed-auto

REM Server
sc config LanmanServer start= demand

REM Shell Hardware Detection
sc config ShellHWDetection start= auto

REM SL UI Notification Service
sc config SLUINotify start= demand

REM Smart Card
sc config SCardSvr start= demand

REM Smart Card Removal Policy
sc config SCPolicySvc start= demand

REM SNMP Trap
sc config SNMPTRAP start= demand

REM Software Licensing
sc config slsvc start= auto

REM SSDP Discovery
sc config SSDPSRV start= demand

REM Superfetch
sc config SysMain start= auto

REM System Event Notification Service
sc config SENS start= auto

REM Tablet PC Input Service
sc config TabletInputService start= demand

REM TCP/IP NetBIOS Helper
sc config lmhosts start= demand

REM Telephony
sc config TapiSrv start= demand

REM Terminal Services
sc config TermService start= auto

REM Terminal Services Configuration
sc config SessionEnv start= demand

REM Terminal Services UserMode Port Redirector
sc config UmRdpService start= demand

REM Themes
sc config Themes start= auto

REM Thread Ordering Server
sc config THREADORDER start= demand

REM TPM Base Services
sc config TBS start= demand

REM UPnP Device Host
sc config upnphost start= demand

REM User Profile Service
sc config ProfSvc start= auto

REM Virtual Disk
sc config vds start= demand

REM Volume Shadow Copy
sc config VSS start= demand

REM WebClient
sc config WebClient start= demand

REM Windows Audio
sc config Audiosrv start= auto

REM Windows Audio Endpoint Builder
sc config AudioEndpointBuilder start= auto

REM Windows Backup
sc config SDRSVC start= demand

REM Windows CardSpace
sc config idsvc start= demand

REM Windows Color System
sc config WcsPlugInService start= demand

REM Windows Connect Now - Config Registrar
sc config wcncsvc start= demand

REM Windows Defender
sc config WinDefend start= auto

REM Windows Driver Foundation - User-mode Driver Framework
sc config wudfsvc start= demand

REM Windows Error Reporting Service
sc config WerSvc start= demand

REM Windows Event Collector
sc config Wecsvc start= demand

REM Windows Event Log
sc config Eventlog start= auto

REM Windows Firewall
sc config MpsSvc start= auto

REM Windows Image Acquisition (WIA)
sc config stisvc start= demand

REM Windows Installer
sc config msiserver start= demand

REM Windows Management Instrumentation
sc config Winmgmt start= auto

REM Windows Media Center Extender Service
sc config Mcx2Svc start= disabled

REM Windows Media Center Receiver Service
sc config ehRecvr start= disabled

REM Windows Media Center Scheduler Service
sc config ehSched start= disabled

REM Windows Media Center Service Launcher
sc config ehstart start= disabled

REM Windows Media Player Network Sharing Service
sc config WMPNetworkSvc start= demand

REM Windows Modules Installer
sc config TrustedInstaller start= demand

REM Windows Presentation Foundation Font Cache 3.0.0.0
sc config FontCache3.0.0.0 start= demand

REM Windows Remote Management (WS-Management)
sc config WinRM start= demand

REM Windows Search
sc config Wsearch start= auto

REM Windows Time
sc config W32Time start= auto

REM Windows Update
sc config wuauserv start= delayed-auto

REM WinHTTP Web Proxy Auto-Discovery Service
sc config WinHttpAutoProxySvc start= demand

REM Wired AutoConfig
sc config dot3svc start= demand

REM WLAN AutoConfig
sc config Wlansvc start= demand

REM WMI Performance Adapter
sc config wmiApSrv start= demand

REM Workstation
sc config LanmanWorkstation start= auto

REM  SpeedyVista.com SAFE Vista Ultimate Services
