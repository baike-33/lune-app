/* Conversion d'unités pour l'affichage — le stockage interne reste toujours
   en métrique (kg, cm). Seul l'affichage/la saisie change avec `units`. */

const KG_PER_LB = 0.45359237;
const CM_PER_IN = 2.54;

export function kgToDisplay(kg, units) {
  if (kg == null) return kg;
  return units === 'imperial' ? Math.round((kg / KG_PER_LB) * 10) / 10 : Math.round(kg * 10) / 10;
}
export function displayToKg(val, units) {
  const n = Number(val) || 0;
  return units === 'imperial' ? Math.round(n * KG_PER_LB * 10) / 10 : Math.round(n * 10) / 10;
}
export function cmToDisplay(cm, units) {
  if (cm == null) return cm;
  return units === 'imperial' ? Math.round(cm / CM_PER_IN) : Math.round(cm);
}
export function displayToCm(val, units) {
  const n = Number(val) || 0;
  return units === 'imperial' ? Math.round(n * CM_PER_IN) : Math.round(n);
}
export function weightUnitLabel(units) { return units === 'imperial' ? 'lb' : 'kg'; }
export function heightUnitLabel(units) { return units === 'imperial' ? 'in' : 'cm'; }
