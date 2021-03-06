# Localized	07/27/2012 02:16 AM (GMT)	303:4.80.0411 	Add-AppDevPackage.psd1
# Culture = "en-US"
ConvertFrom-StringData @'
###PSLOC
PromptText=[Y] Yes [N] No (default is "N")
    PromptYesCharacter = Y
    PromptNoCharacter = N
PromptYesString=Yes
PromptNoString=No
PackageFound=Found package: {0}
CertificateFound=Found certificate: {0}
DependenciesFound=Found dependency package(s):
GettingDeveloperLicense=Acquiring developer license...
InstallingCertificate=Installing certificate...
InstallingPackage=\nInstalling package...
AcquireLicenseSuccessful=A developer license was successfully acquired.
InstallCertificateSuccessful=The certificate was successfully installed.
Success=\nSuccess: Your package was successfully installed.
WarningInstallCert=You are about to install a digital certificate to your computer's Trusted People certificate store.  Doing so carries serious security risk and should only be done if you trust the originator of this digital certificate.\n\nWhen you are done using this app, you should manually remove the associated digital certificate.  Instructions for doing so can be found here:\nhttp://go.microsoft.com/fwlink/?LinkId=243053
WarningPromptContinue=\nAre you sure you wish to continue?
ElevateActions=\nBefore installing this package, you need to do the following:
ElevateActionDevLicense=\t- Acquire a developer license
ElevateActionCertificate=\t- Install the signing certificate
ElevateActionsContinue=Administrator credentials are required to continue.  Please accept the UAC prompt and provide your administrator password if asked.
ErrorForceElevate=You must provide administrator credentials to proceed.  Please run this script without the -Force parameter or from an elevated PowerShell window.
ErrorForceDeveloperLicense=Acquiring a developer license requires user interaction.  Please rerun the script without the -Force parameter.
ErrorLaunchAdminFailed=Error: Could not start a new process as administrator.
ErrorNoScriptPath=Error: You must launch this script from a file.
ErrorNoPackageFound=Error: No package found in the script directory.  Please make sure the package you want to install is placed in the same directory as this script.
ErrorManyPackagesFound=Error: More than one package found in the script directory.  Please make sure only the package you want to install is placed in the same directory as this script.
ErrorPackageUnsigned=Error: The package is not digitally signed or its signature is corrupted.
ErrorNoCertificateFound=Error: No certificate found in the script directory.  Please make sure the certificate used to sign the package you are installing is placed in the same directory as this script.
ErrorManyCertificatesFound=Error: More than one certificate found in the script directory.  Please make sure only the certificate used to sign the package you are installing is placed in the same directory as this script.
ErrorBadCertificate=Error: The file "{0}" is not a valid digital certificate.  CertUtil returned with error code {1}.
ErrorExpiredCertificate=Error: The developer certificate "{0}" has expired. One possible cause is the system clock isn't set to the correct date and time. If the system settings are correct, contact the package owner to re-create a package with a valid certificate.
ErrorCertificateMismatch=Error: The certificate does not match the one used to sign the package.
ErrorCertIsCA=Error: The certificate can't be a certificate authority.
ErrorBannedKeyUsage=Error: The certificate can't have the following key usage: {0}.  Key usage must be unspecified or equal to "DigitalSignature".
ErrorBannedEKU=Error: The certificate can't have the following extended key usage: {0}.  Only the Code Signing and Lifetime Signing EKUs are allowed.
ErrorNoBasicConstraints=Error: The certificate is missing the basic constraints extension.
ErrorNoCodeSigningEku=Error: The certificate is missing the extended key usage for Code Signing.
ErrorInstallCertificateCancelled=Error: Installation of the certificate was cancelled.
ErrorCertUtilInstallFailed=Error: Could not install the certificate.  CertUtil returned with error code {0}.
ErrorGetDeveloperLicenseFailed=Error: Could not acquire a developer license. For more information, see http://go.microsoft.com/fwlink/?LinkID=252740.
ErrorInstallCertificateFailed=Error: Could not install the certificate. Status: {0}. For more information, see http://go.microsoft.com/fwlink/?LinkID=252740.
ErrorAddPackageFailed=Error: Could not install the package.
ErrorAddPackageFailedWithCert=Error: Could not install the package.  To ensure security, please consider uninstalling the signing certificate until you can install the package.  Instructions for doing so can be found here:\nhttp://go.microsoft.com/fwlink/?LinkId=243053
'@
