import React from 'react';

export const AuthContext = React.createContext({});

export function useIsSignedIn() {
  const isSignedIn = React.useContext(AuthContext);
  return isSignedIn;
}

export function useIsSignedOut() {
  const isSignedIn = React.useContext(AuthContext);
  return !isSignedIn;
}

export function AuthProvider(props: {children: React.ReactNode}) {
  const [isSignedIn, setIsSignedIn] = React.useState(false);

  const signIn = () => setIsSignedIn(true);
  const signOut = () => setIsSignedIn(false);

  return (
    <AuthContext.Provider value={isSignedIn}>
      {props.children}
    </AuthContext.Provider>
  );
}
