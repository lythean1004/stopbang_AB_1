export type Question = { id: string; title: string; caption?: string };
export const questions: Question[] = [
  { id: "snoring", title: "코를 크게 고나요? (말소리보다 크거나, 문을 닫아도 들릴 정도)" },
  { id: "tired", title: "낮 시간에 자주 피곤하거나 졸린가요?" },
  { id: "observed", title: "잠자는 동안 숨이 멎는 것을 다른 사람이 본 적이 있나요?" },
  { id: "pressure", title: "고혈압이 있거나 치료를 받고 있나요?" },
  { id: "bmi", title: "체질량지수(BMI)가 35 이상인가요?", caption: "예: 키 170cm 기준 약 101kg 이상" },
  { id: "age", title: "나이가 50세보다 많은가요?" },
  { id: "neck", title: "목둘레가 40cm(셔츠 카라 16인치) 이상인가요?" },
  { id: "gender", title: "성별이 남성인가요?" }
];
export const riskBand = (score: number) => score <= 2 ? "low" : score <= 4 ? "intermediate" : "high";
