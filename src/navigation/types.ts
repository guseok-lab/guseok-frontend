import type { MissingPersonForm } from "../types/missingPersonForm";

export type RootStackParamList = {
    MainTabs: undefined;
    PreRegister: undefined;
    Faq: undefined;
    Terms: undefined;
    NotificationSetting: undefined;
    VideoUpload: { formData: MissingPersonForm };
    DroneConnect: { formData: MissingPersonForm };
    DroneCamera: { formData: MissingPersonForm };
    AIResult: { formData: MissingPersonForm; capturedUri?: string };
};
