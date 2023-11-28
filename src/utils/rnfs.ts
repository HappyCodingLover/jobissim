import {exists, mkdir} from 'react-native-fs';

export const makeDirectory = async (path: string) => {
  try {
    const isExist = await exists(path);
    if (!isExist) await mkdir(path);
  } catch (error) {}
};
