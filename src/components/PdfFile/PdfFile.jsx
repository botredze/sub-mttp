import React, { useRef, useState } from "react";
import "./PdfFile.scss";
import pdf from "../../asstes/pdf/sud_pdf.pdf";
import { Editor } from "@tinymce/tinymce-react";
import { useDispatch, useSelector } from "react-redux";
import { searchIdCurrency } from "../../helpers/searchIdCurrency";

const PdfFile = ({ editorRef }) => {
  const dispatch = useDispatch();
  const { selCurrency } = useSelector((state) => state.selectsSlice);
  const [date, setDate] = useState("");

  const handleEditorChange = (content, editor) => {
    // console.log('Content was updated:', content);
  };

  const { todosApplications } = useSelector((state) => state.applicationsSlice);

  const transformData = (arr, type) => {
    let allText = `<div style="font-weight: 500; font-size: 16px;">`;
    for (const text of arr) {
      const titleText = `<div style="display:inline-block;margin: 15px 5px 0px 0px;">${mainText(
        type
      )}${text.name}</div>`;
      const phoneText = `<div style="display:flex; align-items:center"><span>Телефон: </span> ${text.numPhone}</div>`;
      const adresText = `<div style="display:flex; align-items:center"><span>Адрес: </span> ${text.country}, ${text.region}, ${text.district}, ${text.city}, ${text.street}, ${text.numObj}</div>`;
      const email = `<div style="display:flex; align-items:center"><span>Почта: </span> ${text.email}</div>`;
      const inn = `<div style="display:flex; align-items:center"><span>Инн: </span> ${text.inn}</div>`;
      allText += titleText + phoneText + adresText + email + inn;
    }
    allText += "</div>";
    return allText;
  };
  const mainText = (type) => {
    if (type === 1) {
      return "<h3 style='display:inline; margin: 0px 5px 5px 0px; font-size: 16px;'>Истец: </h3>";
    } else if (type === 2) {
      return "<h3 style='display:flex; margin: 0px 0px 5px 0px; font-size: 16px;'>Представитель по доверенности: </h3>";
    } else if (type === 3) {
      return "<h3 style='display:inline; margin: 0px 5px 5px 0px; font-size: 16px;'>Ответчик: </h3>";
    } else if (type === 4) {
      return "<h3 style='display:flex; margin: 0px 0px 5px 0px; font-size: 16px;'>Представитель ответчика: </h3>";
    }
  };
  React.useEffect(() => {
    const currentDateObject = new Date();
    const day = currentDateObject.getDate();
    const month = currentDateObject.getMonth() + 1; // Месяцы начинаются с 0
    const year = currentDateObject.getFullYear();

    const formattedDate = `${day < 10 ? "0" : ""}${day}.${
      month < 10 ? "0" : ""
    }${month}.${year}г.`;

    setDate(formattedDate);
  }, []);

  ///////////////нахуй не нужный код, он для отталкивания блока стоит////////////////// 64 - 108 строки
  const initialContent = `
    <div>
      <div>
       <div style="margin: 40px 0px 20px 0px; font-size: 16px; width: 100%; position: relative;">
        <p style="margin: 0px 0px 0px 10px; font-size: 16px;">от ${date}</p>
        <div style="
            width: 280px;
            padding: 0px 10px 0px 0px;
            line-height: 25px;
            font-weight: 600;
            font-family: 'Times New Roman', sans-serif;">
        <p style="color: transparent; margin: 0px; font-size: 16px;">Международный Третейский суд</p>
        <p style="color: transparent; margin: 0px; font-size: 16px;">при Торгово-Промышленной палате</p>
        <p style="color: transparent; margin: 0px; font-size: 16px;">Кыргызской Республики</p>
        <div style="color: transparent; margin: 0px">${transformData(
          todosApplications?.plaintiff,
          1
        )}</div>
        <div style="color: transparent; margin: 0px">${transformData(
          todosApplications?.plaintiffResper,
          2
        )}</div>
        <div style="color: transparent; margin: 0px">${transformData(
          todosApplications?.defendant,
          3
        )}</div>
        <div style="color: transparent; margin: 0px">${transformData(
          todosApplications?.defendantResper,
          4
        )}
        </div>
         <p style="color: transparent;  font-size: 16px;">${
           todosApplications?.summ === "0" ||
           todosApplications?.summ === "" ||
           todosApplications?.summ === 0
             ? ""
             : `Цена иска: ${
                 todosApplications?.summ === ""
                   ? ""
                   : `${todosApplications?.summ}${" "}${
                       searchIdCurrency(
                         selCurrency,
                         +todosApplications?.summ_curr
                       )
                         ? searchIdCurrency(
                             selCurrency,
                             +todosApplications?.summ_curr
                           )
                         : ""
                     }`
               }`
         }
              </p>
            </div>
        </div>
          <div style="
              width: 280px;
              padding: 0px 10px 0px 0px;
              line-height: 25px;
              font-weight: 600;
              font-family: 'Times New Roman', sans-serif;
              position: absolute;
              top: 62px;
              right: 10px;
              ">
            <p style="margin: 0px; font-size: 16px;">Международный Третейский суд</p>
            <p style="margin: 0px; font-size: 16px;">при Торгово-Промышленной палате</p>
            <p style="margin: 0px; font-size: 16px;">Кыргызской Республики</p>
            <div style="margin: 0px">${transformData(
              todosApplications?.plaintiff,
              1
            )}</div>
            <div style="margin: 0px">${transformData(
              todosApplications?.plaintiffResper,
              2
            )}</div>
            <div style="margin: 0px">${transformData(
              todosApplications?.defendant,
              3
            )}</div>
            <div style="margin: 0px">${transformData(
              todosApplications?.defendantResper,
              4
            )}
            </div>
            
            </div>
        </div>
        ${
          todosApplications?.name === ""
            ? ""
            : `<h4 style="text-align:center; font-size: 18px; margin: 0 auto; width: 60%;">
              ${todosApplications?.name}
            </h4>`
        }
        ${
          todosApplications?.description === ""
            ? ""
            : `<p style=" font-size: 18px; text-indent: 40px; margin: 5px 0px">${todosApplications?.description}</p>`
        }
        ${
          todosApplications?.motivation === ""
            ? ""
            : `<p style=" font-size: 18px; text-indent: 40px; margin: 5px 0px">${todosApplications?.motivation}</p>`
        }
        ${
          todosApplications?.obosnovanie === ""
            ? ""
            : `<p style=" font-size: 18px; text-indent: 40px; margin: 5px 0px">${todosApplications?.obosnovanie}</p>`
        }
        ${
          todosApplications?.finance_raschet === ""
            ? ""
            : `<p style=" font-size: 18px; text-indent: 40px; margin: 5px 0px">${todosApplications?.finance_raschet}</p>`
        }
        ${
          todosApplications?.law_links === ""
            ? ""
            : `<p style=" font-size: 18px; text-indent: 40px; margin: 5px 0px">${todosApplications?.law_links}</p>`
        }
        ${
          todosApplications?.claim === ""
            ? ""
            : `<p style=" font-size: 18px; text-indent: 40px;">${todosApplications?.claim}</p>`
        }
        <p style="text-align:center; font-size: 20px;">
              Приложения в копиях
            </p>
    </div>
  `;

  return (
    <div className="pdfFile">
      <Editor
        apiKey="frhhgiuyhy64k6q9ojm6xdiqqvkg6ee4yka7yracc74t2i5a"
        initialValue={initialContent}
        init={{
          height: "100%",
          width: "100%",
          menubar: {
            file: {
              title: "File",
              items: "print | undo redo",
            },
          },
          // readonly: true,
          content_style: "body { font-family: 'Times New Roman', sans-serif; }",
          toolbar: false,
        }}
        onEditorChange={handleEditorChange}
        ref={editorRef}
      />
    </div>
  );
};

export default PdfFile;

// import React, { useRef, useState } from "react";
// import "./PdfFile.scss";
// import pdf from "../../asstes/pdf/sud_pdf.pdf";
// import { Editor } from "@tinymce/tinymce-react";
// import { useDispatch, useSelector } from "react-redux";

// const PdfFile = ({ modal, typerole }) => {
//   const dispatch = useDispatch();
//   const editorRef = useRef(null);
//   const [arrData, setArrData] = useState({ arr1: [], arr2: [] });

//   console.log(arrData);

//   const handleEditorChange = (content, editor) => {
//     // console.log('Content was updated:', content);
//   };

//   const { todosApplications } = useSelector((state) => state.applicationsSlice);
//   // console.log(adff, 'adff');
//   // console.log(typerole, "typerole");

//   console.log(todosApplications, "todosApplications");

//   React.useEffect(() => {
//     todosApplications?.plaintiff?.map((i) => {
//       const newArr = [];
//       newArr.push(i.name);
//       newArr.push(i.country);
//       newArr.push(i.region);
//       newArr.push(i.city);
//       newArr.push(i.district);
//       newArr.push(i.street);
//       newArr.push(i.numObj);
//       console.log(newArr);
//       // setArrData({ ...arrData, arr1: "" })
//     });
//   }, [todosApplications]);

//   const initialContent = `
//     <div>
//       <div style="display:flex; justify-content:right; margin: 40px 0px 20px 0px; font-size:16px !important">
//         <div style="
//             width: 350px;
//             padding: 0px 10px 0px 0px;
//             line-height: 25px;
//             font-weight: 600;
//             font-family: 'Times New Roman', sans-serif;">
//           <p style="margin:0px">Международный Третейский суд</p>
//           <p style="margin:0px">при Торгово-Промышленной палате</p>
//           <p style="margin:0px">Кыргызской Республики</p>
//           <p style="margin:0px">

//           </p>
//       </div>
//     </div>
//   `;

//   return (
//     <div className="pdfFile">
//       <Editor
//         apiKey="frhhgiuyhy64k6q9ojm6xdiqqvkg6ee4yka7yracc74t2i5a"
//         initialValue={initialContent}
//         init={{
//           // height: modal ? 660 : 800,
//           // width: modal ? 800 : '100%',
//           height: "100%",
//           width: "100%",
//           menubar: {
//             file: {
//               title: "File",
//               items: "newdocument restoredraft | preview | print ",
//             },
//           },
//           content_style: "body { font-family: 'Times New Roman', sans-serif; }",
//           toolbar: false,
//         }}
//         onEditorChange={handleEditorChange}
//         ref={editorRef}
//       />
//     </div>
//   );
// };

// export default PdfFile;
