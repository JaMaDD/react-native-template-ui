import type { FC } from 'react';
import { useListItemSeparatorComponent } from '../../../hooks/list';
import { useWindowDimensionsHeight } from '../../../hooks/style';
import type { ListKeyExtractor, ListProps } from '../../../types/list';
import type {
  ContextMenuOption,
  ContextMenuOptionListExtraData,
  ContextMenuOptionListProps,
} from '../../../types/overlay';
import List from '../../list/List';
import ContextMenuOptionListItem from './ContextMenuOptionListItem';

const ContextMenuOptionList: FC<ContextMenuOptionListProps> = ({
  options,
  optionListProps,
  optionListItemProps,
  onItemPress,
}) => {
  const windowsHeight = useWindowDimensionsHeight();
  const ListItemSeparatorComponent = useListItemSeparatorComponent();

  const keyExtractor: ListKeyExtractor<ContextMenuOption> = (_item, index) =>
    `${index}`;
  const extraData: ContextMenuOptionListExtraData = {
    optionListItemProps,
    onItemPress,
  };
  const style: ListProps<ContextMenuOption>['style'] = {
    maxHeight: windowsHeight * 0.4,
  };

  return (
    <List
      data={options}
      Item={ContextMenuOptionListItem}
      keyExtractor={keyExtractor}
      extraData={extraData}
      ItemSeparatorComponent={ListItemSeparatorComponent}
      style={style}
      insetBottom={false}
      {...optionListProps}
    />
  );
};

export default ContextMenuOptionList;
