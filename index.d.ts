export type DisplayShape = "circle" | "square" | "rounded-square" | "rectangle";
export type Category = "social" | "professional" | "dating" | "messaging" | "developer" | "video" | "passport";

export interface PhotoRule {
  width?: number;
  height?: number;
  aspectRatio?: string;
  minWidth?: number;
  minHeight?: number;
  maxWidth?: number;
  maxHeight?: number;
  maxFileSizeMB?: number;
  formats?: string[];
  displayShape?: DisplayShape;
  displaySizes?: number[];
  notes?: string;
}

export interface DatingRule {
  recommendedWidth?: number;
  recommendedHeight?: number;
  aspectRatio?: string;
  maxPhotos?: number;
  minPhotos?: number;
  notes?: string;
}

export interface PassportRule {
  widthMM: number;
  heightMM: number;
  digitalWidthPx?: number;
  digitalHeightPx?: number;
  headHeightMM?: string;
  background?: string;
  glasses?: string;
  smile?: string;
  maxAgeMonths?: number;
  notes?: string;
}

export interface ExportSize {
  width: number;
  height: number;
  /** official: platform docs. community: most-cited guide size. narkis-pick: no published size. print-300dpi: mm size at 300 dpi. */
  basis: "official" | "community" | "narkis-pick" | "print-300dpi";
  note: string;
}

export interface PlatformSpec {
  slug: string;
  name: string;
  category: Category;
  profilePhoto?: PhotoRule | null;
  coverPhoto?: PhotoRule;
  datingPhotos?: DatingRule;
  passport?: PassportRule;
  sources: string[];
  confidence: "official" | "community";
  verified: string;
  export: ExportSize;
}

export declare const specs: PlatformSpec[];
export declare function all(): PlatformSpec[];
export declare function get(slug: string): PlatformSpec | undefined;
export declare function byCategory(category: Category): PlatformSpec[];
export declare function exportSize(slug: string): ExportSize | undefined;
export declare function check(
  slug: string,
  image: { width?: number; height?: number; bytes?: number; format?: string }
): { ok: boolean; issues: string[] };
declare const _default: {
  specs: typeof specs; all: typeof all; get: typeof get; byCategory: typeof byCategory; exportSize: typeof exportSize; check: typeof check;
};
export default _default;
