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
  selectPost,
  getMyPost,
  selectImage,
  getImage,
  updateImage,
  isMonitorPost,
  isComputerPost,
  isKeyboardPost,
  isMousePost,
  isSpeakerPost,
  isTablePost,
  isChairPost,
  isOtherPost,
  getMonitor,
  selectMonitor,
  selectKeyboard,
  selectPc,
  selectMouse,
  selectSpaker,
  selectTable,
  selectChair,
  selectOther,
  getComputer,
  getKeyboard,
  getMouse,
  getSpeaker,
  getTable,
  getChair,
  getOther,
  updateMonitor,
  updateComputer,
  updateKeyboard,
  updateMouse,
  updateSpeaker,
  updateTable,
  updateChair,
  updateOther,
  postMonitor,
  postComputer,
  postMouse,
  postSpeaker,
  postChair,
  postImage,
  postKeyboard,
  postTable,
  postOther,
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

const PostEdit: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const myPost = useSelector(selectPost);
  const postGetImage = useSelector(selectImage);
  const selectMonitors = useSelector(selectMonitor);
  const selectComputers = useSelector(selectPc);
  const selectKeyboards = useSelector(selectKeyboard);
  const selectMouses = useSelector(selectMouse);
  const selectSpeakers = useSelector(selectSpaker);
  const selectTables = useSelector(selectTable);
  const selectChairs = useSelector(selectChair);
  const selectOthers = useSelector(selectOther);
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
    [monitorId, setMonitorId] = useState(0),
    [computerId, setComputerId] = useState(0),
    [keyboardId, setKeyboardId] = useState(0),
    [mouseId, setMouseId] = useState(0),
    [speakerId, setSpeakerId] = useState(0),
    [tableId, setTableId] = useState(0),
    [chairId, setChairId] = useState(0),
    [otherId, setOtherId] = useState(0),
    [indexMonitor, setIndexMonitor] = useState(0),
    [indexComputer, setIndexComputer] = useState(0),
    [indexKeyboard, setIndexKeyboard] = useState(0),
    [indexMouse, setIndexMouse] = useState(0),
    [indexSpeaker, setIndexSpeaker] = useState(0),
    [indexTable, setIndexTable] = useState(0),
    [indexChair, setIndexChair] = useState(0),
    [indexOther, setIndexOther] = useState(0),
    [openItem, setOpenItem] = useState(false),
    [monitors, setMonitors] = useState<string[]>([]),
    [computers, setComputers] = useState<string[]>([]),
    [keyboards, setKeyboards] = useState<string[]>([]),
    [mouses, setMouses] = useState<string[]>([]),
    [speakers, setSpeakers] = useState<string[]>([]),
    [tables, setTables] = useState<string[]>([]),
    [chairs, setChairs] = useState<string[]>([]),
    [others, setOthers] = useState<string[]>([]);
  const history = useHistory();

  let id = window.location.pathname.split('/post/edit')[1];
  if (id !== '') {
    id = id?.split('/')[1];
  }

  const postOnId = myPost.filter((post) => {
    return post.id === Number(id);
  });

  const postOnImg = postGetImage.filter((img) => {
    return img.postId === Number(id);
  });

  const postOnMonitor = () => {
    const postOnMonitor = selectMonitors.filter((monitor) => {
      return monitor.postId === Number(id);
    });
    const monitorArry = postOnMonitor[0]?.name.split(',');
    let monitors: string[] = [];
    if (monitorArry) {
      const monitorsName = monitorArry.filter((monitor) => {
        return monitor !== '';
      });
      monitors = monitorsName.slice();
    }
    setMonitors(monitors);
    setMonitorId(postOnMonitor[0]?.id);
  };
  const postOnComputer = () => {
    const postOnComputer = selectComputers.filter((computer) => {
      return computer.postId === Number(id);
    });
    const computerArry = postOnComputer[0]?.name.split(',');
    let computers: string[] = [];
    if (computerArry) {
      const computersName = computerArry?.filter((computer) => {
        return computer !== '';
      });
      computers = computersName.slice();
    }
    setComputers(computers);
    setComputerId(postOnComputer[0]?.id);
  };
  const postOnkeyboard = () => {
    const postOnKeyboard = selectKeyboards.filter((keyboard) => {
      return keyboard.postId === Number(id);
    });
    const keyboardArry = postOnKeyboard[0]?.name.split(',');
    let keyboards: string[] = [];
    if (keyboardArry) {
      const keyboardsName = keyboardArry?.filter((keyboard) => {
        return keyboard !== '';
      });
      keyboards = keyboardsName.slice();
    }
    setKeyboards(keyboards);
    setKeyboardId(postOnKeyboard[0]?.id);
  };

  const postOnMouse = () => {
    const postOnMouse = selectMouses.filter((mouse) => {
      return mouse.postId === Number(id);
    });
    const mouseArry = postOnMouse[0]?.name.split(',');
    let mouses: string[] = [];
    if (mouseArry) {
      const mousesName = mouseArry?.filter((mouse) => {
        return mouse !== '';
      });
      mouses = mousesName.slice();
    }
    setMouses(mouses);
    setMouseId(postOnMouse[0]?.id);
  };
  const postOnSpeaker = () => {
    const postOnSpeaker = selectSpeakers.filter((speaker) => {
      return speaker.postId === Number(id);
    });
    const speakerArry = postOnSpeaker[0]?.name.split(',');
    let speakers: string[] = [];
    if (speakerArry) {
      const speakersName = speakerArry?.filter((speaker) => {
        return speaker !== '';
      });
      speakers = speakersName.slice();
    }
    setSpeakers(speakers);
    setSpeakerId(postOnSpeaker[0]?.id);
  };
  const postOnTable = () => {
    const postOnTable = selectTables.filter((table) => {
      return table.postId === Number(id);
    });
    const tableArry = postOnTable[0]?.name.split(',');
    let tables: string[] = [];
    if (tableArry) {
      const tablesName = tableArry?.filter((table) => {
        return table !== '';
      });
      tables = tablesName.slice();
    }
    setTables(tables);
    setTableId(postOnTable[0]?.id);
  };
  const postOnChair = () => {
    const postOnChair = selectChairs.filter((chair) => {
      return chair.postId === Number(id);
    });
    const chairArry = postOnChair[0]?.name.split(',');
    let chairs: string[] = [];
    if (chairArry) {
      const chairsName = chairArry?.filter((chair) => {
        return chair !== '';
      });
      chairs = chairsName.slice();
    }
    setChairs(chairs);
    setChairId(postOnChair[0]?.id);
  };
  const postOnOther = () => {
    const postOnOther = selectOthers.filter((other) => {
      return other.postId === Number(id);
    });
    const otherArry = postOnOther[0]?.name.split(',');
    let others: string[] = [];
    if (otherArry) {
      const othersName = otherArry?.filter((other) => {
        return other !== '';
      });
      others = othersName.slice();
    }
    setOthers(others);
    setOtherId(postOnOther[0]?.id);
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<INPUTS>();

  const handleItemOpen = () => {
    setOpenItem(true);
    postOnMonitor();
    postOnComputer();
    postOnkeyboard();
    postOnMouse();
    postOnSpeaker();
    postOnTable();
    postOnChair();
    postOnOther();
  };

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

  const addMonitor = () => {
    setMonitors((prevState) => [...prevState, monitor]);
    setIndexMonitor(indexMonitor + 1);
    setMonitor('');
  };

  const addComputer = () => {
    setComputers((prevState) => [...prevState, computer]);
    setIndexComputer(indexComputer + 1);
    setComputer('');
  };

  const addKeyboard = () => {
    setKeyboards((prevState) => [...prevState, keyboard]);
    setIndexKeyboard(indexKeyboard + 1);
    setKeyboard('');
  };
  const addMouse = () => {
    setMouses((prevState) => [...prevState, mouse]);
    setIndexMouse(indexMouse + 1);
    setMouse('');
  };
  const addSpeaker = () => {
    setSpeakers((prevState) => [...prevState, speaker]);
    setIndexSpeaker(indexSpeaker + 1);
    setSpeaker('');
  };
  const addTable = () => {
    setTables((prevState) => [...prevState, table]);
    setIndexTable(indexTable + 1);
    setTable('');
  };
  const addChair = () => {
    setChairs((prevState) => [...prevState, chair]);
    setIndexChair(indexChair + 1);
    setChair('');
  };
  const addOther = () => {
    setOthers((prevState) => [...prevState, other]);
    setIndexOther(indexOther + 1);
    setOther('');
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
      await dispatch(getImage());
      await dispatch(getMonitor());
      await dispatch(getComputer());
      await dispatch(getKeyboard());
      await dispatch(getMouse());
      await dispatch(getSpeaker());
      await dispatch(getTable());
      await dispatch(getChair());
      await dispatch(getOther());
      await dispatch(isMonitorPost());
      await dispatch(isComputerPost());
      await dispatch(isKeyboardPost());
      await dispatch(isMousePost());
      await dispatch(isSpeakerPost());
      await dispatch(isTablePost());
      await dispatch(isChairPost());
      await dispatch(isOtherPost());
      setBody(postOnId[0]?.body);
      setIndexMonitor(monitors.length);
      setIndexComputer(computers.length);
      setIndexKeyboard(keyboards.length);
      setIndexMouse(mouses.length);
      setIndexSpeaker(speakers.length);
      setIndexTable(tables.length);
      setIndexChair(chairs.length);
      setIndexOther(others.length);
      setImageProto(postOnImg[0]?.img);
    };
    fetchBootLoader();
  }, [dispatch]);

  const submitPost = async () => {
    await dispatch(isLoadingPostStart());
    const packet = {
      id: Number(id),
      body: body,
    };
    const packetImage = {
      id: postOnImg[0]?.id,
      img: image,
      postId: Number(id),
    };
    const packetMonitor = {
      id: monitorId,
      name: monitors,
      postId: Number(id),
    };
    const packetComputer = {
      id: computerId,
      name: computers,
      postId: Number(id),
    };
    const packetKeyboard = {
      id: keyboardId,
      name: keyboards,
      postId: Number(id),
    };
    const packetMouse = {
      id: mouseId,
      name: mouses,
      postId: Number(id),
    };
    const packetSpeaker = {
      id: speakerId,
      name: speakers,
      postId: Number(id),
    };
    const packetTable = {
      id: tableId,
      name: tables,
      postId: Number(id),
    };
    const packetChair = {
      id: chairId,
      name: chairs,
      postId: Number(id),
    };
    const packetOther = {
      id: otherId,
      name: others,
      postId: Number(id),
    };
    await dispatch(updatePost(packet));
    if (postOnImg[0]?.id) {
      await dispatch(updateImage(packetImage));
    } else {
      await dispatch(postImage({ img: image, postId: Number(id) }));
    }
    if (monitorId) {
      await dispatch(updateMonitor(packetMonitor));
    } else {
      await dispatch(postMonitor({ name: monitors, postId: Number(id) }));
    }
    if (computerId) {
      await dispatch(updateComputer(packetComputer));
    } else {
      await dispatch(postComputer({ name: computers, postId: Number(id) }));
    }
    if (keyboardId) {
      await dispatch(updateKeyboard(packetKeyboard));
    } else {
      await dispatch(postKeyboard({ name: keyboards, postId: Number(id) }));
    }
    if (mouseId) {
      await dispatch(updateMouse(packetMouse));
    } else {
      await dispatch(postMouse({ name: mouses, postId: Number(id) }));
    }
    if (speakerId) {
      await dispatch(updateSpeaker(packetSpeaker));
    } else {
      await dispatch(postSpeaker({ name: speakers, postId: Number(id) }));
    }
    if (tableId) {
      await dispatch(updateTable(packetTable));
    } else {
      await dispatch(postTable({ name: tables, postId: Number(id) }));
    }
    if (chairId) {
      await dispatch(updateChair(packetChair));
    } else {
      await dispatch(postChair({ name: chairs, postId: Number(id) }));
    }
    if (otherId) {
      await dispatch(updateOther(packetOther));
    } else {
      await dispatch(postOther({ name: others, postId: Number(id) }));
    }
    await dispatch(isLoadingPostEnd());
    setImage(null);
    history.push('/post/list');
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
            <label data-testid="label-body">投稿文</label>
          </div>
          <textarea
            className={`${styles.text_area} md:shadow ml-5 md:ml-10  bg-black placeholder-gray-500 appearance-none rounded py-2 px-3 mb-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline cursor-pointer`}
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
        {openItem ? (
          <></>
        ) : (
          <div className="mx-auto text-center">
            <button
              type="button"
              data-testid="button-item"
              className={`${styles.item_btn} md:w-8/12`}
              onClick={handleItemOpen}
            >
              アイテムを編集する
            </button>
          </div>
        )}
        {openItem && (
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
                {monitors?.length > 0 &&
                  monitors.map((monitor: string, index: number) => (
                    <div key={index} className="flex md:w-11/12">
                      <ItemList monitor={monitor} />
                      <span className="mt-2 text-xl cursor-pointer">
                        <RiDeleteBin6Line
                          onClick={() => deleteMonitor(index)}
                        />
                      </span>
                    </div>
                  ))}
                <input
                  className={`${styles.area_input} ml-5 md:ml-10 shadow bg-black placeholder-gray-500 appearance-none rounded py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline cursor-pointer`}
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
                  className="ml-5 text-red-500 text-xs italic md:ml-10"
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
                  モニターを追加
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
                {computers?.length > 0 &&
                  computers.map((computer: string, index: number) => (
                    <div key={index} className="flex md:w-11/12">
                      <ItemList computer={computer} />
                      <span className="mt-2 text-xl cursor-pointer">
                        <RiDeleteBin6Line
                          onClick={() => deleteComputer(index)}
                        />
                      </span>
                    </div>
                  ))}
                <input
                  className={`${styles.area_input} ml-5 md:ml-10 shadow bg-black placeholder-gray-500 appearance-none rounded py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline cursor-pointer`}
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
                  className="ml-5 text-red-500 text-xs italic md:ml-10"
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
                  コンピューターを追加
                </button>
              </div>
            </div>
            <div className={styles.area_box}>
              <div className="ml-5 flex items-center md:ml-10">
                <div className="bg-red-200 px-1 py-1 rounded-full">
                  <KeyboardIcon className="text-red-500" />
                </div>
                <span className="ml-1" data-testid="label-keyboard">
                  キーボード
                </span>
              </div>
              <div>
                {keyboards?.length > 0 &&
                  keyboards.map((keyboard: string, index: number) => (
                    <div key={index} className="flex md:w-11/12">
                      <ItemList keyboard={keyboard} />
                      <span className="mt-2 text-xl cursor-pointer">
                        <RiDeleteBin6Line
                          onClick={() => deleteKeyboard(index)}
                        />
                      </span>
                    </div>
                  ))}
                <input
                  className={`${styles.area_input} ml-5 md:ml-10 shadow bg-black placeholder-gray-500 appearance-none rounded py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline cursor-pointer`}
                  type="text"
                  data-testid="input-keyboard"
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
                  className="ml-5 text-red-500 text-xs italic md:ml-10"
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
                  キーボードを追加
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
                {mouses?.length > 0 &&
                  mouses.map((mouse: string, index: number) => (
                    <div key={index} className="flex md:w-11/12">
                      <ItemList mouse={mouse} />
                      <span className="mt-2 text-xl cursor-pointer">
                        <RiDeleteBin6Line onClick={() => deleteMouse(index)} />
                      </span>
                    </div>
                  ))}
                <input
                  className={`${styles.area_input} ml-5 md:ml-10 shadow bg-black placeholder-gray-500 appearance-none rounded py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline cursor-pointer`}
                  type="text"
                  data-testid="input-mouse"
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
                  className="ml-5 text-red-500 text-xs italic md:ml-10"
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
                  マウスを追加
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
                {speakers?.length > 0 &&
                  speakers.map((speaker: string, index: number) => (
                    <div key={index} className="flex md:w-11/12">
                      <ItemList speaker={speaker} />
                      <span className="mt-2 text-xl cursor-pointer">
                        <RiDeleteBin6Line
                          onClick={() => deleteSpeaker(index)}
                        />
                      </span>
                    </div>
                  ))}
                <input
                  className={`${styles.area_input} ml-5 md:ml-10 shadow bg-black placeholder-gray-500 appearance-none rounded py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline cursor-pointer`}
                  type="text"
                  data-testid="input-speaker"
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
                  className="ml-5 text-red-500 text-xs italic md:ml-10"
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
                  スピーカーを追加
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
                {tables?.length > 0 &&
                  tables.map((table: string, index: number) => (
                    <div key={index} className="flex md:w-11/12">
                      <ItemList table={table} />
                      <span className="mt-2 text-xl cursor-pointer">
                        <RiDeleteBin6Line onClick={() => deleteTable(index)} />
                      </span>
                    </div>
                  ))}
                <input
                  className={`${styles.area_input} ml-5 md:ml-10 shadow bg-black placeholder-gray-500 appearance-none rounded py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline cursor-pointer`}
                  type="text"
                  data-testid="input-table"
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
                  className="ml-5 text-red-500 text-xs italic md:ml-10"
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
                  テーブルを追加
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
                {chairs?.length > 0 &&
                  chairs.map((chair: string, index: number) => (
                    <div key={index} className="flex md:w-11/12">
                      <ItemList chair={chair} />
                      <span className="mt-2 text-xl cursor-pointer">
                        <RiDeleteBin6Line onClick={() => deleteChair(index)} />
                      </span>
                    </div>
                  ))}
                <input
                  className={`${styles.area_input} ml-5 md:ml-10 shadow bg-black placeholder-gray-500 appearance-none rounded py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline cursor-pointer`}
                  type="text"
                  data-testid="input-chair"
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
                  className="ml-5 text-red-500 text-xs italic md:ml-10"
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
                  チェアを追加
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
                {others?.length > 0 &&
                  others.map((other: string, index: number) => (
                    <div key={index} className="flex md:w-11/12">
                      <ItemList other={other} />
                      <span className="mt-2 text-xl cursor-pointer">
                        <RiDeleteBin6Line onClick={() => deleteOther(index)} />
                      </span>
                    </div>
                  ))}
                <input
                  className={`${styles.area_input} ml-5 md:ml-10 shadow bg-black placeholder-gray-500 appearance-none rounded py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline cursor-pointer`}
                  type="text"
                  data-testid="input-other"
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
                  className="ml-5 text-red-500 text-xs italic md:ml-10"
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
                  その他機器を追加
                </button>
              </div>
            </div>
          </div>
        )}
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

export default PostEdit;
