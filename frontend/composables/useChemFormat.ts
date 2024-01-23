import { ref, onMounted, onUnmounted } from "vue";

export function useChemFormat(formula: string) {
  const formatted = ref("");
  formatted.value = formula
    .split(/(\d+)/)
    .map((s, i) => (i % 2 ? `<sub>${s}</sub>` : s))
    .join("");
  return formatted;
}

export function formatChemString(formula: string) {
  return formula
    .split(/(\d+)/)
    .map((s, i) => (i % 2 ? `<sub>${s}</sub>` : s))
    .join("");
}
