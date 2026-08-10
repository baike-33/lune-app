import { useState, useRef } from 'react';
import { LV3, lv3Label, lv3Phone } from '../theme/tokens';
import { MUSES, PHASE_TO_MUSE } from '../data/muses';
import { useLune, LuneStore, activePhase, luneNav, luneBack, fileToDataURL } from '../store/luneStore';
import { WarmAurora, Glass } from '../components/Glass';
import { PhoneStatus, HomeBar } from '../components/PhoneStatus';
import { LV3TabBar } from '../components/LV3TabBar';
import { PhaseDot } from '../components/PhaseDot';
import { fmtDate, monthKey, monthLabel, navBtnStyle, asset } from '../utils/format';

export function Photos() {
  const s = useLune();
  const muse = PHASE_TO_MUSE[activePhase(s)];
  const m = MUSES[muse];
  const photos = (s.photos || []).slice().sort((a, b) => new Date(b.date) - new Date(a.date));
  const fileRef = useRef(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const [compare, setCompare] = useState(false);
  const [pos, setPos] = useState(50);
  const [viewer, setViewer] = useState(null); // photo en plein écran

  const onPick = async (e) => {
    const file = e.target.files && e.target.files[0];
    e.target.value = '';
    if (!file) return;
    setErr(''); setBusy(true);
    try {
      const { dataUrl, w, h } = await fileToDataURL(file, 560, 0.6);
      const entry = {
        id: 'ph' + Date.now(),
        dataUrl, w, h,
        date: new Date().toISOString().slice(0, 10),
        day: s.cycleDay, phase: activePhase(s),
        note: '',
      };
      LuneStore.set(st => ({ photos: [...(st.photos || []), entry] }));
    } catch (e2) {
      setErr("Impossible d'ajouter cette image. Réessaie avec une photo plus légère.");
    } finally { setBusy(false); }
  };

  const removePhoto = (id) => {
    if (!confirm('Supprimer cette photo de ta progression ?')) return;
    LuneStore.set(st => ({ photos: (st.photos || []).filter(p => p.id !== id) }));
  };

  // pour la comparaison : la plus ancienne (avant) vs la plus récente (après)
  const chronological = photos.slice().sort((a, b) => new Date(a.date) - new Date(b.date));
  const before = chronological[0];
  const after = chronological[chronological.length - 1];

  // groupage par mois
  const groups = {};
  photos.forEach(p => { const k = monthKey(p.date); (groups[k] = groups[k] || []).push(p); });
  const groupKeys = Object.keys(groups).sort().reverse();

  return (
    <div style={lv3Phone(muse)}>
      <WarmAurora muse={muse} />
      <PhoneStatus dark={true} />

      <input ref={fileRef} type="file" accept="image/*" capture="environment" onChange={onPick} style={{ display: 'none' }} aria-hidden="true" tabIndex={-1} />

      <div style={{ position: 'absolute', inset: 0, overflowY: 'auto', overflowX: 'hidden' }}>
        {/* Header */}
        <div style={{ padding: '14px 18px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button onClick={() => luneBack() || luneNav('moi')} aria-label="Retour" style={navBtnStyle()}>
            <span aria-hidden="true">←</span> <span className="lv3-mono" style={{ fontSize: 10, letterSpacing: '.10em' }}>Moi</span>
          </button>
          {photos.length >= 2 && (
            <button onClick={() => setCompare(v => !v)} aria-pressed={compare} style={navBtnStyle(compare ? m.palette.accent : null)}>
              <span className="lv3-mono" style={{ fontSize: 10, letterSpacing: '.10em', color: compare ? m.palette.accent : LV3.ink2 }}>
                {compare ? '✓ Comparaison' : 'Avant / Après'}
              </span>
            </button>
          )}
        </div>

        {/* Title */}
        <div style={{ padding: '16px 20px 0' }}>
          <div className="lv3-mono" style={{ ...lv3Label, fontSize: 9.5, color: m.palette.accent }}>MA PROGRESSION</div>
          <h1 className="lv3-serif" style={{ fontSize: 34, fontStyle: 'italic', margin: '6px 0 0', lineHeight: 1 }}>
            Photos de <em style={{ color: m.palette.accent }}>moi</em>
          </h1>
          <p style={{ fontSize: 12.5, color: LV3.ink3, marginTop: 8, lineHeight: 1.5, maxWidth: 300 }}>
            Un cliché par mois, même lumière, même tenue. C'est le miroir le plus honnête — bien plus que la balance.
          </p>
        </div>

        {/* Compare slider */}
        {compare && before && after && (
          <div style={{ padding: '18px 16px 4px' }}>
            <Glass style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ position: 'relative', width: '100%', aspectRatio: '3/4', background: '#000', overflow: 'hidden' }}>
                {/* après (dessous) */}
                <img src={asset(after.dataUrl)} alt="Photo la plus récente" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                {/* avant (clip à gauche) */}
                <div style={{ position: 'absolute', inset: 0, width: `${pos}%`, overflow: 'hidden', borderRight: `2px solid ${m.palette.accent}` }}>
                  <img src={asset(before.dataUrl)} alt="Photo de départ" style={{ position: 'absolute', inset: 0, width: `${100 / (pos / 100)}%`, maxWidth: 'none', height: '100%', objectFit: 'cover' }} />
                </div>
                {/* labels */}
                <div style={{ position: 'absolute', top: 12, left: 12 }}>
                  <Glass tight pill style={{ padding: '4px 10px' }}><span className="lv3-mono" style={{ fontSize: 8.5, color: '#fff', letterSpacing: '.10em' }}>AVANT · {fmtDate(before.date)}</span></Glass>
                </div>
                <div style={{ position: 'absolute', top: 12, right: 12 }}>
                  <Glass tight pill style={{ padding: '4px 10px' }}><span className="lv3-mono" style={{ fontSize: 8.5, color: m.palette.accent, letterSpacing: '.10em' }}>APRÈS · {fmtDate(after.date)}</span></Glass>
                </div>
              </div>
              <div style={{ padding: '14px 16px' }}>
                <input
                  type="range" min="0" max="100" value={pos}
                  onChange={e => setPos(Number(e.target.value))}
                  aria-label="Curseur de comparaison avant après"
                  style={{ width: '100%', accentColor: m.palette.accent }}
                />
                <div className="lv3-mono" style={{ fontSize: 9.5, color: LV3.ink3, textAlign: 'center', marginTop: 4 }}>Glisse pour comparer</div>
              </div>
            </Glass>
          </div>
        )}

        {/* Add button */}
        <div style={{ padding: '18px 16px 8px' }}>
          <button onClick={() => fileRef.current && fileRef.current.click()} disabled={busy} className={busy ? '' : 'lv3-fab'} style={{
            width: '100%', padding: '16px 18px', borderRadius: 99, border: 'none', cursor: busy ? 'default' : 'pointer',
            background: busy ? 'rgba(255,255,255,0.06)' : `linear-gradient(135deg, ${m.palette.accent}, ${LV3.peach2})`,
            color: busy ? LV3.ink3 : '#231016', fontWeight: 600, fontSize: 13.5, letterSpacing: '.04em',
            fontFamily: 'Manrope, sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
          }}>
            <span aria-hidden="true" style={{ fontSize: 18, lineHeight: 1 }}>{busy ? '…' : '＋'}</span>
            {busy ? 'Ajout en cours…' : 'Ajouter une photo'}
          </button>
          <div className="lv3-mono" style={{ fontSize: 9, color: LV3.ink3, textAlign: 'center', marginTop: 8, letterSpacing: '.04em' }}>
            Tes photos restent sur ton appareil · jamais envoyées
          </div>
          {err && <div role="alert" style={{ fontSize: 11.5, color: LV3.rose, textAlign: 'center', marginTop: 8 }}>{err}</div>}
        </div>

        {/* Empty state */}
        {photos.length === 0 && (
          <div style={{ padding: '10px 20px 30px' }}>
            <Glass style={{ padding: '34px 22px', textAlign: 'center' }}>
              <div style={{ fontSize: 40, color: m.palette.accent, opacity: .8 }} aria-hidden="true">◐</div>
              <div className="lv3-serif" style={{ fontSize: 20, fontStyle: 'italic', marginTop: 10, lineHeight: 1.3 }}>
                Ta première photo<br />commence ton histoire.
              </div>
              <div style={{ fontSize: 12, color: LV3.ink3, marginTop: 10, lineHeight: 1.5 }}>
                Ajoute un cliché aujourd'hui. Dans 4 semaines, tu verras ce que la balance ne montre pas.
              </div>
            </Glass>
          </div>
        )}

        {/* Gallery grouped by month */}
        {groupKeys.map(gk => (
          <div key={gk} style={{ padding: '8px 16px 4px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '8px 4px 12px' }}>
              <span style={{ ...lv3Label, color: LV3.ink2 }}>{monthLabel(groups[gk][0].date)}</span>
              <span style={{ flex: 1, height: 1, background: LV3.faint }} />
              <span className="lv3-mono" style={{ fontSize: 9.5, color: LV3.ink3 }}>{groups[gk].length} photo{groups[gk].length > 1 ? 's' : ''}</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {groups[gk].map(p => (
                <button key={p.id} onClick={() => setViewer(p)} aria-label={`Photo du ${fmtDate(p.date)}`} style={{ padding: 0, border: 'none', background: 'none', cursor: 'pointer', borderRadius: 18, overflow: 'hidden', position: 'relative' }}>
                  <div style={{ position: 'relative', width: '100%', aspectRatio: '3/4', borderRadius: 18, overflow: 'hidden', border: `1px solid ${LV3.glassLine}` }}>
                    <img src={asset(p.dataUrl)} alt={`Progression ${fmtDate(p.date)}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 55%, rgba(0,0,0,0.6) 100%)' }} />
                    {p.example && (
                      <div style={{ position: 'absolute', top: 8, left: 8 }}>
                        <span className="lv3-mono" style={{ fontSize: 7.5, letterSpacing: '.10em', padding: '3px 7px', borderRadius: 99, background: 'rgba(0,0,0,0.5)', color: '#fff' }}>EXEMPLE</span>
                      </div>
                    )}
                    <div style={{ position: 'absolute', bottom: 10, left: 10, right: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
                      <PhaseDot phase={p.phase} size={6} />
                      <span className="lv3-mono" style={{ fontSize: 9, color: '#fff', letterSpacing: '.04em' }}>{fmtDate(p.date)} · J{p.day}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}

        <div style={{ height: 96 }} />
      </div>

      {/* Fullscreen viewer */}
      {viewer && (
        <div onClick={() => setViewer(null)} style={{ position: 'absolute', inset: 0, zIndex: 60, background: 'rgba(8,4,7,0.92)', backdropFilter: 'blur(6px)', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '52px 18px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div className="lv3-mono" style={{ fontSize: 9.5, color: m.palette.accent, letterSpacing: '.14em' }}>{MUSES[PHASE_TO_MUSE[viewer.phase]].phaseLabel.toUpperCase()} · J{viewer.day}</div>
              <div className="lv3-serif" style={{ fontSize: 22, fontStyle: 'italic', marginTop: 2 }}>{fmtDate(viewer.date)}</div>
            </div>
            <button onClick={(e) => { e.stopPropagation(); setViewer(null); }} aria-label="Fermer" style={{ width: 40, height: 40, borderRadius: '50%', border: `1px solid ${LV3.glassLine2}`, background: 'rgba(255,255,255,0.06)', color: LV3.ink, fontSize: 16, cursor: 'pointer' }}>×</button>
          </div>
          <div onClick={e => e.stopPropagation()} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 18 }}>
            <img src={asset(viewer.dataUrl)} alt={`Progression ${fmtDate(viewer.date)}`} style={{ maxWidth: '100%', maxHeight: '100%', borderRadius: 18, objectFit: 'contain' }} />
          </div>
          <div style={{ padding: '0 18px 30px' }}>
            <button onClick={(e) => { e.stopPropagation(); removePhoto(viewer.id); setViewer(null); }} style={{ width: '100%', padding: '13px', borderRadius: 99, border: `1px solid ${LV3.glassLine2}`, background: 'transparent', color: LV3.rose, fontFamily: 'Manrope, sans-serif', fontSize: 12.5, cursor: 'pointer', letterSpacing: '.04em' }}>
              Supprimer cette photo
            </button>
          </div>
        </div>
      )}

      <LV3TabBar active="moi" muse={muse} />
      <HomeBar />
    </div>
  );
}
