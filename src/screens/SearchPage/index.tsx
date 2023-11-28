import {NavigationProp, useNavigation} from '@react-navigation/native';
import {Box, ScrollView, Stack, StatusBar} from 'native-base';
import React, {FC, useCallback, useEffect, useState} from 'react';
import {useWindowDimensions} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Toast from 'react-native-toast-message';

import {getAutoComplete, getBusinessRandom, getTendencyRandom} from 'api';
import {Link, SearchInput} from 'components';
import {colors} from 'config';
import {
  TPredictSearchBusiness,
  TPredictSearchUser,
  TPredictSearchVideo,
  TRootStackParamList,
  TSubBusiness,
  TTendency,
} from 'types';
import {predictSearchUserF} from 'utils';

import {
  BusinessItem,
  PredictBusiness,
  PredictUser,
  PredictVideo,
  TendencyItem,
} from './atoms';

const SearchPage: FC = () => {
  const {navigate} = useNavigation<NavigationProp<TRootStackParamList>>();
  const {width} = useWindowDimensions();

  const [businesses, setBusinesses] = useState<TSubBusiness[]>([]);
  const [filterValue, setFilterValue] = useState('');
  const [predictBusinesses, setPredictBusinesses] = useState<
    TPredictSearchBusiness[]
  >([]);
  const [predictCVs, setPredictCVs] = useState<TPredictSearchVideo[]>([]);
  const [predictJobs, setPredictJobs] = useState<TPredictSearchVideo[]>([]);
  const [predictUsers, setPredictUsers] = useState<TPredictSearchUser[]>([]);
  const [tendencies, setTendencies] = useState<TTendency[]>([]);

  useEffect(() => {
    const initBusiness = async () => {
      try {
        const res = await getBusinessRandom();

        setBusinesses(res.data);
      } catch (error) {
        Toast.show({
          text1: JSON.stringify(error),
          type: 'error',
        });
      }
    };
    const initTendency = async () => {
      try {
        const res = await getTendencyRandom();

        setTendencies(res.data);
      } catch (error) {
        Toast.show({
          text1: JSON.stringify(error),
          type: 'error',
        });
      }
    };

    initBusiness();
    initTendency();
  }, []);

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

  const handleGoSearch = useCallback(() => {
    navigate('main', {params: {filterValue}, screen: 'search'});
  }, [filterValue, navigate]);

  const renderItem = useCallback(
    ({item, index}: {item: TSubBusiness; index: number}) => {
      return <BusinessItem business={item} key={index} />;
    },
    [],
  );

  return (
    <Box bg={colors.shark} h="full" safeAreaTop w="full">
      <StatusBar backgroundColor="transparent" translucent />
      <ScrollView>
        <Stack flex={1} px="5" py="5" space="3">
          <SearchInput value={filterValue} onChangeText={setFilterValue} />
          {filterValue.length > 0 ? (
            <ScrollView flex={1}>
              {predictUsers.slice(0, 2).map((user, index) => (
                <PredictUser key={index} user={user} />
              ))}
              {predictBusinesses.slice(0, 2).map((business, index) => (
                <PredictBusiness business={business} key={index} />
              ))}
              {predictCVs.slice(0, 2).map((cv, index) => (
                <PredictVideo key={index} video={cv} />
              ))}
              {predictJobs.slice(0, 2).map((job, index) => (
                <PredictVideo key={index} video={job} />
              ))}
              {filterValue && (
                <Stack alignItems="center" mt="2">
                  <Link
                    title="Voir tout les résultats"
                    onPress={handleGoSearch}
                  />
                </Stack>
              )}
            </ScrollView>
          ) : (
            <>
              <Carousel
                autoplay
                data={businesses}
                inactiveSlideScale={1}
                itemWidth={width - 40}
                lockScrollWhileSnapping
                loop
                sliderWidth={width - 40}
                renderItem={renderItem}
              />
              {tendencies.map((tendency, index) => (
                <TendencyItem key={index} tendency={tendency} />
              ))}
            </>
          )}
        </Stack>
      </ScrollView>
    </Box>
  );
};

export default SearchPage;
