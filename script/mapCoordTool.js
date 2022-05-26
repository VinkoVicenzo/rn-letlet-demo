class IdFeatureMapList {
  constructor(list) {
    this._list = list;
    this._lookup = Object.fromEntries(this._list.map(({ id }, i) => [id, i]));
  }

  _addToLookup = (id) =>
    !this.has(id) && (this._lookup[id] = this._list.length);

  has = (id) => id in this._lookup;

  getIdFeatureMap = (id) => this.has(id) && this._list[this._lookup[id]];

  add = (id, suc) =>
    (this._list[this.has(id) ? this._lookup[id] : this._addToLookup(id)] = {
      id,
      suc,
    });

  get list() {
    return this._list;
  }
}

const KEY_LIST = "list-key";
const idFeatureMapList = new IdFeatureMapList(
  JSON.parse(localStorage.getItem(KEY_LIST)) ?? []
);

document.addEventListener(
  "keydown",
  ({ key }) =>
    !console.log("keydown:", key) &&
    {
      c: () =>
        navigator.clipboard.writeText(JSON.stringify(idFeatureMapList.list)),
      r: () => {
        localStorage.setItem(KEY_LIST, JSON.stringify([]));
        location.reload(true);
      },
    }[key]?.()
);
