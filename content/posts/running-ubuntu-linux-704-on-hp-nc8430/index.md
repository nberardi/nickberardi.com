---
title: "Running Ubuntu Linux 7.04 On HP NC8430"
date: 2007-10-12T11:29:11-05:00
slug: "running-ubuntu-linux-704-on-hp-nc8430"
draft: false
tags:
  - "HP"
  - "Linux"
  - "Ubuntu"
description: "I have to preface this with I did not write the following it is just a mirror of http://fp.ath.cx/nc8430-linux-howto.html, but I found it so useful that I..."
---

I have to preface this with I did not write the following it is just a mirror of <http://fp.ath.cx/nc8430-linux-howto.html>, but I found it so useful that I needed to post

---

## running the hp nc8430 under linux using ubuntu 7.04 (feisty fawn)

|  |  |
| --- | --- |
| hp nc8430 | The hp nc8430 is a powerful notebook for the business user with a lot of hardware and gadgets. This guide aims to help users who want to run Linux on this hardware while achieving feature-parity with a comparable setup of competing operating systems. The guide does not only cover the several hardware-components, but also tackels the typical software-functionality an average business-user might need. Additional input welcome at [[airflow.2007@gmail.com](mailto:airflow.2007@gmail.com)](mailto:<a href='mailto:airflow.2007@gmail.com'>airflow.2007@gmail.com</a>). |

# contents

1. [initial install](#install)
2. [enabling 3d-desktop functionality (with xgl and compiz)](#xgl)
3. [wireless lan (802.11b/g) supporting wpa2](#wpa2)
4. [enterprise security using 802.1x (peap using ms-chapv2)](#dot1x)
5. [cisco (compatible) client vpn](#vpn)
6. [umts/gprs pcmcia datacard](#umts)
7. [enable laptop mode (for power saving)](#power)
8. [replacement for microsoft outlook](#evo)
9. [migrating mails from microsoft outlook to evolution](#migrate)
10. [signing and encrypting mails using evolution](#crypto)
11. [terminal server sessions (rdp, citrix, vnc)](#ts)
12. [creating custom keyboard shortcuts in gnome](#sc)
13. [alternative method of accessing network-shares: fusesmb](#share)
14. [cosmetic stuff](#stuff)
15. [hardware](#hw)
16. [caveats](#probs)

# initial install

The installation of Linux on this laptop was my first experience with Ubuntu. I used the newest version available, which is 7.04. Just go to <http://www.ubuntu.net/>, download the ISO and burn it. Important: After choosing the "Desktop Edition", be sure to checkbox to indicate you want the alternate desktop CD. The reason for that is a bug which exists in the installer, which prevents the right drivers for the ATI-graphics-adapter from being loaded. With the alternate image you'll install using a text-mode installer, and afterwards you'll have to install the necessary drivers by using the instructions below.

1. Boot using PC (Intel x86) alternate install CD for Ubuntu or Kubuntu.
2. Start text mode installer and install Ubuntu/Kubuntu.
3. Finish Install and reboot.
4. Enable the universe and multiverse repositories of Ubuntu by uncommenting the obvious lines in /etc/apt/sources.list.
5. Update package list and upgrade any packages needed.

   ```
   # sudo apt-get update# sudo apt-get dist-upgrade
   ```
6. Install fglrx closed source driver for ATI video cards.

   ```
   # sudo apt-get install xorg-driver-fglrx
   ```
7. Update loaded modules.

   ```
   # sudo depmod -a
   ```
8. Configure /etc/X11/xorg.conf

   ```
   # sudo aticonfig --initial
   ```
9. Reboot. The next time you login into Gnome, turn on the use of the proprietary driver by using the Restricted Driver Manager in System/Administration (Gnome even asks you proactive about that).

# enabling 3d-desktop functionality (with xgl and compiz)

We want a sophisticated desktop with 3D-functionality to make efficient use of our built in ati-graphics-adapter. Ubuntu uses compiz for that, which is already included in the default set of installed software of a fresh installation. Unluckily, the default-Xserver used is not capable of using this extension. We have to enable XGL first, which makes a few manual steps necessary.

1. Install the Xserver:

   ```
   # sudo apt-get install xserver-xgl
   ```
2. Good now, XGL won't load on its own so we need to write a few scripts to have it start.

   ```
   # sudo gedit /usr/local/bin/startxgl.sh
   ```
3. Now copy and paste this into the file that pops up:

   ```
   #!/bin/shXgl :1 -fullscreen -ac -br -accel xv:pbuffer -accel glx:pbuffer &

   DISPLAY=:1

   cookie="$(xauth -i nextract - :0 | cut -d ' ' -f 9)"

   xauth -i add :1 . "$cookie"

   exec dbus-launch --exit-with-session gnome-session
   ```
4. SAVE THIS FILE! Once its done saving, make that fire executable (like a program) by pasting this into a terminal:

   ```
   # sudo chmod a+x /usr/local/bin/startxgl.sh
   ```
5. Now we need to make a way to start that session from your login menu, paste this into a terminal:

   ```
   # sudo gedit /usr/share/xsessions/xgl.desktop
   ```
6. And paste this into the file:

   ```
   [Desktop Entry]Encoding=UTF-8

   Name=GNOME with XGL

   Comment=

   Exec=/usr/local/bin/startxgl.sh

   Icon=

   Type=Application
   ```
7. Now make this script executable by pasting this into a terminal:

   ```
   # sudo chmod a+x /usr/share/xsessions/xgl.desktop
   ```
8. Make sure that you have this setting at the bottom of the configuration file /etc/X11/xorg.conf:

   ```
   Section "Extensions"        Option          "Composite"     "0"

   EndSection
   ```
9. Reboot. Now it's possible to use the new Xserver by choosing it the next time you login via GDM. Just try it out, log out and right log in again but you must choose the new session before that --> GNOME with XGL. Make it default (Gnome asks you for that).
10. Enable Desktop Effects (can be found in System/Preferences).
11. You can optionally install the gnome-compiz-manager (either on the bash like before or by using the Synaptic Package Manager. You then have additional options to configure the 3D-effects.

# wireless lan (802.11b/g) supporting wpa2

Wireless LAN should work out of the box, but for the newest encryption standards like WPA or WPA2 you can't use default drivers from Ubuntu. You have to use the proprietary driver from Broadcom for that (using ndiswrapper).

1. Install the ndiswrapper-utils which are part of the Ubuntu repository. Use the tool of your like (e.g. Synaptic Package Manager).
2. Remove the driver which is not fully capable:

   ```
   # sudo ndiswrapper -e bcmwl5
   ```
3. Download the proprietary driver e.g. from the DELL-site and extract it:

   ```
   wget http://ftp.us.dell.com/network/R151517.EXEunzip -a R151517.EXE
   ```
4. Change into the DRIVER directory and issue the following commands to use the proprietary drivers:

   ```
   # sudo ndiswrapper -i bcmwl5.inf# sudo ndiswrapper -l
   ```

   You should see an output like that:

   ```
   bcmwl5 : driver installed        device (14E4:4311) present (alternate driver: bcm43xx)
   ```
5. Make sure to configure ndiswrapper to start on boot:

   ```
   sudo ndiswrapper -msudo modprobe ndiswrapper

   sudo echo ndiswrapper >> /etc/modules
   ```

After a lot of playing with the settings and seemingly unreliable wireless asosiation, I finally found the perfect setting for the network manager: I recommend setting both the wired and the wireless NIC to "roaming mode" (NOT "DHCP"). The network manager intelligently detects whether an interface is up on Layer 2 and if yes, it starts DHCP, which is what you normally want.

# enterprise security using 802.1x (peap using ms-chapv2)

Connecting to a 802.1x secured wireless network is easily possible with the gnome network manager, without installing any additional software. There are two possible pitfalls:

1. Detected WLANs are presented in a list when you click the network applet in the taskbar. While with simple password-protected networks you can use this list, you can't do it with enterprise-security enabled networks. You have to use the "Connect to other Wireless Network..."-dialog and manually give the name of it.
2. In the following dialog you also have to choose the kind of security your network uses. You might search for "Dynamic WEP", if your network uses it. Don't be confused, just choose "WPA Enterprise", even if it's technically not correct. If you do, you'll have the option to choose "Dynamic WEP" at the drop-down list "Key Type". The rest of the configuration is self-explanatory.

# cisco (compatible) client vpn

Using company resources via virtual private networks is an essential functionality for many business users. You might want to use the original Cisco VPN client for Linux for that, but there is also an open-source alternative which I prefer.

Just install vpnc and network-manager-vpnc, which is both available in the repositories already. After that, you can easily configure VPNs using the gnome network manager. It's in fact self-explanatory, so I won't get into detail here. Just one hint: If you don't know your group-password (this could happen because you might just have gotten a pcf-file from your network administrator), you can decrypt the password yourself by using [this tool](http://www.unix-ag.uni-kl.de/%7Emassar/bin/cisco-decode).

The open-source variant is not yet capable of establishing NAT-T over TCP. This shouldn't be a problem, just tell your network-administrator to enable NAT-T over UDP, too! :)

# umts/gprs pcmcia datacard

I use a UMTS/GPRS PCMCIA datacard (HUAWEI E630) to connect to network services when travelling around. Support for this is a breeze. I have to admit that I "cheated" a little bit by disabling the PIN on the SIM of the datacard (i just put it in a phone and did it there). It is possible to keep the PIN-protection by modifying some scripts, i just didn't do it yet.

The card is recognized from the system as /dev/ttyUSB0 (if you want to doublecheck, have a look at /var/log/messages when inserting the card). In the Gnome Network Manager, you now have to set up the "Modem connection", because technically this is how UMTS-access works.

Enable the connection by ticking the checkbox. For my provider (A1 mobilkom) I have to use the number "\*99#" as the phonenumber, the Account data for this provider is always [ppp@a1plus.at](mailto:ppp@a1plus.at)/ppp for username/password. Other providers may use other data, you have to find that out.   
In the second tab just set the device for the modem (/dev/ttyUSB0).   
In the Options-tab be sure to check all three options ("Set modem as default route to internet", "Use the Internet service provider nameservers" and "Retry if the connections breaks or fails to start").

Now you have the ability to connect via UMTS when the datacard is inserted just by clicking "Dial Up Connections" and choosing "connect to ppp0 via Modem" in the left-click-menu of the network manager.

OK, this is purely cosmetical now: If you want to modify the string "ppp0" to something more meaningful, you may do so by editing the line "provider ppp0" in the file /etc/network/interfaces to whatever you like. After that, you have to rename the settings file in the directory /etc/ppp/peers (just use the command "mv" as root).

# enable laptop mode (for power saving)

Power saving features are not so advanced in Linux as in other competing operating systems. You typically won't get the same uptime with a fully charged battery. To eleviate this situation, you can enable the so called "laptop mode". It is not turned on by default, because some other laptop-models have problems with it.

- Enable it by editing etc/default/acpi-support and setting setting ENABLE\_LAPTOP\_MODE=true.
- While this works in most cases, there are some situations where the power-saving mode does not kick in correctly (see [Bug #108611](https://bugs.launchpad.net/ubuntu/+source/acpi-support/+bug/108611)). You might want to use the following workaround:

  ```
  # sudo update-rc.d laptop-mode multiuser
  ```

The reason behind this bug is the fact that the script which checks if laptop-mode should be enabled or not is called only when there is a related ACPI-event, which is not the case in some situations (e.g. when you boot up with no AC plugged in).

# replacement for microsoft outlook

You may just use Evolution (which comes preinstalled) for that. I have used it for a couple of days now and I have to say I'm pretty unsatisfied about it. In the following I point out the problems I have with the application:

- Bad performance. Taking into account that mail is basically the most important application I'm not very happy. I'll mention a few ways on how you can significantly improve performance. Note: I use "Microsoft Exchange" as the protocol, as this is the only protocol which supports the calendar functions.
  - Be sure to check "Automatically synchronize account locally" within the settings for your mail-account. There is an additional setting for each folder on the server, which can be accessed by right-click/properties in evolution.
  - Even if you walked through the two steps above, really \*huge\* online-folders (like typically the "sent-mails"-folder on the server are not usable with Evolution. The first time you access it in an Evolution-session you have to wait a few minutes, which is a PITA. The solution for this is to just not use them, but move such huge folders to your local mail-store in Evolution. Huge folders work fine in Evolution when they are stored locally.
  
- The calendar-functionality seems to work, but imperfectly only. I have problems seeing some events there, particularly recurring events and events which I got via an invitation which I accepted. I guess the situation improves as I start to accept invitations out from Evolution (so that the appointment is created by Evolution itself).
- You can configure the folder where sent mails are stored. It's by default not the same folder used by outlook (which uses the "sent mail"-folder on the server, but instead a local one. You may adapt this for your needs.

# migrating mails from microsoft outlook to evolution

Are you searching for a way to easily migrate your mail-archive from microsoft outlook to evolution? I was, too, and about to give up, as all guides on the net only suggest the method to convert your pst-files to the mbox-format (e.g. with readpst, which created corrupted mbox-files when I tried). After that you would have to import every single mbox-file manually and recreate the directory-structure of your pst-file. This is a nightmare when you have a grown directory-structure consisting of many nested subfolders.

However, I found a way to circumvent this tedious process:

1. Install Thunderbird (i used version 2.0.0.4) in Windows, that is where your Outlook-installation with its pst-files is.
2. Import your locally stored mails from Outlook to Thunderbird. This works fine, as long as your folders have no slash (/) within their names - otherwise rename.
3. Your mails are now imported into your Thunderbird-installation using similar data-structures like Evolution uses it. The next step is to copy this structure (close all applications first) over to the Evolution-folder. In my case this was from Documents and Settings/<username>/Application Data/Thunderbird/Profiles/<random>.default/Mail/Local Folders/<PST-root-folder> to ~/.evolution/mail/local.<
4. While this data can be used by Evolution, it's not complete, as Evolution normally would generate some more files (with endings like .ibex.indes and .cmeta). Luckily, those are generated automatically the first time you start Evolution. Be patient during this recreation process as Evolution is just stuck for a few moments in the meanwhile.
5. Additionaly, some unneeded files (in fact all those with the .msf ending) can (and should) be removed:

   ```
   airflow@ubuntu:~/.evolution/mail/local$ find . -name *.msf -exec rm -vrf {} \;removed `./Mailarchiv.sbd/Sent.msf'

   removed `./Mailarchiv.sbd/Privat.msf'

   removed `./Mailarchiv.sbd/Kunden.sbd/Cisco Expo.msf'

   ~
   ```

# signing and encrypting mails using evolution

Encrypting e-mail with Evolution is well implemented and easy to use. Both encryption via GnuPG and via certificates (S/MIME) is supported by default. No fiddling with plug-ins (like in Outlook) needed.

- Regarding GnuPG, Evolution automatically makes use of the keys in your keyring. The only thing you have to configure in Evolution is the Key-ID of the key you want to use for signing/encrypting. A detailled description on how to create you own keys with GnuPG is out of the scope of this document, please search the web for this.
- For S/MIME, you have to import the certificate you want to use in the certificate manager of Evolution first. It's the icon at the bottom in the Evolution-preferences. I tried with PEM-encoded certificates, which worked on the first try. If you get the error-message "Cannot add SMIMEEncKeyPrefs attribute" when you try to use the certificate, you have to check the option "Trust this CA to identify email users" in the authorities list of the certificate manager.

# terminal server sessions (rdp, citrix, vnc)

RDP and VNC effectively work out of the box using the Terminal Server Client offered in the pre installed Gnome-applications. For citrix you have to [download](http://www.citrix.com/site/SS/downloads/details.asp?dID=2755&downloadID=3323) and install the client from the Citrix-Homepage. Just follow the simple instructions

1. The Citrix-client has a dependency we have to install first: libmotif3 (it's in the repositories).
2. Unpack the file downloaded previously, unpack it and run the installer (as root):

   ```
   # sudo -s# tar -xvfz packagename.tar.gz

   # ./setupwfc
   ```
3. Now you can create and start Citrix-sessions with the "Citrix Presentation Server Client". If you have several configured sessions and you don't always have to startup the ugly looking client and choose the session there, you can create shortcuts with this command:

   ```
   /usr/lib/ICAClient/wfica -desc "Navision"
   ```

# creating custom keyboard shortcuts in gnome

I had problems with the built-in gnome tool to create own shortcuts. I assume it has to do with the fact that I don't use metacity as a windows-manager, but compiz. You can create the shortcuts via using the gconf-editor. This application is comparable to the regeditor in Windows. Start it (<Alt>+F2 and type gconf-editor) and edit the keys in /apps/compiz/general/allscreens/options.

Example of putting the file-manager nautilus to <the button with the flag> + E:

```
command0: nautilusrun_command0_key: <Super>E
```

# alternative method of accessing network-shares: fusesmb

Gnome offers a very comfortable way of accessing network-shares via a variety of protocols. Using this method will result in locations like smb://172.21.31.41/home, which some applications can't handle properly. This can really be a showstopper, if you need those applications accessing the samba-shares. I didn't want to hassle around with smbclient, mountpoints with scripts, either. So I tried out fusesmb, which seems to do the job quite well. The only drawback is that you have to configure authentication (if needed) in a config-file (it's not dynamically handled via dialogs).

Follow the instructions in [this thread](http://ubuntuforums.org/showthread.php?t=525736&highlight=fusesmb), if you want to try it out.

# cosmetic stuff

Ubuntus default splash-screens are not bad, remind of Africa (which makes sense), but can be changed easily to match your style better.

- The Gnome splash-screen can be changed by using the Configuration Editor. It doesn't seem to have a link in the application menus, so just launch it from the shell (gconf-editor). Go into /apps/gnome-session/options/ and edit the variable splash\_image.
- When logging in, the screen shortly switches to an ugly brown color. You can change this in the gdm-settings (sudo gdm-setup, then on the second tab).

# hardware

This is basically the important output from lcpci.

- Intel Corporation 82801GBM/GHM (ICH7 Family) Serial ATA Storage Controller AHCI (rev 01)
- ATI Technologies Inc M56P [Radeon Mobility X1600]
- Texas Instruments PCIxx12 Cardbus Controller
- Texas Instruments PCIxx12 OHCI Compliant IEEE 1394 Host Controller
- Texas Instruments 5-in-1 Multimedia Card Reader (SD/MMC/MS/MS PRO/xD)
- Texas Instruments PCIxx12 GemCore based SmartCard controller
- Broadcom Corporation NetXtreme BCM5753M Gigabit Ethernet PCI Express
- Broadcom Corporation Dell Wireless 1390 WLAN Mini-PCI Card (rev 01)

# caveats

- VPN not possible when using datacard: [known issue](http://bugzilla.gnome.org/show_bug.cgi?id=354068), which is expected to be fixed in v0.7 of the gnome network manager.
- Enabled desktops effects break some java-programs (e.g. grey windows without any content). I've seen this arising with Cisco's ASDM and similar java-applications. Luckily there is a simple workaround: Add the line "AWT\_TOOLKIT="MToolkit"" to the file /etc/environment and restart the computer.
- Cannot start a fullscreen VNC-session out of tsclient ([bug #38281](https://bugs.launchpad.net/ubuntu/+source/tsclient/+bug/38281)). Workaround: use native vncviewer from the commandline.
- Save yourself the hassle trying out lm-sensors. The chips used in this laptop aren't supported by it (at least with version 1:2.10.1-2ubuntu2).