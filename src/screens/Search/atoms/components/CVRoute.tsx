import React, {FC, useEffect, useState} from 'react';
import Toast from 'react-native-toast-message';

import {getAutoComplete} from 'api';
import {TPredictSearchVideo} from 'types';

import PredictVideo from './PredictVideo';

type TProps = {
  filterValue: string;
};

const CVRoute: FC<TProps> = ({filterValue}) => {
  const [predictCVs, setPredictCVs] = useState<TPredictSearchVideo[]>([]);

  useEffect(() => {
    const initData = async () => {
      try {
        const res = await getAutoComplete(filterValue);

        setPredictCVs(Object.values(res.data[2]));
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
      {predictCVs.slice(0, 3).map((cv, index) => (
        <PredictVideo key={index} video={cv} />
      ))}
    </>
  );
};

export default CVRoute;
