import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CarImagesState, CapturedImage } from '../../types/redux';
import { fullData } from '../../helpers/helpers';

interface UpdateImagePayload {
    index: number;
    dataUri: string;
}

interface UpdateQualityPayload {
    index: number;
    data: any; // specify type
    _data: CapturedImage[];
}

interface VinReviewPayload {
    index: 0 | 1;
    dataUri: string;
    arrayIndex?: number;
}

const initialState: CarImagesState = {
    ...fullData
};

const carsImagesSlice = createSlice({
    name: 'cars_images',
    initialState,
    reducers: {
        saveCapturedImage: (state, action: PayloadAction<{ data: CapturedImage }>) => {
            const images = state.capturedImages || [];
            images.push(action.payload.data);
            state.capturedImages = images;
        },
        UpdateCapturedImage: (state, action: PayloadAction<UpdateImagePayload>) => {
            const images = state.capturedImages || [];
            images[action.payload.index === 18 ? 17 : action.payload.index].dataUri = [action.payload.dataUri];
            state.capturedImages = images;
        }
    }
});

export const { saveCapturedImage, UpdateCapturedImage } = carsImagesSlice.actions;
export default carsImagesSlice.reducer;
