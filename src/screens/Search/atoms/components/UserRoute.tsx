import React, {FC, useEffect, useState} from 'react';
import Toast from 'react-native-toast-message';

import {getAutoComplete} from 'api';
import {TPredictSearchUser} from 'types';
import {predictSearchUserF} from 'utils';

import PredictUser from './PredictUser';

type TProps = {
  filterValue: string;
};

const UserRoute: FC<TProps> = ({filterValue}) => {
  const [predictUsers, setPredictUsers] = useState<TPredictSearchUser[]>([]);

  useEffect(() => {
    const initData = async () => {
      try {
        const res = await getAutoComplete(filterValue);

        setPredictUsers(Object.values(res.data[0]).map(predictSearchUserF));
      } catch (error) {
        Toast.show({
          text1: JSON.stringify(error),
          type: 'error',
        });
      }
    };

    filterValue && initData();
  }, [filterValue]);

  return (
    <>
      {predictUsers.slice(0, 3).map((user, index) => (
        <PredictUser key={index} user={user} />
      ))}
    </>
  );
};

export default UserRoute;
