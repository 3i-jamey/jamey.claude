// Screen: 피보 클라우드 storage info + 계정 관리 + 비밀번호 변경

function ScreenCloudInfo({ onNav }) {
  return (
    <Phone>
      <StatusBar />
      <NavBar title="피보 클라우드" onBack={() => onNav && onNav('back')} />
      <div style={{ flex: 1, overflow: 'auto', background: '#fff', padding: '20px 16px' }}>

        {/* Storage card */}
        <div style={{
          background: '#F4F4F5', borderRadius: 14, padding: '18px 20px',
          display: 'flex', flexDirection: 'column', gap: 12,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{
              padding: '5px 14px', borderRadius: 999,
              background: PLUS_BLUE_50, color: PLUS_BLUE,
              fontWeight: 600, fontSize: 13,
            }}>Free</span>
            <span style={{ fontSize: 14, color: PIVO_INK2, fontWeight: 500 }}>
              <span style={{ color: PIVO_INK, fontWeight: 700 }}>0.01 GB</span> / 3 GB
            </span>
          </div>
          <ProgressBar pct={0.3} color={PLUS_BLUE} height={6} />
        </div>

        <div style={{ height: 22 }} />

        <div style={{ background: '#fff' }}>
          <Row icon={<IconCloud />} iconColor={PIVO_RED} label="피보 클라우드로 이동" value={<Chev />} />
          <Row last icon={<IconCloudUp />} iconColor={PIVO_RED} label="더 많은 저장 공간 확보" value={<Chev />} onClick={() => onNav && onNav('subscription')} />
        </div>

        <p style={{
          margin: '20px 4px 0', fontSize: 13, lineHeight: 1.6, color: PIVO_INK2,
          fontFamily: 'Caros Soft, system-ui',
        }}>
          지금 구독하시면 사진과 비디오를 위한 최대 50GB의 저장 공간을 얻으실 수 있습니다. 잠재력을 발휘할 수 있는 다양한 추가 기능을 즐겨보세요!
        </p>
      </div>
    </Phone>
  );
}

function ScreenAccount({ onNav, name = 'Jamey', surname = 'Jeong', email = 'jamey.jeong@3i.ai' }) {
  const [n, setN] = React.useState(name);
  const [s, setS] = React.useState(surname);
  const [phone, setPhone] = React.useState('');
  return (
    <Phone>
      <StatusBar />
      <NavBar title="계정 관리" onBack={() => onNav && onNav('back')} />
      <div style={{ flex: 1, overflow: 'auto', background: '#fff', padding: '20px 22px 32px' }}>

        {/* Avatar */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24, position: 'relative' }}>
          <div style={{
            width: 110, height: 110, borderRadius: '50%',
            background: 'linear-gradient(135deg, #F46363 0%, #EC2544 50%, #B97AE6 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 12px 28px rgba(236,37,68,0.3)',
            position: 'relative',
          }}>
            <svg width="56" height="56" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="#fff" strokeWidth="2"/>
              <path d="M12 4a8 8 0 018 8" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="12" cy="12" r="3" fill="#fff"/>
            </svg>
            <button style={{
              position: 'absolute', right: -4, bottom: -2,
              width: 32, height: 32, borderRadius: '50%',
              background: '#fff', border: 0, cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              color: PIVO_INK,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}><IconPencil size={16} /></button>
          </div>
        </div>

        <Field label="이름" value={n} onChange={setN} />
        <Field label="성" value={s} onChange={setS} />
        <Field label="이메일" value={email} disabled />
        <Field label="핸드폰 번호" value={phone} onChange={setPhone} placeholder="010-0000-0000" />

        <div style={{ height: 8 }} />

        <OutlineButton onClick={() => onNav && onNav('password')} trailing={<IconArrowRight />}>
          비밀번호 변경
        </OutlineButton>

        <div style={{ height: 16 }} />
        <GradButton>저장</GradButton>

        <div style={{ textAlign: 'center', marginTop: 20 }}>
          <button style={{
            background: 'none', border: 0, cursor: 'pointer',
            color: PIVO_INK2, fontFamily: 'Caros Soft, system-ui',
            fontWeight: 500, fontSize: 14, textDecoration: 'underline',
            textUnderlineOffset: 3,
          }}>계정 삭제</button>
        </div>
      </div>
    </Phone>
  );
}

function Field({ label, value, onChange, disabled, placeholder, type = 'text' }) {
  const filled = !!value;
  return (
    <div style={{
      position: 'relative', marginBottom: 12,
      borderRadius: 999, border: `1.5px solid ${PIVO_LINE}`,
      background: disabled ? '#F4F4F5' : '#fff',
      padding: '10px 22px',
    }}>
      <label style={{
        position: 'absolute', top: filled ? 6 : '50%', left: 22,
        transform: filled ? 'translateY(0)' : 'translateY(-50%)',
        fontSize: filled ? 11 : 14,
        color: PIVO_INK3, fontWeight: 500,
        pointerEvents: 'none', transition: 'all .15s',
        background: disabled ? '#F4F4F5' : '#fff',
        padding: filled ? '0 4px' : 0,
      }}>{label}</label>
      <input
        type={type} value={value} disabled={disabled}
        placeholder={filled ? '' : ''}
        onChange={e => onChange && onChange(e.target.value)}
        style={{
          width: '100%', border: 0, outline: 'none', background: 'transparent',
          fontFamily: 'Caros Soft, system-ui', fontWeight: 500, fontSize: 16,
          color: disabled ? PIVO_INK3 : PIVO_INK,
          paddingTop: filled ? 12 : 4, paddingBottom: 4,
        }}
      />
    </div>
  );
}

function ScreenPassword({ onNav }) {
  const [strength, setStrength] = React.useState(2);
  return (
    <Phone>
      <StatusBar />
      <NavBar title="비밀번호 변경" onBack={() => onNav && onNav('back')} />
      <div style={{ flex: 1, overflow: 'auto', background: '#fff', padding: '24px 22px 32px' }}>

        <p style={{
          margin: '0 0 24px', fontSize: 14, lineHeight: 1.6, color: PIVO_INK2,
          fontFamily: 'Caros Soft, system-ui',
        }}>
          새 비밀번호는 8자 이상이어야 하며, 영문/숫자/특수문자를 포함해야 합니다.
        </p>

        <Field label="현재 비밀번호" value="••••••••" type="password" />
        <Field label="새 비밀번호" value="••••••••••" type="password" onChange={() => setStrength(3)} />

        {/* strength bar */}
        <div style={{ display: 'flex', gap: 6, padding: '4px 14px 8px' }}>
          {[1,2,3,4].map(i => (
            <div key={i} style={{
              flex: 1, height: 4, borderRadius: 2,
              background: i <= strength
                ? (strength <= 1 ? PIVO_RED : strength === 2 ? AMBER : TEAL)
                : '#E5E7EB',
            }} />
          ))}
        </div>
        <div style={{
          padding: '0 14px 16px', fontSize: 12, color: PIVO_INK2, fontWeight: 500,
        }}>
          {strength <= 1 && '약함'}
          {strength === 2 && '보통'}
          {strength >= 3 && <span style={{ color: '#0AAF6F' }}>강함</span>}
        </div>

        <Field label="새 비밀번호 확인" value="••••••••••" type="password" />

        <div style={{
          background: PIVO_RED_50, borderRadius: 12, padding: '12px 14px',
          display: 'flex', gap: 10, alignItems: 'flex-start',
          marginTop: 12, marginBottom: 24,
        }}>
          <span style={{ color: PIVO_RED, marginTop: 1 }}><InfoIcon /></span>
          <span style={{ fontSize: 12, color: PIVO_INK, lineHeight: 1.5 }}>
            비밀번호 변경 후에는 모든 기기에서 다시 로그인해야 합니다.
          </span>
        </div>

        <GradButton>비밀번호 변경</GradButton>
      </div>
    </Phone>
  );
}

Object.assign(window, { ScreenCloudInfo, ScreenAccount, ScreenPassword, Field });
