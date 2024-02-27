import { combineReducers } from '@reduxjs/toolkit';
import { UserAuthSlice } from '@screens/AuthStack/Redux/UserAuthSlice';
import { ThemeSlice } from '@themes/redux/ThemeSlice';

export const rootReducer = combineReducers({
    // global: GlobalSlice.reducer,
    userAuth: UserAuthSlice.reducer,
    // media: AudioVideoSlice.reducer,
    // documents: DocumentSlice.reducer,
    // quickOcr: QuickOcrSlice.reducer,
    // learn: LearnResourcesSlice.reducer,
    theme: ThemeSlice.reducer,
    // notification: NotificationSlice.reducer,
    // jobOpportunity: JobOpportunitySlice.reducer,
    // mentorship: MentorShipSlice.reducer,
    // uploadProgress: UploadProgressSlice.reducer,
    // services: ServicesSlice.reducer,
    // Camera: CameraSlice.reducer
});
