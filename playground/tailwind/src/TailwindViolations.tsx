// =============================================================================
// RULE: tailwindcss/classnames-order [warn] — fixable
// Enforces a consistent, canonical order for Tailwind class names.
// =============================================================================

// Bad: wrong order (layout before display, spacing mixed in)
export function ClassnamesOrderViolation(): JSX.Element {
  return <div className="p-4 flex text-center items-center">Wrong order</div>;
}

// Good: canonical order (display → layout → spacing → typography)
export function ClassnamesOrderValid(): JSX.Element {
  return <div className="flex items-center p-4 text-center">Correct order</div>;
}

// =============================================================================
// RULE: tailwindcss/enforces-negative-arbitrary-values [warn] — fixable
// The `-` prefix modifier must not be combined with an arbitrary value in `[]`.
// Negative sign belongs inside the brackets instead.
// =============================================================================

// Bad: dash prefix used with arbitrary value (-top-[5px] → top-[-5px])
export function NegativeArbitraryViolation(): JSX.Element {
  return <div className="-top-[5px] -left-[10px]">Bad negative arbitrary</div>;
}

// Good: negative sign placed inside the brackets
export function NegativeArbitraryValid(): JSX.Element {
  return <div className="top-[-5px] left-[-10px]">Good negative arbitrary</div>;
}

// =============================================================================
// RULE: tailwindcss/enforces-shorthand [warn] — fixable
// Separate axis/side variants must be merged into their shorthand equivalents.
// =============================================================================

// Bad: px-4 + py-4 → p-4, mx-2 + my-2 → m-2
export function ShorthandViolation(): JSX.Element {
  return <div className="px-4 py-4 mx-2 my-2">Should use shorthand</div>;
}

// Good: combined shorthand classes
export function ShorthandValid(): JSX.Element {
  return <div className="p-4 m-2">Correct shorthand</div>;
}

// =============================================================================
// RULE: tailwindcss/no-contradicting-classname [error]
// Two classes targeting the same CSS property for the same variant conflict.
// =============================================================================

// Bad: flex and block both set display — only one wins
export function ContradictingDisplayViolation(): JSX.Element {
  return <div className="flex block">Contradicting display classes</div>;
}

// Bad: p-4 and p-8 both set padding — only one wins
export function ContradictingPaddingViolation(): JSX.Element {
  return <div className="p-4 p-8 text-sm">Contradicting padding classes</div>;
}

// Good: no conflicting classes
export function ContradictingValid(): JSX.Element {
  return <div className="flex p-4 text-sm">No conflict</div>;
}

// =============================================================================
// RULE: tailwindcss/no-custom-classname [warn]
// Class names not present in Tailwind's generated output are flagged.
// =============================================================================

// Bad: custom-btn and primary-action are not Tailwind classes
export function CustomClassViolation(): JSX.Element {
  return <div className="custom-btn primary-action bg-blue-500">Custom classes</div>;
}

// Good: only standard Tailwind classes
export function CustomClassValid(): JSX.Element {
  return <div className="bg-blue-500 px-4 py-2 text-white font-bold rounded">Tailwind only</div>;
}

// =============================================================================
// RULE: tailwindcss/no-unnecessary-arbitrary-value [warn] — fixable
// Arbitrary values that match a named Tailwind token must use the named class.
// =============================================================================

// Bad: h-[auto] → h-auto, m-[-1.25rem] → -m-5 (1.25rem = spacing-5)
export function UnnecessaryArbitraryViolation(): JSX.Element {
  return <div className="h-[auto] m-[-1.25rem]">Unnecessary arbitrary values</div>;
}

// Good: use the named equivalents
export function UnnecessaryArbitraryValid(): JSX.Element {
  return <div className="h-auto -m-5">Named Tailwind tokens</div>;
}

// =============================================================================
// RULE: tailwindcss/no-arbitrary-value [off] + no-restricted-syntax [warn] for colors
// The full no-arbitrary-value rule is disabled (too restrictive), but arbitrary
// color values are enforced via no-restricted-syntax — they must use design
// system tokens from the Tailwind config instead.
// Covers: bg, text, border, ring, fill, stroke, from, via, to, accent, caret,
//         decoration, outline, placeholder, shadow, divide.
// Color formats: #hex, rgb(), rgba(), hsl(), hsla(), oklch()
// =============================================================================

// Bad: arbitrary hex and rgba colors bypass the design system
export function ArbitraryColorViolation(): JSX.Element {
  return (
    <div className="bg-[#1a1a2e] text-[rgba(255,255,255,0.85)] border-[#e94560]">
      Arbitrary colors
    </div>
  );
}

// Bad: arbitrary hsl and oklch colors
export function ArbitraryColorHslViolation(): JSX.Element {
  return <div className="bg-[hsl(220,60%,20%)] text-[oklch(0.8_0.15_200)]">HSL/OKLCH arbitrary</div>;
}

// Good: named Tailwind tokens from the design system
export function ArbitraryColorValid(): JSX.Element {
  return <div className="bg-slate-900 text-white/85 border-rose-500">Design system tokens</div>;
}

// Good: arbitrary values for non-color utilities are still allowed
export function NonColorArbitraryValid(): JSX.Element {
  return <div className="w-[340px] mt-[13px] text-[13px]">Non-color arbitrary — allowed</div>;
}

// =============================================================================
// RULE: tailwindcss/migration-from-tailwind-2 [off]
// DISABLED — projects target Tailwind v3+ and don't need migration warnings.
//
// Would flag v2 class names that were renamed or removed in v3, e.g.:
//   className="overflow-ellipsis"  → now: overflow-hidden (changed in v3)
//   className="flex-grow"          → now: grow
//   className="flex-shrink-0"      → now: shrink-0
// =============================================================================

// =============================================================================
// RULE: tailwindcss/no-arbitrary-value [off]
// DISABLED — too restrictive for real-world projects that rely on one-off values.
//
// Would flag any use of bracket arbitrary syntax, e.g.:
//   className="m-[10px] text-[14px] bg-[#1a1a1a] w-[calc(100%-2rem)]"
// =============================================================================
