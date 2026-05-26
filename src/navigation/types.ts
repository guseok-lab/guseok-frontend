import type { MissingPersonForm } from "../types/missingPersonForm";

export type RootStackParamList = {
    MainTabs: undefined;
    PreRegister: undefined;
    Faq: undefined;
    Terms: undefined;
    NotificationSetting: undefined;
    VideoUpload: { formData: MissingPersonForm; searchId: number };
    DroneConnect: { formData: MissingPersonForm; searchId: number };
    DroneCamera: { formData: MissingPersonForm; searchId: number };
    AIResult: {
        formData: MissingPersonForm;
        searchId: number;
        capturedUri?: string;
    };
};
