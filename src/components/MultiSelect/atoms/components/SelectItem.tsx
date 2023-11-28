import {ISelectItemProps, Select} from 'native-base';
import {FC} from 'react';

type TProps = ISelectItemProps & {};

const SelectItem: FC<TProps> = ({...props}) => {
  return <Select.Item {...props} />;
};

export default SelectItem;
