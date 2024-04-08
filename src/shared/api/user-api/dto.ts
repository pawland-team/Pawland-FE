export interface CurrentUserProfileData {
  id: number;
  name: string;
  image_source: string;
  email: string;
}

export interface UserProfile extends CurrentUserProfileData {
  created_at: string;
}

export type GetCurrentUserProfileDataResponse = CurrentUserProfileData[];

export type UserProfileResponse = UserProfile[];
