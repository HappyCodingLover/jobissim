import {useContext} from 'react';

import {AuthContext} from 'contexts';

export const useAuth = () => {
  const {
    profile,
    handleAppleAuth,
    handleAuthNavigation,
    handleGoogleAuth,
    handleLinkedinAuth,
    handleResetPassword,
    handleSignIn,
    handleSignOut,
    handleSignUp,
    handleVerifyEmail,
    setProfile,
  } = useContext(AuthContext);

  if (
    !handleAppleAuth ||
    !handleAuthNavigation ||
    !handleGoogleAuth ||
    !handleLinkedinAuth ||
    !handleResetPassword ||
    !handleSignIn ||
    !handleSignOut ||
    !handleSignUp ||
    !handleVerifyEmail ||
    !setProfile
  ) {
    throw new Error('useAuth must be inside of the AuthProvider');
  }

  return {
    profile,
    handleAppleAuth,
    handleAuthNavigation,
    handleGoogleAuth,
    handleLinkedinAuth,
    handleResetPassword,
    handleSignIn,
    handleSignOut,
    handleSignUp,
    handleVerifyEmail,
    setProfile,
  };
};
