import React, { useEffect, useState } from 'react';
import styles from './PostForm.module.scss';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IconButton } from '@material-ui/core';
import DesktopWindowsIcon from '@material-ui/icons/DesktopWindows';
import LaptopChromebookIcon from '@material-ui/icons/LaptopChromebook';
import KeyboardIcon from '@material-ui/icons/Keyboard';
import MouseIcon from '@material-ui/icons/Mouse';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import { SiAirtable } from 'react-icons/si';
import { GiOfficeChair } from 'react-icons/gi';
import { FaHeadphones } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import {
  isLoadingPostEnd,
  isLoadingPostStart,
  updatePost,
  postImage,
  selectPost,
  getMyPost,
  postMonitor,
  postKeyboard,
  postMouse,
  postSpeaker,
  postTable,
  postChair,
  postOther,
  isKeyboardPost,
  isComputerPost,
  isMonitorPost,
  isMousePost,
  isSpeakerPost,
  isTablePost,
  isChairPost,
  isOtherPost,
  postComputer,
} from '../../features/post/postSlice';
import ItemList from '../../components/itemList/ItemList';

interface INPUTS {
  body: string;
  monitor: string;
  computer: string;
  keyboard: string;
  mouse: string;
  speaker: string;
  table: string;
  chair: string;
  other: string;
}

const PostRegist: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const myPost = useSelector(selectPost);
  const [image, setImage] = useState<File | null>(null),
    [imageProto, setImageProto] = useState(''),
    [body, setBody] = useState(''),
    [monitor, setMonitor] = useState(''),
    [computer, setComputer] = useState(''),
    [keyboard, setKeyboard] = useState(''),
    [mouse, setMouse] = useState(''),
    [speaker, setSpeaker] = useState(''),
    [table, setTable] = useState(''),
    [chair, setChair] = useState(''),
    [other, setOther] = useState(''),
    [indexMonitor, setIndexMonitor] = useState(0),
    [indexComputer, setIndexComputer] = useState(0),
    [indexKeyboard, setIndexKeyboard] = useState(0),
    [indexMouse, setIndexMouse] = useState(0),
    [indexSpeaker, setIndexSpeaker] = useState(0),
    [indexTable, setIndexTable] = useState(0),
    [indexChair, setIndexChair] = useState(0),
    [indexOther, setIndexOther] = useState(0),
    [monitors, setMonitors] = useState<string[]>([]),
    [computers, setComputers] = useState<string[]>([]),
    [keyboards, setKeyboards] = useState<string[]>([]),
    [mouses, setMouses] = useState<string[]>([]),
    [speakers, setSpeakers] = useState<string[]>([]),
    [tables, setTables] = useState<string[]>([]),
    [chairs, setChairs] = useState<string[]>([]),
    [others, setOthers] = useState<string[]>([]);
  const history = useHistory();

  const postOnCreate = myPost.filter((post) => {
    return post.body === 'create';
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<INPUTS>();

  const handlerEditPicture = (e: any) => {
    setImage(e.target.files![0]);
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        setImageProto(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const clickPicture = (e: any) => {
    const fileInput = document.getElementById('imageInput');
    fileInput?.click();
  };

  const addMonitor = async () => {
    await dispatch(isMonitorPost());
    if (indexMonitor === monitors.length) {
      setMonitors((prevState) => [...prevState, monitor]);
      setIndexMonitor(indexMonitor + 1);
      setMonitor('');
    } else {
      const newMonitor = monitors;
      newMonitor[indexMonitor] = monitor;
      setMonitors(newMonitor);
      setIndexMonitor(newMonitor.length);
      setMonitor('');
    }
  };

  const addComputer = async () => {
    await dispatch(isComputerPost());
    if (indexComputer === computers.length) {
      setComputers((prevState) => [...prevState, computer]);
      setIndexComputer(indexComputer + 1);
      setComputer('');
    } else {
      const newComputer = computers;
      newComputer[indexComputer] = computer;
      setComputers(newComputer);
      setIndexComputer(newComputer.length);
      setComputer('');
    }
  };

  const addKeyboard = async () => {
    await dispatch(isKeyboardPost());
    if (indexKeyboard === keyboards.length) {
      setKeyboards((prevState) => [...prevState, keyboard]);
      setIndexKeyboard(indexKeyboard + 1);
      setKeyboard('');
    } else {
      const newKeyboard = keyboards;
      newKeyboard[indexKeyboard] = keyboard;
      setKeyboards(newKeyboard);
      setIndexKeyboard(newKeyboard.length);
      setKeyboard('');
    }
  };
  const addMouse = async () => {
    await dispatch(isMousePost());
    if (indexMouse === mouses.length) {
      setMouses((prevState) => [...prevState, mouse]);
      setIndexMouse(indexMouse + 1);
      setMouse('');
    } else {
      const newMouse = mouses;
      newMouse[indexMouse] = mouse;
      setMouses(newMouse);
      setIndexMouse(newMouse.length);
      setMouse('');
    }
  };
  const addSpeaker = async () => {
    await dispatch(isSpeakerPost());
    if (indexSpeaker === speakers.length) {
      setSpeakers((prevState) => [...prevState, speaker]);
      setIndexSpeaker(indexSpeaker + 1);
      setSpeaker('');
    } else {
      const newSpeaker = speakers;
      newSpeaker[indexSpeaker] = speaker;
      setSpeakers(newSpeaker);
      setIndexSpeaker(newSpeaker.length);
      setSpeaker('');
    }
  };
  const addTable = async () => {
    await dispatch(isTablePost());
    if (indexTable === tables.length) {
      setTables((prevState) => [...prevState, table]);
      setIndexTable(indexTable + 1);
      setTable('');
    } else {
      const newTable = tables;
      newTable[indexTable] = table;
      setTables(newTable);
      setIndexTable(newTable.length);
      setTable('');
    }
  };
  const addChair = async () => {
    await dispatch(isChairPost());
    if (indexChair === chairs.length) {
      setChairs((prevState) => [...prevState, chair]);
      setIndexChair(indexChair + 1);
      setChair('');
    } else {
      const newChair = chairs;
      newChair[indexChair] = chair;
      setChairs(newChair);
      setIndexChair(newChair.length);
      setChair('');
    }
  };
  const addOther = async () => {
    await dispatch(isOtherPost());
    if (indexOther === others.length) {
      setOthers((prevState) => [...prevState, other]);
      setIndexOther(indexOther + 1);
      setOther('');
    } else {
      const newOther = others;
      newOther[indexOther] = other;
      setOthers(newOther);
      setIndexOther(newOther.length);
      setOther('');
    }
  };

  const deleteMonitor = (deleteIndex: number) => {
    const newMonitors = monitors.filter(
      (monitor: string, i: number) => i !== deleteIndex
    );
    setIndexMonitor(newMonitors.length);
    setMonitors(newMonitors);
  };

  const deleteComputer = (deleteIndex: number) => {
    const newComputers = computers.filter(
      (computer: string, i: number) => i !== deleteIndex
    );
    setIndexComputer(newComputers.length);
    setComputers(newComputers);
  };

  const deleteKeyboard = (deleteIndex: number) => {
    const newKeyboards = keyboards.filter(
      (keyboard: string, i: number) => i !== deleteIndex
    );
    setIndexKeyboard(newKeyboards.length);
    setKeyboards(newKeyboards);
  };

  const deleteMouse = (deleteIndex: number) => {
    const newMouses = mouses.filter(
      (mouse: string, i: number) => i !== deleteIndex
    );
    setIndexMouse(newMouses.length);
    setMouses(newMouses);
  };

  const deleteSpeaker = (deleteIndex: number) => {
    const newSpeakers = speakers.filter(
      (speaker: string, i: number) => i !== deleteIndex
    );
    setIndexSpeaker(newSpeakers.length);
    setSpeakers(newSpeakers);
  };

  const deleteTable = (deleteIndex: number) => {
    const newTables = tables.filter(
      (table: string, i: number) => i !== deleteIndex
    );
    setIndexTable(newTables.length);
    setTables(newTables);
  };

  const deleteChair = (deleteIndex: number) => {
    const newChairs = chairs.filter(
      (chair: string, i: number) => i !== deleteIndex
    );
    setIndexChair(newChairs.length);
    setChairs(newChairs);
  };

  const deleteOther = (deleteIndex: number) => {
    const newOthers = others.filter(
      (other: string, i: number) => i !== deleteIndex
    );
    setIndexOther(newOthers.length);
    setOthers(newOthers);
  };

  useEffect(() => {
    const fetchBootLoader = async () => {
      await dispatch(getMyPost());
    };
    fetchBootLoader();
  }, []);

  const submitPost = async () => {
    await dispatch(isLoadingPostStart());
    const packet = {
      id: postOnCreate[0].id,
      body: body,
    };
    const packetImage = {
      img: image,
      postId: postOnCreate[0].id,
    };
    const packetMonitor = {
      name: monitors,
      postId: postOnCreate[0].id,
    };
    const packetComputer = {
      name: computers,
      postId: postOnCreate[0].id,
    };
    const packetKeyboard = {
      name: keyboards,
      postId: postOnCreate[0].id,
    };
    const packetMouse = {
      name: mouses,
      postId: postOnCreate[0].id,
    };
    const packetSpeaker = {
      name: speakers,
      postId: postOnCreate[0].id,
    };
    const packetTable = {
      name: tables,
      postId: postOnCreate[0].id,
    };
    const packetChair = {
      name: chairs,
      postId: postOnCreate[0].id,
    };
    const packetOther = {
      name: others,
      postId: postOnCreate[0].id,
    };
    await dispatch(updatePost(packet));
    await dispatch(postImage(packetImage));
    await dispatch(postMonitor(packetMonitor));
    await dispatch(postComputer(packetComputer));
    await dispatch(postKeyboard(packetKeyboard));
    await dispatch(postMouse(packetMouse));
    await dispatch(postSpeaker(packetSpeaker));
    await dispatch(postTable(packetTable));
    await dispatch(postChair(packetChair));
    await dispatch(postOther(packetOther));
    await dispatch(isLoadingPostEnd());
    setImage(null);
    await history.push('/post/list');
  };

  const onSubmit: SubmitHandler<INPUTS> = async (data) => {
    submitPost();
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div
        className={`w-10/12 mt-10 mb-10 md:w-6/12 mx-auto pt-14 text-white h-auto bg-thin-black rounded`}
      >
        <h2 className="mb-10 text-xl font-bold text-center">投稿を登録</h2>
        <input
          type="file"
          id="imageInput"
          hidden={true}
          onChange={handlerEditPicture}
        />
        <div className={styles.aspect}>
          <img
            src={imageProto ? imageProto : undefined}
            alt="画像が設定されていません"
          />
        </div>
        <div className="text-center mx-auto">
          <IconButton onClick={clickPicture}>
            <span className="text-base text-blue-600 mb-4 text-center">
              投稿するデスクの写真を設定
            </span>
          </IconButton>
        </div>
        <div className="mb-4">
          <div className="text-left ml-5 md:ml-10 mb-1 pl-1">
            {' '}
            <label data-testid="label-body">投稿文</label>
          </div>
          <textarea
            className={`${styles.text_area} md:shadow ml-5 md:ml-10  bg-black appearance-none rounded py-2 px-3 mb-5 placeholder-gray-500 leading-tight focus:outline-none focus:shadow-outline cursor-pointer`}
            id="body"
            data-testid="input-body"
            value={body}
            placeholder="デスクのポイントやこだわりなど"
            rows={5}
            {...register('body', {
              required: {
                value: true,
                message: '※投稿文の入力は必須です',
              },
            })}
            onChange={(e) => setBody(e.target.value)}
          />
          {errors.body && (
            <p
              className="text-red-500 text-xs italic text-center md:text-base"
              role="alert"
            >
              {errors.body.message}
            </p>
          )}
        </div>
        <div className="md:flex md:flex-wrap mb-6">
          <div className={styles.area_box}>
            <div className="ml-5 flex items-center md:ml-10">
              <div className="bg-blue-200 px-1 py-1 rounded-full">
                <DesktopWindowsIcon className="text-blue-700" />
              </div>
              <span className="ml-1" data-testid="label-monitor">
                モニター
              </span>
            </div>
            <div>
              {monitors.length > 0 &&
                monitors.map((monitor: string, index: number) => (
                  <div key={index} className="flex">
                    <ItemList monitor={monitor} />
                    <span className="mt-2 text-xl">
                      <RiDeleteBin6Line onClick={() => deleteMonitor(index)} />
                    </span>
                  </div>
                ))}
              <input
                className={`${styles.area_input} ml-5 md:ml-10 shadow bg-black appearance-none rounded py-2 px-3 placeholder-gray-500
                 mb-3 leading-tight focus:outline-none focus:shadow-outline cursor-pointer`}
                id="monitor"
                data-testid="input-monitor"
                type="text"
                value={monitor}
                placeholder="HP M22f FHD 21.5インチ"
                {...register('monitor', {
                  validate: {
                    lessThanTen: (value) =>
                      !monitor || 'モニターの登録が完了していません',
                  },
                })}
                onChange={(e) => setMonitor(e.target.value)}
              />
            </div>
            {errors.monitor && (
              <p
                className="text-red-500 text-xs italic text-center"
                role="alert"
              >
                {errors.monitor.message}
              </p>
            )}
            <div className={styles.add_btn_box}>
              <button
                type="button"
                className={styles.add_btn}
                onClick={() => addMonitor()}
              >
                モニターを登録
              </button>
            </div>
          </div>
          <div className={styles.area_box}>
            <div className="ml-5 flex items-center md:ml-10">
              <div className="bg-thin-orange px-1 py-1 rounded-full">
                <LaptopChromebookIcon className="text-orange" />
              </div>
              <span className="ml-1" data-testid="label-computer">
                コンピューター
              </span>
            </div>
            <div>
              {computers.length > 0 &&
                computers.map((computer: string, index: number) => (
                  <div key={index} className="flex">
                    <ItemList computer={computer} />
                    <span className="mt-2 text-xl">
                      <RiDeleteBin6Line onClick={() => deleteComputer(index)} />
                    </span>
                  </div>
                ))}
              <input
                className={`${styles.area_input} ml-5 md:ml-10 shadow bg-black placeholder-gray-500 appearance-none rounded py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline cursor-pointer`}
                id="computer"
                data-testid="input-computer"
                type="text"
                value={computer}
                placeholder="MacBook Pro 14インチ"
                {...register('computer', {
                  validate: {
                    lessThanTen: (value) =>
                      !computer || 'コンピューターの登録が完了していません',
                  },
                })}
                onChange={(e) => setComputer(e.target.value)}
              />
            </div>
            {errors.computer && (
              <p
                className="text-red-500 text-xs italic text-center"
                role="alert"
              >
                {errors.computer.message}
              </p>
            )}
            <div className={styles.add_btn_box}>
              <button
                type="button"
                className={styles.add_btn}
                onClick={() => addComputer()}
              >
                コンピューターを登録
              </button>
            </div>
          </div>
          <div className={styles.area_box}>
            <div className="ml-5 flex items-center md:ml-10">
              <div className="bg-red-200 px-1 py-1 rounded-full">
                <KeyboardIcon className="text-red-500" />
              </div>
              <span className="ml-1" data-testid="label-keyboard">
                {' '}
                キーボード
              </span>
            </div>
            <div>
              {keyboards.length > 0 &&
                keyboards.map((keyboard: string, index: number) => (
                  <div key={index} className="flex">
                    <ItemList keyboard={keyboard} />
                    <span className="mt-2 text-xl">
                      <RiDeleteBin6Line onClick={() => deleteKeyboard(index)} />
                    </span>
                  </div>
                ))}
              <input
                className={`${styles.area_input} ml-5 md:ml-10 shadow bg-black placeholder-gray-500 appearance-none rounded py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline cursor-pointer`}
                id="keyboard"
                data-testid="input-keyboard"
                type="text"
                value={keyboard}
                placeholder="ロジクールMX Keysワイヤレス"
                {...register('keyboard', {
                  validate: {
                    lessThanTen: (value) =>
                      !keyboard || 'キーボードの登録が完了していません',
                  },
                })}
                onChange={(e) => setKeyboard(e.target.value)}
              />
            </div>
            {errors.keyboard && (
              <p
                className="text-red-500 text-xs italic text-center"
                role="alert"
              >
                {errors.keyboard.message}
              </p>
            )}
            <div className={styles.add_btn_box}>
              <button
                type="button"
                className={styles.add_btn}
                onClick={() => addKeyboard()}
              >
                キーボードを登録
              </button>
            </div>
          </div>
          <div className={styles.area_box}>
            <div className="ml-5 flex items-center md:ml-10">
              <div className="bg-thin-green bg-red-200 px-1 py-1 rounded-full">
                <MouseIcon className="text-green" />
              </div>
              <span className="ml-1" data-testid="label-mouse">
                マウス
              </span>
            </div>
            <div>
              {mouses.length > 0 &&
                mouses.map((mouse: string, index: number) => (
                  <div key={index} className="flex">
                    <ItemList mouse={mouse} />
                    <span className="mt-2 text-xl">
                      <RiDeleteBin6Line onClick={() => deleteMouse(index)} />
                    </span>
                  </div>
                ))}
              <input
                className={`${styles.area_input} ml-5 md:ml-10 shadow bg-black placeholder-gray-500 appearance-none rounded py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline cursor-pointer`}
                id="mouse"
                data-testid="input-mouse"
                type="text"
                value={mouse}
                placeholder="ロジクールBluetooth Mouse"
                {...register('mouse', {
                  validate: {
                    lessThanTen: (value) =>
                      !mouse || 'マウスの登録が完了していません',
                  },
                })}
                onChange={(e) => setMouse(e.target.value)}
              />
            </div>
            {errors.mouse && (
              <p
                className="text-red-500 text-xs italic text-center"
                role="alert"
              >
                {errors.mouse.message}
              </p>
            )}
            <div className={styles.add_btn_box}>
              <button
                type="button"
                className={styles.add_btn}
                onClick={() => addMouse()}
              >
                マウスを登録
              </button>
            </div>
          </div>
          <div className={styles.area_box}>
            <div className="ml-5 flex items-center md:ml-10">
              <div className="bg-purple-200 px-1 py-1 rounded-full">
                <VolumeUpIcon className="text-purple-500" />
              </div>
              <span className="ml-1" data-testid="label-speaker">
                スピーカー
              </span>
            </div>
            <div>
              {speakers.length > 0 &&
                speakers.map((speaker: string, index: number) => (
                  <div key={index} className="flex">
                    <ItemList speaker={speaker} />
                    <span className="mt-2 text-xl">
                      <RiDeleteBin6Line onClick={() => deleteSpeaker(index)} />
                    </span>
                  </div>
                ))}
              <input
                className={`${styles.area_input} ml-5 md:ml-10 shadow bg-black placeholder-gray-500 appearance-none rounded py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline cursor-pointer`}
                id="speaker"
                data-testid="input-speaker"
                type="text"
                value={speaker}
                placeholder="BoseSoundLink Mini II"
                {...register('speaker', {
                  validate: {
                    lessThanTen: (value) =>
                      !speaker || 'スピーカーの登録が完了していません',
                  },
                })}
                onChange={(e) => setSpeaker(e.target.value)}
              />
            </div>
            {errors.speaker && (
              <p
                className="text-red-500 text-xs italic text-center"
                role="alert"
              >
                {errors.speaker.message}
              </p>
            )}
            <div className={styles.add_btn_box}>
              <button
                type="button"
                className={styles.add_btn}
                onClick={() => addSpeaker()}
              >
                スピーカーを登録
              </button>
            </div>
          </div>
          <div className={styles.area_box}>
            <div className="ml-5 md:ml-10 flex items-center">
              <div className="bg-pink-200 px-2 py-2 rounded-full">
                <SiAirtable className="text-pink-800" />
              </div>
              <span className="ml-1" data-testid="label-table">
                テーブル
              </span>
            </div>
            <div>
              {tables.length > 0 &&
                tables.map((table: string, index: number) => (
                  <div key={index} className="flex">
                    <ItemList table={table} />
                    <span className="mt-2 text-xl">
                      <RiDeleteBin6Line onClick={() => deleteTable(index)} />
                    </span>
                  </div>
                ))}
              <input
                className={`${styles.area_input} ml-5 md:ml-10 shadow bg-black placeholder-gray-500 appearance-none rounded py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline cursor-pointer`}
                id="table"
                data-testid="input-table"
                type="text"
                value={table}
                placeholder="FLEXISPOT スタンディングデスク"
                {...register('table', {
                  validate: {
                    lessThanTen: (value) =>
                      !table || 'テーブルの登録が完了していません',
                  },
                })}
                onChange={(e) => setTable(e.target.value)}
              />
            </div>
            {errors.table && (
              <p
                className="text-red-500 text-xs italic text-center"
                role="alert"
              >
                {errors.table.message}
              </p>
            )}
            <div className={styles.add_btn_box}>
              <button
                type="button"
                className={styles.add_btn}
                onClick={() => addTable()}
              >
                テーブルを登録
              </button>
            </div>
          </div>
          <div className={styles.area_box}>
            <div className="ml-5 md:ml-10 flex items-center">
              <div className="bg-yellow-200 px-2 py-2 rounded-full">
                <GiOfficeChair className="text-yellow-900" />
              </div>
              <span className="ml-1" data-testid="label-chair">
                チェア
              </span>
            </div>
            <div>
              {chairs.length > 0 &&
                chairs.map((chair: string, index: number) => (
                  <div key={index} className="flex">
                    <ItemList chair={chair} />
                    <span className="mt-2 text-xl">
                      <RiDeleteBin6Line onClick={() => deleteChair(index)} />
                    </span>
                  </div>
                ))}
              <input
                className={`${styles.area_input} ml-5 md:ml-10 shadow bg-black placeholder-gray-500 appearance-none rounded py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline cursor-pointer`}
                id="chair"
                data-testid="input-chair"
                type="text"
                value={chair}
                placeholder="AKRacing Pro-X V2"
                {...register('chair', {
                  validate: {
                    lessThanTen: (value) =>
                      !chair || 'チェアの登録が完了していません',
                  },
                })}
                onChange={(e) => setChair(e.target.value)}
              />
            </div>
            {errors.chair && (
              <p
                className="text-red-500 text-xs italic text-center"
                role="alert"
              >
                {errors.chair.message}
              </p>
            )}
            <div className={styles.add_btn_box}>
              <button
                type="button"
                className={styles.add_btn}
                onClick={() => addChair()}
              >
                チェアを登録
              </button>
            </div>
          </div>
          <div className={styles.area_box}>
            <div className="ml-5 md:ml-10 flex items-center">
              <div className="bg-thin-gray px-2 py-2 rounded-full">
                <FaHeadphones className="text-gray" />
              </div>
              <span className="ml-1" data-testid="label-other">
                その他
              </span>
            </div>
            <div>
              {others.length > 0 &&
                others.map((other: string, index: number) => (
                  <div key={index} className="flex">
                    <ItemList other={other} />
                    <span className="mt-2 text-xl">
                      <RiDeleteBin6Line onClick={() => deleteOther(index)} />
                    </span>
                  </div>
                ))}
              <input
                className={`${styles.area_input} ml-5 md:ml-10 shadow bg-black placeholder-gray-500 appearance-none rounded py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline cursor-pointer`}
                id="other"
                data-testid="input-other"
                type="text"
                value={other}
                placeholder="SONY WH-1000XM4"
                {...register('other', {
                  validate: {
                    lessThanTen: (value) =>
                      !other || 'その他機器の登録が完了していません',
                  },
                })}
                onChange={(e) => setOther(e.target.value)}
              />
            </div>
            {errors.other && (
              <p
                className="text-red-500 text-xs italic text-center"
                role="alert"
              >
                {errors.other.message}
              </p>
            )}
            <div className={styles.add_btn_box}>
              <button
                type="button"
                className={styles.add_btn}
                onClick={() => addOther()}
              >
                その他機器を登録
              </button>
            </div>
          </div>
        </div>
        <hr className={styles.border}></hr>
        <div
          className={`${styles.btn} bg-black py-8 cursor-pointer rounded-b text-center`}
        >
          <button type="submit" data-testid="button-regist">
            投稿する
          </button>
        </div>
      </div>
    </form>
  );
};

export default PostRegist;
