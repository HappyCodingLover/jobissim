import React, {FC, useEffect, useState} from 'react';
import Toast from 'react-native-toast-message';

import {getAutoComplete} from 'api';
import {
  TPredictSearchBusiness,
  TPredictSearchUser,
  TPredictSearchVideo,
} from 'types';

import PredictUser from './PredictUser';
import PredictBusiness from './PredictBusiness';
import PredictVideo from './PredictVideo';
import {predictSearchUserF} from 'utils';

type TProps = {
  filterValue: string;
};

const AllRoute: FC<TProps> = ({filterValue}) => {
  const [predictBusinesses, setPredictBusinesses] = useState<
    TPredictSearchBusiness[]
  >([]);
  const [predictCVs, setPredictCVs] = useState<TPredictSearchVideo[]>([]);
  const [predictJobs, setPredictJobs] = useState<TPredictSearchVideo[]>([]);
  const [predictUsers, setPredictUsers] = useState<TPredictSearchUser[]>([]);

  useEffect(() => {
    const initData = async () => {
      try {
        const res = await getAutoComplete(filterValue);

        setPredictBusinesses(Object.values(res.data[3]));
        setPredictCVs(Object.values(res.data[2]));
        setPredictJobs(Object.values(res.data[1]));
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
      {predictBusinesses.slice(0, 3).map((business, index) => (
        <PredictBusiness business={business} key={index} />
      ))}
      {predictCVs.slice(0, 3).map((cv, index) => (
        <PredictVideo key={index} video={cv} />
      ))}
      {predictJobs.slice(0, 3).map((job, index) => (
        <PredictVideo key={index} video={job} />
      ))}
    </>
  );
};

export default AllRoute;
