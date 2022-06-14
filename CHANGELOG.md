# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased]

## [1.2.7] - 2022-06-14
### Fixed
- Better SpecFlow/C# support. See [@cucumber/language-service 0.30.0](https://github.com/cucumber/language-service/releases/tag/v0.30.0) for details.

## [1.2.6] - 2022-05-26
### Fixed
- Log working directory in addition to root path

## [1.2.5] - 2022-05-26
### Fixed
- Don't throw an error when generating suggestions for RegExp.

## [1.2.4] - 2022-05-26
### Fixed
- Log the root path

## [1.2.3] - 2022-05-26
### Fixed
- Don't crash on Cucumber Expression optionals following non-text or whitespace

## [1.2.2] - 2022-05-25
### Fixed
- Generate step definition now correctly uses `Given`, `When` or `Then` for undefined steps that use `And` or `But`
- Generated C# step definitions now follow SpecFlow conventions.

## [1.2.1] - 2022-05-25
### Fixed
- Errors during reindexing are hopefully fixed

## [1.2.0] - 2022-05-24
### Added
- Implemented generate step definition quick-fix

## [1.1.0] - 2022-05-23
### Added
- Implemented go to step definition shortcut

## [1.0.9] - 2022-05-12
### Fixed
- Trigger reindexing when glue code is modified

## [1.0.8] - 2022-05-12
### Fixed
- Upgraded to [@cucumber/language-server 0.10.4](https://github.com/cucumber/language-server/blob/main/CHANGELOG.md#0104---2022-05-12)

## [1.0.7] - 2022-05-12
### Added
- Publish to Open VSX Registry as well as VS Code Marketplace

## [1.0.6] - 2022-05-12
### Fixed
- Upgraded to [@cucumber/language-server 0.10.0](https://github.com/cucumber/language-server/blob/main/CHANGELOG.md#0100---2022-05-12)

## [1.0.5] - 2022-05-11
### Fixed
- Upgraded to [@cucumber/language-server 0.9.0](https://github.com/cucumber/language-server/blob/main/CHANGELOG.md#090---2022-05-11)

## [1.0.4] - 2022-05-11
### Fixed
- Upload `.visx` to GitHub releases

## [1.0.3] - 2022-05-11
### Fixed
- Configure automated release to VS Code Marketplace and https://open-vsx.org/
- Allow installation on any VS Code version `>= 1.63.2`

## [1.0.2] - 2022-05-11
### Fixed
- Hopefully fixed marketplace release automation

## [1.0.1] - 2022-05-10
### Fixed
- Fix default settings

## [1.0.0] - 2021-05-10
### Added
- First release

[Unreleased]: https://github.com/cucumber/vscode/compare/v1.2.7...HEAD
[1.2.7]: https://github.com/cucumber/vscode/compare/v1.2.6...v1.2.7
[1.2.6]: https://github.com/cucumber/vscode/compare/v1.2.5...v1.2.6
[1.2.5]: https://github.com/cucumber/vscode/compare/v1.2.4...v1.2.5
[1.2.4]: https://github.com/cucumber/vscode/compare/v1.2.3...v1.2.4
[1.2.3]: https://github.com/cucumber/vscode/compare/v1.2.2...v1.2.3
[1.2.2]: https://github.com/cucumber/vscode/compare/v1.2.1...v1.2.2
[1.2.1]: https://github.com/cucumber/vscode/compare/v1.2.0...v1.2.1
[1.2.0]: https://github.com/cucumber/vscode/compare/v1.1.0...v1.2.0
[1.1.0]: https://github.com/cucumber/vscode/compare/v1.0.9...v1.1.0
[1.0.9]: https://github.com/cucumber/vscode/compare/v1.0.8...v1.0.9
[1.0.8]: https://github.com/cucumber/vscode/compare/v1.0.7...v1.0.8
[1.0.7]: https://github.com/cucumber/vscode/compare/v1.0.6...v1.0.7
[1.0.6]: https://github.com/cucumber/vscode/compare/v1.0.5...v1.0.6
[1.0.5]: https://github.com/cucumber/vscode/compare/v1.0.4...v1.0.5
[1.0.4]: https://github.com/cucumber/vscode/compare/v1.0.3...v1.0.4
[1.0.3]: https://github.com/cucumber/vscode/compare/v1.0.2...v1.0.3
[1.0.2]: https://github.com/cucumber/vscode/compare/v1.0.1...v1.0.2
[1.0.1]: https://github.com/cucumber/vscode/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/cucumber/vscode/tree/v1.0.0
