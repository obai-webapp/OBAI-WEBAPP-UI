export interface RootState {
    auth: AuthState;
    theme: ThemeState;
    cars_images: CarImagesState;
    activeSidebarItem: any; // replace with proper type
}

export interface VinReviewedImages {
    dashboardJamVin: string[];
    doorJamVin: string[];
}

export interface CapturedImage {
    currentSubStep: number;
    dataUri: string[];
    // more if needed...
}

export interface CarImagesState {
    capturedImages: CapturedImage[];
    selectedQualityDents: any[]; // replace 'any' with specific type
    selectedQualitySizes: any[]; // replace 'any' with specific type
    vinReviewedImages: VinReviewedImages;
}

export interface DentType {
    id: number;
    title: string;
}

export interface DentSize {
    id: number;
    title: string;
    tooltipContent: string;
}

export interface CapturedImage {
    currentStep: number;
    currentSubStep: number;
    dataUri: string[];
    title?: string;
    dentType?: DentType;
    dentSize?: DentSize;
}

export interface ThemeState {
    collapsed: boolean;
    autoCollapsed: boolean;
    activeTab: string;
}

interface UserInfo {
    email: string;
    name?: string;
    // add other user properties
}

export interface AuthState {
    loading: boolean;
    userInfo: UserInfo | null;
    userToken: string | null;
    error: string | null | undefined;
    isLoggedIn: boolean;
    success: boolean;
    capturedImages: string[];
    otpForUser: any | null; // specify type if known
}
