class やること管理者雛型 {
  追加(やること) {
    const やること一覧 = this.取得();
    やること一覧.push({
      完了: false,
      やること,
    });
    localStorage.setItem("やること", JSON.stringify(やること一覧));
    this.教える && this.教える();
  }

  取得() {
    return JSON.parse(localStorage.getItem("やること") || "[]");
  }

  更新(やること, 完了) {
    const 一覧 = this.取得();
    const 要素番号 = 一覧.findIndex(あ => あ.やること === やること);
    if (要素番号 === -1) {
      return;
    }
    一覧[要素番号].完了 = 完了;
    localStorage.setItem("やること", JSON.stringify(一覧));
    this.教える && this.教える();
  }

  更新したら教えてね(教える) {
    this.教える = 教える;
  }
}

class やること表示者雛型 {
  constructor(やること管理者) {
    this.やること一覧要素 = document.createElement("ul");
    document.body.appendChild(this.やること一覧要素);
    this.管理者 = やること管理者;
    this.管理者.更新したら教えてね(this.表示.bind(this));
    this.表示();
  }

  表示() {
    while (this.やること一覧要素.firstChild)
      this.やること一覧要素.removeChild(this.やること一覧要素.firstChild);
    this.管理者.取得()
      .map(やること => this.要素生成(やること))
      .forEach(やること要素 => this.やること一覧要素.appendChild(やること要素));
  }

  要素生成(やること) {
    const 箱 = document.createElement("li");
    const 完了 = document.createElement("input");
    完了.type = "checkbox";
    完了.checked = やること.完了;
    完了.addEventListener("change", e => {
      this.管理者.更新(やること.やること, e.target.checked);
    });
    const 表示名 = document.createElement("span");
    表示名.innerText = やること.やること;
    箱.appendChild(完了);
    箱.appendChild(表示名);
    return 箱;
  }
}

class やること受付係雛型 {
  constructor(やること管理者) {
    this.管理者 = やること管理者;
    this.入力欄生成();
  }

  入力欄生成() {
    this.入力欄 = document.createElement("input");
    document.body.appendChild(this.入力欄);
    this.入力欄.addEventListener("keypress", this.入力.bind(this));
  }

  入力(e) {
    if (this.入力欄.value && e.keyCode === 13) {
      this.管理者.追加(this.入力欄.value);
      this.入力欄.value = "";
    }
  }
}

const 管理者 = new やること管理者雛型();
const 表示者 = new やること表示者雛型(管理者);
const 受付係 = new やること受付係雛型(管理者);
