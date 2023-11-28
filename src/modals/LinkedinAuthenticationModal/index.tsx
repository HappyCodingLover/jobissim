import {Box, Modal} from 'native-base';
import React, {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import Toast from 'react-native-toast-message';
import WebView from 'react-native-webview';
import {ShouldStartLoadRequest} from 'react-native-webview/lib/WebViewTypes';
import queryString from 'query-string';
import {v4} from 'uuid';

import {getLinkedinAccessToken} from 'api';
import {env} from 'config';
import {TLinkedinToken} from 'types';
import {
  getCodeAndStateFromUrl,
  getErrorFromUrl,
  isErrorUrl,
  linkedinTokenF,
  transformError,
} from 'utils';

type TProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  onSuccess: (token: TLinkedinToken) => void;
};

const LinkedinAuthenticationModal: FC<TProps> = ({
  isOpen,
  setIsOpen,
  onSuccess,
}) => {
  const ref = useRef<WebView>(null);

  const [authState, setAuthState] = useState(v4());

  useEffect(() => {
    if (isOpen) {
      setAuthState(v4());
    }
  }, [isOpen]);

  const getAuthorizationUrl = useCallback(() => {
    return `${env.linkedinAuthorizationUrl}?${queryString.stringify({
      client_id: env.linkedinClientID,
      redirect_uri: env.linkedinRedirectUri,
      response_type: 'code',
      scope: ['r_liteprofile', 'r_emailaddress'].join(' ').trim(),
      state: authState,
    })}`;
  }, [authState]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const injectedJavaScript = `
    setTimeout(function() {
      document.querySelector("input[type=text]").setAttribute("autocapitalize", "off");
    }, 1);
    true;
  `;

  const onShouldStartLoadWithRequest = ({
    url,
  }: ShouldStartLoadRequest): boolean => {
    const checkFunction = async () => {
      if (url.includes('login-cancel?')) {
        Toast.show({
          text1: 'Connexion via linkedin annulée',
          type: 'error',
        });
        setIsOpen(false);
        return;
      }
      if (url.includes('request-password-reset') || url.includes('signup')) {
        Toast.show({
          text1: 'Désolé, vous ne pouvez que vous identifier',
          type: 'error',
        });
        setIsOpen(false);
        return;
      }
      if (url.includes(env.linkedinRedirectUri)) {
        if (isErrorUrl(url)) {
          const err = getErrorFromUrl(url);
          setIsOpen(false);
          Toast.show(transformError(err));
          return;
        }
        const {code, state} = getCodeAndStateFromUrl(url);
        if (state !== authState) {
          Toast.show({
            text1: `state is not the same ${state}`,
            type: 'error',
          });
          setIsOpen(false);
          return;
        }
        const payload = queryString.stringify({
          grant_type: 'authorization_code',
          code,
          redirect_uri: env.linkedinRedirectUri,
          client_id: env.linkedinClientID,
          client_secret: env.linkedinClientSecret,
        });
        try {
          const res = await getLinkedinAccessToken(payload);
          onSuccess(linkedinTokenF(res.data));
        } catch (error) {
          Toast.show({
            text1: JSON.stringify(error),
            type: 'error',
          });
        }
        setIsOpen(false);
      }
    };

    checkFunction();
    return true;
  };

  return (
    <Modal h="full" isOpen={isOpen} w="full" onClose={handleClose}>
      <Box h="full" w="full">
        <WebView
          domStorageEnabled
          incognito={true}
          injectedJavaScript={injectedJavaScript}
          javaScriptEnabled
          ref={ref}
          startInLoadingState
          scrollEnabled={true}
          source={{uri: getAuthorizationUrl()}}
          onError={() => {
            setIsOpen(false);
            Toast.show({
              text1: 'Problème de connexion internet',
              type: 'error',
            });
          }}
          onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
        />
      </Box>
    </Modal>
  );
};

export default LinkedinAuthenticationModal;
