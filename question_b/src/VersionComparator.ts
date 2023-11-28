export function isGreaterThan(first: string, second: string) {
  let firstNumber: VersionMajorMinor = parseVersionString(first)
  let secondNumber: VersionMajorMinor = parseVersionString(second)
  return firstNumber.major > secondNumber.major || firstNumber.minor > secondNumber.minor;
}

interface VersionMajorMinor {
  major: number
  minor: number
}

function parseVersionString(versionString: string): VersionMajorMinor {

  let parts: string[] = versionString.split(".")
  if (parts.length != 2) {
    throw Error(`invalid version string ${versionString}, should be in format {major}.{minor} `)
  }
  let version: VersionMajorMinor = {
    major: Number(parts[0]),
    minor: Number(parts[1])
  };
  if (
    isNaN(version.major) || !Number.isFinite(version.major) ||
    isNaN(version.minor) || !Number.isFinite(version.minor)
  ) {
    throw Error(`invalid version string ${versionString}`)
  }
  return version;
}