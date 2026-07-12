import { useState } from 'react';
import { LV3, lv3Label, lv3Phone } from '../theme/tokens';
import { MUSES, PHASE_TO_MUSE } from '../data/muses';
import { useLune, LuneStore, activePhase } from '../store/luneStore';
import { WarmAurora, Glass } from '../components/Glass';
import { PhoneStatus, HomeBar } from '../components/PhoneStatus';
import { LV3TabBar } from '../components/LV3TabBar';
import { AddShoppingItemSheet } from '../components/AddShoppingItemSheet';
import { buildShoppingSections, shoppingListToText } from '../utils/shoppingList';

export function Shopping() {
  const st = useLune();
  const phase = activePhase(st);
  const muse = PHASE_TO_MUSE[phase];
  const m = MUSES[muse];
  const [copied, setCopied] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const checked = new Set(st.shoppingChecked || []);
  const removed = new Set(st.shoppingRemoved || []);
  const toggle = (k) => LuneStore.set(s => {
    const n = new Set(s.shoppingChecked || []);
    n.has(k) ? n.delete(k) : n.add(k);
    return { shoppingChecked: [...n] };
  });
  const hideItem = (k) => LuneStore.set(s => ({ shoppingRemoved: [...new Set([...(s.shoppingRemoved || []), k])] }));
  const restoreAll = () => LuneStore.set({ shoppingRemoved: [] });
  const deleteCustom = (id) => LuneStore.set(s => ({ shoppingCustom: (s.shoppingCustom || []).filter(it => it.id !== id) }));

  const { sections: generated, excludedCount } = buildShoppingSections(st.savedRecipes, phase, st.allergies, st.dietPrefs);
  const sections = generated
    .map(sec => ({ ...sec, items: sec.items.filter(it => !removed.has(it.k)) }))
    .filter(sec => sec.items.length);

  const custom = (st.shoppingCustom || []).map(it => ({ k: it.id, n: it.n, q: it.q, src: 'Ajouté par toi', custom: true }));
  const allSections = custom.length
    ? [{ l: 'Ajoutés par toi', priority: true, items: custom }, ...sections]
    : sections;

  const total = allSections.reduce((a, s) => a + s.items.length, 0);
  const done = allSections.reduce((a, s) => a + s.items.filter(it => checked.has(it.k)).length, 0);
  const hiddenCount = removed.size;

  const exportList = async () => {
    const text = shoppingListToText(allSections, m.phaseLabel, checked);
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Presse-papiers indisponible (permissions/contexte non sécurisé) — repli sur un téléchargement
      const blob = new Blob([text], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = 'courses-lune.txt';
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div style={lv3Phone(muse)}>
      <WarmAurora muse={muse} />

      <PhoneStatus dark={true} />

      <div style={{ position: 'absolute', inset: 0, overflowY: 'auto', overflowX: 'hidden' }}>
        {/* Header */}
        <div style={{ padding: '14px 18px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <div>
            <div className="lv3-mono" style={{ ...lv3Label, fontSize: 9.5, color: LV3.ink3 }}>COURSES · GÉNÉRÉES POUR {m.phaseLabel.toUpperCase()}</div>
            <div className="lv3-serif" style={{ fontSize: 26, fontStyle: 'italic', marginTop: 4, lineHeight: 1 }}>
              Ta liste de la <em style={{ color: m.palette.accent }}>semaine</em>
            </div>
          </div>
          <Glass tight pill style={{ padding: '6px 12px' }}>
            <span className="lv3-mono" style={{ fontSize: 9.5, color: m.palette.accent }}>{done}/{total}</span>
          </Glass>
        </div>

        {/* Progress */}
        <div style={{ padding: '14px 18px 0' }}>
          <Glass tight style={{ padding: '12px 16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span className="lv3-mono" style={{ ...lv3Label, fontSize: 9, color: LV3.ink3 }}>PROGRESSION</span>
              <span className="lv3-mono" style={{ fontSize: 10, color: m.palette.accent }}>{total ? Math.round((done / total) * 100) : 0}%</span>
            </div>
            <div style={{ height: 5, background: 'rgba(255,255,255,0.06)', borderRadius: 99, marginTop: 8, overflow: 'hidden' }}>
              <div style={{ width: `${total ? (done / total) * 100 : 0}%`, height: '100%', background: `linear-gradient(90deg, ${m.palette.accent}, ${LV3.peach2})`, borderRadius: 99, transition: 'width .5s' }} />
            </div>
          </Glass>
        </div>

        {/* Add item CTA */}
        <div style={{ padding: '14px 18px 0' }}>
          <button onClick={() => setAddOpen(true)} style={{
            width: '100%', padding: '13px 18px', borderRadius: 99, cursor: 'pointer',
            background: 'rgba(255,255,255,0.04)', border: `1px solid ${LV3.glassLine}`, color: LV3.ink2,
            fontFamily: 'Manrope, sans-serif', fontSize: 12.5, fontWeight: 600,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          }}>
            <span style={{ fontSize: 15, lineHeight: 1 }}>+</span> Ajouter un article
          </button>
        </div>

        {/* Transparence régime/allergies */}
        {excludedCount > 0 && (
          <div style={{ padding: '10px 18px 0' }}>
            <div className="lv3-mono" style={{ fontSize: 9.5, color: LV3.ink3 }}>
              {excludedCount} article{excludedCount > 1 ? 's' : ''} exclu{excludedCount > 1 ? 's' : ''} · régime & allergies
            </div>
          </div>
        )}

        {/* Sections */}
        <div style={{ padding: '14px 16px 16px' }}>
          {allSections.length === 0 && (
            <Glass tight style={{ padding: '20px', textAlign: 'center' }}>
              <div className="lv3-serif" style={{ fontSize: 15, fontStyle: 'italic', color: LV3.ink3 }}>
                Sauvegarde des recettes ou ajoute un article pour démarrer ta liste.
              </div>
            </Glass>
          )}
          {allSections.map((sec, si) => (
            <div key={si} style={{ marginBottom: si < allSections.length - 1 ? 14 : 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, paddingLeft: 4 }}>
                {sec.priority && <span style={{ width: 7, height: 7, borderRadius: '50%', background: m.palette.accent, boxShadow: `0 0 8px ${m.palette.glow}` }} />}
                <span style={{ ...lv3Label, color: sec.priority ? m.palette.accent : LV3.ink3 }}>{sec.l}</span>
              </div>
              <Glass tight style={{ padding: '4px 4px' }}>
                {sec.items.map((it, ii) => {
                  const isC = checked.has(it.k);
                  return (
                    <div key={it.k} onClick={() => toggle(it.k)} role="checkbox" aria-checked={isC} tabIndex={0}
                      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(it.k); } }}
                      aria-label={it.n} style={{
                        padding: '12px 12px', display: 'flex', alignItems: 'center', gap: 12,
                        borderBottom: ii < sec.items.length - 1 ? `1px solid ${LV3.faint}` : 'none',
                        cursor: 'pointer', opacity: isC ? .55 : 1, transition: 'opacity .2s',
                      }}>
                      <div style={{
                        width: 22, height: 22, borderRadius: 8, flexShrink: 0,
                        border: isC ? 'none' : `1.5px solid ${LV3.glassLine2}`,
                        background: isC ? `linear-gradient(135deg, ${m.palette.accent}, ${LV3.peach2})` : 'transparent',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: '#231016', fontSize: 11, fontWeight: 700, transition: 'all .2s',
                      }}>{isC && '✓'}</div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 13.5, color: LV3.ink, fontWeight: 500, textDecorationLine: isC ? 'line-through' : 'none', textDecorationColor: 'rgba(255,255,255,0.3)' }}>{it.n}</div>
                        <div className="lv3-mono" style={{ fontSize: 9.5, color: LV3.ink3, marginTop: 2 }}>{it.src}</div>
                      </div>
                      {it.q && <div className="lv3-mono" style={{ fontSize: 11, color: LV3.ink2 }}>{it.q}</div>}
                      <button
                        onClick={(e) => { e.stopPropagation(); it.custom ? deleteCustom(it.k) : hideItem(it.k); }}
                        aria-label={`Retirer ${it.n} de la liste`}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: LV3.ink3, fontSize: 15, padding: '4px 2px 4px 8px', flexShrink: 0 }}
                      >×</button>
                    </div>
                  );
                })}
              </Glass>
            </div>
          ))}
          {hiddenCount > 0 && (
            <button onClick={restoreAll} style={{
              width: '100%', marginTop: 14, padding: '10px', borderRadius: 12, cursor: 'pointer', fontFamily: 'Manrope, sans-serif', fontSize: 11.5,
              background: 'transparent', border: `1px dashed ${LV3.glassLine2}`, color: LV3.ink3,
            }}>{hiddenCount} article{hiddenCount > 1 ? 's' : ''} masqué{hiddenCount > 1 ? 's' : ''} · réafficher</button>
          )}
        </div>

        {/* CTA */}
        <div style={{ padding: '0 18px 18px' }}>
          <button onClick={exportList} disabled={total === 0} className="lv3-fab" style={{
            width: '100%', padding: '14px 22px', borderRadius: 99, border: 'none',
            background: `linear-gradient(135deg, ${m.palette.accent}, ${LV3.peach2})`,
            color: '#231016', fontWeight: 600, fontSize: 12, letterSpacing: '.10em', cursor: total === 0 ? 'default' : 'pointer',
            opacity: total === 0 ? .5 : 1,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
          }}>
            {copied ? 'Copié ✓' : 'Exporter en checklist'}
            {!copied && <span style={{ fontFamily: 'Fraunces, serif', fontStyle: 'italic' }}>↗</span>}
          </button>
        </div>

        <div style={{ height: 90 }} />
      </div>

      <AddShoppingItemSheet open={addOpen} onClose={() => setAddOpen(false)} accent={m.palette.accent} />

      <LV3TabBar active="train" muse={muse} />
      <HomeBar />
    </div>
  );
}
