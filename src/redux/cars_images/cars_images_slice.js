import { createSlice } from '@reduxjs/toolkit';
import { fullData } from '../../helpers/helpers';

const initialState = {
    // capturedImages: [],
    // selectedQualityDents: [],
    // selectedQualitySizes: [],
    // vinReviewedImages: {
    //     dashboardJamVin: [],
    //     doorJamVin: []
    // }

    ...fullData
};

const authSlice = createSlice({
    name: 'cars_images',
    initialState,
    reducers: {
        saveCapturedImage: (state, { payload }) => {
            const images = state.capturedImages || [];
            images.push(payload.data);
            state.capturedImages = images;
        },
        UpdateCapturedImage: (state, { payload }) => {
            const images = state.capturedImages || [];
            images[payload.index === 18 ? 17 : payload.index].dataUri = payload.dataUri;
            state.capturedImages = images;
        },
        UpdateSelectedQualityDents: (state, { payload }) => {
            const index = payload.index;
            state.selectedQualityDents[index] = payload.data;
            state.capturedImages = payload._data;
        },
        UpdateSelectedQualitySizes: (state, { payload }) => {
            const index = payload.index;
            state.selectedQualitySizes[index] = payload.data;
            state.capturedImages = payload._data;
        },
        addAnotherImage: (state, { payload }) => {
            const currentSubStep = payload.currentSubStep;
            const index = state.capturedImages.findIndex((d) => Number(d.currentSubStep) === Number(currentSubStep));
            const dataUri = state.capturedImages[index].dataUri;
            dataUri.push(payload.dataUri);
            state.capturedImages[index].dataUri = dataUri;
        },
        editAnotherImage: (state, { payload }) => {
            const currentSubStep = payload.currentSubStep;
            const obj = state.capturedImages.find((d) => Number(d.currentSubStep) === Number(payload.currentSubStep));
            const index = state.capturedImages.findIndex((d) => Number(d.currentSubStep) === Number(currentSubStep));
            obj.dataUri[payload.dataUriIndex] = payload.dataUri;
            state.capturedImages[index] = obj;
        },
        addVinReviewImg: (state, { payload }) => {
            if (payload.index === 1) {
                const imgs = [...state.vinReviewedImages.doorJamVin];
                imgs.push(payload.dataUri);
                state.vinReviewedImages.doorJamVin = imgs;
            }
            if (payload.index === 0) {
                const imgs = [...state.vinReviewedImages.dashboardJamVin];
                imgs.push(payload.dataUri);
                state.vinReviewedImages.dashboardJamVin = imgs;
            }
        },
        editVinReviewedImage: (state, { payload }) => {
            if (payload.index === 1) {
                const imgs = [...state.vinReviewedImages.doorJamVin];
                imgs[payload.arrayIndex] = payload.dataUri;
                state.vinReviewedImages.doorJamVin = imgs;
            }
            if (payload.index === 0) {
                const imgs = [...state.vinReviewedImages.dashboardJamVin];
                imgs[payload.arrayIndex] = payload.dataUri;
                state.vinReviewedImages.dashboardJamVin = imgs;
            }
        },
        updateOnlyCapturedImages: (state, { payload }) => {
            state.capturedImages = payload.images;
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
} = authSlice.actions;
export default authSlice.reducer;
