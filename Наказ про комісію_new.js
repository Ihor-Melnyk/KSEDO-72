function onBeforeCardSave() {
  EdocsApi.setAttributeValue({
    code: "Accountant",
    value: "40762332",
    text: null,
  });

  setAttrValue(
    "ApprovalNameI",
    formattingOfInitials(EdocsApi.getAttributeValue("Approval")?.value)
  );
  setAttrValue(
    "AddReviewNameI",
    formattingOfInitials(EdocsApi.getAttributeValue("AddReview")?.value)
  );
  setAttrValue(
    "TeacherName2I",
    formattingOfInitials(EdocsApi.getAttributeValue("TeacherName2")?.value)
  );
  setAttrValue(
    "StdName2I",
    formattingOfInitials(EdocsApi.getAttributeValue("StdName2")?.value)
  );
}

function setPropertyRequired(attributeName, boolValue = true) {
  //обов"язкове
  var attributeProps = EdocsApi.getControlProperties(attributeName);
  attributeProps.required = boolValue;
  EdocsApi.setControlProperties(attributeProps);
}

function setPropertyHidden(attributeName, boolValue = true) {
  //приховане
  var attributeProps = EdocsApi.getControlProperties(attributeName);
  attributeProps.hidden = boolValue;
  EdocsApi.setControlProperties(attributeProps);
}

function setPropertyDisabled(attributeName, boolValue = true) {
  //недоступне
  var attributeProps = EdocsApi.getControlProperties(attributeName);
  attributeProps.disabled = boolValue;
  EdocsApi.setControlProperties(attributeProps);
}

function setAttrValue(attributeCode, attributeValue) {
  var attribute = EdocsApi.getAttributeValue(attributeCode);
  attribute.value = attributeValue;
  EdocsApi.setAttributeValue(attribute);
}

function onCreate() {
  setAttrValue("Approval", 242597);
  setAttrValue("AddReview", 242646);
}

function onCardInitialize() {
  setInitialProps();
}

function setInitialProps() {
  debugger;
  var Proceedings = EdocsApi.getAttributeValue("Proceedings").value;
  if (Proceedings) {
    switch (Proceedings) {
      case "Студент":
        setPropertyHidden("Student", false);
        setPropertyHidden("Info", false);
        setPropertyRequired("STD_NAME");
        break;

      case "Викладач":
        setPropertyHidden("Teacher", false);
        setPropertyHidden("info2", false);
        setPropertyRequired("TeacherName");
        break;

      default:
        break;
    }
  }
}

function onChangeAddApprovers() {
  var AddApprovers = EdocsApi.getAttributeValue("AddApprovers").value;
  if (AddApprovers) {
    var arr = EdocsApi.getDictionaryItemData("Teachers", AddApprovers);
    if (arr) {
      EdocsApi.setAttributeValue({
        code: "TeacherName2",
        value: arr.attributes.find((x) => x.code == "TeachName").value,
        text: null,
      });
      EdocsApi.setAttributeValue({
        code: "TeacherId2",
        value: arr.attributes.find((x) => x.code == "TeachId").value,
        text: null,
      });
      EdocsApi.setAttributeValue({
        code: "TeacherPosition2",
        value: arr.attributes.find((x) => x.code == "TeachStaf").value,
        text: null,
      });
    }
  } else {
    EdocsApi.setAttributeValue({
      code: "TeacherName2",
      value: null,
      text: null,
    });
    EdocsApi.setAttributeValue({ code: "TeacherId2", value: null, text: null });
    //  EdocsApi.setAttributeValue({ code: "TeacherDep2", value: null, text: null });
    EdocsApi.setAttributeValue({
      code: "TeacherPosition2",
      value: null,
      text: null,
    });
  }
}

function onChangeReview() {
  var Review = EdocsApi.getAttributeValue("Review").value;
  if (Review) {
    var arr = EdocsApi.getDictionaryItemData("Students", Review);
    if (arr) {
      EdocsApi.setAttributeValue({
        code: "StdName2",
        value: arr.attributes.find((x) => x.code == "StdName").value,
        text: null,
      });

      EdocsApi.setAttributeValue({
        code: "StdID2",
        value: arr.attributes.find((x) => x.code == "StdId").value,
        text: null,
      });
      EdocsApi.setAttributeValue({
        code: "StdLevel2",
        value: arr.attributes.find((x) => x.code == "StdLevel").value,
        text: null,
      });

      EdocsApi.setAttributeValue({
        code: "ProgramEducational3",
        value: arr.attributes.find((x) => x.code == "StdProg").value,
        text: null,
      });

      EdocsApi.setAttributeValue({
        code: "StdEmail3",
        value: arr.attributes.find((x) => x.code == "StdEmail").value,
        text: null,
      });

      EdocsApi.setAttributeValue({
        code: "StdSpc2",
        value: arr.attributes.find((x) => x.code == "StdSpc").value,
        text: null,
      });
    }
  } else {
    EdocsApi.setAttributeValue({ code: "StdName2", value: null, text: null });
    EdocsApi.setAttributeValue({ code: "StdID2", value: null, text: null });
    EdocsApi.setAttributeValue({ code: "StdLevel2", value: null, text: null });
    EdocsApi.setAttributeValue({
      code: "ProgramEducational3",
      value: null,
      text: null,
    });
    EdocsApi.setAttributeValue({ code: "StdSpc2", value: null, text: null });
    EdocsApi.setAttributeValue({ code: "StdEmail3", value: null, text: null });
  }
}

function onTaskExecuteRegistration(routeStage) {
  debugger;
  if (routeStage.executionResult == "executed") {
    EdocsApi.setAttributeValue({
      code: "NumberOrder",
      value: EdocsApi.getAttributeValue("RegNumber").value,
      text: null,
    });
    EdocsApi.setAttributeValue({
      code: "DateOrder",
      value: EdocsApi.getAttributeValue("RegDate").value,
      text: null,
    });
  }
}

function onTaskExecuteRegistration(routeStage) {
  if (routeStage.executionResult != "rejected")
    setDateSTR("RegDate", "RegDateText");
}

function setSTRDates() {
  debugger;
  setDateSTR("RegDate", "RegDateText");
}
function setDateSTR(DateCODE, TXTcode) {
  debugger;
  var Date = EdocsApi.getAttributeValue(DateCODE).value;
  var txt = null;
  if (Date) txt = moment(Date).format("DD.MM.YYYY");
  if (txt != EdocsApi.getAttributeValue(TXTcode).value)
    EdocsApi.setAttributeValue({ code: TXTcode, value: txt, text: null });
}

function formattingOfInitials(fullName) {
  debugger;
  if (fullName) {
    const arr = fullName.split(" ");
    const arrNew = [];
    arr[1] &&
      arrNew.push(
        arr[1]?.slice(0, 1).toUpperCase() + arr[1]?.slice(1).toLowerCase()
      );
    arrNew.push(arr[0].toUpperCase());
    return arrNew.join(" ");
  } else return "";
}
