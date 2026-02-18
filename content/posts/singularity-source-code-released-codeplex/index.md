---
title: "Singularity Source Code Released to CodePlex"
date: 2008-03-04T14:28:33-05:00
slug: "singularity-source-code-released-codeplex"
draft: false
tags:
  - ".NET"
  - "C#"
  - "CodePlex"
  - "News"
  - "Operating System"
  - "Programming"
  - "Singularity"
description: "Just saw on OSNews that Microsoft Research has just released the Singularity Source Code on CodePlex. Microsoft has released source code from the..."
---

Just saw [on OSNews](http://osnews.com/story/19424/Singularity_Source_Code_Released_to_CodePlex) that Microsoft Research has just released the Singularity Source Code on CodePlex.

> Microsoft has [released source code from the Singularity research project](http://www.codeplex.com/singularity) onto Codeplex under an academic, non-commercial license. *"The Singularity Research Development Kit is based on the Microsoft Research Singularity project. It includes source code, build tools, test suites, design notes, and other background materials. The Singularity RDK is for academic non-commercial use only and is governed by [this license](http://www.codeplex.com/singularity/license)."*

If you are unfamiliar with the [Singularity Project](http://www.codeplex.com/singularity), its goal is to create an Operation System based off of the C# programming language and the .NET 1.1 Framework. (I can only image they use the .NET 1.1 Framework, because that is about the time they started the project and haven't got around to updating it.

> Singularity is a research project focused on the construction of dependable systems through innovation in the areas of systems, languages, and tools. We are building a research operating system prototype (called Singularity), extending programming languages, and developing new techniques and tools for specifying and verifying program behavior.

Some interesting things that I found while browsing the [source code](http://www.codeplex.com/singularity/SourceControl/DirectoryView.aspx?SourcePath=&changeSetId=6601 "Singularity Initial Checkin"):

1. [Singularity: Rethinking Dependable System Design](http://research.microsoft.com/displayArticle.aspx?id=1922)
2. [Building and Running Singularity RDK 1.1.pdf](http://www.codeplex.com/singularity/SourceControl/FileView.aspx?itemId=142222&changeSetId=6601)
3. [Kernel Project](http://www.codeplex.com/singularity/SourceControl/DirectoryView.aspx?SourcePath=%24%2fsingularity%2fbase%2fKernel&changeSetId=6601)
4. [X86 Processor Command Codes in C#](http://www.codeplex.com/singularity/SourceControl/DirectoryView.aspx?SourcePath=%24%2fsingularity%2fbase%2fKernel%2fSingularity%2fX86&changeSetId=6601)
5. [Some Application Built to Run on Singularity](http://www.codeplex.com/singularity/SourceControl/DirectoryView.aspx?SourcePath=%24%2fsingularity%2fbase%2fApplications&changeSetId=6601)

For anybody interested in Operating Systems this is very interesting stuff.  Especially for a guy like me that has never touched assembly or low level C programming in any kind of professional level.  Hopefully this weekend I will have some time to load it up in Virtual PC and play with it.