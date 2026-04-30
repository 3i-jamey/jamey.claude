// Screen 1 — 나의 피보 (main settings, top half)
// Screen 2 — 설정 하단 (more settings + 고객지원 + 로그아웃)

function ScreenMyPivoTop({ onNav, accent, dense }) {
  const [frontCam, setFrontCam] = React.useState(false);
  return (
    <Phone>
      <StatusBar />
      <NavBar title="나의 피보" onBack={() => onNav && onNav('back')} />
      <div style={{ flex: 1, overflowY: 'auto', background: '#fff' }}>

        {/* Pod carousel */}
        <div style={{ padding: '20px 16px 8px', display: 'flex', gap: 12, overflowX: 'auto' }}>
          <DeviceCard accent state="connected" name="Pivo Plus" />
          <DeviceCard state="disconnected" name="Pivo Tour" />
          <AddDeviceCard />
        </div>

        {/* 계정 section */}
        <SectionLabel>계정</SectionLabel>
        <div style={{ background: '#fff' }}>
          <Row
            icon={<IconPerson />}
            iconColor={accent}
            label="계정 관리"
            value={<Chev />}
            onClick={() => onNav && onNav('account')}
          />
          <Row
            icon={<IconLock />}
            iconColor={accent}
            label="비밀번호 변경"
            value={<Chev />}
            onClick={() => onNav && onNav('password')}
          />
          <Row
            icon={<IconCloud />}
            iconColor={accent}
            label="피보 클라우드"
            value={<><span>0.01 GB / 3 GB</span><Chev /></>}
            onClick={() => onNav && onNav('cloud-info')}
          />
          <Row
            last
            icon={<IconCrown />}
            iconColor={accent}
            label="나의 구독"
            value={<><span style={{ color: PIVO_INK2, fontWeight: 500 }}>Free</span><Chev /></>}
            onClick={() => onNav && onNav('subscription')}
          />
        </div>

        {/* 앱 section */}
        <SectionLabel>앱</SectionLabel>
        <div style={{ background: '#fff' }}>
          <Row
            icon={<IconDevice />}
            iconColor={AMBER}
            label="내 기기 관리"
            value={<Chev />}
            onClick={() => onNav && onNav('devices')}
          />
          <Row
            icon={<IconPivoMark />}
            iconColor={AMBER}
            label="앱 버전"
            value={<span>1.20.0</span>}
          />
          <Row
            icon={<IconRefresh />}
            iconColor={AMBER}
            label="전면 카메라 사용"
            hint={<span style={{ display: 'inline-flex' }}><InfoIcon /></span>}
            value={<Toggle on={frontCam} onChange={setFrontCam} accent={accent} />}
          />
          <Row
            icon={<IconVideo />}
            iconColor={AMBER}
            label="해상도"
            value={<><span>4K · 30fps</span><Chev /></>}
            onClick={() => onNav && onNav('resolution')}
          />
          <Row
            icon={<IconAI />}
            iconColor={AMBER}
            label="AI 말 감지"
            value={<Chev />}
            onClick={() => onNav && onNav('ai')}
          />
          <Row
            last
            icon={<IconWifi />}
            iconColor={AMBER}
            label="네트워크 품질 테스트"
            value={<Chev />}
          />
        </div>

        {/* 고객지원 */}
        <SectionLabel>고객지원</SectionLabel>
        <div style={{ background: '#fff' }}>
          <Row icon={<IconHelp />} iconColor={PLUS_BLUE} label="고객지원 웹사이트" value={<Chev />} />
          <Row icon={<IconPencil />} iconColor={PLUS_BLUE} label="문제 신고" value={<Chev />} />
          <Row icon={<IconShield />} iconColor={PLUS_BLUE} label="개인정보 보호정책" value={<Chev />} />
          <Row last icon={<IconDoc />} iconColor={PLUS_BLUE} label="사용 약관" value={<Chev />} />
        </div>

        {/* Logout */}
        <div style={{ padding: '24px 16px 32px' }}>
          <button style={{
            width: '100%', height: 52, borderRadius: 999, border: 0,
            background: '#EAEAEB', color: PIVO_INK,
            fontFamily: 'Caros Soft, system-ui', fontWeight: 700, fontSize: 16,
            cursor: 'pointer',
          }}>로그아웃</button>
        </div>
      </div>
    </Phone>
  );
}

// Device card in carousel
function DeviceCard({ accent, state, name }) {
  const isConnected = state === 'connected';
  return (
    <div style={{
      flexShrink: 0, width: 138, height: 168, borderRadius: 18,
      background: '#F4F4F5',
      display: 'flex', flexDirection: 'column',
      position: 'relative', overflow: 'hidden',
      border: isConnected ? `1.5px solid ${PIVO_RED}` : '1.5px solid transparent',
    }}>
      {/* Connected glow */}
      {isConnected && (
        <div style={{
          position: 'absolute', top: 10, right: 10,
          padding: '4px 10px', borderRadius: 999,
          background: PIVO_RED, color: '#fff',
          fontSize: 10, fontWeight: 700, letterSpacing: 0.3,
          display: 'flex', alignItems: 'center', gap: 4,
          zIndex: 2,
        }}>
          <span style={{ width: 5, height: 5, borderRadius: 999, background: '#fff' }} />
          연결됨
        </div>
      )}
      <div style={{
        flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '18px 10px 4px',
      }}>
        <PivoPod accent={accent} />
      </div>
      <div style={{
        padding: '8px 12px 12px',
        display: 'flex', flexDirection: 'column', gap: 3,
      }}>
        <div style={{ fontWeight: 700, fontSize: 12, color: PIVO_INK }}>{name}</div>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 5,
          fontSize: 11, color: isConnected ? PIVO_INK2 : PIVO_INK3,
        }}>
          <span style={{
            width: 6, height: 6, borderRadius: '50%',
            background: isConnected ? TEAL : '#C8C9CD',
          }} />
          {isConnected ? '배터리 78%' : '연결되지 않음'}
        </div>
      </div>
    </div>
  );
}

function AddDeviceCard() {
  return (
    <div style={{
      flexShrink: 0, width: 138, height: 168, borderRadius: 18,
      background: '#FAFAFA', border: `2px dashed ${PIVO_LINE}`,
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      gap: 8, color: PIVO_INK3,
    }}>
      <div style={{
        width: 44, height: 44, borderRadius: '50%',
        background: '#fff', border: `1.5px solid ${PIVO_LINE}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 24, fontWeight: 300, color: PIVO_INK2,
      }}>+</div>
      <div style={{ fontSize: 12, fontWeight: 500 }}>기기 추가</div>
    </div>
  );
}

Object.assign(window, { ScreenMyPivoTop, DeviceCard, AddDeviceCard });
