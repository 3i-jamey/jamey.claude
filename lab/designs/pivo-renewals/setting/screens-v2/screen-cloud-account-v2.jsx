// V2 — 피보 클라우드 (저장소 + 갤러리), 계정 관리, 비밀번호 변경

function ScreenCloudInfoV2({ onNav }) {
  return (
    <PhoneV2>
      <StatusV2 />
      <BigHeader
        eyebrow="Cloud"
        title="저장 공간"
        sub="3GB 중 0.01GB 사용 중"
        onBack={() => onNav('back')}
      />
      <div style={{ flex: 1, overflow: 'auto', padding: '0 20px 32px' }}>

        {/* Hero gauge card */}
        <div style={{
          borderRadius: 26, padding: '24px 22px',
          background: V2_GRAD_RED, color: '#fff', position: 'relative', overflow: 'hidden',
          boxShadow: '0 14px 30px rgba(236,37,68,0.28)',
        }}>
          <div style={{
            position: 'absolute', right: -40, top: -40, width: 180, height: 180,
            borderRadius: '50%', background: 'rgba(255,255,255,0.12)',
          }} />
          <div style={{
            position: 'absolute', right: 30, bottom: -60, width: 120, height: 120,
            borderRadius: '50%', background: 'rgba(255,255,255,0.08)',
          }} />
          <div style={{
            display: 'inline-flex', padding: '4px 10px', borderRadius: 999,
            background: 'rgba(255,255,255,0.22)', fontSize: 11, fontWeight: 700,
            letterSpacing: 0.5,
          }}>FREE PLAN</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 16 }}>
            <span style={{ fontSize: 44, fontWeight: 700, lineHeight: 1, letterSpacing: -1 }}>0.01</span>
            <span style={{ fontSize: 18, fontWeight: 600, opacity: 0.85 }}>/ 3 GB</span>
          </div>
          <div style={{
            marginTop: 14, height: 8, borderRadius: 999,
            background: 'rgba(255,255,255,0.25)', overflow: 'hidden',
          }}>
            <div style={{ width: '0.5%', minWidth: 14, height: '100%', borderRadius: 999, background: '#fff' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10, fontSize: 11, opacity: 0.85 }}>
            <span>📷 사진 0.01GB</span>
            <span>🎬 영상 0GB</span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 14 }}>
          <button onClick={() => onNav('cloud-gallery')} style={{
            background: '#fff', borderRadius: 18, padding: '16px',
            border: `1px solid ${V2_LINE}`, cursor: 'pointer', textAlign: 'left',
            fontFamily: 'inherit',
          }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: `${V2_RED}15`, color: V2_RED, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <IconCloud />
            </div>
            <div style={{ fontSize: 14, fontWeight: 700, color: V2_INK, marginTop: 12 }}>클라우드 보기</div>
            <div style={{ fontSize: 11, color: V2_INK3 }}>저장된 영상 12개</div>
          </button>
          <button onClick={() => onNav('subscription')} style={{
            background: V2_GRAD_RED_FLAT, borderRadius: 18, padding: '16px',
            border: 0, cursor: 'pointer', textAlign: 'left',
            color: '#fff', fontFamily: 'inherit',
          }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(255,255,255,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <IconCloudUp />
            </div>
            <div style={{ fontSize: 14, fontWeight: 700, marginTop: 12 }}>저장 공간 늘리기</div>
            <div style={{ fontSize: 11, opacity: 0.85 }}>최대 500GB까지</div>
          </button>
        </div>

        <div style={{
          marginTop: 16, padding: '16px', borderRadius: 14,
          background: V2_PAPER, fontSize: 13, color: V2_INK2, lineHeight: 1.55,
        }}>
          Premium 구독 시 <strong style={{ color: V2_RED }}>50GB 저장 공간</strong>, 4K 다운로드, AI 자동 편집을 포함한 다양한 기능을 사용할 수 있습니다.
        </div>
      </div>
    </PhoneV2>
  );
}

function ScreenCloudGalleryV2({ onNav }) {
  const [tab, setTab] = React.useState('cloud');
  const [selectMode, setSelectMode] = React.useState(false);
  const [selected, setSelected] = React.useState(new Set());

  const items = [
    { id: 1, color: '#7C8E8B', label: 'Today', day: 'Today' },
    { id: 2, color: '#C5B79A', label: 'Today', day: 'Today' },
    { id: 3, color: '#9CA8AA', label: 'Today', day: 'Today' },
    { id: 4, color: '#A39689', label: 'Today', day: 'Today' },
    { id: 5, color: '#8FA3B8', label: 'Yesterday', day: 'Yesterday' },
    { id: 6, color: '#B89E83', label: 'Yesterday', day: 'Yesterday' },
    { id: 7, color: '#9789A3', label: 'Yesterday', day: 'Yesterday' },
    { id: 8, color: '#A88F7C', label: '2 days ago', day: '2일 전' },
    { id: 9, color: '#7E8FA0', label: '2 days ago', day: '2일 전' },
  ];
  const groups = items.reduce((acc, x) => { (acc[x.day] = acc[x.day] || []).push(x); return acc; }, {});

  return (
    <PhoneV2>
      <StatusV2 />
      <BigHeader
        eyebrow="Cloud"
        title="피보 클라우드"
        onBack={() => onNav('back')}
        right={
          <button onClick={() => { setSelectMode(!selectMode); setSelected(new Set()); }} style={{
            padding: '8px 16px', borderRadius: 999, border: 0, cursor: 'pointer',
            background: selectMode ? V2_RED : V2_INK,
            color: '#fff', fontFamily: 'inherit', fontWeight: 700, fontSize: 13,
          }}>{selectMode ? '취소' : 'Select'}</button>
        }
      />

      {/* Tabs as pills */}
      <div style={{ padding: '0 24px 12px', display: 'flex', gap: 8 }}>
        <PillV2 on={tab === 'cloud'} onClick={() => setTab('cloud')} accent={V2_INK}>Cloud Gallery</PillV2>
        <PillV2 on={tab === 'lesson'} onClick={() => setTab('lesson')} accent={V2_INK}>Lesson Gallery</PillV2>
      </div>

      <div style={{ flex: 1, overflow: 'auto', padding: '0 20px 32px' }}>
        {Object.entries(groups).map(([day, list]) => (
          <div key={day} style={{ marginBottom: 18 }}>
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
              padding: '8px 4px 12px',
            }}>
              <span style={{ fontSize: 16, fontWeight: 700, color: V2_INK }}>{day}</span>
              <span style={{ fontSize: 11, color: V2_INK3 }}>{list.length}개</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
              {list.map(it => {
                const sel = selected.has(it.id);
                return (
                  <button key={it.id} onClick={() => {
                    if (!selectMode) return;
                    const n = new Set(selected);
                    sel ? n.delete(it.id) : n.add(it.id);
                    setSelected(n);
                  }} style={{
                    aspectRatio: '1', borderRadius: 14, position: 'relative',
                    border: 0, padding: 0, cursor: 'pointer', overflow: 'hidden',
                    background: `linear-gradient(135deg, ${it.color}, ${it.color}80)`,
                    boxShadow: sel ? `0 0 0 3px ${V2_RED}` : 'none',
                    transition: 'box-shadow .15s',
                  }}>
                    <div style={{
                      position: 'absolute', inset: 0, opacity: 0.3,
                      background: 'radial-gradient(ellipse at 30% 70%, rgba(0,0,0,0.5) 0%, transparent 60%)',
                    }} />
                    <div style={{
                      position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
                      width: 38, height: 38, borderRadius: '50%',
                      background: 'rgba(255,255,255,0.92)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <svg width="14" height="14" viewBox="0 0 14 14"><path d="M3 1l9 6-9 6V1z" fill={V2_INK} /></svg>
                    </div>
                    {selectMode && (
                      <div style={{
                        position: 'absolute', top: 6, right: 6,
                        width: 22, height: 22, borderRadius: '50%',
                        background: sel ? V2_RED : 'rgba(255,255,255,0.9)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: '#fff',
                      }}>{sel && <IconCheck size={12} />}</div>
                    )}
                    <div style={{
                      position: 'absolute', bottom: 5, right: 5,
                      padding: '1px 5px', borderRadius: 4,
                      background: 'rgba(0,0,0,0.55)', color: '#fff',
                      fontSize: 9, fontWeight: 700,
                    }}>0:{12 + it.id * 3}</div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {selectMode && selected.size > 0 && (
        <div style={{
          padding: '14px 20px 24px', background: '#fff',
          borderTop: `1px solid ${V2_LINE}`,
          display: 'flex', gap: 8, alignItems: 'center',
        }}>
          <span style={{ flex: 1, fontSize: 13, color: V2_INK, fontWeight: 600 }}>
            {selected.size}개 선택
          </span>
          <PillV2>다운로드</PillV2>
          <button style={{
            padding: '8px 14px', borderRadius: 999, border: 0, cursor: 'pointer',
            background: V2_RED, color: '#fff', fontWeight: 700, fontSize: 13,
            fontFamily: 'inherit',
          }}>삭제</button>
        </div>
      )}
    </PhoneV2>
  );
}

function ScreenAccountV2({ onNav }) {
  const [n, setN] = React.useState('Jamey');
  const [s, setS] = React.useState('Jeong');
  const [phone, setPhone] = React.useState('');
  return (
    <PhoneV2>
      <StatusV2 />
      <BigHeader eyebrow="Account" title="계정 관리" onBack={() => onNav('back')} />
      <div style={{ flex: 1, overflow: 'auto', padding: '0 20px 32px' }}>

        {/* Avatar block */}
        <div style={{
          background: '#fff', borderRadius: 22, padding: '20px',
          display: 'flex', alignItems: 'center', gap: 16,
          boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
        }}>
          <div style={{
            width: 76, height: 76, borderRadius: '50%',
            background: V2_GRAD_RED,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontSize: 28, fontWeight: 700, position: 'relative',
            boxShadow: '0 8px 18px rgba(236,37,68,0.28)',
          }}>JJ
            <button style={{
              position: 'absolute', right: -2, bottom: -2,
              width: 26, height: 26, borderRadius: '50%',
              background: '#fff', border: 0, cursor: 'pointer',
              boxShadow: '0 2px 6px rgba(0,0,0,0.12)',
              color: V2_INK, display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}><IconPencil size={13} /></button>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 18, fontWeight: 700, color: V2_INK }}>Jamey Jeong</div>
            <div style={{ fontSize: 12, color: V2_INK3 }}>jamey.jeong@3i.ai</div>
            <div style={{
              marginTop: 6, display: 'inline-block',
              padding: '2px 8px', borderRadius: 999,
              background: V2_PAPER, fontSize: 10, fontWeight: 700,
              color: V2_INK2, letterSpacing: 0.4,
            }}>FREE 멤버 · 2024년 가입</div>
          </div>
        </div>

        <SectionTitle>개인 정보</SectionTitle>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <V2Field label="이름" value={n} onChange={setN} />
          <V2Field label="성" value={s} onChange={setS} />
          <V2Field label="이메일" value="jamey.jeong@3i.ai" disabled />
          <V2Field label="핸드폰 번호" value={phone} onChange={setPhone} placeholder="010-0000-0000" />
        </div>

        <div style={{ marginTop: 14 }}>
          <button onClick={() => onNav('password')} style={{
            width: '100%', padding: '14px 18px', borderRadius: 16,
            background: '#fff', border: `1.5px solid ${V2_RED}`, color: V2_RED,
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            fontFamily: 'inherit', fontWeight: 700, fontSize: 15,
          }}>
            <span>비밀번호 변경</span>
            <span style={{
              width: 28, height: 28, borderRadius: '50%', background: V2_RED, color: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}><IconArrowRight size={13} /></span>
          </button>
        </div>

        <div style={{ marginTop: 16 }}>
          <PrimaryCTA>저장하기</PrimaryCTA>
        </div>

        <div style={{ textAlign: 'center', marginTop: 18 }}>
          <button style={{
            background: 'none', border: 0, cursor: 'pointer',
            color: V2_INK3, fontFamily: 'inherit', fontWeight: 500, fontSize: 13,
            textDecoration: 'underline', textUnderlineOffset: 3,
          }}>계정 삭제</button>
        </div>
      </div>
    </PhoneV2>
  );
}

function V2Field({ label, value, onChange, disabled, placeholder, type = 'text' }) {
  return (
    <div style={{
      background: disabled ? V2_PAPER : '#fff',
      borderRadius: 14, padding: '10px 16px',
      border: `1px solid ${disabled ? V2_PAPER : V2_LINE}`,
    }}>
      <div style={{ fontSize: 11, color: V2_INK3, fontWeight: 600 }}>{label}</div>
      <input
        type={type} value={value} disabled={disabled} placeholder={placeholder}
        onChange={e => onChange && onChange(e.target.value)}
        style={{
          width: '100%', border: 0, outline: 'none', background: 'transparent',
          fontFamily: 'inherit', fontWeight: 600, fontSize: 15,
          color: disabled ? V2_INK3 : V2_INK, marginTop: 2, padding: 0,
        }}
      />
    </div>
  );
}

function ScreenPasswordV2({ onNav }) {
  const [strength, setStrength] = React.useState(2);
  return (
    <PhoneV2>
      <StatusV2 />
      <BigHeader
        eyebrow="Security"
        title="비밀번호 변경"
        sub="8자 이상, 영문/숫자/특수문자 포함"
        onBack={() => onNav('back')}
      />
      <div style={{ flex: 1, overflow: 'auto', padding: '0 20px 32px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <V2Field label="현재 비밀번호" value="••••••••" type="password" />
          <V2Field label="새 비밀번호" value="••••••••••" type="password" onChange={() => setStrength(3)} />
        </div>

        <div style={{ marginTop: 12, padding: '14px 16px', borderRadius: 14, background: V2_PAPER }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: V2_INK2 }}>비밀번호 강도</span>
            <span style={{
              fontSize: 12, fontWeight: 700,
              color: strength <= 1 ? V2_RED : strength === 2 ? V2_AMBER : '#0AAF6F',
            }}>
              {strength <= 1 ? '약함' : strength === 2 ? '보통' : '강함'}
            </span>
          </div>
          <div style={{ display: 'flex', gap: 4 }}>
            {[1,2,3,4].map(i => (
              <div key={i} style={{
                flex: 1, height: 5, borderRadius: 99,
                background: i <= strength
                  ? (strength <= 1 ? V2_RED : strength === 2 ? V2_AMBER : V2_TEAL)
                  : '#E0E2E7',
              }} />
            ))}
          </div>
          <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 4, fontSize: 11, color: V2_INK3 }}>
            <span>✓ 8자 이상</span>
            <span>✓ 영문 포함</span>
            <span style={{ color: strength >= 3 ? '#0AAF6F' : V2_INK3 }}>{strength >= 3 ? '✓' : '○'} 특수문자 포함</span>
          </div>
        </div>

        <div style={{ marginTop: 12 }}>
          <V2Field label="새 비밀번호 확인" value="••••••••••" type="password" />
        </div>

        <div style={{
          marginTop: 16, padding: '12px 14px', borderRadius: 12,
          background: '#FFF1F4', display: 'flex', gap: 10,
        }}>
          <span style={{ color: V2_RED, marginTop: 1 }}><IconShield size={18} /></span>
          <span style={{ fontSize: 12, color: V2_INK2, lineHeight: 1.5 }}>
            변경 후 모든 기기에서 다시 로그인해야 합니다.
          </span>
        </div>

        <div style={{ marginTop: 22 }}>
          <PrimaryCTA>비밀번호 변경</PrimaryCTA>
        </div>
      </div>
    </PhoneV2>
  );
}

Object.assign(window, {
  ScreenCloudInfoV2, ScreenCloudGalleryV2, ScreenAccountV2, ScreenPasswordV2, V2Field,
});
