import React, {FC, useEffect, useState} from 'react';
import Toast from 'react-native-toast-message';

import {getAutoComplete} from 'api';
import {TPredictSearchVideo} from 'types';

import PredictVideo from './PredictVideo';

type TProps = {
  filterValue: string;
};

const JobRoute: FC<TProps> = ({filterValue}) => {
  const [predictJobs, setPredictJobs] = useState<TPredictSearchVideo[]>([]);

  useEffect(() => {
    const initData = async () => {
      try {
        const res = await getAutoComplete(filterValue);

        setPredictJobs(Object.values(res.data[1]));
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
      {predictJobs.slice(0, 3).map((job, index) => (
        <PredictVideo key={index} video={job} />
      ))}
    </>
  );
};

export default JobRoute;
