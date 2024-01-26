import React, { useState } from "react";
import "./PlaintiffPage.scss";
import InputsPlaintiff from "../../components/PlaintiffPage/InputsPlaintiff/InputsPlaintiff";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changeLookAddPlaintiff } from "../../store/reducers/stateSlice";
import TargetPlaintiff from "../../components/PlaintiffPage/TargetPlaintiff/TargetPlaintiff";
import DescriptionClaim from "../../components/PlaintiffPage/DescriptionClaim/DescriptionClaim";
import MotivationClaim from "../../components/PlaintiffPage/MotivationClaim/MotivationClaim";
import Justification from "../../components/PlaintiffPage/Justification/Justification";
import FinancialResult from "../../components/PlaintiffPage/FinancialResult/FinancialResult";
import GeneralInfo from "../../components/PlaintiffPage/GeneralInfo/GeneralInfo";
import LinksLaw from "../../components/PlaintiffPage/LinksLaw/LinksLaw";
import ClaimRequaire from "../../components/PlaintiffPage/ClaimRequaire/ClaimRequaire";
import ApplicationFiles from "../../components/PlaintiffPage/ApplicationFiles/ApplicationFiles";
//// delete
import DataArrPlaintiff from "../../components/PlaintiffPage/DataArrPlaintiff/DataArrPlaintiff";
import { checkDataIsks } from "../../helpers/checkDataIsks";
import { clearTodosApplications } from "../../store/reducers/applicationsSlice";
import { createIdIsk, sendEveryIsks } from "../../store/reducers/sendDocsSlice";

const PlaintiffPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [indexComp, setIndexComp] = useState(0);
  const [lookInnerType, setLookInnerType] = useState(true);

  const { todosApplications } = useSelector((state) => state.applicationsSlice);
  const { adff, aduf, docsIsks } = useSelector((state) => state.inputSlice);
  const { tokenA } = useSelector((state) => state.saveDataSlice);

  const [btnList, setBtnList] = useState([
    {
      id: 1,
      name: "Истец",
      bool: true,
      components: (
        <DataArrPlaintiff arr={todosApplications} typerole={"истца"} />
      ),
    },
    {
      id: 2,
      name: "Ответчик",
      bool: false,
      components: (
        <DataArrPlaintiff arr={todosApplications} typerole={"ответчика"} />
      ),
    },
    {
      id: 3,
      name: "Цена иска",
      bool: false,
      components: <TargetPlaintiff />,
    },
    {
      id: 4,
      name: "Описание",
      bool: false,
      components: <DescriptionClaim />,
    },
    {
      id: 5,
      name: "Мотивационная часть",
      bool: false,
      components: <MotivationClaim />,
    },
    {
      id: 6,
      name: "Обоснование",
      bool: false,
      components: <Justification />,
    },
    {
      id: 7,
      name: "Финансовый расчет",
      bool: false,
      components: <FinancialResult />,
    },
    {
      id: 8,
      name: "Общая информация",
      bool: false,
      components: <GeneralInfo />,
    },
    {
      id: 9,
      name: "Ссылка на законы",
      bool: false,
      components: <LinksLaw />,
    },
    {
      id: 10,
      name: "Исковые требования",
      bool: false,
      components: <ClaimRequaire />,
    },
    {
      id: 11,
      name: "Приложения",
      bool: false,
      components: <ApplicationFiles />,
    },
  ]);

  const clickBtn = (id) => {
    const newList = btnList.map((item) => {
      return {
        ...item,
        bool: id === item.id ? true : false,
      };
    });

    setBtnList(newList);
    const activeIndex = newList.findIndex((item) => item.bool);
    setIndexComp(activeIndex);
    if (id === 1) {
      setLookInnerType(!lookInnerType);
    } else {
      setLookInnerType(false);
    }
  };

  React.useEffect(() => {
    if (todosApplications.codeid === 0) {
      // 0 = я создаю новый документ, а если не !0, то редактирую документ
      dispatch(
        createIdIsk({ todosApplications, tokenA, adff, aduf, docsIsks })
      ); /// для того чтобы взть id для создания иска
    }

    return () => {
      dispatch(clearTodosApplications());
    };
  }, []);

  return (
    <div className="plaintiff">
      <div className="navBlock">
        <ul className="btnsType plaintiffTypes">
          {btnList?.map((btn) => (
            <button
              key={btn.id}
              onClick={() => {
                clickBtn(btn.id);
                dispatch(changeLookAddPlaintiff(0));
              }}
              className={btn?.bool ? "activeBtnsPlaintiff" : ""}
            >
              {btn.id}. {btn.name}
            </button>
          ))}
        </ul>
      </div>
      {/* /// для адаптивки */}
      <InputsPlaintiff btnList={btnList} indexComp={indexComp} />
    </div>
  );
};

export default PlaintiffPage;
