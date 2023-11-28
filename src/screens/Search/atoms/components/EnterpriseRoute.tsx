import React, {FC, useEffect, useState} from 'react';
import Toast from 'react-native-toast-message';

import {getAutoComplete} from 'api';
import {TPredictSearchBusiness} from 'types';

import PredictBusiness from './PredictBusiness';

type TProps = {
  filterValue: string;
};

const EnterpriseRoute: FC<TProps> = ({filterValue}) => {
  const [predictBusinesses, setPredictBusinesses] = useState<
    TPredictSearchBusiness[]
  >([]);

  useEffect(() => {
    const initData = async () => {
      try {
        const res = await getAutoComplete(filterValue);

        setPredictBusinesses(Object.values(res.data[3]));
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
      {predictBusinesses.slice(0, 3).map((business, index) => (
        <PredictBusiness business={business} key={index} />
      ))}
    </>
  );
};

export default EnterpriseRoute;
