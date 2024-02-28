import List from "./models/List";
import ListItem from "./models/ListItem";
import ListTemplate from "./templates/ListTemplate";

const initApp = (): void => {
  const listInstance = List.instance;
  const listTemplateInstance = ListTemplate.instance;

  const itemForm = document.getElementById("form") as HTMLFormElement;

  itemForm.addEventListener("submit", (event: SubmitEvent): void => {
    event.preventDefault();

    // 새 아이템 텍스트
    const inputEl = document.getElementById("item-input") as HTMLInputElement;
    const newText = inputEl.value.trim();

    // 입력된 내용이 없으면 리턴
    if (!newText.length) return;

    // 새 아이템 아이디
    const itemId = listInstance.list.length
      ? parseInt(listInstance.list[listInstance.list.length - 1].id) + 1
      : 1;

    // item object 생성
    const newItem = new ListItem(itemId.toString(), newText);

    // 리스트에 새 아이템 추가
    listInstance.addItem(newItem);

    // 렌더링하기
    listTemplateInstance.render(listInstance);

    // 새로운 아이템을 입력할때마다 입력된 내용을 비워준다.
    inputEl.value = "";
  });

  const clearItemEl = document.getElementById(
    "clear-items-btn"
  ) as HTMLButtonElement;

  clearItemEl.addEventListener("click", (): void => {
    listInstance.clearList();
    listTemplateInstance.clear();
  });

  // 초기 데이터 로드
  listInstance.load();

  // 초기 화면 렌더링
  listTemplateInstance.render(listInstance);
};

initApp();
