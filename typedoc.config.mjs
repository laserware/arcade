/** @type {Partial<import("typedoc").TypeDocOptions>} */
const config = {
  categorizeByGroup: false,
  cleanOutputDir: true,
  defaultCategory: "Utility",
  entryPoints: ["./src/index.ts"],
  entryPointStrategy: "expand",
  exclude: ["**/**test.ts"],
  excludeInternal: true,
  excludeNotDocumented: true,
  headings: {
    readme: false,
    document: false,
  },
  hideGenerator: true,
  navigation: {
    compactFolders: true,
    excludeReferences: true,
    includeCategories: true,
    includeFolders: true,
    includeGroups: false,
  },
  navigationLinks: {
    GitHub: "https://github.com/laserware/arcade",
  },
  out: "site",
  readme: "./README.md",
  useFirstParagraphOfCommentAsSummary: true,
};

export default config;
