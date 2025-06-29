import * as React from 'react';
import PropTypes from 'prop-types';

import AppConnectionRow from 'components/AppConnectionRow';
import NoResultFound from 'components/NoResultFound';
import Can from 'components/Can';
import useFormatMessage from 'hooks/useFormatMessage';
import useAppConfig from 'hooks/useAppConfig.ee';
import * as URLS from 'config/urls';
import useAppConnections from 'hooks/useAppConnections';

function AppConnections(props) {
  const { appKey } = props;
  const formatMessage = useFormatMessage();
  const { data } = useAppConnections(appKey);
  const { data: appConfig } = useAppConfig(appKey);

  const appConnections = data?.data || [];
  const hasConnections = appConnections?.length;

  if (!hasConnections) {
    return (
      <Can I="manage" a="Connection" passThrough>
        {(allowed) => (
          <NoResultFound
            text={formatMessage('app.noConnections')}
            data-test="connections-no-results"
            {...(allowed &&
              !appConfig?.data?.disabled && {
                to: URLS.APP_ADD_CONNECTION(appKey),
              })}
          />
        )}
      </Can>
    );
  }

  return (
    <>
      {appConnections.map((appConnection) => (
        <AppConnectionRow key={appConnection.id} connection={appConnection} />
      ))}
    </>
  );
}

AppConnections.propTypes = {
  appKey: PropTypes.string.isRequired,
};

export default AppConnections;
