using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Diagnostics;
using Microsoft.Build.Framework;
using Microsoft.Build.Utilities;
using System.Security;

namespace ManagedFusion.Build
{
	/// <summary>
	/// 
	/// </summary>
	public class YuiCompress : Task
	{
		/// <summary>
		/// Gets or sets the type.
		/// </summary>
		/// <value>The type.</value>
		[Required]
		public string Type
		{
			get;
			set;
		}

		/// <summary>
		/// Gets or sets the files.
		/// </summary>
		/// <value>The files.</value>
		[Required]
		public ITaskItem[] Files
		{
			get;
			set;
		}

		/// <summary>
		/// Gets or sets a value indicating whether [show warnings].
		/// </summary>
		/// <value><c>true</c> if [show warnings]; otherwise, <c>false</c>.</value>
		public bool ShowWarnings
		{
			get;
			set;
		}

		/// <summary>
		/// Gets or sets the compressed files.
		/// </summary>
		/// <value>The compressed files.</value>
		[Output]
		public ITaskItem[] CompressedFiles
		{
			get;
			private set;
		}

		/// <summary>
		/// Formats the warning.
		/// </summary>
		/// <param name="warning">The warning.</param>
		/// <returns></returns>
		private string FormatWarning(string warning)
		{
			return warning
				.Trim()
				.Replace("[WARNING] ", String.Empty);
		}

		/// <summary>
		/// Compresses the specified file.
		/// </summary>
		/// <param name="file">The file.</param>
		private string Compress(ITaskItem file, string type)
		{
			string oldFile = file.ItemSpec;
			string newFile = oldFile.Replace("." + type, "-min." + type);

			Log.LogMessage(MessageImportance.High, "Compressing " + oldFile + " to " + newFile.Substring(newFile.LastIndexOf('\\') +1));

			Process process = new Process();
			process.StartInfo = new ProcessStartInfo {
				FileName = @"c:\program files\java\jdk1.6.0_06\bin\java.exe",
				Arguments = String.Format(
					@"-jar ""C:\development\tools\yuicompressor-2.3.5.jar"" --type {0} --charset utf8 {1} -o ""{2}"" ""{3}""",
					type,
					ShowWarnings ? "--verbose" : String.Empty,
					newFile,
					oldFile
					),
				UseShellExecute = false,
				CreateNoWindow = true,
				RedirectStandardOutput = true,
				RedirectStandardError = true
			};
			process.Start();
			process.WaitForExit(5000);

			// log any messages or warnings
			string[] warnings = process.StandardError.ReadToEnd()
				.Replace("\r", String.Empty)
				.Split(new string[] { "\n\n" }, StringSplitOptions.RemoveEmptyEntries);

			foreach(string warning in warnings)
				Log.LogWarning(null, null, null, oldFile, 1, 1, 1, 1, FormatWarning(warning), null);

			return newFile;
		}

		/// <summary>
		/// Executes this instance.
		/// </summary>
		/// <returns></returns>
		public override bool Execute()
		{
			List<ITaskItem> compressedFiles = new List<ITaskItem>(Files.Length);
			string type = Type.ToLower();

			foreach (ITaskItem file in Files)
			{
				// make sure the file at least has a value before compressing
				if (file.ItemSpec.Length > 0)
				{
					try
					{
						if (File.Exists(file.ItemSpec))
						{
							// delete any old files already compressed
							if (file.ItemSpec.EndsWith("-min." + type))
								File.Delete(file.ItemSpec);
							else
							{
								// compress the file
								string compressedFile = Compress(file, type);

								// add the file to the list of successfully compressed files
								compressedFiles.Add(new TaskItem(compressedFile));
							}
						}
						else
						{
							Log.LogError("Error in trying to find " + file.ItemSpec + ", it doesn't exist.");
						}
					}
					catch (Exception ex)
					{
						if (ex is IOException
							|| ex is UnauthorizedAccessException
							|| ex is PathTooLongException
							|| ex is DirectoryNotFoundException
							|| ex is SecurityException)
						{
							Log.LogErrorFromException(ex, false, true, file.ItemSpec);
						}
						else
						{
							throw;
						}
					}
				}
			}

			// return all the new compressed files
			CompressedFiles = compressedFiles.ToArray();

			// return if there were any errors while running this task
			return !Log.HasLoggedErrors;
		}
	}
}
