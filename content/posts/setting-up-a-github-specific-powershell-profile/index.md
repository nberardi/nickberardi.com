---
title: "Setting Up A GitHub Specific PowerShell Profile"
date: 2012-05-22T05:00:06-05:00
slug: "setting-up-a-github-specific-powershell-profile"
draft: false
tags:
  - "Git"
  - "GitHub"
  - "powershell"
description: "I was very excited to see that after several months of work Phil and Paul finally released their much talked about GitHub client for Windows. It has a..."
---

I was very excited to see that after several months of work [Phil](http://haacked.com) and [Paul](http://blog.paulbetts.org/) finally [released](https://github.com/blog/1127-github-for-windows) their much talked about [GitHub client for Windows](http://windows.github.com). It has a great Metro style, and is very fluid and functional.  Here is an example of what my client looks like

![](/nickberardi.com/images/2012/05/GitHub-Client.png "GitHub Client")

As you can see it is very clean, and there are no typical windows borders or title bar which is common for Metro styled apps. As I was exploring the app, I stumbled on the fact that if you are using PowerShell as your default shell.

![](/nickberardi.com/images/2012/05/GitHub-Client-Default-Console.png "GitHub Client Default Console")

You can actually customize the PowerShell profile used by the app to be different and separate from your default Windows PowerShell profile. This can be useful if you want to install a separate set of modules or configure it in a different way than your default Windows PowerShell profile. To do this you create the PowerShell profile in the following path.

*%USERPROFILE%\Documents\WindowsPowerShell\GitHub.PowerShell\_profile.ps1*

Here is how I configured my GitHub specific PowerShell profile.

```
###############################################################################  
# global variables
###############################################################################
$profileDir = [System.IO.Path]::GetDirectoryName($profile)

###############################################################################
# Set up a simple prompt, adding the git prompt parts inside git repos
###############################################################################
function prompt {  
    $realLASTEXITCODE = $LASTEXITCODE

    Write-Host

    # Reset color, which can be messed up by Enable-GitColors
    $Host.UI.RawUI.ForegroundColor = $GitPromptSettings.DefaultForegroundColor

    Write-VcsStatus

    Write-Host($pwd) -ForegroundColor Green

    $global:LASTEXITCODE = $realLASTEXITCODE

    return "$ "
}

###############################################################################
# Exposes the environment vars in a batch and sets them in this PS session
###############################################################################
function Get-Batchfile($file)  
{
    $theCmd = "`"$file`" & set" 
    cmd /c $theCmd | Foreach-Object {
        $thePath, $theValue = $_.split('=')
        Set-Item -path env:$thePath -value $theValue
    }
}

###############################################################################
# Sets the VS variables for this PS session to use
###############################################################################
function VsVars32($version = "10.0")  
{
    $theKey = "HKLM:SOFTWARE\Microsoft\VisualStudio\" + $version
    $theVsKey = get-ItemProperty $theKey
    $theVsInstallPath = [System.IO.Path]::GetDirectoryName($theVsKey.InstallDir)
    $theVsToolsDir = [System.IO.Path]::GetDirectoryName($theVsInstallPath)
    $theVsToolsDir = [System.IO.Path]::Combine($theVsToolsDir, "Tools")
    $theBatchFile = [System.IO.Path]::Combine($theVsToolsDir, "vsvars32.bat")
    Get-Batchfile $theBatchFile
    [System.Console]::Title = "Visual Studio " + $version + " Windows Powershell"
}

###############################################################################
# aliases
###############################################################################

set-alias wide   format-wide

###############################################################################
# functions
###############################################################################

set-content function:\mklink "cmd /c mklink `$args"

###############################################################################
# setup posh-git
###############################################################################

Push-Location (Split-Path -Path $MyInvocation.MyCommand.Definition -Parent)

# add Git to PATH
$env:path += ";" + (Get-Item "Env:ProgramFiles(x86)").Value + "\Git\bin"

# import posh-git
Import-Module posh-git

# customize git prompt display settings
$global:GitPromptSettings.BeforeText = '['
$global:GitPromptSettings.AfterText = '] '
$global:GitPromptSettings.BranchAheadForegroundColor = [ConsoleColor]::DarkGreen
$global:GitPromptSettings.WorkingForegroundColor = [ConsoleColor]::Magenta
$global:GitPromptSettings.UntrackedForegroundColor = [ConsoleColor]::Magenta

# set TERM to cygwin
Enable-GitColors

Pop-Location

Start-SshAgent -Quiet
```

Let me know your configuration and any tips you have about the new GitHub app. A big thanks should be given to Phil and Paul for making our lives better.