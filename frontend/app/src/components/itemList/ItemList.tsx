import React from 'react';
import { useSelector } from 'react-redux';
import {
  selectIsChair,
  selectIsComputer,
  selectIsKeyboard,
  selectIsMonitor,
  selectIsMouse,
  selectIsOther,
  selectIsSpeaker,
  selectIsTable,
} from '../../features/post/postSlice';

interface PROPS_ITEMS {
  monitor?: string;
  computer?: string;
  keyboard?: string;
  mouse?: string;
  speaker?: string;
  table?: string;
  chair?: string;
  other?: string;
}

const ItemList: React.FC<PROPS_ITEMS> = (props) => {
  const isMonitor = useSelector(selectIsMonitor);
  const isComputer = useSelector(selectIsComputer);
  const isKeyboard = useSelector(selectIsKeyboard);
  const isMouse = useSelector(selectIsMouse);
  const isSpeaker = useSelector(selectIsSpeaker);
  const isTable = useSelector(selectIsTable);
  const isChair = useSelector(selectIsChair);
  const isOther = useSelector(selectIsOther);

  return (
    <div className="ml-5 mr-2 w-11/12 md:ml-10 shadow bg-black placeholder-current appearance-none rounded py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline cursor-pointer">
      {isMonitor && props.monitor}
      {isComputer && props.computer}
      {isKeyboard && props.keyboard}
      {isMouse && props.mouse}
      {isSpeaker && props.speaker}
      {isTable && props.table}
      {isChair && props.chair}
      {isOther && props.other}
    </div>
  );
};

export default ItemList;
