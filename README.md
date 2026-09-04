# 수면 건강 체크 — Variant A

배포 URL: Vercel CLI 인증 불가로 아래 대체 배포 절차를 사용해야 합니다.

STOP-BANG 선별검사 직후 예약 요청으로 연결되는 A/B 테스트용 목업입니다. 실제 의료 서비스가 아니며 데이터베이스, 실제 예약, 결제 기능은 없습니다.

## 실행법

```bash
npm install
npm run dev
```

검증은 `npm run lint`와 `npm run build`로 수행합니다. QA용으로 각 경로에 `?demo=1`을 붙이면 5점(고위험) 상태가 채워집니다.

## 3스텝 플로우

```text
STEP 1 / (인트로 → STOP-BANG 8문항)
  ├─ 0~2점 → /low-risk → 처음으로
  └─ 3~8점 → STEP 2 /result
                    ↓ 즉시 예약 요청
              STEP 3 /request
                    ↓ 제출
                  /done
```

## 이벤트 스키마

모든 이벤트는 `variant`, `sessionId`, `ts`, `path`, `stepIndex`, `event`, `props`를 공통으로 가집니다.

| 이벤트 | props |
|---|---|
| session_start, intro_view, quiz_start | `{}` |
| quiz_answer | `{ qid, value, elapsedMs }` |
| quiz_complete | `{ score, riskBand }` |
| step_view | `{ step }` |
| cta_click | `{ id, label }` |
| form_start | `{}` |
| form_field_blur | `{ field, valid }` |
| form_submit | `{ fieldsFilled }` |
| funnel_complete | `{}` |
| page_exit | `{ durationMs }` |

이벤트는 `localStorage.ab_events_v1`에 최대 1,000건 저장되고 `/api/track`으로도 전송됩니다. `/debug`에서 확인, JSON 복사, CSV 다운로드, 초기화할 수 있습니다.

## Variant B와 다른 점

Variant A는 결과 화면에서 교육 콘텐츠, 치료법·합병증 설명, 병원 비교, 다른 선택지를 제공하지 않고 즉시 예약 요청 CTA를 노출합니다. Variant B와 디자인, 퀴즈, 계측 스키마는 동일하다는 전제입니다.

## 디자인 토큰

| 구분 | 값 |
|---|---|
| 폰트 | Pretendard CDN, `-apple-system, system-ui, sans-serif` |
| 색상 | `#FFFFFF`, `#F7F8FA`, `#111827`, `#6B7280`, `#E5E7EB`, `#2563EB`, `#1D4ED8`, `#EFF6FF`, `#DC2626`, `#059669` |
| 타이포 | h1 24/700/-0.02em, h2 20/700, body 16/400/1.6, caption 13/400 |
| 컨테이너 | 최대 480px, 좌우 20px, 상단 16px, 하단 40px |
| 라운드 | 카드 16px, 버튼·인풋 12px, 배지 999px |
| 간격 | 4/8/12/16/24/32/40px |
| 그림자 | `0 1px 2px rgba(17,24,39,0.06)` |

## 가정

- 인트로 본문과 완료 본문은 정확한 문장이 지정되지 않아 의료적 수치·비용·보험 내용을 추가하지 않는 짧은 한국어 안내로 작성했습니다.
- 시/도 선택지는 대한민국의 17개 광역자치단체를 사용했습니다.
- 예약 요청 정보는 목업 상태로만 처리하며 저장하거나 전송하지 않습니다.
- 결과의 진단 안내는 명세의 범위 안에서 두 문장으로 구성했습니다.

## Vercel 대체 배포 절차

현재 실행 환경에는 Vercel 인증 정보가 없어 CLI 배포를 완료할 수 없었습니다. 저장소는 GitHub의 `https://github.com/lythean1004/stopbang_AB_1`에 푸시되어 있습니다.

1. [Vercel 대시보드](https://vercel.com/new)에 로그인합니다.
2. **Import Git Repository**에서 `lythean1004/stopbang_AB_1`을 선택합니다.
3. Project Name을 `stopbang-ab-1`로 지정합니다.
4. Framework Preset은 **Next.js**, Root Directory는 저장소 루트로 둡니다.
5. Environment Variables에 `NEXT_PUBLIC_VARIANT` = `A`를 추가합니다.
6. **Deploy**를 선택합니다.
7. 배포가 끝나면 이 README의 최상단 배포 URL을 실제 Production URL로 교체합니다.
