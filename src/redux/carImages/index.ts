import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fullData } from '../../helpers/helpers';

interface CapturedImage {
    currentSubStep: number;
    dataUri: string[];
}

interface VinReviewedImages {
    dashboardJamVin: string[];
    doorJamVin: string[];
}

interface CarImagesState {
    capturedImages: CapturedImage[];
    selectedQualityDents: (number[] | null)[];
    selectedQualitySizes: (number[] | null)[];
    vinReviewedImages: VinReviewedImages;
}

const initialState: CarImagesState = {
    ...fullData
};

const carImagesSlice = createSlice({
    name: 'cars_images',
    initialState,
    reducers: {
        saveCapturedImage: (state, action: PayloadAction<{ data: CapturedImage }>) => {
            const images = state.capturedImages || [];
            images.push(action.payload.data);
            state.capturedImages = images;
        },
        UpdateCapturedImage: (state, action: PayloadAction<{ index: number; dataUri: string }>) => {
            const images = state.capturedImages || [];
            images[action.payload.index === 18 ? 17 : action.payload.index].dataUri = [action.payload.dataUri];
            state.capturedImages = images;
        },
        UpdateSelectedQualityDents: (
            state,
            action: PayloadAction<{ index: number; data: number[]; _data: CapturedImage[] }>
        ) => {
            state.selectedQualityDents[action.payload.index] = action.payload.data;
            state.capturedImages = action.payload._data;
        },
        UpdateSelectedQualitySizes: (
            state,
            action: PayloadAction<{ index: number; data: number[]; _data: CapturedImage[] }>
        ) => {
            state.selectedQualitySizes[action.payload.index] = action.payload.data;
            state.capturedImages = action.payload._data;
        },
        addAnotherImage: (state, action: PayloadAction<{ currentSubStep: number; dataUri: string }>) => {
            const index = state.capturedImages.findIndex(
                (d) => Number(d.currentSubStep) === Number(action.payload.currentSubStep)
            );
            state.capturedImages[index].dataUri.push(action.payload.dataUri);
        },
        editAnotherImage: (
            state,
            action: PayloadAction<{ currentSubStep: number; dataUriIndex: number; dataUri: string }>
        ) => {
            const index = state.capturedImages.findIndex(
                (d) => Number(d.currentSubStep) === Number(action.payload.currentSubStep)
            );
            state.capturedImages[index].dataUri[action.payload.dataUriIndex] = action.payload.dataUri;
        },
        addVinReviewImg: (state, action: PayloadAction<{ index: 0 | 1; dataUri: string }>) => {
            const imgs =
                action.payload.index === 1
                    ? [...state.vinReviewedImages.doorJamVin]
                    : [...state.vinReviewedImages.dashboardJamVin];
            imgs.push(action.payload.dataUri);
            if (action.payload.index === 1) {
                state.vinReviewedImages.doorJamVin = imgs;
            } else {
                state.vinReviewedImages.dashboardJamVin = imgs;
            }
        },
        editVinReviewedImage: (state, action: PayloadAction<{ index: 0 | 1; arrayIndex: number; dataUri: string }>) => {
            if (action.payload.index === 1) {
                state.vinReviewedImages.doorJamVin[action.payload.arrayIndex] = action.payload.dataUri;
            } else {
                state.vinReviewedImages.dashboardJamVin[action.payload.arrayIndex] = action.payload.dataUri;
            }
        },
        updateOnlyCapturedImages: (state, action: PayloadAction<{ images: CapturedImage[] }>) => {
            state.capturedImages = action.payload.images;
        }
    }
});

export const {
    saveCapturedImage,
    UpdateCapturedImage,
    UpdateSelectedQualityDents,
    UpdateSelectedQualitySizes,
    addAnotherImage,
    editAnotherImage,
    addVinReviewImg,
    editVinReviewedImage,
    updateOnlyCapturedImages
} = carImagesSlice.actions;

export default carImagesSlice.reducer;
