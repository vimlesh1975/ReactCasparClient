[Setup]
AppId={{9C8B0A17-45B7-4A4A-965C-D268CCF368F5}
AppName=React Caspar Client
AppVersion=1.0.0
AppPublisher=Vimlesh Kumar
AppPublisherURL=https://vimlesh1975.github.io/ReactCasparClient/
AppSupportURL=https://vimlesh1975.github.io/ReactCasparClient/
DefaultDirName={autopf}\React Caspar Client
DefaultGroupName=React Caspar Client
AllowNoIcons=yes
PrivilegesRequired=admin
OutputDir=Output
OutputBaseFilename=ReactCasparClientSetup
Compression=lzma2
SolidCompression=yes
WizardStyle=modern
ArchitecturesAllowed=x64compatible
ArchitecturesInstallIn64BitMode=x64compatible
DisableProgramGroupPage=yes
UninstallDisplayIcon={app}\client\public\favicon.ico

[Languages]
Name: "english"; MessagesFile: "compiler:Default.isl"

[Tasks]
Name: "desktopicon"; Description: "Create a desktop shortcut"; GroupDescription: "Additional icons:"

[Files]
Source: "..\*"; DestDir: "{app}"; Flags: recursesubdirs createallsubdirs ignoreversion; Excludes: ".git\*,installer\Output\*,installer\vendor\*.zip,client\build\*,server\out\*"

[Icons]
Name: "{autoprograms}\React Caspar Client\Launch React Caspar Client"; Filename: "{app}\installer\Launch_ReactCasparClient.bat"; WorkingDir: "{app}"
Name: "{autoprograms}\React Caspar Client\Open Client URL"; Filename: "https://localhost:10000/ReactCasparClient"
Name: "{autoprograms}\React Caspar Client\Open Server URL"; Filename: "https://localhost:9000"
Name: "{autodesktop}\React Caspar Client"; Filename: "{app}\installer\Launch_ReactCasparClient.bat"; WorkingDir: "{app}"; Tasks: desktopicon

[Run]
Filename: "{cmd}"; Parameters: "/C certutil -f -addstore Root ""{app}\ca.crt"""; StatusMsg: "Installing local certificate..."; Flags: runhidden waituntilterminated
Filename: "{app}\installer\winsw\ReactCasparClientServer.exe"; Parameters: "install"; StatusMsg: "Installing server service..."; Flags: runhidden waituntilterminated
Filename: "{app}\installer\winsw\ReactCasparClientClient.exe"; Parameters: "install"; StatusMsg: "Installing client service..."; Flags: runhidden waituntilterminated
Filename: "{app}\installer\winsw\ReactCasparClientServer.exe"; Parameters: "start"; StatusMsg: "Starting server service..."; Flags: runhidden waituntilterminated
Filename: "{app}\installer\winsw\ReactCasparClientClient.exe"; Parameters: "start"; StatusMsg: "Starting client service..."; Flags: runhidden waituntilterminated
Filename: "{app}\installer\Launch_ReactCasparClient.bat"; Description: "Launch React Caspar Client now"; Flags: nowait postinstall skipifsilent

[UninstallRun]
Filename: "{app}\installer\winsw\ReactCasparClientClient.exe"; Parameters: "stop"; RunOnceId: "StopReactCasparClientClient"; Flags: runhidden waituntilterminated skipifdoesntexist
Filename: "{app}\installer\winsw\ReactCasparClientServer.exe"; Parameters: "stop"; RunOnceId: "StopReactCasparClientServer"; Flags: runhidden waituntilterminated skipifdoesntexist
Filename: "{app}\installer\winsw\ReactCasparClientClient.exe"; Parameters: "uninstall"; RunOnceId: "UninstallReactCasparClientClient"; Flags: runhidden waituntilterminated skipifdoesntexist
Filename: "{app}\installer\winsw\ReactCasparClientServer.exe"; Parameters: "uninstall"; RunOnceId: "UninstallReactCasparClientServer"; Flags: runhidden waituntilterminated skipifdoesntexist
