import ListItem, { IListItem } from "./ListItem";

interface IList {
  list: IListItem[];
  load(): void; // 리스트 데이터 로드
  save(): void; // 리스트 데이터 저장
  clearList(): void; // 리스트 데이터 초기화
  addItem(itemObj: IListItem): void;
  removeItem(id: string): void;
}

export default class List implements IList {
  // 14~15행: 싱글톤 패턴 구현
  static instance = new List();
  private constructor(private _list: IListItem[] = []) {}

  get list(): IListItem[] {
    return this._list;
  }

  load(): void {
    const storedList: string | null = localStorage.getItem("myList");

    if (typeof storedList !== "string") return;

    const parsedList: { _id: string; _item: string; _checked: boolean }[] =
      JSON.parse(storedList);

    // ListItem 인스턴스 객체 생성 후 List 인스턴스 객체에 추가
    parsedList.forEach((itemObj) => {
      const newListItem: IListItem = new ListItem(
        itemObj._id,
        itemObj._item,
        itemObj._checked
      );

      List.instance.addItem(newListItem);
    });
  }

  addItem(itemObj: IListItem): void {
    this._list.push(itemObj);
    this.save(); // 변경이 생길 때마다 로컬 스토리지에도 저장
  }

  save(): void {
    localStorage.setItem("myList", JSON.stringify(this._list));
  }
  clearList(): void {
    this._list = [];
    this.save();
  }

  removeItem(id: string): void {
    this._list = this._list.filter((item) => item.id !== id);
    this.save();
  }
}
