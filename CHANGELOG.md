# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased]

### Fixed
- Comments are no longer stripped when formatting Gherkin documents

## [1.7.0] - 2022-12-08
### Added
- Added support for JavaScript - [#42](https://github.com/cucumber/language-service/issues/42), [#115](https://github.com/cucumber/language-service/pull/115), [#120](https://github.com/cucumber/language-service/pull/120)

### Fixed
- Fixed a regression in the python language implementation for regexes [#119](https://github.com/cucumber/language-service/pull/119)

## [1.6.0] - 2022-11-18
### Added
- Added context to python snippet to properly support `behave`
- Added `ParameterType` support to the python language implementation. This is currently supported via [cuke4behave](http://gitlab.com/cuke4behave/cuke4behave)

## [1.5.1] - 2022-10-11
### Fixed
- (TypeScript) Fix bug in template literal recognition

## [1.5.0] - 2022-10-10
### Added
- New Document Outline panel, making it easier to navigate between scenarios.
- (Java) Recognise regexps with `(?i)`, with the caveat that the resulting JavaScript `RegExp` is _not_ case insensitive ([#100](https://github.com/cucumber/language-service/issues/100), [#108](https://github.com/cucumber/language-service/pull/108))
- (TypeScript) Add support for template literals without subsitutions. ([#101](https://github.com/cucumber/language-service/issues/101), [#107](https://github.com/cucumber/language-service/pull/107))

## [1.4.1] - 2022-10-10
### Fixed
- Add Rust document selector ([#131](https://github.com/cucumber/vscode/pull/113))
- Fix rust snippet fn name to lowercase ([#103](https://github.com/cucumber/language-service/issues/103), [#104](https://github.com/cucumber/language-service/pull/104))

## [1.4.0] - 2022-10-06
### Added
- Support for [Cucumber Rust](https://github.com/cucumber-rs/cucumber) ([#82](https://github.com/cucumber/language-service/issues/82), [#99](https://github.com/cucumber/language-service/pull/99))

### Changed
- The Cucumber Language Server is now started in-process ([#105](https://github.com/cucumber/vscode/pull/105))

### Fixed
- Don't throw an error when Regular Expressions have optional capture groups ([#96](https://github.com/cucumber/language-service/issues/96), [#97](https://github.com/cucumber/language-service/pull/97)).

## [1.3.0] - 2022-09-10
### Added
- Add support for `.tsx` ([#87](https://github.com/cucumber/language-service/issues/87) [#90](https://github.com/cucumber/language-service/pull/90))

### Fixed
- RegExp flags in Step Definitions are preserved ([#91](https://github.com/cucumber/language-service/issues/91#issuecomment-1242243037) [#92](https://github.com/cucumber/language-service/pull/92))

## [1.2.11] - 2022-08-29
### Fixed
- Change defaults so that [pytest-bdd](https://pypi.org/project/pytest-bdd/) works out of the box ([#102](https://github.com/cucumber/vscode/pull/102))
- Trigger reindexing when Python files change ([#101](https://github.com/cucumber/vscode/pull/101))

## [1.2.10] - 2022-08-27
### Fixed
- Fix `@types/vscode` - require minimum version `1.69.0`.

## [1.2.9] - 2022-08-27
### Fixed
- Fixed defaults for C# ([#93](https://github.com/cucumber/vscode/pull/93))
- Fix syntax highlighting of `Background` keyword ([#91](https://github.com/cucumber/vscode/issues/91))
- Bugfixes in [@cucumber/language-server 0.12.12](https://github.com/cucumber/language-service/releases/tag/v0.12.12)
- Bugfixes in [@cucumber/language-service 0.32.0](https://github.com/cucumber/language-service/releases/tag/v0.33.0)

## [1.2.8] - 2022-07-14
### Fixed
- Bugfixes in [@cucumber/language-server 0.12.11](https://github.com/cucumber/language-service/releases/tag/v0.12.11)
- Bugfixes in [@cucumber/language-service 0.31.0](https://github.com/cucumber/language-service/releases/tag/v0.31.0)

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

[Unreleased]: https://github.com/cucumber/vscode/compare/v1.7.0...HEAD
[1.7.0]: https://github.com/cucumber/vscode/compare/v1.6.0...v1.7.0
[1.6.0]: https://github.com/cucumber/vscode/compare/v1.5.1...v1.6.0
[1.5.1]: https://github.com/cucumber/vscode/compare/v1.5.0...v1.5.1
[1.5.0]: https://github.com/cucumber/vscode/compare/v1.4.1...v1.5.0
[1.4.1]: https://github.com/cucumber/vscode/compare/v1.4.0...v1.4.1
[1.4.0]: https://github.com/cucumber/vscode/compare/v1.3.0...v1.4.0
[1.3.0]: https://github.com/cucumber/vscode/compare/v1.2.11...v1.3.0
[1.2.11]: https://github.com/cucumber/vscode/compare/v1.2.10...v1.2.11
[1.2.10]: https://github.com/cucumber/vscode/compare/v1.2.9...v1.2.10
[1.2.9]: https://github.com/cucumber/vscode/compare/v1.2.8...v1.2.9
[1.2.8]: https://github.com/cucumber/vscode/compare/v1.2.7...v1.2.8
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
