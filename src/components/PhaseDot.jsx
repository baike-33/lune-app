import { LV3 } from '../theme/tokens';

export function PhaseDot({ phase, size = 7 }) {
  const cols = { mens: LV3.rose, fol: LV3.gold, ov: LV3.peach2, lut: LV3.sage };
  return <span aria-hidden="true" style={{ width: size, height: size, borderRadius: '50%', background: cols[phase], display: 'inline-block', flexShrink: 0 }} />;
}
