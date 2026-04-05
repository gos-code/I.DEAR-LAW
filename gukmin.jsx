import { useState, useMemo } from 'react';

const LAW_GUIDES = [{"category":"억울한고소/누명","situation":"불기소 처분을 받았는데 억울해요","urgency":"긴급","steps":"1단계: 불기소 통지서 수령 후 내용 확인
2단계: 상급 검찰청에 항고 신청 (30일 이내)
3단계: 항고 기각 시 고등법원에 재정신청 (항고 기각 후 10일 이내)
4단계: 재정신청 인용 시 법원이 공소 제기 결정","law":"형사소송법 제260조, 제259조의2","deadline":"항고: 불기소 통지 후 30일 / 재정신청: 항고 기각 후 10일","caution":"항고와 재정신청은 별개 절차. 항고를 먼저 거쳐야 재정신청 가능.","keywords":["불기소","무혐의","항고","재정신청"]},{"category":"억울한고소/누명","situation":"경찰 조사를 받게 됐어요","urgency":"긴급","steps":"1단계: 피의자 신분 확인 (참고인과 피의자는 권리가 다름)
2단계: 변호인 선임 또는 국선변호인 신청
3단계: 조사 전 묵비권 행사 가능 — '변호인 올 때까지 진술하지 않겠습니다'
4단계: 조서 열람 후 서명 (불리한 내용은 수정 요청 후 서명)","law":"형사소송법 제244조의3, 제33조","deadline":"조사 전 즉시","caution":"조서에 한번 서명하면 번복 어려움. 변호인 없이 불리한 진술 금지.","keywords":["경찰조사","묵비권","진술거부","피의자"]},{"category":"억울한고소/누명","situation":"영장 없이 체포당했어요","urgency":"긴급","steps":"1단계: 체포 이유·죄명 고지 요구 (경찰 의무)
2단계: 변호인 선임 즉시 연락
3단계: 법원에 체포 적부심사 청구 (체포 후 48시간 이내)
4단계: 법원이 체포 위법 인정 시 즉시 석방","law":"형사소송법 제214조의2, 제85조","deadline":"체포 후 48시간 이내 석방 또는 구속영장 청구","caution":"현행범은 영장 없이 체포 가능. 그 외 영장 없는 체포는 위법.","keywords":["불법체포","영장없이","체포적부심"]},{"category":"억울한고소/누명","situation":"무혐의 받았는데 상대방이 허위 고소였어요","urgency":"주의","steps":"1단계: 무혐의·불기소 처분서 공식 수령
2단계: 상대방의 고소 내용이 허위임을 입증할 증거 수집 (문자·녹음·CCTV)
3단계: 경찰 또는 검찰에 무고죄로 고소장 제출
4단계: 필요 시 민사 손해배상 청구 병행","law":"형법 제156조","deadline":"무혐의 확정 후 고소 시효 7년","caution":"단순 과장이 아닌 완전한 허위 사실이어야 무고 성립.","keywords":["무고","허위고소","역고소","누명"]},{"category":"억울한고소/누명","situation":"CCTV 없어 증거 불충분으로 수사가 안 돼요","urgency":"긴급","steps":"1단계: 경찰서에 주변 CCTV 영상 보전 신청 즉시 (30일 내 삭제)
2단계: 카드 사용내역·교통카드 기록·통화기록 수집
3단계: 목격자 연락처 확보
4단계: 증거 충분 시 고소장 보완 후 재수사 요청
5단계: 수사 불응 시 검찰에 직접 고소","law":"형사소송법 제184조","deadline":"CCTV 보전 신청: 사건 직후 즉시 (30일 이내)","caution":"CCTV는 사업장·기관별 보관 기간이 다름. 빠를수록 좋음.","keywords":["CCTV","증거보전","증거불충분","영상삭제"]},{"category":"억울한고소/누명","situation":"성추행 누명을 쓰고 있어요","urgency":"긴급","steps":"1단계: 사건 당일 동선 메모 즉시 작성 (시간·장소·동행인)
2단계: 변호인 선임 (조사 전 필수)
3단계: 알리바이 증거 수집 (교통카드·카드 영수증·CCTV 보전 신청)
4단계: 경찰 조사 시 변호인 동석 요청
5단계: 무혐의 확정 후 무고죄 고소 검토","law":"형사소송법 제244조의3","deadline":"CCTV 보전 신청 즉시 (30일 이내)","caution":"SNS에 관련 내용 올리면 명예훼손 역고소 위험. 조사 전 변호인 필수.","keywords":["성추행누명","성범죄누명","무고"]},{"category":"억울한고소/누명","situation":"고소 취하를 강요받고 있어요","urgency":"긴급","steps":"1단계: 강요 내용 녹음·캡처 즉시 보관
2단계: 경찰에 협박죄·강요죄로 신고
3단계: 강요에 의한 취하는 법적 효력 없음을 확인
4단계: 필요 시 접근금지 가처분 신청","law":"형법 제350조, 제324조","deadline":"즉시","caution":"협박에 의한 고소 취하는 의사 표시 흠결로 무효 주장 가능.","keywords":["고소취하강요","협박","공갈"]},{"category":"억울한고소/누명","situation":"직장에서 허위 신고로 징계를 받았어요","urgency":"주의","steps":"1단계: 징계 처분서 서면 수령 (구두 통보는 서면 요구)
2단계: 회사 내 재심 청구 (취업규칙상 절차 확인)
3단계: 재심 기각 시 노동위원회에 부당징계 구제신청
4단계: 허위 신고한 동료에 대해 명예훼손으로 별도 고소 가능","law":"근로기준법 제23조","deadline":"징계 통보 후 3개월 이내 노동위원회 신청","caution":"징계는 취업규칙 절차를 따랐는지가 핵심. 절차 위반 시 무효.","keywords":["직장징계","허위신고","부당징계"]},{"category":"교통사고","situation":"사고가 났어요","urgency":"긴급","steps":"1단계: 112·119 즉시 신고 (현장 이탈 금지)
2단계: 차량·도로·신호등·번호판·부상 부위 사진 촬영
3단계: 블랙박스 영상 즉시 저장 (덮어쓰기 방지)
4단계: 상대방 연락처·보험사 정보 교환
5단계: 내 보험사에 사고 접수
6단계: 증상 없어도 병원 방문 후 진단서 발급","law":"도로교통법 제54조","deadline":"사고 즉시","caution":"현장에서 구두 합의 절대 금지. 사진 촬영 전 차량 이동 금지.","keywords":["교통사고","사고처리","사고났어요"]},{"category":"교통사고","situation":"상대방이 사고 후 도망갔어요 (뺑소니)","urgency":"긴급","steps":"1단계: 112 즉시 신고 + 차량 번호·색상·특징 최대한 기억
2단계: 주변 CCTV·블랙박스 목격자 확보
3단계: 차량 미특정 시 정부보장사업(국토교통부)으로 보상 신청
4단계: 차량 특정 시 가해자 형사고소 + 민사 손해배상 청구","law":"도로교통법 제54조, 제148조","deadline":"사고 즉시","caution":"뺑소니 처벌: 5년 이상 징역 또는 1500만원 이상 벌금.","keywords":["뺑소니","도주","사고후도주"]},{"category":"교통사고","situation":"음주운전 차량에 치었어요","urgency":"긴급","steps":"1단계: 112 신고 후 음주측정 요구 (경찰이 현장 측정)
2단계: 현장 사진·영상 확보
3단계: 병원 방문 후 진단서 발급
4단계: 가해자 형사처벌 진행 (경찰 수사)
5단계: 민사 손해배상 청구 (형사와 별개로 진행 가능)","law":"도로교통법 제148조의2, 민법 제750조","deadline":"사고 즉시","caution":"음주운전자 보험도 대인·대물 보상 의무 있음.","keywords":["음주운전","음주사고"]},{"category":"교통사고","situation":"보험사가 과실 비율을 불공정하게 정했어요","urgency":"주의","steps":"1단계: 보험사 담당자에게 과실 비율 산정 근거 서면 요청
2단계: 근거 불충분 시 보험사 내부 민원 접수 (이의신청)
3단계: 내부 민원 불수용 시 과실비율 분쟁심의위원회에 심의 신청 (무료)
4단계: 심의 결과 불복 시 금융감독원 분쟁조정 신청
5단계: 최종 불복 시 민사소송","law":"민법 제750조","deadline":"합의 전 언제든 가능","caution":"합의서에 서명하면 이후 이의 제기 어려움. 합의 전 반드시 진행.","keywords":["과실비율","분쟁조정","보험사","과실비율분쟁"]},{"category":"교통사고","situation":"보험사가 병원비 지급을 거절해요","urgency":"주의","steps":"1단계: 진단서·의무기록·영수증 전부 수집
2단계: 보험사에 서면으로 지급 거절 사유 요청
3단계: 사유 불합리 시 금융감독원 금융민원 접수
4단계: 해결 안 되면 소액사건심판 또는 민사소송","law":"소액사건심판법 제2조","deadline":"치료 후 3년 이내","caution":"보험사의 구두 거절은 증거 없음. 반드시 서면으로 사유 받을 것.","keywords":["병원비거절","보험거부","의료비"]},{"category":"교통사고","situation":"상대방이 합의를 거부해요","urgency":"주의","steps":"1단계: 내 보험사에 접수 후 보험사 통해 협상 진행
2단계: 협상 결렬 시 자동차분쟁조정위원회 조정 신청 (무료)
3단계: 조정 불성립 시 민사소송으로 손해배상 청구","law":"민법 제750조","deadline":"사고 후 3년 이내","caution":"합의 없이도 보험사·법원 통해 배상받을 수 있음.","keywords":["합의거부","손해배상"]},{"category":"교통사고","situation":"상대방이 과도한 합의금을 요구해요","urgency":"주의","steps":"1단계: 합의서 서명 절대 보류
2단계: 내 보험사에 상황 보고 후 처리 위임
3단계: 상대방 부상 정도 의료 감정 요청 가능
4단계: 적정 합의금 초과 요구는 공갈죄 해당 가능 — 경찰 신고 검토","law":"민법 제750조, 형법 제350조","deadline":"합의 전","caution":"합의서 서명 후에는 번복 거의 불가.","keywords":["합의금과다","합의강요","과다청구"]},{"category":"교통사고","situation":"주차 중 내 차가 파손됐어요","urgency":"일반","steps":"1단계: 현장 사진·영상 촬영
2단계: 주차장 CCTV 열람 요청 (주차장 관리자에게)
3단계: 가해 차량 특정 시 해당 보험사에 수리비 청구
4단계: 미특정 또는 무보험 시 내 자차 보험 처리 후 구상","law":"민법 제750조","deadline":"손해 인지 후 3년","caution":"블랙박스 없으면 주차장 CCTV가 핵심.","keywords":["주차파손","주차사고","차량파손"]},{"category":"민사분쟁/돈문제","situation":"빌려준 돈을 안 갚아요","urgency":"주의","steps":"1단계: 차용증·이체내역·카톡 등 증거 정리
2단계: 상대방에게 구두 또는 문자로 1차 요청
3단계: 우체국에서 내용증명 발송 (법적 요구 공식 기록)
4단계: 무시 시 법원에 지급명령 신청 (3000만원 이하는 소액사건)
5단계: 지급명령 이의 또는 불이행 시 민사소송
6단계: 판결 후 재산·급여 강제집행","law":"소액사건심판법 제5조의3, 민법 제598조","deadline":"소멸시효 10년 이내","caution":"소멸시효 주의 — 10년 지나면 청구권 소멸.","keywords":["돈안갚음","지급명령","빌려준돈","차용"]},{"category":"민사분쟁/돈문제","situation":"판결받았는데 상대방이 안 갚아요 (배째라)","urgency":"주의","steps":"1단계: 확정 판결문 또는 이행권고결정 정본 확보
2단계: 상대방 재산 파악 (금융정보 조회 신청 — 법원 통해)
3단계: 부동산·차량·예금 압류 신청
4단계: 급여 있으면 급여 채권 압류·추심 신청
5단계: 재산 없으면 재산명시 신청 후 감치 가능","law":"소액사건심판법 제5조의8, 민사집행법","deadline":"판결 확정 후 즉시","caution":"강제집행 전 상대방 재산 파악이 선행. 없으면 실익 없음.","keywords":["배째라","강제집행","압류","급여압류"]},{"category":"민사분쟁/돈문제","situation":"사기를 당했어요","urgency":"긴급","steps":"1단계: 거래 내역·대화 내용·입금 증빙 전부 캡처·백업
2단계: 경찰서 또는 사이버수사대에 사기죄 고소장 제출
3단계: 피의자 특정 후 민사 손해배상 청구 병행
4단계: 판결 확정 후 재산 강제집행","law":"형법 제347조, 민법 제750조","deadline":"고소 시효 7년","caution":"처음부터 갚을 의사가 있었으면 사기 불성립 — 민사로만 해결.","keywords":["사기","온라인사기","중고사기","먹튀","보이스피싱"]},{"category":"민사분쟁/돈문제","situation":"계약서 없이 약속한 돈을 안 줘요","urgency":"주의","steps":"1단계: 카톡·문자·이메일·녹음 등 약속 증거 수집
2단계: 상대방에게 내용증명 발송
3단계: 무시 시 지급명령 또는 민사소송 제기
4단계: 판결 후 강제집행","law":"민법 제390조","deadline":"소멸시효 10년","caution":"계약서 없어도 카톡·녹음이 증거 됨. 증거 먼저 확보.","keywords":["구두약속","계약불이행","증거없음"]},{"category":"민사분쟁/돈문제","situation":"3000만원 이하 돈 분쟁이에요","urgency":"일반","steps":"1단계: 증거 정리 (이체내역·계약서·대화)
2단계: 법원에 소액사건심판 신청 (변호사 불필요)
3단계: 법원이 이행권고결정 발송
4단계: 상대방 2주 이내 이의 없으면 확정판결 효력
5단계: 이의 시 정식 재판 진행
6단계: 판결 후 강제집행","law":"소액사건심판법 제2조, 제5조의3","deadline":"소멸시효 이내","caution":"3000만원 초과 시 일반 민사소송. 분할 청구로 소액사건 만드는 건 불가.","keywords":["소액소송","소액사건","3000만원이하"]},{"category":"민사분쟁/돈문제","situation":"상대방이 재산을 빼돌릴 것 같아요","urgency":"주의","steps":"1단계: 채권·손해 발생 증거 수집
2단계: 법원에 가압류 신청 (소송 전에 미리 재산 동결)
3단계: 가압류 집행 후 본안 소송 제기
4단계: 승소 후 강제집행으로 전환","law":"민법 제406조, 민사집행법","deadline":"즉시 (재산 도피 전)","caution":"가압류 신청 시 공탁금 필요. 법원 확인 필요.","keywords":["가압류","재산도피","재산은닉"]},{"category":"민사분쟁/돈문제","situation":"온라인 쇼핑몰 환불을 거부해요","urgency":"일반","steps":"1단계: 구매 내역·환불 거부 내용 캡처 보관
2단계: 한국소비자원(1372)에 피해 구제 신청 (무료 조정)
3단계: 조정 거부 시 소액사건심판 신청
4단계: 신용카드 결제라면 카드사에 차지백 요청 병행","law":"소액사건심판법 제2조, 전자상거래법","deadline":"구매 후 3년","caution":"청약 철회는 수령 후 7일 이내 무조건 가능 (전자상거래법).","keywords":["환불거부","쇼핑몰","소비자분쟁","차지백"]},{"category":"민사분쟁/돈문제","situation":"공사 대금을 안 줘요","urgency":"주의","steps":"1단계: 공사 완료 증거 (사진·계약서·납품 확인서) 수집
2단계: 내용증명으로 지급 요청
3단계: 완공 건물에 유치권 행사 (점유 유지 필수)
4단계: 지급명령 또는 민사소송
5단계: 판결 후 강제집행","law":"민법 제320조, 제664조","deadline":"3년 이내","caution":"유치권은 점유를 잃으면 소멸. 현장 점유 유지가 핵심.","keywords":["공사대금","하도급","유치권","미수금"]},{"category":"민사분쟁/돈문제","situation":"프리랜서인데 용역 대금을 안 줘요","urgency":"주의","steps":"1단계: 계약서·작업물 납품 증거·카톡 지시 내용 수집
2단계: 내용증명 발송
3단계: 소액사건심판 또는 민사소송
4단계: 판결 후 강제집행
※ 근로자성 인정 시 노동부 신고도 가능","law":"민법 제686조, 제390조","deadline":"3년 이내","caution":"계약서 없어도 카톡 지시·납품 기록이 증거 됨.","keywords":["프리랜서","용역대금","외주비"]},{"category":"민사분쟁/돈문제","situation":"물건 팔았는데 대금을 안 줘요","urgency":"주의","steps":"1단계: 계약서·인도 확인·이체 요청 내역 수집
2단계: 내용증명 발송
3단계: 소액사건심판 또는 지급명령 신청
4단계: 판결 후 강제집행","law":"민법 제568조","deadline":"상사채권 5년 / 일반 10년","caution":"상사채권(사업자 간)은 소멸시효 5년으로 짧음. 빨리 행동 필요.","keywords":["매매대금","물건대금","미수금"]},{"category":"전세/부동산","situation":"이사 가야 하는데 보증금을 안 돌려줘요","urgency":"긴급","steps":"1단계: 이사 전 반드시 임차권 등기명령 신청 (이사 후 대항력 소멸)
2단계: 집주인에게 내용증명으로 반환 요구
3단계: 주택임대차분쟁조정위원회 조정 신청 (무료, 60일 처리)
4단계: 조정 불성립 시 보증금 반환 소송
5단계: 승소 후 집주인 재산 강제집행","law":"주택임대차보호법 제3조의3","deadline":"이사 전 임차권 등기명령 신청 필수","caution":"이사 먼저 가면 대항력·우선변제권 소멸. 반드시 등기명령 먼저.","keywords":["보증금반환","임차권등기","전세금"]},{"category":"전세/부동산","situation":"집주인이 다음 세입자 구해야 준다고 해요","urgency":"주의","steps":"1단계: 임차권 등기명령 신청 (이사 전)
2단계: 내용증명으로 계약 만료일 기준 즉시 반환 요구
3단계: 주택임대차분쟁조정위원회 조정 신청
4단계: 조정 불성립 시 보증금 반환 소송","law":"민법 제634조, 주택임대차보호법 제3조의3","deadline":"계약 만료 즉시","caution":"다음 세입자 여부는 법적 반환 의무와 무관.","keywords":["집주인거부","보증금","전세금반환"]},{"category":"전세/부동산","situation":"전세 사기가 의심돼요","urgency":"긴급","steps":"1단계: 등기부등본 즉시 확인 (근저당·가압류 현황)
2단계: 경찰청 전세사기 신고 (182)
3단계: 전세사기피해지원센터(1533-8119) 연락
4단계: 법률구조공단(132) 무료 법률 지원 신청
5단계: 임차권 등기명령 신청으로 대항력 유지","law":"주택임대차보호법 제3조의2","deadline":"즉시","caution":"계약 전 등기부등본 근저당 확인 필수.","keywords":["전세사기","깡통전세","보증금사기"]},{"category":"전세/부동산","situation":"계약 갱신을 집주인이 거부해요","urgency":"주의","steps":"1단계: 계약 만료 6~2개월 전 갱신 요청을 문자·내용증명으로 발송
2단계: 집주인 거부 사유 서면 요구 (법정 사유 외 거부 불가)
3단계: 부당 거부 시 주택임대차분쟁조정위원회 조정 신청
4단계: 집주인이 실거주 사유로 거부 후 2년 내 타인 임대 시 손해배상 청구","law":"주택임대차보호법 제6조의3","deadline":"만료 6~2개월 전","caution":"갱신 시 임대료 인상 상한 5%. 1회만 행사 가능.","keywords":["계약갱신","갱신거부","이사강요"]},{"category":"전세/부동산","situation":"집에 하자가 있는데 집주인이 안 고쳐줘요","urgency":"일반","steps":"1단계: 하자 내용 사진·영상 촬영
2단계: 집주인에게 수리 요청 문자 (증거 보존)
3단계: 수리 거부 시 직접 수리 후 비용 청구 (소액이면 차임 공제 가능)
4단계: 하자로 사용 불가 시 차임 감액 또는 계약 해지 가능","law":"민법 제618조, 제623조","deadline":"임대차 기간 중 언제든","caution":"임차인 과실로 인한 하자는 청구 불가.","keywords":["하자보수","집수리","누수","도배"]},{"category":"전세/부동산","situation":"월세 인상이 너무 과해요","urgency":"일반","steps":"1단계: 임대료 인상 상한 5% 초과 여부 확인
2단계: 초과 시 집주인에게 5% 이내로 조정 요청 (문자로)
3단계: 거부 시 주택임대차분쟁조정위원회 조정 신청 (무료)
4단계: 강제 인상 시 초과 차임 반환 청구 가능","law":"주택임대차보호법 제7조","deadline":"갱신 시","caution":"계약갱신청구권 행사 시에만 5% 상한 적용.","keywords":["월세인상","임대료인상","전세인상"]},{"category":"전세/부동산","situation":"집주인이 허락 없이 집에 들어와요","urgency":"주의","steps":"1단계: 112에 주거침입죄로 신고
2단계: 도어락 교체 (임차인 권리)
3단계: 재발 방지를 위한 내용증명 발송
4단계: 반복 시 손해배상 청구","law":"형법 제319조","deadline":"침입 즉시","caution":"집주인도 임차인 허락 없이 출입 불가.","keywords":["집주인침입","주거침입","무단침입"]},{"category":"전세/부동산","situation":"집이 경매로 넘어갔어요","urgency":"긴급","steps":"1단계: 전입신고·확정일자 날짜 확인 (우선변제권 순위 결정)
2단계: 경매 법원에 배당요구 신청 (경매 개시 결정 후 배당요구 종기일 이내)
3단계: 소액 보증금 해당 시 최우선변제 확인
4단계: 배당 이의 시 배당이의 소송 가능","law":"주택임대차보호법 제3조의2, 제8조","deadline":"배당요구 종기일 이내 (경매 개시 후 통지 확인)","caution":"배당요구 기간 놓치면 보증금 못 받을 수 있음.","keywords":["경매","보증금보호","배당요구"]},{"category":"전세/부동산","situation":"계약 전 확인해야 할 것들이 있어요","urgency":"일반","steps":"1단계: 인터넷등기소에서 등기부등본 확인 (근저당·가압류·소유자)
2단계: 건축물대장 확인 (불법건축물 여부)
3단계: 전입신고·확정일자 당일 처리
4단계: 전세보증보험 가입 검토 (HUG·HF)
5단계: 보증금이 시세 80% 초과 시 주의","law":"주택임대차보호법 제3조","deadline":"계약 전","caution":"등기부등본 근저당 + 보증금이 집값 초과 시 전세 사기 위험.","keywords":["전세계약","등기부등본","전세확인"]},{"category":"근로문제","situation":"월급을 안 줘요","urgency":"주의","steps":"1단계: 임금 지급일 경과 여부 확인
2단계: 사업주에게 서면으로 임금 지급 요청
3단계: 고용노동부(1350)에 임금체불 진정 신청
4단계: 진정 기각 또는 사업주 무자력 시 체당금 신청 (국가가 대신 지급)
5단계: 지급명령 또는 소액사건심판 병행 가능","law":"근로기준법 제43조, 제36조","deadline":"퇴직 후 3년 이내","caution":"체당금은 퇴직 후 2년 이내 신청. 상한액 있음.","keywords":["임금체불","월급안줌","급여미지급"]},{"category":"근로문제","situation":"갑자기 해고당했어요","urgency":"긴급","steps":"1단계: 해고 사유를 서면으로 요구 (구두 해고는 효력 논란)
2단계: 해고일로부터 3개월 이내 노동위원회에 부당해고 구제신청
3단계: 노동위원회 기각 시 중앙노동위원회에 재심
4단계: 재심 기각 시 행정소송
5단계: 복직 원하지 않으면 해고 기간 임금 상당액 금전 보상 신청 가능","law":"근로기준법 제23조, 제27조, 제28조","deadline":"해고일로부터 3개월 이내","caution":"5인 미만 사업장은 부당해고 구제신청 불가 (해고예고수당은 적용).","keywords":["부당해고","해고","권고사직"]},{"category":"근로문제","situation":"퇴직금을 안 줘요","urgency":"주의","steps":"1단계: 1년 이상 근무·주 15시간 이상 여부 확인
2단계: 퇴직 후 14일 이내 미지급 시 고용노동부 진정 신청
3단계: 지급명령 신청 병행 가능
4단계: 사업주 무자력 시 체당금 신청","law":"근로기준법 제34조, 근로자퇴직급여보장법","deadline":"퇴직 후 3년 이내","caution":"14일 이후 미지급 시 연 20% 지연이자 발생.","keywords":["퇴직금","퇴직금미지급"]},{"category":"근로문제","situation":"연차를 못 쓰게 하거나 연차수당을 안 줘요","urgency":"일반","steps":"1단계: 연차 일수 계산 (1년 15일, 3년마다 1일 추가 최대 25일)
2단계: 사용 촉진 제도 실시 여부 확인 (실시 시 수당 미지급 가능)
3단계: 사용 촉진 미실시 시 미사용 연차수당 청구
4단계: 거부 시 고용노동부 진정 신청","law":"근로기준법 제60조, 제61조","deadline":"퇴직 후 3년 이내","caution":"연차 사용 촉진 제도 실시 여부가 수당 지급 여부 좌우.","keywords":["연차","연차수당","유급휴가","휴가거부"]},{"category":"근로문제","situation":"야간·주말·연장 수당을 안 줘요","urgency":"주의","steps":"1단계: 임금명세서·근태기록으로 미지급 내역 산정
2단계: 사업주에게 서면 청구
3단계: 고용노동부 임금체불 진정 신청
4단계: 지급명령 신청 가능","law":"근로기준법 제56조","deadline":"퇴직 후 3년 이내","caution":"연장·야간·휴일은 각 통상임금의 50% 가산. 포괄임금제 논란 시 전문가 상담.","keywords":["야간수당","주말수당","연장수당","추가수당"]},{"category":"근로문제","situation":"직장 내 괴롭힘을 당하고 있어요","urgency":"긴급","steps":"1단계: 괴롭힘 내용 일시·장소·내용 기록 (메모·녹음)
2단계: 회사 내 신고 (사용자 또는 취업규칙상 담당자)
3단계: 회사가 조치 안 할 시 고용노동부 신고
4단계: 신고 이유로 불이익 받으면 별도 신고 가능
5단계: 심각한 경우 형사고소(폭행·협박) 또는 민사 손해배상 병행","law":"근로기준법 제76조의2, 제76조의3","deadline":"사건 발생 후 즉시","caution":"신고 후 불이익 처우는 더 무겁게 처벌.","keywords":["직장내괴롭힘","갑질","따돌림","직장폭행"]},{"category":"근로문제","situation":"해고 예고 없이 당일 해고당했어요","urgency":"주의","steps":"1단계: 30일 전 서면 예고 받은 적 있는지 확인
2단계: 미예고 시 해고예고수당(30일분 통상임금) 청구
3단계: 고용노동부 진정 또는 지급명령 신청
4단계: 부당해고 해당 시 구제신청 병행","law":"근로기준법 제26조","deadline":"퇴직 후 3년 이내","caution":"일용직·수습 3개월 이내·귀책 해고는 해고예고 면제.","keywords":["당일해고","즉시해고","해고예고수당"]},{"category":"근로문제","situation":"직장 내 성희롱을 당했어요","urgency":"긴급","steps":"1단계: 피해 내용 기록 및 증거 보존 (문자·녹음·목격자)
2단계: 회사에 신고 (사업주 의무 조치)
3단계: 회사가 조치 안 할 시 고용노동부·국가인권위원회 신고
4단계: 형사 고소 (강제추행 등) 또는 민사 손해배상 가능","law":"남녀고용평등법 제12조, 제14조","deadline":"사건 발생 후 즉시","caution":"2차 피해 방지 의무 위반 시 회사도 처벌 대상.","keywords":["직장성희롱","성희롱","성추행직장"]},{"category":"근로문제","situation":"육아휴직을 거부당했어요","urgency":"주의","steps":"1단계: 육아휴직 신청을 서면으로 제출 (증거 보존)
2단계: 고용노동부에 신고
3단계: 거부 이유로 불이익 시 부당해고·징계 구제신청 병행","law":"남녀고용평등법 제19조","deadline":"거부 즉시","caution":"5인 이상 사업장 의무. 1세 미만 자녀 시 분할 사용 가능.","keywords":["육아휴직","육아휴직거부","출산휴가"]},{"category":"근로문제","situation":"5인 미만 사업장인데 억울하게 해고당했어요","urgency":"주의","steps":"1단계: 부당해고 구제신청은 불가 (5인 미만 적용 제외)
2단계: 해고예고수당 미지급 시 고용노동부 신고 (5인 미만도 적용)
3단계: 임금체불 있으면 별도 진정
4단계: 민사 손해배상은 청구 가능","law":"근로기준법 제11조, 제26조","deadline":"퇴직 후 3년 이내","caution":"5인 미만은 부당해고 보호 없지만 임금·퇴직금·해고예고는 적용.","keywords":["5인미만","소규모사업장","부당해고"]},{"category":"근로문제","situation":"실업급여를 받고 싶어요","urgency":"일반","steps":"1단계: 비자발적 퇴직 여부 확인 (권고사직·계약만료 포함)
2단계: 퇴직 다음날부터 고용센터 방문 실업급여 신청
3단계: 수급자격 인정 후 구직활동 의무 이행
4단계: 4주마다 고용센터 출석 신고","law":"고용보험법 제40조","deadline":"퇴직 후 12개월 이내 신청","caution":"자진 퇴사는 원칙 불가. 권고사직은 가능.","keywords":["실업급여","고용보험","퇴직급여"]},{"category":"폭행/협박/명예훼손","situation":"폭행을 당했어요","urgency":"긴급","steps":"1단계: 112 신고 (현장 CCTV 보전 요청)
2단계: 병원 방문 후 진단서 발급 (당일 필수)
3단계: 경찰서에 폭행·상해죄 고소장 제출
4단계: 민사 손해배상 청구 병행 (치료비·위자료)","law":"형법 제260조, 제257조","deadline":"고소 시효 7년","caution":"진단서 없으면 상해 입증 어려움. 합의는 충분히 고민 후 결정.","keywords":["폭행","맞음","신체폭력","폭행고소"]},{"category":"폭행/협박/명예훼손","situation":"흉기로 위협을 받았어요","urgency":"긴급","steps":"1단계: 즉시 112 신고 후 안전한 곳으로 이동
2단계: 흉기 종류·위협 상황 진술
3단계: 특수협박·특수폭행으로 형사고소
4단계: 재발 우려 시 접근금지 가처분 신청","law":"형법 제284조, 제258조의2","deadline":"고소 시효 7년","caution":"흉기 사용은 특수협박으로 형이 크게 가중됨.","keywords":["흉기","특수협박","특수폭행"]},{"category":"폭행/협박/명예훼손","situation":"SNS나 인터넷에 허위 사실이 올라왔어요","urgency":"주의","steps":"1단계: 게시물 URL·날짜·작성자 포함 캡처 즉시 (삭제 전)
2단계: 플랫폼(네이버·카카오 등)에 게시물 신고·삭제 요청
3단계: 경찰 사이버수사대에 명예훼손으로 고소
4단계: 민사 손해배상 청구 가능","law":"형법 제307조","deadline":"고소 시효 7년","caution":"사실이어도 명예훼손 성립 가능. 허위 사실은 더 무겁게 처벌.","keywords":["명예훼손","SNS","허위사실","악플","인터넷"]},{"category":"폭행/협박/명예훼손","situation":"욕설·모욕을 당했어요","urgency":"주의","steps":"1단계: 발언 녹음 또는 캡처 보관
2단계: 목격자 연락처 확보
3단계: 경찰에 모욕죄 고소
4단계: 민사 손해배상 가능","law":"형법 제311조","deadline":"고소 시효 7년","caution":"공연성 필요 — 단둘이 있을 때 욕설은 모욕죄 성립 어려움.","keywords":["모욕","욕설","공개욕설","인터넷욕"]},{"category":"폭행/협박/명예훼손","situation":"협박 문자·전화를 받고 있어요","urgency":"긴급","steps":"1단계: 협박 내용 캡처·녹음 즉시 보관
2단계: 경찰에 협박죄로 신고
3단계: 반복·지속 시 접근금지 가처분 신청
4단계: 민사 손해배상 청구 가능","law":"형법 제283조","deadline":"즉시","caution":"협박은 반의사불벌죄. 합의 시 처벌 불가.","keywords":["협박","위협","겁주기","카톡협박","문자협박"]},{"category":"폭행/협박/명예훼손","situation":"돈 주지 않으면 신고하겠다고 협박해요","urgency":"긴급","steps":"1단계: 협박 내용 녹음·캡처 즉시 보관
2단계: 절대 돈 주지 말 것
3단계: 경찰에 공갈죄로 신고
4단계: 만약 허위 신고로 실제 고소 시 무고죄 역고소 가능","law":"형법 제350조","deadline":"즉시","caution":"돈을 주면 공갈 성립 증거가 됨. 절대 주지 말 것.","keywords":["공갈","협박금품","돈뜯기","갈취"]},{"category":"폭행/협박/명예훼손","situation":"스토킹을 당하고 있어요","urgency":"긴급","steps":"1단계: 112 신고 (긴급 접근금지 조치 가능)
2단계: 스토킹 행위 날짜·내용 기록 및 증거 보존
3단계: 경찰에 스토킹처벌법으로 고소
4단계: 법원에 접근금지 가처분 신청","law":"스토킹범죄처벌법 제2조, 제4조","deadline":"즉시","caution":"스토킹은 초기에 강하게 대응해야 함. 방치하면 더 심해짐.","keywords":["스토킹","따라다님","집앞대기"]},{"category":"폭행/협박/명예훼손","situation":"불법 촬영(몰래카메라) 피해를 당했어요","urgency":"긴급","steps":"1단계: 경찰 신고
2단계: 디지털성범죄피해자지원센터(02-735-8994) 연락 (영상 삭제 지원)
3단계: 형사고소 (성폭력처벌법)
4단계: 민사 손해배상 청구","law":"성폭력처벌법 제14조","deadline":"즉시","caution":"영상이 유포됐다면 지원센터 먼저 연락 — 빠른 삭제가 우선.","keywords":["몰카","불법촬영","디지털성범죄"]},{"category":"가족/일상분쟁","situation":"양육비를 안 줘요","urgency":"주의","steps":"1단계: 기존 판결·심판·조정조서 확인
2단계: 양육비이행관리원(02-36763-100) 무료 지원 신청
3단계: 가정법원에 이행명령 신청
4단계: 이행명령 불이행 시 감치(최대 30일 구치소) 신청
5단계: 상습 불이행 시 운전면허 정지·출국금지 신청 가능","law":"가사소송법 제46조, 제67조","deadline":"언제든","caution":"이행명령 전 판결·조정조서가 있어야 함.","keywords":["양육비","양육비미지급","양육비강제"]},{"category":"가족/일상분쟁","situation":"이혼하고 싶어요","urgency":"일반","steps":"1단계: 협의 가능 시 — 가정법원에 협의이혼 의사 확인 신청
2단계: 이혼 숙려기간 이후 (자녀 있으면 3개월, 없으면 1개월) 이혼 성립
3단계: 협의 불가 시 — 가정법원에 이혼 조정 신청
4단계: 조정 불성립 시 이혼 소송 (재판상 이혼)
※ 재산분할·위자료·양육권·양육비 동시 청구 가능","law":"민법 제834조, 제836조의2, 제840조","deadline":"언제든","caution":"재산분할 청구권은 이혼 후 2년 이내.","keywords":["이혼","협의이혼","재판이혼","이혼절차"]},{"category":"가족/일상분쟁","situation":"상속을 포기하고 싶어요 (빚이 많아요)","urgency":"긴급","steps":"1단계: 사망 인지 후 즉시 상속 재산·부채 파악
2단계: 3개월 이내 가정법원에 상속 포기 신청
3단계: 부채 초과 불확실 시 한정승인 신청 (재산 범위 내 책임)
4단계: 모든 상속인이 포기 시 다음 순위로 상속 이전 — 주의 필요","law":"민법 제1019조, 제1028조","deadline":"사망 인지 후 3개월 이내 (절대적 기간)","caution":"3개월 경과 시 단순승인으로 빚 전부 상속. 반드시 기간 내 신청.","keywords":["상속포기","빚상속","한정승인"]},{"category":"가족/일상분쟁","situation":"층간소음이 심해요","urgency":"일반","steps":"1단계: 소음 내용 녹음·시간 기록 (증거 보존)
2단계: 직접 항의 또는 관리사무소 통해 시정 요청
3단계: 층간소음 이웃사이센터(1661-2642) 신고 (무료 현장 측정·조정)
4단계: 조정 불성립 시 민사 손해배상 청구
5단계: 고의·반복 시 경범죄처벌법 위반으로 신고 가능","law":"민법 제217조","deadline":"언제든","caution":"직접 항의 시 갈등 심화 우려. 이웃사이센터 먼저 활용 권장.","keywords":["층간소음","소음","이웃분쟁"]},{"category":"가족/일상분쟁","situation":"이혼 후 재산분할을 못 받았어요","urgency":"주의","steps":"1단계: 이혼 후 2년 이내 여부 확인 (청구권 소멸시효)
2단계: 상대방 재산 파악 (금융정보 조회 신청 — 법원 통해)
3단계: 가정법원에 재산분할 청구
4단계: 재산 은닉 의심 시 가압류 먼저 신청","law":"민법 제839조의2","deadline":"이혼 후 2년 이내","caution":"2년 경과 시 청구권 소멸. 반드시 기간 내 청구.","keywords":["재산분할","이혼재산","위자료"]},{"category":"가족/일상분쟁","situation":"가정폭력을 당하고 있어요","urgency":"긴급","steps":"1단계: 즉시 112 신고
2단계: 경찰 긴급 임시조치 요청 (접근금지·퇴거 명령)
3단계: 가정폭력 피해자 보호시설 또는 상담소 연락
4단계: 가해자에 대한 피해자 보호명령 신청 (법원)
5단계: 형사고소 병행 가능","law":"가정폭력처벌법 제8조, 제29조","deadline":"즉시","caution":"신고 후 가해자가 아닌 피해자가 나가야 하는 상황이면 보호시설 연락.","keywords":["가정폭력","폭행","가정내폭력"]},{"category":"가족/일상분쟁","situation":"배우자가 바람을 폈어요 (이혼 원할 때)","urgency":"주의","steps":"1단계: 증거 확보 (문자·카톡·사진·신용카드 내역 — 적법한 방법으로)
2단계: 증거 확보 후 이혼 조정 또는 소송 제기
3단계: 상간자(제3자)에게도 위자료 청구 가능
4단계: 재산분할·양육권 동시 청구","law":"민법 제840조, 제806조","deadline":"이혼 청구 시 / 위자료: 안 날로부터 3년","caution":"불법 녹음·도청은 증거로 사용 불가 + 역으로 처벌 가능.","keywords":["바람","불륜","외도","위자료"]},{"category":"가족/일상분쟁","situation":"유언장이 없는데 상속이 어떻게 되나요","urgency":"일반","steps":"1단계: 법정 상속 순위 확인 (1순위: 자녀+배우자 / 2순위: 부모 / 3순위: 형제자매)
2단계: 상속재산 및 부채 파악
3단계: 상속인 전원 협의분할 또는 법원 심판 분할
4단계: 부채 많으면 3개월 내 한정승인 또는 포기 검토","law":"민법 제1000조, 제1009조","deadline":"상속 개시 후","caution":"상속인 중 1명이라도 반대하면 협의 불성립 — 법원 심판 필요.","keywords":["상속","법정상속","유언없음","상속순위"]},{"category":"통매음/모욕죄고소","situation":"카카오톡·문자로 성적 수치심을 주는 메시지를 받았어요 (통매음 피해)","urgency":"긴급","steps":"1단계: 해당 메시지 캡처 즉시 (삭제 전 백업, 발신자 번호 포함)
2단계: 발신 번호·계정 정보 보존 (카카오톡 프로필·ID 캡처)
3단계: 경찰서 또는 사이버수사대에 통신매체이용음란죄로 고소
4단계: 피의자 특정 후 민사 손해배상 청구 가능
5단계: 반복·지속 시 접근금지 가처분 신청 병행","law":"성폭력처벌법 제13조 (통신매체이용음란죄)","deadline":"고소 시효 7년 이내","caution":"메시지 삭제하면 증거 소멸. 캡처 전 절대 삭제하지 말 것. 카카오톡은 상대방이 메시지 삭제해도 내 화면 캡처로 증거 유지 가능.","keywords":["통매음","카톡성적메시지","성적수치심","음란메시지","문자성희롱"]},{"category":"통매음/모욕죄고소","situation":"SNS DM·이메일로 음란한 사진·영상을 받았어요","urgency":"긴급","steps":"1단계: 해당 DM·이메일 캡처 (발신자 계정·날짜 포함)
2단계: 플랫폼에 해당 계정 신고 (증거 확보 후 신고 순서 중요)
3단계: 경찰 사이버수사대에 통신매체이용음란죄 고소
4단계: 발신자 특정 어려운 경우 경찰이 플랫폼에 수사협조 요청 가능
5단계: 피해가 지속되면 접근금지 가처분 신청","law":"성폭력처벌법 제13조","deadline":"고소 시효 7년 이내","caution":"플랫폼 신고 먼저 하면 계정 삭제로 증거 소멸 위험. 반드시 캡처 먼저, 신고는 나중에.","keywords":["SNS음란","DM음란사진","이메일음란","성적수치심","사이버성희롱"]},{"category":"통매음/모욕죄고소","situation":"전화·음성으로 성적 발언을 들었어요 (전화 통매음)","urgency":"긴급","steps":"1단계: 통화 즉시 종료 후 발신 번호 메모
2단계: 통화 내용 녹음 가능 여부 확인 (다음 통화 시 녹음 준비)
3단계: 통신사에 발신 번호 기록 요청
4단계: 경찰에 통신매체이용음란죄로 신고
5단계: 지속되면 해당 번호 착신 차단 + 스팸 신고","law":"성폭력처벌법 제13조","deadline":"고소 시효 7년 이내","caution":"전화 통매음은 녹음 증거가 핵심. 상대방 모르게 녹음은 본인 통화 시 합법.","keywords":["전화성희롱","음란전화","전화통매음","성적발언전화"]},{"category":"통매음/모욕죄고소","situation":"통매음으로 고소당했는데 억울해요 (허위 신고 의심)","urgency":"긴급","steps":"1단계: 변호인 즉시 선임 (통매음 피의자 조사는 반드시 변호인 동석)
2단계: 해당 메시지·통화를 실제로 보낸 적 없음을 입증할 증거 수집
3단계: 본인 기기 포렌식 자료 확보 (발송 기록 없음 확인)
4단계: 고소인과의 사전 분쟁·감정 다툼 정황 수집 (무고 입증 준비)
5단계: 무혐의 확정 후 무고죄 역고소 검토","law":"성폭력처벌법 제13조, 형법 제156조(무고)","deadline":"조사 전 즉시 변호인 선임","caution":"통매음 피의자는 반의사불벌죄 아님. 합의해도 처벌 가능. 변호인 없이 조사받는 것은 매우 위험.","keywords":["통매음고소당함","통매음억울","통매음무고","허위통매음신고"]},{"category":"통매음/모욕죄고소","situation":"인터넷 커뮤니티·유튜브 댓글에서 욕설·모욕을 받았어요","urgency":"주의","steps":"1단계: 해당 게시물·댓글 URL + 캡처 즉시 보관 (삭제 전)
2단계: 플랫폼에 게시물 신고 (캡처 완료 후 신고)
3단계: 작성자 IP·계정 정보 확보를 위한 증거보전 신청 (법원 또는 경찰)
4단계: 경찰서에 모욕죄 고소
※ 익명 작성자라도 경찰이 IP 추적 가능","law":"형법 제311조 (모욕죄)","deadline":"고소 시효 7년 이내","caution":"모욕죄는 반의사불벌죄. 합의 시 처벌 불가. 공연성(불특정 다수 인식 가능) 요건 필요.","keywords":["인터넷욕설","댓글모욕","유튜브모욕","커뮤니티욕설","온라인모욕"]},{"category":"통매음/모욕죄고소","situation":"단체 카톡방·오픈채팅에서 특정인을 모욕하는 글이 올라왔어요","urgency":"주의","steps":"1단계: 해당 대화 내용 캡처 (방 이름·참여 인원 수 포함)
2단계: 대화방 나가기 전 캡처 완료
3단계: 카카오톡 고객센터에 증거 보전 요청
4단계: 경찰에 모욕죄로 고소
※ 단체방 구성원 수가 많을수록 공연성 인정 가능성 높음","law":"형법 제311조 (모욕죄)","deadline":"고소 시효 7년 이내","caution":"소규모 단체방(3~4명)은 공연성 여부 다툼 있음. 방 인원 수가 증거에 포함되어야 함.","keywords":["단체카톡모욕","오픈채팅모욕","단체방욕설","카톡방모욕"]},{"category":"통매음/모욕죄고소","situation":"모욕죄·통매음으로 고소당했어요 (실제 해당 내용을 작성했어요)","urgency":"긴급","steps":"1단계: 변호인 선임 후 고소 내용 검토
2단계: 발언이 '사실 적시'인지 '의견 표명'인지 확인 (의견은 모욕 여부 다툼 가능)
3단계: 공연성 요건 충족 여부 검토 (단둘이 나눈 발언은 모욕죄 성립 어려움)
4단계: 고소인과 합의 검토 (모욕죄는 반의사불벌죄 — 합의 시 처벌 면할 수 있음)
5단계: 통매음은 합의와 무관하게 처벌 가능 — 혐의 부인 전략 필요","law":"형법 제311조, 성폭력처벌법 제13조","deadline":"수사 통보 즉시","caution":"모욕죄는 합의로 처벌 면할 수 있지만 통매음은 불가. 두 죄목이 동시에 적용된 경우 각각 대응 전략이 달라야 함.","keywords":["모욕죄고소당함","통매음고소당함","합의모욕","모욕죄대응"]},{"category":"통매음/모욕죄고소","situation":"전 연인이 성적 메시지를 보내며 연락을 끊지 않아요","urgency":"긴급","steps":"1단계: 모든 메시지 캡처 보관
2단계: 112 신고 또는 경찰서 방문 (스토킹+통매음 병합 신고)
3단계: 통매음 고소 + 스토킹처벌법 적용 요청
4단계: 법원에 접근금지 가처분 신청
5단계: 메시지 차단 후 추가 연락 시 증거 자동 확보","law":"성폭력처벌법 제13조, 스토킹범죄처벌법 제2조","deadline":"즉시","caution":"전 연인이라도 동의 없는 성적 메시지는 통매음 성립. 연인 관계 종료 후 발송부터 적용됨.","keywords":["전연인성적메시지","이별후통매음","연락차단","스토킹통매음"]}];

const CATEGORIES = [
  {key:'억울한고소/누명',    icon:'⚖️', title:'억울한 고소 / 누명',    desc:'불기소·누명·조사 대응',   urgent:true},
  {key:'교통사고',          icon:'🚗', title:'교통사고',              desc:'보험·합의·뺑소니',        urgent:true},
  {key:'민사분쟁/돈문제',   icon:'💼', title:'민사 분쟁 / 돈 문제',   desc:'사기·채권·강제집행',      urgent:false},
  {key:'전세/부동산',       icon:'🏠', title:'전세 / 부동산',         desc:'보증금·계약·경매',        urgent:false},
  {key:'근로문제',          icon:'👷', title:'근로 문제',             desc:'해고·임금·괴롭힘',        urgent:false},
  {key:'폭행/협박/명예훼손',icon:'🛡️', title:'폭행·협박·명예훼손',   desc:'폭행·스토킹·SNS',         urgent:true},
  {key:'통매음/모욕죄고소', icon:'📵', title:'통매음 / 모욕죄',       desc:'음란메시지·댓글모욕·고소대응', urgent:true},
  {key:'가족/일상분쟁',     icon:'👨‍👩‍👧', title:'가족 / 일상 분쟁',   desc:'양육비·이혼·상속',        urgent:false},
];

let _posts=[
  {id:1,title:'일일근로자 법 적용이 헷갈려요',author:'A씨',body:'저는 일일근로자인데 법에 해당이 안된다고 합니다. 쉬운 설명을 요청드립니다.',tag:'근로',votesUp:128,votesDown:6,userVote:null,comments:[{id:101,author:'익명',body:'저도 같은 상황입니다. 꼭 추가해주세요.',createdAt:'2025-06-01'}],createdAt:'2025-06-01'},
  {id:2,title:'플랫폼 배달 라이더 산재 처리 궁금해요',author:'B씨',body:'배달 중 사고가 났는데 플랫폼은 책임을 안 진다고 합니다.',tag:'플랫폼노동',votesUp:74,votesDown:3,userVote:null,comments:[],createdAt:'2025-06-04'},
];
let _nextPostId=3,_nextCommentId=200;
const api={
  getPosts(sort='recent'){return[..._posts].sort((a,b)=>sort==='top'?(b.votesUp-b.votesDown)-(a.votesUp-a.votesDown):b.id-a.id);},
  createPost({title,body,author,tag}){const p={id:_nextPostId++,title,body,author:author||'익명',tag:tag||'기타',votesUp:0,votesDown:0,userVote:null,comments:[],createdAt:new Date().toISOString().slice(0,10)};_posts=[p,..._posts];return p;},
  vote(id,type){_posts=_posts.map(p=>{if(p.id!==id)return p;if(p.userVote===type)return{...p,userVote:null,[type==='up'?'votesUp':'votesDown']:p[type==='up'?'votesUp':'votesDown']-1};const u=p.userVote?{[p.userVote==='up'?'votesUp':'votesDown']:p[p.userVote==='up'?'votesUp':'votesDown']-1}:{};return{...p,userVote:type,[type==='up'?'votesUp':'votesDown']:p[type==='up'?'votesUp':'votesDown']+1,...u};});return _posts.find(p=>p.id===id);},
  addComment(id,{author,body}){const c={id:_nextCommentId++,author:author||'익명',body,createdAt:new Date().toISOString().slice(0,10)};_posts=_posts.map(p=>p.id===id?{...p,comments:[...p.comments,c]}:p);return c;},
};
const TAGS=['전체','근로','플랫폼노동','프리랜서','부동산','교통','형사','가족','기타'];

function UrgencyBadge({urgency}){
  const m={긴급:{bg:'bg-red-100',tx:'text-red-700',lb:'🚨 긴급'},주의:{bg:'bg-amber-100',tx:'text-amber-700',lb:'⚠ 주의'},일반:{bg:'bg-green-100',tx:'text-green-700',lb:'✓ 일반'}};
  const s=m[urgency]||m['일반'];
  return <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${s.bg} ${s.tx}`}>{s.lb}</span>;
}

function StepList({stepsText}){
  if(!stepsText)return null;
  const lines=stepsText.split('\n').filter(l=>l.trim());
  return(
    <div className="space-y-2">
      {lines.map((line,i)=>{
        const isStep=/^[0-9]+단계:/.test(line.trim());
        const isNote=/^※/.test(line.trim());
        if(isStep){
          const [label,...rest]=line.split(':');
          return(
            <div key={i} className="flex gap-3 items-start">
              <div className="w-6 h-6 rounded-full bg-gray-900 text-white flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                {label.replace(/[^0-9]/g,'')}
              </div>
              <span className="text-sm text-gray-800 leading-5 pt-0.5">{rest.join(':').trim()}</span>
            </div>
          );
        }
        if(isNote){
          return <p key={i} className="text-xs text-blue-700 bg-blue-50 rounded-lg px-3 py-2 leading-5">{line.trim()}</p>;
        }
        return <p key={i} className="text-xs text-gray-500 leading-5 pl-9">{line.trim()}</p>;
      })}
    </div>
  );
}

function GuideCard({guide}){
  const[showCaution,setShowCaution]=useState(false);
  return(
    <div className="rounded-2xl border bg-white overflow-hidden">
      <div className="p-4 border-b bg-gray-50 flex items-start justify-between gap-2">
        <div className="text-sm font-semibold text-gray-900 leading-5 flex-1">{guide.situation}</div>
        <UrgencyBadge urgency={guide.urgency}/>
      </div>
      <div className="p-4 space-y-4">
        <StepList stepsText={guide.steps}/>
        {guide.deadline&&(
          <div className="flex items-center gap-2 rounded-xl bg-red-50 border border-red-100 px-3 py-2">
            <span className="text-sm flex-shrink-0">⏰</span>
            <span className="text-xs text-red-800 font-medium">{guide.deadline}</span>
          </div>
        )}
        {guide.caution&&(
          <div>
            <button onClick={()=>setShowCaution(o=>!o)} className="flex items-center gap-1.5 text-xs font-medium text-amber-700">
              ⚠ 주의사항 {showCaution?'▲':'▼'}
            </button>
            {showCaution&&<div className="mt-2 rounded-xl bg-amber-50 border border-amber-100 px-3 py-2 text-xs text-amber-800 leading-5">{guide.caution}</div>}
          </div>
        )}
        <div className="flex items-center gap-1.5 pt-1 border-t">
          <span className="text-xs text-gray-400">근거</span>
          <span className="text-xs text-gray-500 font-medium">{guide.law}</span>
        </div>
      </div>
    </div>
  );
}

function CommentSection({postId,initComments}){
  const[comments,setComments]=useState(initComments);
  const[open,setOpen]=useState(false);
  const[author,setAuthor]=useState('');
  const[text,setText]=useState('');
  const submit=()=>{if(!text.trim())return;const c=api.addComment(postId,{author,body:text.trim()});setComments(p=>[...p,c]);setText('');setAuthor('');};
  return(
    <div className="mt-3 pt-3 border-t">
      <button onClick={()=>setOpen(o=>!o)} className="text-xs font-medium text-gray-500">💬 댓글 {comments.length}개 {open?'▲':'▼'}</button>
      {open&&<div className="mt-3 space-y-3">
        {comments.length===0&&<p className="text-xs text-gray-400">첫 댓글을 남겨보세요.</p>}
        {comments.map(c=><div key={c.id} className="rounded-xl bg-gray-50 px-3 py-2.5"><div className="flex justify-between mb-1"><span className="text-xs font-semibold">{c.author}</span><span className="text-xs text-gray-400">{c.createdAt}</span></div><p className="text-sm leading-5">{c.body}</p></div>)}
        <div className="rounded-xl border bg-white p-3 space-y-2">
          <input value={author} onChange={e=>setAuthor(e.target.value)} placeholder="이름 (선택)" className="w-full text-xs border rounded-lg px-3 py-2 outline-none"/>
          <textarea value={text} onChange={e=>setText(e.target.value)} placeholder="댓글 입력..." rows={2} className="w-full text-sm border rounded-lg px-3 py-2 outline-none resize-none"/>
          <button onClick={submit} className="w-full rounded-lg bg-gray-900 text-white py-2 text-xs font-semibold">등록</button>
        </div>
      </div>}
    </div>
  );
}

function PostCard({post:init,onVote}){
  const[post,setPost]=useState(init);
  const vote=type=>{const u=api.vote(post.id,type);setPost({...u});onVote?.();};
  return(
    <div className="rounded-2xl border bg-white p-4">
      <span className="inline-block text-xs bg-gray-100 text-gray-600 rounded-full px-2 py-0.5 mb-2 font-medium">#{post.tag}</span>
      <div className="font-semibold text-sm">{post.title}</div>
      <div className="text-xs text-gray-400 mt-0.5 mb-2">{post.author} · {post.createdAt}</div>
      <p className="text-sm text-gray-600 leading-5 mb-3">{post.body}</p>
      <div className="flex gap-2">
        <button onClick={()=>vote('up')} className={`flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs font-medium ${post.userVote==='up'?'bg-gray-900 text-white':'bg-white text-gray-700'}`}>👍 동의 {post.votesUp}</button>
        <button onClick={()=>vote('down')} className={`flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs ${post.userVote==='down'?'bg-red-100 text-red-700':'bg-white text-gray-700'}`}>👎 비동의 {post.votesDown}</button>
      </div>
      <CommentSection postId={post.id} initComments={post.comments}/>
    </div>
  );
}

function WriteForm({onSubmit,onClose}){
  const[form,setForm]=useState({title:'',body:'',author:'',tag:'기타'});
  const[errors,setErrors]=useState({});
  const validate=()=>{const e={};if(!form.title.trim())e.title='제목을 입력해주세요';if(form.body.trim().length<20)e.body='내용을 20자 이상 작성해주세요';setErrors(e);return Object.keys(e).length===0;};
  return(
    <div className="rounded-2xl border bg-white p-4 space-y-3">
      <div className="flex items-center justify-between"><div className="font-semibold text-sm">상황 요청 글쓰기</div><button onClick={onClose} className="text-xs text-gray-400">닫기</button></div>
      <input value={form.author} onChange={e=>setForm(f=>({...f,author:e.target.value}))} placeholder="작성자 이름 (선택)" className="w-full rounded-xl border px-3 py-2.5 text-sm outline-none"/>
      <div className="flex flex-wrap gap-1.5">{TAGS.filter(t=>t!=='전체').map(t=><button key={t} onClick={()=>setForm(f=>({...f,tag:t}))} className={`rounded-full px-3 py-1 text-xs font-medium border ${form.tag===t?'bg-gray-900 text-white':'bg-white text-gray-600'}`}>{t}</button>)}</div>
      <div><input value={form.title} onChange={e=>{setForm(f=>({...f,title:e.target.value}));if(errors.title)setErrors(p=>({...p,title:''}));}} placeholder="제목" className={`w-full rounded-xl border px-3 py-2.5 text-sm outline-none ${errors.title?'border-red-400':''}`}/>{errors.title&&<p className="text-xs text-red-500 mt-1">{errors.title}</p>}</div>
      <div><textarea value={form.body} onChange={e=>{setForm(f=>({...f,body:e.target.value}));if(errors.body)setErrors(p=>({...p,body:''}));}} placeholder="상황을 자세히 설명해주세요. (최소 20자)" rows={4} className={`w-full rounded-xl border px-3 py-2.5 text-sm outline-none resize-none ${errors.body?'border-red-400':''}`}/><div className="flex justify-between mt-1">{errors.body?<p className="text-xs text-red-500">{errors.body}</p>:<span/>}<span className="text-xs text-gray-400">{form.body.length}자</span></div></div>
      <div className="rounded-xl bg-amber-50 border border-amber-200 px-3 py-2 text-xs text-amber-700">⚠ 개인 신상 정보는 작성하지 마세요.</div>
      <button onClick={()=>{if(validate())onSubmit(api.createPost(form));}} className="w-full rounded-xl bg-gray-900 text-white py-3 text-sm font-semibold">등록하기</button>
    </div>
  );
}

function CommunityPage({onBack}){
  const[sort,setSort]=useState('recent');
  const[filterTag,setFilterTag]=useState('전체');
  const[posts,setPosts]=useState(()=>api.getPosts('recent'));
  const[showWrite,setShowWrite]=useState(false);
  const[submitted,setSubmitted]=useState(false);
  const refresh=(s=sort,t=filterTag)=>{const all=api.getPosts(s);setPosts(t==='전체'?all:all.filter(p=>p.tag===t));};
  return(
    <div className="flex flex-col min-h-screen">
      <header className="px-5 pt-8 pb-4 border-b bg-white sticky top-0 z-10">
        <div className="flex items-center justify-between mb-3"><button onClick={onBack} className="text-sm font-medium text-gray-600">← 뒤로가기</button></div>
        <div className="text-xs text-gray-500">모바일 전용 웹 서비스</div>
        <div className="flex items-center justify-between mt-0.5">
          <h1 className="text-2xl font-bold">커뮤니티</h1>
          <button onClick={()=>{setShowWrite(o=>!o);setSubmitted(false);}} className="rounded-full bg-gray-900 text-white text-xs font-semibold px-4 py-2">{showWrite?'닫기':'✏ 글쓰기'}</button>
        </div>
        <p className="text-sm text-gray-500 mt-1 leading-5">등록되지 않은 법령에 관해서 질문 주시면 참고 후 추가 카테고리 진행하겠습니다.</p>
      </header>
      <main className="px-5 py-4 space-y-4 flex-1 bg-gray-50">
        {showWrite&&<WriteForm onSubmit={()=>{setShowWrite(false);setSubmitted(true);setTimeout(()=>setSubmitted(false),3000);refresh();}} onClose={()=>setShowWrite(false)}/>}
        {submitted&&<div className="rounded-2xl bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-700">✅ 요청이 등록되었습니다!</div>}
        <div className="space-y-2">
          <div className="flex gap-2">{[['recent','최신순'],['top','공감순']].map(([s,l])=><button key={s} onClick={()=>{setSort(s);refresh(s,filterTag);}} className={`rounded-full px-4 py-1.5 text-xs font-semibold border ${sort===s?'bg-gray-900 text-white':'bg-white text-gray-600'}`}>{l}</button>)}</div>
          <div className="flex gap-1.5 overflow-x-auto pb-1">{TAGS.map(t=><button key={t} onClick={()=>{setFilterTag(t);refresh(sort,t);}} className={`rounded-full px-3 py-1 text-xs font-medium border whitespace-nowrap flex-shrink-0 ${filterTag===t?'bg-gray-700 text-white':'bg-white text-gray-500'}`}>{t}</button>)}</div>
        </div>
        <div className="space-y-3">{posts.length===0?<div className="rounded-2xl border bg-white p-8 text-center text-sm text-gray-400">게시글이 없어요.</div>:posts.map(p=><PostCard key={p.id} post={p} onVote={refresh}/>)}</div>
      </main>
    </div>
  );
}

function ShareButton({situation}){
  const[copied,setCopied]=useState(false);
  const handle=()=>{navigator.clipboard?.writeText(`[국민 사용법] ${situation}\nhttps://gukmin.example.com`).then(()=>{setCopied(true);setTimeout(()=>setCopied(false),2000);});};
  return <button onClick={handle} className={`flex items-center gap-2 rounded-2xl border px-4 py-2.5 text-sm font-medium w-full justify-center ${copied?'bg-green-50 border-green-300 text-green-700':'bg-white text-gray-700 hover:bg-gray-50'}`}>{copied?'✅ 링크 복사됨!':'🔗 이 가이드 공유하기'}</button>;
}

export default function GukminUsageMobileWeb(){
  const[page,setPage]=useState('home');
  const[selectedCat,setSelectedCat]=useState(null);
  const[selectedGuide,setSelectedGuide]=useState(null);
  const[search,setSearch]=useState('');

  const situationsForCat=useMemo(()=>selectedCat?LAW_GUIDES.filter(g=>g.category===selectedCat):[],[selectedCat]);

  const searchResults=useMemo(()=>{
    const q=search.trim();
    if(q.length<2)return[];
    return LAW_GUIDES.filter(g=>g.situation.includes(q)||g.steps.includes(q)||g.keywords.some(k=>k.includes(q)));
  },[search]);

  if(page==='community')return(
    <div className="min-h-screen bg-gray-100"><div className="mx-auto w-full max-w-md bg-white min-h-screen"><CommunityPage onBack={()=>setPage('home')}/></div></div>
  );

  return(
    <div className="min-h-screen bg-gray-100">
      <div className="mx-auto w-full max-w-md bg-white min-h-screen flex flex-col">
        <header className="px-5 pt-8 pb-4 border-b bg-white sticky top-0 z-10">
          {page!=='home'&&<div className="flex items-center justify-between mb-3">
            <button onClick={()=>{if(page==='guide'){setPage('category');}else if(page==='category'){setPage('home');setSelectedCat(null);}}} className="text-sm font-medium text-gray-600">← 뒤로가기</button>
            <button onClick={()=>{setPage('home');setSelectedCat(null);setSelectedGuide(null);}} className="text-xs text-gray-400">처음으로</button>
          </div>}
          <div className="text-xs text-gray-500">모바일 전용 웹 서비스</div>
          <h1 className="text-2xl font-bold mt-0.5">국민 사용법</h1>
          {page==='home'&&<p className="text-sm text-gray-600 mt-1.5 leading-6">상황을 선택하면 단계별로 무엇을 해야 하는지 알려드려요.</p>}
          {page==='category'&&selectedCat&&<p className="text-sm text-gray-500 mt-1">{CATEGORIES.find(c=>c.key===selectedCat)?.title}</p>}
        </header>

        <main className="px-5 py-5 space-y-4 flex-1">

          {page==='home'&&<>
            <section className="rounded-3xl border bg-white p-4">
              <h2 className="font-semibold">키워드 검색</h2>
              <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="예: 불기소, 임금체불, 보증금, 폭행..." className="mt-3 w-full rounded-2xl border px-4 py-3 text-sm outline-none focus:border-gray-400"/>
              {search.trim().length>=2&&<div className="mt-3 space-y-2">
                {searchResults.length===0
                  ?<p className="text-xs text-gray-400 text-center py-2">검색 결과 없음 — 커뮤니티에 질문해보세요.</p>
                  :searchResults.map((g,i)=><button key={i} onClick={()=>{setSelectedGuide(g);setPage('guide');}} className="w-full text-left rounded-2xl border bg-gray-50 p-3 hover:bg-gray-100">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-sm font-medium">{g.situation}</span>
                      <UrgencyBadge urgency={g.urgency}/>
                    </div>
                    <div className="text-xs text-gray-500 truncate">{g.steps.split('\n')[0]}</div>
                  </button>)
                }
              </div>}
            </section>

            <button onClick={()=>setPage('community')} className="block w-full text-left rounded-3xl border-2 border-dashed border-gray-300 p-4 bg-white hover:bg-gray-50">
              <div className="flex gap-3 items-center">
                <div className="text-2xl">💡</div>
                <div><div className="font-semibold">커뮤니티</div><div className="text-sm text-gray-500 mt-0.5">목록에 없는 상황 질문·요청</div></div>
                <span className="ml-auto text-gray-400">→</span>
              </div>
            </button>

            <div className="space-y-2">
              <div className="text-xs font-semibold text-gray-500 px-1">상황별 카테고리</div>
              {CATEGORIES.map(cat=>(
                <button key={cat.key} onClick={()=>{setSelectedCat(cat.key);setPage('category');}} className="block w-full text-left rounded-3xl border p-4 bg-white hover:bg-gray-50 transition-colors">
                  <div className="flex gap-3 items-start justify-between">
                    <div className="flex gap-3 items-start">
                      <div className="text-2xl">{cat.icon}</div>
                      <div><div className="font-semibold">{cat.title}</div><div className="text-sm text-gray-600 mt-0.5">{cat.desc}</div></div>
                    </div>
                    {cat.urgent&&<span className="text-xs font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-700 flex-shrink-0 mt-0.5">🚨 긴급포함</span>}
                  </div>
                </button>
              ))}
            </div>

            <section className="rounded-3xl border bg-white p-4">
              <h2 className="font-semibold text-sm">전문가 도움 / 제휴 안내</h2>
              <p className="text-xs text-gray-500 mt-2 leading-5">본 서비스는 법령 정보를 쉽게 안내하는 서비스이며, 법률 조언이 아닙니다. 구체적인 법률 판단은 전문가와 상담하세요.</p>
              <div className="mt-3 rounded-2xl border border-dashed p-4 text-center text-xs text-gray-400">향후 제휴 배너 / 공익 법률 지원 링크 영역</div>
            </section>
          </>}

          {page==='category'&&selectedCat&&<>
            <div className="rounded-3xl bg-gray-50 border p-4">
              <div className="text-xs text-gray-500 mb-3">해당하는 상황을 선택하세요</div>
              <div className="space-y-2">
                {situationsForCat.map((g,i)=>(
                  <button key={i} onClick={()=>{setSelectedGuide(g);setPage('guide');}} className="w-full text-left rounded-2xl border bg-white px-4 py-3.5 hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all group">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-medium">{g.situation}</span>
                      <UrgencyBadge urgency={g.urgency}/>
                    </div>
                  </button>
                ))}
                <button onClick={()=>setPage('community')} className="w-full text-left rounded-2xl border-2 border-dashed border-gray-300 px-4 py-3.5 text-sm font-medium text-gray-500 hover:border-gray-500 bg-white">
                  + 해당 상황 없음 → 커뮤니티에 질문
                </button>
              </div>
            </div>
          </>}

          {page==='guide'&&selectedGuide&&<>
            <GuideCard guide={selectedGuide}/>

            {selectedGuide.category&&(
              <div className="rounded-3xl border bg-gray-50 p-4">
                <div className="text-xs font-semibold text-gray-500 mb-3">같은 카테고리의 다른 상황</div>
                <div className="space-y-2">
                  {LAW_GUIDES.filter(g=>g.category===selectedGuide.category&&g.situation!==selectedGuide.situation).slice(0,3).map((g,i)=>(
                    <button key={i} onClick={()=>setSelectedGuide(g)} className="w-full text-left rounded-xl border bg-white px-3 py-2.5 text-sm hover:bg-gray-100 flex items-center justify-between gap-2">
                      <span>{g.situation}</span>
                      <UrgencyBadge urgency={g.urgency}/>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <ShareButton situation={selectedGuide.situation}/>

            <section className="rounded-3xl border bg-white p-4">
              <p className="text-xs text-gray-500 leading-5">본 서비스는 법령 정보를 쉽게 안내하는 서비스이며, 법률 조언이 아닙니다. 구체적인 법률 판단은 전문가와 상담하세요.</p>
              <div className="mt-3 rounded-2xl border border-dashed p-3 text-center text-xs text-gray-400">향후 제휴 배너 / 공익 법률 지원 링크 영역</div>
            </section>
          </>}

        </main>
      </div>
    </div>
  );
}
