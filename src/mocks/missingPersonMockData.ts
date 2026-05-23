export interface MissingPerson {
    id: number;
    name: string;
    age: number;
    gender: "남" | "여";
    height: number;
    weight: number;
    bodyType: string;
    appearance: string;
    lastLocation: string;
    circumstance: string;
    missingDays: number;
}

export const missingPersonMockData: MissingPerson[] = [
    {
        id: 1,
        name: "이서연",
        age: 17,
        gender: "여",
        height: 160,
        weight: 47,
        bodyType: "마른 체형",
        appearance: "긴 흑발, 교복 착용",
        lastLocation: "공주역 인근",
        circumstance:
            "5월 21일 오후 6시경 학원 수업 종료 후 귀가하던 중 연락이 끊겼습니다.",
        missingDays: 1,
    },
    {
        id: 2,
        name: "김영수",
        age: 78,
        gender: "남",
        height: 168,
        weight: 61,
        bodyType: "마른 체형",
        appearance: "흰머리, 안경 착용",
        lastLocation: "크눙역 인근",
        circumstance:
            "5월 19일 오전 10시경 산책을 위해 자택을 나선 뒤 귀가하지 않았습니다.",
        missingDays: 3,
    },
];
