import { UserProfile } from './user-profile';

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: {
    oauthUrl?: string;
    id?: string;
    name?: string;
    email?: string;
    avatar?: string;
    provider?: string;
    isAuthenticated?: boolean;
    user?: UserProfile;
    secretToken?: string;
  };
  redirectUrl?: string;
}
