import type { FC } from 'react';
import { useListItemSeparatorComponent } from '../../../hooks/list';
import type { ListKeyExtractor } from '../../../types/list';
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
  const ListItemSeparatorComponent = useListItemSeparatorComponent();

  const keyExtractor: ListKeyExtractor<ContextMenuOption> = (_item, index) =>
    `${index}`;
  const extraData: ContextMenuOptionListExtraData = {
    optionListItemProps,
    onItemPress,
  };

  return (
    <List
      data={options}
      Item={ContextMenuOptionListItem}
      keyExtractor={keyExtractor}
      extraData={extraData}
      ItemSeparatorComponent={ListItemSeparatorComponent}
      insetBottom={false}
      {...optionListProps}
    />
  );
};

export default ContextMenuOptionList;
